FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY server.js ./
# Static mounts for frontends copied via volumes in compose
EXPOSE 8080
CMD ["node", "server.js"]
