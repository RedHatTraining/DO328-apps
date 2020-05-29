FROM ubi8/nodejs-12

COPY package.json .

RUN npm install

COPY lib ./lib
COPY index.js .

CMD node index.js
