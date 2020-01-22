-- The seed file contains your db schema
create table movies (
    movie_id serial primary key,
    movie_name varchar(30),
    movie_rating int
);