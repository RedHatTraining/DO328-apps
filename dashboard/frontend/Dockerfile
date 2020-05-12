FROM ubi8/nodejs-12

# URL of the exchange app (typically the route for istio-ingressgateway)
# All env vars exposed to the React app must start with REACT_APP
ENV REACT_APP_GW_ENDPOINT=PLACEHOLDER
# Workaround for https://github.com/facebook/create-react-app/issues/8688
ENV CI=true

# Cache dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci --production

# Cache public files
COPY public ./public

COPY src ./src

EXPOSE 3000

CMD [ "npm", "start" ]
