FROM node:12-alpine

# Install dependencies
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --production

# Copy app
COPY . /app

EXPOSE 8080

# Default run command
CMD [ "npm", "start" ]
