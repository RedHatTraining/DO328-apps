FROM registry.access.redhat.com/ubi8/nodejs-12

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

EXPOSE 8080
CMD ["node", "server.js"]
