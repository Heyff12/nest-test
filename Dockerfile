FROM node:12
RUN mkdir -p /home/Service
WORKDIR /home/Service    
COPY ./dist /home/Service/src 
COPY package*.json /home/Service/
RUN  npm install --production
EXPOSE 3001
CMD ["node","./src/main.js"]