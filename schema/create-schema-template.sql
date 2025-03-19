
DROP TABLE IF EXISTS NTODOS;
Create table NTODOS (
    id SERIAL primary key,
    todoName varchar(75),
    todoDescription text,
    dueDate TIMESTAMPTZ ,
    complete BOOLEAN,
    userEmail varchar(100)
)



-- INSERT INTO NTODOS (todoName, todoDescription, dueDate, complete, userEmail)
-- VALUES ('Walk the dog', 'You will take the dog out and walk it', CURRENT_DATE, false, "pm@gmail.com");


