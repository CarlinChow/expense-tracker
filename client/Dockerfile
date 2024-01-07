FROM node:16.13-alpine

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
 
WORKDIR /client
 
COPY package*.json .
 
RUN npm install
 
COPY . .
 
CMD [ "npm", "start" ]