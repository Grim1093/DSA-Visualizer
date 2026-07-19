FROM node:18-alpine

# Install Docker inside the container so it can spawn sibling containers (Docker-out-of-Docker / DooD approach)
RUN apk add --no-cache docker-cli

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Start the Node.js server
CMD ["npm", "run", "start"]
