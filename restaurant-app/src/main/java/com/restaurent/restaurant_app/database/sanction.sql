USE restaurant_db;
GO

CREATE TABLE sanction (
    id INT PRIMARY KEY IDENTITY(1,1) not null,
    fullname NVARCHAR(100) not null,
    dob NVARCHAR(100) not null,
    POSITION NVARCHAR(100) not null,
    reason NVARCHAR(100) not null,
    status NVARCHAR(100) not null
);
GO

SELECT * FROM sanction;