FROM node:8
WORKDIR /workspace
COPY package.json /workspace
RUN npm install
COPY . /workspace
EXPOSE 3500
CMD ["npm", "start"]