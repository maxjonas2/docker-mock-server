FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci --ommit=dev
COPY . . 
CMD ["node", "server.js"]
EXPOSE 3000
