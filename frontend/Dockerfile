FROM node:8
WORKDIR /workspace
COPY package.json /workspace
RUN npm install
COPY . /workspace/
RUN yarn build


EXPOSE 3000
CMD ["npm", "start"]