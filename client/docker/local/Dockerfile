ARG NODE_VERSION=18.18.0-alpine3.18

FROM node:${NODE_VERSION}


ARG APP_HOME=/app

WORKDIR ${APP_HOME}
COPY ./ ${APP_HOME}



COPY package*.json ./
RUN npm install 
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache


RUN npm run build

CMD ["npm", "start"]