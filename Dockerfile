FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/my-app
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm i

EXPOSE 3006

CMD [ "NODE", "APP" ]
