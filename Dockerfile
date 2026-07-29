FROM node:20-bullseye-slim

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Pin exact Python package versions to match training environment
# xgboost 3.3.0 | pandas 3.0.3 | numpy 2.5.1 | scikit-learn latest
RUN pip3 install --no-cache-dir --break-system-packages \
    "numpy==2.5.1" \
    "pandas==3.0.3" \
    "xgboost==3.3.0" \
    "scikit-learn"

# Set working directory to /app
WORKDIR /app

# Copy codebase
COPY . .

# Install backend Node.js packages
WORKDIR /app/backend
RUN npm install --omit=dev

# Expose port
EXPOSE 5000

# Tell server.js to use python3 (Linux path)
ENV PYTHON_PATH=python3

# Run application
CMD ["node", "server.js"]
