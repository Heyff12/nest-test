FROM node:12
RUN mkdir -p /home/Service
WORKDIR /home/Service    
COPY ./ /home/Service 
# COPY package*.json /home/Service/
RUN  npm install --production
EXPOSE 3001
CMD ["node","./main.js"]