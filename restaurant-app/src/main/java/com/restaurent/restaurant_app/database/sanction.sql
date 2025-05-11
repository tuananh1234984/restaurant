USE restaurant_db;
GO

CREATE TABLE sanction (
    id INT PRIMARY KEY IDENTITY(1,1),
    fullname NVARCHAR(100),
    dob NVARCHAR(100),
    POSITION NVARCHAR(100),
    reason NVARCHAR(100),
    status NVARCHAR(100)
);
GO


SELECT * FROM sanction;