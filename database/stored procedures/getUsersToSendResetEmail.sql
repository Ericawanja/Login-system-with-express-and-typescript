Create
or Alter Procedure getResetEmailList(@email varchar(200)) AS BEGIN
select
    *
from
    passwordResetQueue
where
    isSent = 1
END