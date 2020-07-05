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
https://docs.docker.com/engine/instal
```

### Step 2 - Configurar o Ambiente de Desenvolvimento

Va ao link do [contêiner](https://hub.docker.com/_/vault) ou apenas digite em seu terminal o comando
```bash
docker pull vault
```
Neste momento, voce pode receber a seguinte mensagem:

```bash
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```
Isso acontece porque voce nao esta iniciando o docker, localize em seu gerenciador de aplicativos o docker e o inicie.

### Step 3 - Configurar Vault em Ambiente de desenvolvimento

Para configurar o vault, precisamos apenas digitar no terminal a seguinte instrução:

```bash
docker run --rm --cap-add=IPC_LOCK -e VAULT_ADDR=http://localhost:8200 -p 8200:8200 -d --name=dev-vault vault:1.2.2
```

O que cada parâmetro significa:

**docker run** = nome auto-explicativo.

**--cap-add=IPC_LOCK** = Esse comando bloqueie a memória, o que impede que esta seja salva o disco, quando voce desligar o container ele sera excluído automaticamente.

**-e*** = environment variable

**VAULT_ADDR=http://localhost:8200** = o mesmo que definir export VAULT_ADDR='http://0.0.0.0:8200' dentro do container.

**-d** = Significa Daemon, irá subir o container com serviço dentro do docker.

**--name=dev-vault** = nome do container (pode escolher qualquer um da sua escolha).

**vault** = container.


#### Step 3-1 - Verificar a instalação em modo desenvolvimento
<a name="instalacao"></a>

digite no seu terminal o comando:
```bash
docker ps
```

Se tudo deu certo irá mostrar no seu terminal algo parecido com isso:
```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
5e6ae499818f        vault:1.2.3         "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes        0.0.0.0:8200->8200/tcp   dev-vault
```
Outro sinal para verificar se vault esta funcionando é ir até seu navegador principal e digitar
``` http://localhost:8200/ ``` 

você irá ver uma tela igual a imagem a baixo, se ate aqui tudo esta funcionando, podemos continuar, mas se por algum motivo, o seu navegador nao exibir esse tela, comece o processo totalmente do zero, pois algum passo nao foi seguido corretamente.

<img src="./assets/ui.jpeg" alt="alt text" width="800"/>

#### Step 4 - login
<a name="login"></a>

Como nos percebemos ao tentar acessar a UI do Vault ele solicita um token, mas ate o presente momento nao geramos nenhuma chave, pois bem, ela ja foi gerada.

Para ter acesso ao token temos que acessar o nosso container que foi criado, o comando é o seguinte:

**Listamos os containers**
```bash
docker ps 
```
```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
5e6ae499818f        vault:1.2.3         "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes        0.0.0.0:8200->8200/tcp   dev-vault
```
**Acessamos o containers**
```
docker logs [YOUR-CONTAINER-ID]  
```
No meu caso ficou assim:
```bash
docker logs 5e6ae499818f
```
```bash
You may need to set the following environment variable:

    $ export VAULT_ADDR='http://0.0.0.0:8200'

The unseal key and root token are displayed below in case you want to
seal/unseal the Vault or re-authenticate.

Unseal Key: xYOUR-UNSEAL-KEY=
Root Token: s.YOUR-KEY

Development mode should NOT be used in production installations!

==> Vault server started! Log data will stream in below:
```
Depois desse passo, ou seja, logo no final do console voce vera dois campos, o primeiro chamado **Unseal Key**, essa chave é usada para desbloquear o vault, nao é importante por enquanto, visto que estamos em ambiente de desenvolvimento. O outro campo é **Root Token** é esta chave que estamos procurando, copie ela com o **s.** e coloque na UI e depois clique em **Sign In**.

### Criando, Lendo e Atualizando Chaves

Neste passo vou usar a linguagem ``JavaScript``, mas voce pode usar qualquer linguagem que se sentir confortável, veja todas as libs neste [link](https://www.vaultproject.io/api-docs/libraries).

Vamos criar um projeto com nodejs, no seu terminal digite:

``1 - Criar pasta do projeto``
```
mkdir [Nome do seu projeto ] && cd [Nome do seu projeto ]
```
``2 - Iniciar o projeto``
```bash
yarn init -y
```
``2 - Adicionar a lib do Vault``
```bash
yarn add node-vault
```

Abra seu projeto com o Visual Code, caso voce nao tenha o visual code pode fazer download nesse [link](https://code.visualstudio.com/).

Eu ja adicionei o **Visual Code** no meu **PATH** para abrir ele pelo terminal, sem precisar setar pasta ou ir em open project agilizando o processo de desenvolvimento diário, para verificar digite no terminal a seguinte instrução.
```bash
code ./
```

``code``: Visual Code

``./``: Path local.

Se ao digitar nao aparecer funcionar, vá ate seu visual code, ``VIEW`` -> ``Command Palette``-> digite:

```
Shell command: Install 'code' command in PATH
```

``3 - Criar script de comunicação``

Crie um arquivo **Javascript** com extencao ``.js``

Vamos primeiramente definir duas informações essenciais, HOST e TOKEN.

```javascript
const options = {
  apiVersion: "v1",
  endpoint: process.env.ENDPOINT || "http://127.0.0.1:8200",
  token: process.env.TOKEN_VAULT || "s.XXXXXXXXXXXXXXXXXXX",
};
```
Esse token é o mesmo informado para fazer login la no passo [Step 4 - login.](#login).

Após definirmos esses dados vamos iniciar uma instancia da comunicação:
```javascript
const vault = require("node-vault")(options);
```

``4 - Criando uma nova chave``
```javascript
vault.write("secret/api", { value: "xxxxx-xxxxxx-xxxxx" });
```
``5 - Lendo a nova chave que foi criada``
```javascript
vault.read("secret/api");
```
``6 - Atualizando a nova chave que foi criada``
```javascript
vault.write("secret/api", { value: "yyyyy-yyyyyy-yyyyy" });
```
``7 - deletando a nova chave que foi criada``
```javascript
vault.delete('secret/api'))
```

Com isso você já consegue criar uma estrutura para manipulacao das suas chaves com segurança.

## ATENÇÃO
**NUNCA USE A CHAVE DE ROOT EM PRODUÇÃO NO SEU CÓDIGO OU PARA FAZER QUALQUER TIPO DE CONSULTA, PARA ESSE TIPO DE FUNÇÃO DEVE-SE PRIMEIRO CRIAR UMA CHAVE COM UMA PERMISSÃO MAIS RESTRITIVA**.

## Gestão de usuários e permissões

Para criar um novo usuário é muito simples, acessamos nosso container.

```bash
 docker exec -it 5e6ae499818f /bin/sh                                         
```
``5e6ae499818f``: informe o código do seu container, para descobrir veja no tópico [instalação](#instalacao).

### Interagindo com o Container Vault

#### Login

Antes de voce conseguir invocar qualquer comando no container, voce precisa se autenticar informando seu token root.
```bash
vault login s.xxxxxxxxxxxx
```
caso tudo de certo sera mostrado na tela a seguinte mensagem:

```bash
/ # vault login s.xxxxxxxxxxxxxxxx
Success! You are now authenticated. The token information displayed below
is already stored in the token helper. You do NOT need to run "vault login"
again. Future Vault requests will automatically use this token.

Key                  Value
---                  -----
token                s.xxxxxxxxxxxxxxx
token_accessor       xxxxxxxxxxxxxxxxx
token_duration       ∞
token_renewable      false
token_policies       ["root"]
identity_policies    []
policies             ["root"]
```
#### Permissões

