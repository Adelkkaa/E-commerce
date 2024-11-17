# 1. For build React app
FROM node:lts AS development

# Set working directory
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

# Same as yarn install
RUN yarn --ignore-engines
COPY . /app
FROM development AS build
RUN yarn build

# 2. For Nginx setup
FROM nginx:alpine
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx static assets
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
