create
or alter procedure registerUser(
    @_id varchar(100),
    @firstname varchar(100),
    @lastname varchar(100),
    @email varchar(250),
    @password varchar(250),
    @isAdmin Bit = 1
    
) AS BEGIN
SET NOCOUNT ON

insert into
    users(
        _id,
        firstname,
        lastname,
        email,
        password,
        isAdmin
    )
values
(
        @_id,
        @firstname,
        @lastname,
        @email,
        @password,
        @isAdmin
    )
End