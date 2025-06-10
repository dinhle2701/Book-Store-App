FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 5555

CMD ["npm", "run", "dev", "nodemon", "index.js"]
