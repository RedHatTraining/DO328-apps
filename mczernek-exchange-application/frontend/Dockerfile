FROM ubi8/nodejs-12

# URL of the exchange app
# All env vars exposed to the React app must start with REACT_APP
ENV REACT_APP_GW_ENDPOINT=exchange-exchange-app.apps.ocp-d43.dev.nextcle.com

# Cache dependencies
COPY package.json .
RUN npm install

# Cache public files
COPY public ./public

COPY src ./src

EXPOSE 3000

CMD npm start
