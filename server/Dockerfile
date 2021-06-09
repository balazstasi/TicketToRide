FROM node:15-alpine

WORKDIR /workspace

COPY . .

RUN npm install --only=production

EXPOSE 3031

CMD [ "npm", "run", "docker" ]
