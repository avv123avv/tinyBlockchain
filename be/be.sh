echo 'Starting be .....'
yarn install
yarn global add knex
sleep 15
knex migrate:latest
yarn run nodemon

echo 'Be started .....'
