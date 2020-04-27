FROM ubi8/nodejs-12

COPY package.json .
RUN npm install

COPY . ./

EXPOSE 8080
CMD ["node", "server.js"]
