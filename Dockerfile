FROM node:18-alpine
WORKDIR /home/app

# Install dependencies
COPY package*.json .
RUN npm install

# Build typescript
COPY . .
RUN npm run build

ENTRYPOINT ["node", "dist/index.js"]
