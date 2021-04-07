FROM node:12.18.2-stretch

RUN mkdir  /unseal
WORKDIR /unseal
COPY ./ /unseal

ENV ENDPOINT .
ENV TOKEN_VAULT .

ENV KEY_ONE .
ENV KEY_TWO .
ENV KEY_THREE .
ENV KEY_FOUR .
ENV KEY_FIVE .

RUN cd /unseal && npm install

CMD ["node","/unseal/src/unseal.js"]