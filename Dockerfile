FROM node:14.15 as initialBuild

WORKDIR /app
COPY ./front-end/ .
RUN npm install && npm run build

FROM node:14.15

WORKDIR /app
COPY ./back-end/ .
RUN npm run build
COPY --from=initialBuild /app/build ./build/build

EXPOSE 8000

CMD ["npm", "run", "dev"]