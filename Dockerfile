# Dockerfile

FROM node:22.1.0

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

# 👇 this compiles TypeScript to JavaScript in `dist/`
RUN npm run build

# 👇 this is where Node starts your app
CMD ["node", "dist/index.js"]
