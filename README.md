## Tracker API

A template for expense and income tracking. This is a starting project which requires some work before it is fully functional.

This starter project acts as a template to node typescript api development with a postgres persistence layer, and follows a very simple pattern of router to persistence.

The task is to completely implement the swagger doc.

### Requirements
* Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* Install NodeJS

### Running the application 
* Copy ".local.env" to file called ".env"
    > Note that .env is ignored both in Docker and Git, this is your own configuration and must not be pushed to source control.
* Open a terminal on the root of this repository
* Run the command below
    ```bash
    docker compose build
    docker compose up
    ```
* Read provided swagger doc defined [here](http://localhost:8080/#/).

### Expected Learnings
* Reading a swagger doc, and understanding an API first development process.
* Understanding of the nodeJS typescript api development stack.
* Get a grasp on creating simple SQL queries to fullfill business requirements ``(SELECTS, JOINS, INSERTS, DELETE)``.
* Understanding of tools such as Docker to help with local development.
* Understanding liquibase and how it works.
* Understanding a simple router -> database pattern.
