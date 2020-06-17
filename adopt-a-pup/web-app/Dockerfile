FROM registry.access.redhat.com/ubi8/nodejs-12

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy app
COPY build ./build/
COPY server.js ./

ENV REACT_APP_ADOPTION_SERVICE_URL=http://istio-ingressgateway-istio-system.apps.ocp4.example.com/ \
    REACT_APP_ANIMAL_SERVICE_URL=http://istio-ingressgateway-istio-system.apps.ocp4.example.com/ \
    REACT_APP_SHELTER_SERVICE_URL=http://istio-ingressgateway-istio-system.apps.ocp4.example.com/ \
    REACT_APP_EMAIL_APP_URL=http://email-adoptapup.apps.ocp4.example.com/ \
    REACT_APP_NEWS_ENABLED=1 \
    BACKEND_NEWS_SERVICE_URL=http://news-adoptapup-news.apps.ocp4.example.com/

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]
