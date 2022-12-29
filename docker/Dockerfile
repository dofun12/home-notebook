FROM node:18-slim as prebuild-node
RUN mkdir /nodedir
WORKDIR /nodedir
ADD package.json /nodedir
ADD angular.json /nodedir
ADD tsconfig.app.json /nodedir
ADD tsconfig.json /nodedir
ADD tsconfig.spec.json /nodedir
RUN npm install -g @angular/cli
RUN npm install


FROM prebuild-node as node
WORKDIR /nodedir
COPY src ./src
RUN npm run build.prod


FROM nginx as nginx

RUN mkdir -p /html
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=node /nodedir/gui /html/gui

COPY nginx/nginx-conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx/docker-entrypoint.sh /
RUN cat /etc/nginx/conf.d/default.conf
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
USER root
RUN chmod -R 777 /html
RUN chmod -R 777 /etc/nginx/conf.d/default.conf
RUN chown -R www-data:www-data /html

