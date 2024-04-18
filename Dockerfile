ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# *temporary* for development
COPY .env .env 

EXPOSE 4000
CMD ["npm", "run", "dev"]