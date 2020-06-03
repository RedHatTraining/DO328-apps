FROM registry.access.redhat.com/ubi8/nodejs-12

ENV REACT_APP_ADOPTION_SERVICE_URL=http://envoy-gateway-adopt-a-pup.apps.ocp-jaime.do328.dev.nextcle.com/ \
    REACT_APP_ANIMAL_SERVICE_URL=http://envoy-gateway-adopt-a-pup.apps.ocp-jaime.do328.dev.nextcle.com/ \
    REACT_APP_SHELTER_SERVICE_URL=http://envoy-gateway-adopt-a-pup.apps.ocp-jaime.do328.dev.nextcle.com/ \
    REACT_APP_NEWS_ENABLED=1
    # REACT_APP_NEWS_SERVICE_URL=""

# Install dependencies
COPY package.json package-lock.json ./

RUN npm ci --production

# Copy app
COPY . ./

EXPOSE 8080

# Default run command
CMD [ "npm", "run", "start:prod" ]