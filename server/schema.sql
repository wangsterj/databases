CREATE DATABASE chat;

USE chat;
/* Deletes table */
truncate messages, users, rooms;
drop table users, rooms, messages;

CREATE TABLE users (
  ID int auto_increment primary key,
  username varchar(255)
);

CREATE TABLE rooms (
  ID int auto_increment primary key,
  roomname varchar(255)
);

CREATE TABLE messages (
  ID int auto_increment primary key,
  messageText varchar(255),
  users_ID int not null
  -- rooms_ID int not null,
  -- FOREIGN KEY (users_ID) REFERENCES users(ID),
  -- FOREIGN KEY (rooms_ID) REFERENCES rooms(ID)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

