CREATE DATABASE restaurant_db;
GO

USE restaurant_db;
GO

CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100),
    Password NVARCHAR(100),
    Email NVARCHAR(100),
    Role NVARCHAR(100)
);
GO

INSERT INTO Users (Username, Password, Email) VALUES (N'admin', N'admin123', N'admin@example.com');
GO