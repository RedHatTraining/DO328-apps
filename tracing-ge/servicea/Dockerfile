FROM registry.access.redhat.com/ubi8/nodejs-12

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app
COPY . ./

EXPOSE 8080

# Default run command
CMD [ "npm", "start" ]
