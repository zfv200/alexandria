FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install 
COPY . . 

# set off build process
RUN npm run build 

FROM nginx 
# change nginx default port for react
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html