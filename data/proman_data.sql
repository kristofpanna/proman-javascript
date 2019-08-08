DROP TABLE IF EXISTS public.cards CASCADE;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
DROP TABLE IF EXISTS public.statuses CASCADE;
DROP SEQUENCE IF EXISTS public.statuses_id_seq;
DROP TABLE IF EXISTS public.boards CASCADE;
DROP SEQUENCE IF EXISTS public.boards_id_seq;
DROP TABLE IF EXISTS public.users CASCADE;
DROP SEQUENCE IF EXISTS public.users_id_seq;


CREATE TABLE users
(
    id       serial         NOT NULL PRIMARY KEY,
    username varchar UNIQUE NOT NULL,
    password varchar
);

CREATE TABLE boards
(
    id       serial NOT NULL PRIMARY KEY,
    title    varchar,
    owner_id integer REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE statuses
(
    id        serial NOT NULL PRIMARY KEY,
    title     varchar
);

CREATE TABLE cards
(
    id        serial NOT NULL PRIMARY KEY,
    board_id  integer REFERENCES boards (id) ON DELETE CASCADE,
    title     varchar,
    status_id integer REFERENCES statuses (id) ON DELETE CASCADE,
    _order     integer,
    archived  boolean DEFAULT false
);


INSERT INTO boards (title) VALUES ('Board 1');
INSERT INTO boards (title) VALUES ('Board 2');

INSERT INTO statuses VALUES (0, 'new');
INSERT INTO statuses VALUES (1, 'in progress');
INSERT INTO statuses VALUES (2, 'testing');
INSERT INTO statuses VALUES (3,'done');

INSERT INTO cards (board_id, title, status_id, _order) VALUES (1, 'New card 1', 0, 0);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (1, 'New card 2', 0, 1);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (1, 'In progress card 1', 1, 0);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (1, 'Planning', 2, 0);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (1, 'Done card 1', 3, 0);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (1, 'Done card 1', 3, 1);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (2, 'New card 1', 0, 0);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (2, 'New card 2', 0, 1);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (2, 'In progress card', 1, 0);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (2, 'Planning', 2, 0);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (2, 'Done card 1', 3, 0);
INSERT INTO cards (board_id, title, status_id, _order) VALUES (2, 'Done card 1', 3, 1);
