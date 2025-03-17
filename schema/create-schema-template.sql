Create table NTODOS (
    id SERIAL primary key,
    todoName varchar(75),
    todoDescription text,
    dueDate TIMESTAMPTZ ,
    complete BOOLEAN
)

INSERT INTO NTODOS (todoName, todoDescription, dueDate, complete)
VALUES ('Walk the dog', 'You will take the dog out and walk it', CURRENT_DATE, false),
('Take out trash', 'You will take out the trash', CURRENT_DATE, true);

SELECT * from ntodos;

ALTER TABLE NTODOS ALTER COLUMN dueDate TYPE TIMESTAMPTZ;