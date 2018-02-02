# request
A tool to manage money between friends.


### Important Software
nvm --version `0.33.8`

node -v `v8.9.4`

npm -v `4.6.1`

### Install dependencies
simply run `yarn` in your command line

### Setup to develop
1. Need to set the correct environment variables
    1. Create a local `.env file`
    2. Config necessary environment variables:
    ```
    DEV_DB_HOST=localhost
    DEV_DB_USER=root
    DEV_DB_PASS='...'
    DEV_APP_PORT=3000
    ```



### TODO
1. setup eslint for server-side code
2. look into server-side debuggers
3. plan out API-endpoint and necessary database tables
4. re-organize backend code into folder & debate if front-end should be in it's own repository
5. separate build scripts for nativeIOS|Android|backend and then automatic upload into AWS
6. setup Redux with React Native
