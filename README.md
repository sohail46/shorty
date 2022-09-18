# shorty

Create shortlinks for long urls that everyone remembers

- Steps to run the project:

1. clone the repository
2. create config.env file at the root of repository
3. copy the contents from config.example file and paste it in config.env file and update the env vars accordingly
4. create database shorty in mysql
5. import the tables and data from database/shorty.sql or run the sql script, incase script fails uncomment the sequelize.sync command in all models after creating the shorty database
6. Run npm install at the root of repository
7. import the json collection from postman-collection/shorty.postman_collection.json in postman
8. create a new environment in postman and add URL var and set it to -> http://localhost:3000/api/v1
9. run the project by running command -> npm run dev at the root of repository
10. done
