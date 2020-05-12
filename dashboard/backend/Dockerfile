FROM ubi8/nodejs-12

COPY package.json .
COPY package-lock.json .

RUN npm ci --production

COPY lib ./lib
COPY index.js .

CMD node index.js
