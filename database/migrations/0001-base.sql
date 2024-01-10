--liquibase formatted sql
--changeset jclarino:0001

create schema if not exists devices;

create extension if not exists "uuid-ossp";
create extension if not exists "plpgsql";

--rollback drop schema devices cascade;
--rollback drop extension "plpgsql" cascade;
--rollback drop extension "uuid-ossp" cascade;