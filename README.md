
#migration->
npm install --save-dev sequelize-cli
npx sequelize-cli init //run this inside src folder
npx sequelize-cli migration:generate --name create-table-name
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo

To revert all migrations, use -
npx sequelize-cli db:migrate:undo:all