
DROP TABLE IF EXISTS NTODOS;
Create table NTODOS (
    id SERIAL primary key,
    todoName varchar(75),
    todoDescription text,
    dueDate TIMESTAMPTZ ,
    complete BOOLEAN,
    userEmail varchar(100)
)


SELECT * FROM NTODOS WHERE userEmail = 'pmacdonald15@gmail.com' ORDER BY dueDate 
-- INSERT INTO NTODOS (todoName, todoDescription, dueDate, complete)
-- VALUES ('Walk the dog', 'You will take the dog out and walk it', CURRENT_DATE, false),
-- ('Take out trash', 'You will take out the trash', CURRENT_DATE, true);

