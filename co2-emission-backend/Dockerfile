# Basis-Image für Node.js
FROM node:21
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["node", "src/server.js"]