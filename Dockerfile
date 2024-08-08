FROM node:18.19.1-alpine

ENV NODE_ENV=production
# ENV GATEWAY=https://canvas-tm.hjm.bid/api/v1/
# ENV KEY=253D3FB468A0E24677C28A624BE0F939
# ENV BASE_URL=https://canvas-tm.hjm.bid
# ENV TOKEN_SERVE=CyZ0qvdDpRzPijSuLJzLeh6vLfyrD8NbzqhLSumrnSgVEuiu5RAZSjtLNteYTFSc
# ENV URL_GIT=https://raw.githubusercontent.com/mdds-labs/vbtm-config/main/tm_production.json

WORKDIR /app

COPY package.json ./
RUN npm install -g npm@10.5.0 && npm install
# RUN npm i && npm cache clean --force
COPY /dist/apps/vtm ./dist

# Install and run Bower
# RUN npm install -g bower
# RUN bower instal
CMD ["node", "dist/main"]



