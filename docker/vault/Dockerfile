# base image
FROM alpine:3.7

# set vault version
ENV VAULT_VERSION 1.7.0

# create a new directory
RUN mkdir /vault
RUN mkdir /vault/config
RUN mkdir /vault/keys
RUN mkdir /vault/storage

# download dependencies
RUN apk --no-cache add \
    bash \
    ca-certificates \
    wget

# download and set up vault
RUN wget --quiet --output-document=/tmp/vault.zip https://releases.hashicorp.com/vault/${VAULT_VERSION}/vault_${VAULT_VERSION}_linux_amd64.zip && \
    unzip /tmp/vault.zip -d /vault && \
    rm -f /tmp/vault.zip && \
    chmod +x /vault

# update PATH
ENV PATH="PATH=$PATH:$PWD/vault"

# expose port 8200
EXPOSE 8200 8200

# run vault
ENTRYPOINT ["vault"]