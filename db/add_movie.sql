insert into movies (
    movie_name,
    movie_rating
) values (
    $1,
    $2
)
returning *;