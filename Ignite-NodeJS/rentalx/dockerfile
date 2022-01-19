FROM node

WORKDIR /usr/app

COPY packege.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]