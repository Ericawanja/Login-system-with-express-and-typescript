create
or alter procedure updatePassword(
    @email varchar(250),
    @password varchar(250)
) AS BEGIN
SET
    NOCOUNT ON

UPDATE users
set
    password = @password
where
    email = @email
END