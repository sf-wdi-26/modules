
-- In case students need to catchup from earlier in the lesson:

CREATE DATABASE wdi;

CREATE TABLE instructors (
ID          INT   PRIMARY KEY   NOT NULL,
NAME        TEXT                NOT NULL,
EXPERIENCE  INT                 NOT NULL,
WEBSITE     CHAR(50)
  );

CREATE TABLE students (
ID          INT   PRIMARY KEY   NOT NULL,
NAME        TEXT                NOT NULL,
AGE         INT                 NOT NULL,
ADDRESS     CHAR(50)
 );
INSERT INTO students VALUES (2, 'Jilly Cakes', 30, '123 Webdev Dr. Boston, MA');
INSERT INTO students VALUES (3, 'Johnny Bananas', 25, '555 Five St, Fivetowns, NY');
INSERT INTO students VALUES (4, 'Jackie Lackie', 101, '2 OldForThis Ct, Fivetowns, NY');
INSERT INTO students VALUES (5, 'Slaggy McRaggy', 28);


-- Final Independent Practice
-- - Insert five more students:
--   - Nancy Gong is 40 and lives at 200 Horton Ave., Lynbrook, NY
INSERT INTO students VALUES (6, 'Nancy Gong', 40, '200 Horton Ave., Lynbrook, NY');
--   - Laura Rossi is 70 and listed her address as "Unlisted"
INSERT INTO students VALUES (7, 'Laura Rossi', 70, 'Unlisted');
--   - David Daniele is 28 and lives at 300 Dannington Ln., Washington, DC.
INSERT INTO students VALUES (8, 'David Daniel', 28, '300 Dannington Ln., Washinton, DC.');
--   - Greg Fitzgerald is 25 and did not list an address
INSERT INTO students VALUES (9, 'Greg Fitzgerald', 25);
--   - Randi Fitz is 28 and lives in Oceanside, NY
INSERT INTO students VALUES (10, 'Randi Fitz', 28, 'Oceanside, NY');

--
-- - Randi wants her address to be corrected to 25 Broadway, New York, NY
UPDATE students SET address = '25 Broadway, New York, NY, New York, NY' WHERE address = 'Oceanside, NY';
-- - Get a list of student names and addresses who are older than 30 and order them by their address alphabetically
SELECT name, address FROM students WHERE  age > 30 ORDER BY address;
-- - Get a list of students whose first name begins with the letter "J"
SELECT * FROM students WHERE name LIKE 'J%';
-- - Get a list of student names who live in NY or MA
SELECT name FROM students WHERE address LIKE '%NY%' OR address LIKE '%MA%'
