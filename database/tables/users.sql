CREATE TABLE users (
    _id varchar(100) PRIMARY KEY,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    email varchar(250) NOT NULL,
    password varchar(250) NOT NULL,
    isAdmin BIT NOT NULL,
    isCompleted BIT NOT NULL,
)