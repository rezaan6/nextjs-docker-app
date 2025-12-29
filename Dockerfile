FROM node:20-alpine AS builder
WORKDIR /app

ARG WEB_HOST
ENV NEXT_PUBLIC_WEB_HOST=${WEB_HOST}

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

ARG WEB_HOST
ENV NODE_ENV=production
ENV NEXT_PUBLIC_WEB_HOST=${WEB_HOST}

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]