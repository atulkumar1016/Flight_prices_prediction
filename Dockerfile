FROM node:20-bookworm-slim

# Install system dependencies (Debian 12 / Python 3.11)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages (no strict pinning — XGBoost JSON format is cross-version compatible)
RUN pip3 install --no-cache-dir --break-system-packages \
    numpy \
    pandas \
    xgboost \
    scikit-learn

# Set working directory to /app
WORKDIR /app

# Copy codebase
COPY . .

# Build React frontend (outputs to /app/frontend/dist)
WORKDIR /app/frontend
RUN npm install && npm run build

# Install backend Node.js packages
WORKDIR /app/backend
RUN npm install --omit=dev

# Expose port
EXPOSE 5000

# Tell server.js to use python3 (Linux path)
ENV PYTHON_PATH=python3

# Run application
CMD ["node", "server.js"]
