FROM ubi8/nodejs-12

# Install dependencies
COPY package.json .
RUN npm install

# Copy app
COPY . ./

EXPOSE 8080

# Default run command
CMD [ "npm", "start" ]
