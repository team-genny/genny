FROM node:20

WORKDIR /app

COPY . . 

RUN npm ci

RUN npm run build

ENV PORT=8080

EXPOSE 8080

CMD ["npm","start"]