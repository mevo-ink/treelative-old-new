FROM node:14 AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm ci

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN npm run build

FROM nginx:1.17-alpine
COPY --from=builder /opt/web/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
