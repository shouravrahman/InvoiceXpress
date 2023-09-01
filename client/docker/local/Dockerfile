ARG NODE_VERSION=20.5.1-alpine3.17

FROM node:${NODE_VERSION}


ARG APP_HOME=/app

WORKDIR ${APP_HOME}


# RUN addgroup --system invoice \
#    && adduser --system --ingroup invoice invoiceuser

COPY package*.json ./
RUN npm install 

# COPY --chown=invoiceuser:invoice . ${APP_HOME}
COPY . ${APP_HOME}
RUN npm run build
# RUN chown invoiceuser:invoice ${APP_HOME}

# USER invoiceuser
CMD ["npm", "start"]