# hashfleet DB

Migrations for the hashfleet Postgres DB. Uses [Liquibase](https://www.liquibase.org/).

## Migrations

All migrations are in the `migrations/` directory. To create a new migration, create a new file in the directory with an appropriate order prefix, name, and `.sql` extension. The migration should include the below comments at the top of the file (replace `username` with your username and `id` with the migration order prefix):

```sql
--liquibase formatted sql
--changeset username:id
```

After that, the necessary schema changes/additions/removals can be added. Details for some of the extra Liquibase features you can use, including rollbacks and preconditions, can be found in [the Liquibase docs](https://www.liquibase.org/documentation/sql_format.html).

## Running locally

```
docker-compose up
```

> :bulb: TIPS: For Windows machine users

If the Liquibase migration fails, check the error messages via the Docker Dashboard or looking through the output. If you see text similar to:

```
standard_init_linux.go:211: exec user process caused "no such file or directory"
```

This could be due to git adding the carriage return character when checking out the files on a Windows machine. To correct this, run the following git command:

```
git config core.eol lf
```

It may be necessary to re-checkout the repository. If this still fails, open `migrate-and-seed.sh` and manually resave with LF endings instead of CRLF.

### Verify Local Database

You can use a database tool such as PgAdmin, DbVisualizer or DBeaver to connect to the local instance of the Postgres Docker container. Just input the following information as the connection values:
```
Host: localhost
Port: 5432
Database: hashfleet
Username: postgres
Password: s0mes3cret
```

Alternatively, you can use docker CLI to verify if the database, schema and tables were created by running:

1. `docker exec -it <ContainerName> psql -U postgres`
2. `\l` - to list all database
3. `\c <DbName>` - to connect to a database. Eg. `hashfleet`
4. `\dn` - to view all schemas
5. `\dt "hashfleet".*` - to list all tables
6. `\dt+ hashfleet.lookups` - to select a specific table
7. `SELECT * FROM "hashfleet".lookups;` - to query a table

### Update the User tables

Update the email address in useremails table with your email address.
Update the first name, last name in the user profile table with your details.
Update providerkey in the user external identities table with your provider key.