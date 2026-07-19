FROM node:18-bullseye

WORKDIR /app

# Install all required compilers
RUN apt-get update && apt-get install -y \
    python3 \
    g++ \
    openjdk-17-jdk \
    golang \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Kotlin compiler manually
RUN wget https://github.com/JetBrains/kotlin/releases/download/v1.9.22/kotlin-compiler-1.9.22.zip \
    && unzip kotlin-compiler-1.9.22.zip -d /opt/ \
    && rm kotlin-compiler-1.9.22.zip

ENV PATH="${PATH}:/opt/kotlinc/bin"

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Start the Node.js server
CMD ["npm", "run", "start"]
