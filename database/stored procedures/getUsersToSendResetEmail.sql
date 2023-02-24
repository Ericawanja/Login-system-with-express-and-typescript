Create
or Alter Procedure getResetEmailList 
AS BEGIN
select
    *
from
    passwordResetQueue
where
    isSent = 0
END