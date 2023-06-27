FROM node:lts 

WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN yarn install 

COPY . .
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 10731

CMD [ "yarn", "start" ]
