ARG NODE_VERSION=18.18.0-alpine3.18

FROM node:${NODE_VERSION}

LABEL name="invoice-express"
LABEL license="MIT"
LABEL description="MERN Invoice Solution"


ENV NODE_ENV=development


ARG APP_HOME=/app

WORKDIR ${APP_HOME}


RUN addgroup --system invoice \
   && adduser --system --ingroup invoice invoiceuser

COPY package*.json ./
RUN npm install 
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY --chown=invoiceuser:invoice . ${APP_HOME}

RUN chown invoiceuser:invoice ${APP_HOME}

USER invoiceuser
CMD ["npm", "run", "dev"]