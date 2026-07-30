FROM node:20-bookworm-slim


RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir --break-system-packages \
    numpy \
    pandas \
    xgboost \
    scikit-learn


WORKDIR /app


COPY . .

WORKDIR /app/frontend
RUN npm install && npm run build

WORKDIR /app/backend
RUN npm install --omit=dev

EXPOSE 5000

ENV PYTHON_PATH=python3


CMD ["node", "server.js"]
