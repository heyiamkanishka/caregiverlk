FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Expose the port from .env or default 5001
EXPOSE 5001

CMD ["node", "src/index.js"]
