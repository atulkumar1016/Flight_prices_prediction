FROM node:20-bullseye-slim

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages globally
RUN pip3 install --no-cache-dir pandas numpy xgboost scikit-learn

# Set working directory to /app
WORKDIR /app

# Copy codebase
COPY . .

# Install backend Node.js packages
WORKDIR /app/backend
RUN npm install --omit=dev

# Expose port
EXPOSE 5000

# Run application
CMD ["node", "server.js"]
