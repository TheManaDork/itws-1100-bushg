-- create the tables for our movies
CREATE TABLE `movies` (
   `movieid` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `title` varchar(100) NOT NULL,
   `year` char(4) DEFAULT NULL,
   PRIMARY KEY (`movieid`)
);
-- insert data into the tables
INSERT INTO movies
VALUES (1, "Elizabeth", "1998"),
   (2, "Black Widow", "2021"),
   (3, "Oh Brother Where Art Thou?", "2000"),
   (
      4,
      "The Lord of the Rings: The Fellowship of the Ring",
      "2001"
   ),
   (5, "Up in the Air", "2009");


CREATE TABLE `actors` (
   `actorid` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `firstname` varchar(100) NOT NULL,
   `lastname` varchar(100) NOT NULL,
   `dob` DATE DEFAULT NULL,
   PRIMARY KEY (`actorid`)
);

INSERT INTO actors
VALUES (1, "Aaron", "Actor", '2001-01-01'),
    (2, "Bob", "Breman", '2002-02-02'),
    (3, "Cayla", "Colby", '2003-03-03'),
    (4, "Dylan", "Dilman", '2004-04-04'),
    (5, "Evelyn", "Erstwhile", '2005-05-05'),
    (6, "Fanny", "Finkerstein", '2006-06-06'),
    (7, "Graydon", "Bush", '2007-07-07'),
    (8, "Harold", "AndThePurpleCrayon", '2008-08-08'),
    (9, "I", "Am", '2009-09-09'),
    (10, "Jake", "Jameson", '2010-10-10'),
    (11, "Karrissa", "C", '2011-11-11'),
    (12, "Lia", "Ellegofusciouhipoppokunurious", '2002-02-02');