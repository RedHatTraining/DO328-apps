FROM registry.access.redhat.com/ubi8/nodejs-12

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy app
COPY build ./build/
COPY server.js ./

# ENV REACT_APP_ADOPTION_SERVICE_URL=http://envoy-gateway-adopt-a-pup.apps.ocp-jaime.do328.dev.nextcle.com/ \
#     REACT_APP_ANIMAL_SERVICE_URL=http://envoy-gateway-adopt-a-pup.apps.ocp-jaime.do328.dev.nextcle.com/ \
#     REACT_APP_SHELTER_SERVICE_URL=http://envoy-gateway-adopt-a-pup.apps.ocp-jaime.do328.dev.nextcle.com/ \
#     REACT_APP_NEWS_ENABLED=1 \
#     REACT_APP_NEWS_SERVICE_URL=http://news-comprehensive-review-news.apps.ocp4.example.com

ENV REACT_APP_ADOPTION_SERVICE_URL=http://istio-ingressgateway-istio-system.apps.ocp4.example.com/ \
    REACT_APP_ANIMAL_SERVICE_URL=http://istio-ingressgateway-istio-system.apps.ocp4.example.com/ \
    REACT_APP_SHELTER_SERVICE_URL=http://istio-ingressgateway-istio-system.apps.ocp4.example.com/ \
    REACT_APP_NEWS_ENABLED=1 \
    REACT_APP_NEWS_SERVICE_URL=http://news-comprehensive-review-news.apps.ocp4.example.com

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]