FROM node:22.1.0

WORKDIR /app

COPY . .

COPY .env .env

RUN npm install

RUN if [ -f "./prisma/schema.prisma" ]; then npx prisma generate; fi

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]