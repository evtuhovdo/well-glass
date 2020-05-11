FROM node:8.15.1-alpine as build-stage

RUN apk add curl \
    && rm -rf /var/cache/apk/*
RUN curl -o- -L https://yarnpkg.com/install.sh | sh
RUN mkdir /app
COPY ./ /app
WORKDIR /app
RUN yarn install --no-cache --frozen-lockfile --production
RUN yarn build

FROM nginx:1.15.9-alpine

ADD docker/nginx/conf/domain.conf /etc/nginx/sites-available/domain.conf

RUN mkdir /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/domain.conf /etc/nginx/sites-enabled/domain
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build/ /var/www/domain/docs/
WORKDIR /var/www/domain/

CMD ["nginx"]
