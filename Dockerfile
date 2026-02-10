FROM node:20-slim

WORKDIR /app
COPY package.json package.json
RUN npm install --omit=dev
COPY server.js server.js
COPY lib lib

ENV NODE_ENV=production
ENTRYPOINT ["node", "server.js"]
