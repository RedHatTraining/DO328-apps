FROM ubi8/nodejs-12

# URL of the exchange app
# All env vars exposed to the React app must start with REACT_APP
ENV REACT_APP_GW_ENDPOINT=PLACEHOLDER

# Cache dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci --production

# Cache public files
COPY public ./public

COPY src ./src

EXPOSE 3000

CMD npm start
