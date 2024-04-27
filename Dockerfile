FROM node:18

WORKDIR /src/usr/app

COPY . .

WORKDIR /src/usr/app/my-app

RUN npm i
RUN npm run build

WORKDIR /src/usr/app/backend

RUN npm i

EXPOSE 3006

CMD [ "NODE", "APP" ]
