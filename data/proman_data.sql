DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.users_id_seq;

CREATE TABLE users
(
    id       serial         NOT NULL PRIMARY KEY,
    username varchar UNIQUE NOT NULL,
    password varchar
);


DROP TABLE IF EXISTS public.boards;
DROP SEQUENCE IF EXISTS public.boards_id_seq;

CREATE TABLE boards
(
    id       serial NOT NULL PRIMARY KEY,
    title    varchar,
    owner_id integer REFERENCES users (id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS public.statuses;
DROP SEQUENCE IF EXISTS public.statuses_id_seq;

CREATE TABLE statuses
(
    id        serial NOT NULL PRIMARY KEY,
    title     varchar
);


DROP TABLE IF EXISTS public.cards;
DROP SEQUENCE IF EXISTS public.cards_id_seq;

CREATE TABLE cards
(
    id        serial NOT NULL PRIMARY KEY,
    board_id  integer REFERENCES boards (id) ON DELETE CASCADE,
    title     varchar,
    status_id integer REFERENCES statuses (id) ON DELETE CASCADE,
    _order     integer,
    archived  boolean DEFAULT false
);
