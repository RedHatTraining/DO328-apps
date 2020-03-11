FROM ubi8/nodejs-12

COPY package.json .

RUN npm install

COPY public ./public
COPY src ./src

EXPOSE 3000

CMD npm start
