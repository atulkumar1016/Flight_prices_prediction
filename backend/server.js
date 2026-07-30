const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static directory (videos, logos, charts)
const staticPath = path.join(__dirname, '../static');
app.use('/static', express.static(staticPath));
console.log(`[INFO] Serving static files from: ${staticPath}`);

// Serve built React frontend at root
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    console.log(`[INFO] Serving frontend from: ${frontendDist}`);
}


// CSV parsing helper
function parseCSV(filePath, limit = 100) {
    if (!fs.existsSync(filePath)) {
        console.error(`[ERROR] File not found: ${filePath}`);
        return [];
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');

    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < Math.min(lines.length, limit + 1); i++) {
        const line = lines[i];
        const rowValues = [];

        let currentValue = "";
        let insideQuote = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
                insideQuote = !insideQuote;
            } else if (char === ',' && !insideQuote) {
                rowValues.push(currentValue.trim());
                currentValue = "";
            } else {
                currentValue += char;
            }
        }

        rowValues.push(currentValue.trim());

        const row = {};

        headers.forEach((header, index) => {
            let val = rowValues[index] || '';

            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.substring(1, val.length - 1);
            }

            row[header] = val;
        });

        data.push(row);
    }

    return data;
}

// ===== API ENDPOINTS =====

// 1. Get Dataset Preview
app.get('/api/dataset', (req, res) => {
    try {
        const csvPath = path.join(__dirname, '../flights.csv');
        const dataset = parseCSV(csvPath, 50);

        res.json({
            total_records: 10683,
            preview_records: dataset.length,
            data: dataset
        });

    } catch (err) {
        console.error("Error reading dataset:", err);
        res.status(500).json({ error: err.message });
    }
});

// 2. Predict Flight Price
app.post('/api/predict', (req, res) => {

    const {
        source_code,
        dest_code,
        day,
        month,
        year,
        dep_hour,
        arr_hour
    } = req.body;

    if (
        !source_code ||
        !dest_code ||
        !day ||
        !month ||
        !year ||
        dep_hour === undefined ||
        arr_hour === undefined
    ) {
        return res.status(400).json({
            error: "Missing required fields in request body."
        });
    }

    console.log(
        `[PREDICT QUERY] ${source_code} -> ${dest_code} on ${day}-${month}-${year} at ${dep_hour}:00`
    );

    const scriptPath = path.join(__dirname, 'predict.py');

    // Force Python 3.12 on Windows.
    // This avoids Python 2.7 / Python 3.14 conflicts.
    const pythonCmdRaw =
        process.env.PYTHON_PATH ||
        (process.platform === 'win32'
            ? 'py -3.12'
            : 'python3');

    const [pythonCmd, ...pythonExtraArgs] =
        pythonCmdRaw.split(' ');

    const pyProcess = spawn(
        pythonCmd,
        [...pythonExtraArgs, scriptPath],
        { cwd: __dirname }
    );

    let stdoutData = '';
    let stderrData = '';

    pyProcess.on('error', (err) => {
        console.error(
            `[SPAWN ERROR] Could not start '${pythonCmd}': ${err.message}`
        );

        return res.status(500).json({
            error:
                `Could not start Python ('${pythonCmd}' not found). ` +
                `Make sure Python 3.12 is installed or set PYTHON_PATH.`
        });
    });

    // Pass request payload to Python through stdin
    pyProcess.stdin.write(JSON.stringify(req.body));
    pyProcess.stdin.end();

    pyProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
    });

    pyProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
    });

    pyProcess.on('close', (code) => {

        if (code !== 0) {
            // predict.py writes errors to stdout as {"error": "..."}, not stderr
            let errorMessage = stderrData.trim();
            if (!errorMessage) {
                try {
                    const parsed = JSON.parse(stdoutData.trim());
                    errorMessage = parsed.error || `Prediction script exited with code ${code}`;
                } catch (_) {
                    errorMessage = stdoutData.trim() || `Prediction script exited with code ${code}`;
                }
            }
            console.error(
                `[PYTHON ERROR] Exit code: ${code}, Error: ${errorMessage}`
            );
            return res.status(500).json({ error: errorMessage });
        }

        try {
            const predictions = JSON.parse(stdoutData.trim());
            res.json(predictions);

        } catch (err) {
            console.error(
                "[PARSING ERROR] Failed to parse output:",
                stdoutData
            );

            res.status(500).json({
                error: "Failed to parse model output"
            });
        }

    });

});

// SPA fallback — serve React index.html for any unknown route
if (fs.existsSync(frontendDist)) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendDist, 'index.html'));
    });
}

// Start Server
app.listen(PORT, () => {
    console.log(
        `🚀 Express Backend Server running on http://localhost:${PORT}`
    );
});