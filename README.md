 # HashiCorp Vault

Nesse artigo vamos aprender sobre o Vault, uma poderosa ferramenta para gerenciamento de API Keys, Password, certificados e outras informações sensíveis de uma aplicação de software.

A internet vem mudando constantemente, neste últimos 20 anos vimos uma transformação sem precedentes no que se diz respeito a comunicação, principalmente a online, gracas a essa mudança podemos observar uma forte confiança exagerada a respeito de dados sensíveis da nossa aplicação, vemos muitos desenvolvedores, principalmente os iniciantes, com uma confiança exagerada em pensar que seus sistemas, banco de dados e websites nunca serão invadidos. 

Atualmente vejo o Vault como uma solução de extrema importância para o gerenciamento de chaves no ecossistema blockchain, pois nos últimos anos,  vimos uma crescente onda de ciber ataques principalmente em exchanges centralizadas onde fazem o gerencialmente das private keys e public keys. Na comunidade blockchain temos uma frase que ilustra bem o perigo de ter uma private key exposta, ela se expressa assim, " If You Don’t Own Your Keys, You Don’t Own Your Crypto" , ou seja, possuir essa informação pode custar milhões de dólares dependendo de qual chave privada o criminoso tenha acesso, neste tutorial não irei me aprofundar sobre conceitos básicos de criptografia simétrica e assimétrica, caso tenham interesse nessa assunto deixem nos comentários que farei um novo artigo direcionado a esse tema.

Percebendo os problemas citados acima, resolvi desenvolver esse tutorial com um passo a passo de como configurar, testar e realizar o deploy do Vault em seu server.

Vault e uma ferramente open-source gerida pela licença MPL-2.0 com permissão em uso comercial, então, não ha motivos para não usa-la, principalmente se você tem uma exchange de cripto, ou trabalha em uma.

## Configurações

Nesse tutorial vamos usar o modelo de contêiner em Docker, pois creio que para quem esta iniciando e a maneira mais rápido e fácil instalar, testar e configurar. 

### Step 1 -  Instale o Docker:

```
https://docs.docker.com/engine/install/

```

### Step 2 - Configurar o Ambiente de Desenvolvimento

Va ao link do contêiner https://hub.docker.com/_/vault ou apenas digite em seu terminal o comando
```
docker pull vault
```
Neste momento, voce pode receber a seguinte mensagem:

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```
Isso acontece porque voce nao esta iniciando o docker, localize em seu gerenciador de aplicativos o docker e o inicie.

### Step 3 - Configurar Vault em Ambiente de desenvolvimento

Para configurar o vault, precisamos apenas digitar no terminal a seguinte instrução:

```
docker run --cap-add=IPC_LOCK -d --name=dev-vault vault
```

O que cada parâmetro significa:

**docker run** = nome auto-explicativo.

**--cap-add=IPC_LOCK** = Esse comando bloqueie a memória, o que impede que esta seja salva o disco, quando voce desligar o container ele sera excluído automaticamente.

**-d** = Significa Daemon, irá subir o container com serviço dentro do docker.

**--name={ANY-NAME}** = nome do container.

**vault** = container.


