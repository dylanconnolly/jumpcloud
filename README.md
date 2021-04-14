# Escalations Engineer Homework Assignment

## Part 1: Database Queries

### Prerequisites
1. Have [Docker](https://docs.docker.com/get-docker/) installed on your system
2. Install the [MongoDB CLI](https://docs.mongodb.com/mongocli/master/install/)

### Setup Steps
1. Change directory to the workspace for your local Mongo DB
```
cd /path/to/file/mongodb/
```
2. Pull down mongo community image
```
docker pull mongo
```
3. Replace the path specified under volumes in the provided docker-compose.yml file to the path to the mongodb directory
4. Start the mongo service
```
docker-compose up -d
```
5. Get the container id for the new mongo container
```
docker ps
```
6. Copy the provided `.json` files to the docker container
```
docker cp /path/to/files/employees.json container_id:/
docker cp /path/to/files/beers.json container_id:/
docker cp /path/to/files/patrons.json container_id:/
```
7. Connect to the mongo docker container
```
docker exec -it jcmongo bash
```
8. Import the database backups
```
mongoimport --db=brewery --collection=beers --file=beers.json
mongoimport --db=brewery --collection=employees --file=employees.json
mongoimport --db=brewery --collection=patrons --file=patrons.json
```
9. Either close connection to docker container or open a new terminal and ensure database is accessible by running:
```
mongo mongodb://127.0.0.1:27017/brewery
```

### Assignment
1. Create and provide a script with logging to achieve each of the following:
  - We’re coming out with a new hoppy delicious IPA. To let our customers know, we need two mailing lists.
    - One that includes the email addresses of all of our customers
    - Another that includes only the email addresses for customers whose favorite beer is an IPA.
  - We need to gather some data on our tap rooms to show which is the most popular location. We need to know how many customers have frequented each location between 1/1/2021 - 4/1/2021.
  - We’re trying to determine what type of beer is most popular with our customers so we can determine what our next experimental beer should be! Can you provide us with an array of objects that include the beer name, type, and number of customers where that beer is their favorite?
2. Provide the output results for each of these requests.
