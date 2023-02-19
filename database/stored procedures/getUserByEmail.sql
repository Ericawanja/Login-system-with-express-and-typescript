create
or alter procedure getUser(@email varchar(100)) AS BEGIN
select
    _id,
    firstname,
    lastname,
    email,
    password,
    isAdmin
from
    users
where
    email = @email
END