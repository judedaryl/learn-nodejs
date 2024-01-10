--liquibase formatted sql
--changeset jclarino:0002

CREATE TABLE categories (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TYPE entry_type AS ENUM (
    'expense',
    'income'
);

CREATE TABLE entries (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    description TEXT NOT NULL,
    category_id UUID NOT NULL,
    type entry_type NOT NULL,
    amount NUMERIC NOT NULL,
    date TIMESTAMP NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT entries_category_fk FOREIGN KEY (category_id) REFERENCES categories(id)
);

--rollback drop table entries;
--rollback drop type entry_type;
--rollback drop table categories;