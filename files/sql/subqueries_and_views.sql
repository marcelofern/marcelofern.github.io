/*
Write an SQL to (dynamically) display the details of the student 
(student id, first name, last name, registration date) by accepting student 
ID (110, 200, 305, 500 – one ID at a time) from the user at run time
*/
SELECT STUDENT_ID, FIRST_NAME, LAST_NAME, REGISTRATION_DATE
FROM STUDENT
WHERE STUDENT_ID = '&STUDENT_ID';

/* 
Write an SQL to display the cities (avoid duplication if any) in a 
given state. Allow the user to enter the state (for example NY, NJ etc.)
at run time.
*/
SELECT DISTINCT CITY
FROM ZIPCODE
WHERE STATE = '&STATE';

/*
Display student details (student id, first name, last name, registration date)
of the most recent registration (latest registration date). Sort the results 
by the last name.
*/
SELECT STUDENT_ID, FIRST_NAME, LAST_NAME, REGISTRATION_DATE
FROM STUDENT
WHERE REGISTRATION_DATE = (SELECT MAX(REGISTRATION_DATE) FROM STUDENT);

/*
Select the course name and the total capacity of the course. Display the 
course if the total capacity is less than the average capacity of all sections.
*/
SELECT c.DESCRIPTION,
       (
         SELECT SUM(s.CAPACITY) 
         FROM SECTION s 
         WHERE (s.COURSE_NO = c.COURSE_NO)
       )
FROM COURSE c
WHERE 
(
  SELECT SUM(s.CAPACITY) 
  FROM SECTION s 
  WHERE (s.COURSE_NO = c.COURSE_NO)
) < 
(
  SELECT AVG(se.CAPACITY) FROM SECTION se
);

/*
Display student id, first name, last name and number of sections they are 
enrolled of those students who have the highest number of enrolled sections
*/
SELECT s.STUDENT_ID, s.FIRST_NAME, s.LAST_NAME,
       (
         SELECT COUNT(*) 
         FROM ENROLLMENT e 
         WHERE (s.STUDENT_ID = e.STUDENT_ID)
       ) as enrolled_sections
FROM STUDENT s
WHERE
(
  SELECT COUNT(*) 
  FROM ENROLLMENT e 
  WHERE (s.STUDENT_ID = e.STUDENT_ID)
) =
(
  SELECT MAX(COUNTER) 
  FROM (SELECT STUDENT_ID, COUNT(DISTINCT SECTION_ID) as COUNTER
  FROM ENROLLMENT
  GROUP BY STUDENT_ID)
);

/*
Display Student ID, Last Name, Section ID and final Numeric Grade 
(Grade Type Code FI) of those students with the highest final numeric 
grade for each section. Sort the results by Section ID
*/
SELECT s.STUDENT_ID, s.LAST_NAME, g.SECTION_ID, g.NUMERIC_GRADE
FROM STUDENT s
INNER JOIN GRADE g ON (g.STUDENT_ID = s.STUDENT_ID)
WHERE GRADE_TYPE_CODE = 'FI'
AND (g.SECTION_ID, g.NUMERIC_GRADE) IN 
(
  SELECT SECTION_ID, MAX(NUMERIC_GRADE)
  FROM GRADE
  GROUP BY SECTION_ID
)
ORDER BY g.SECTION_ID;

/*
Using a correlated sub query (using NOT EXISTS) find the courses which have 
no sections assigned. Display the course number and description.
Ensure there is no JOIN.
*/
SELECT c.COURSE_NO, c.DESCRIPTION
FROM COURSE c
WHERE NOT EXISTS
(
  SELECT * FROM SECTION s WHERE s.COURSE_NO = c.COURSE_NO
);

/*
Create a VIEW called LONG_DISTANCE_STUDENT with all the columns form the 
STUDENT table, CITY and STATE from the ZIPCODE table. Exclude the students 
form New York (NY), New Jersey (NJ) and Connecticut (CT).)
*/
CREATE OR REPLACE VIEW LONG_DISTANCE_STUDENT as (
  SELECT s.*, z.CITY, z.STATE
  FROM STUDENT s
  INNER JOIN ZIPCODE z ON (s.ZIP = z.ZIP)
  WHERE z.STATE NOT IN ('NY', 'NJ', 'CT')
);
SELECT * FROM LONG_DISTANCE_STUDENT;

/*
Create a VIEW named LOW_COST_COURSE that shows every detail from the 
course table where the cost is 1095 or less.
*/
CREATE OR REPLACE VIEW LOW_COST_COURSE AS 
(
  SELECT * FROM COURSE
  WHERE COST < 1096
);
SELECT * FROM LOW_COST_COURSE;

/*
Create a VIEW called BUSY_STUDENT by the number of sections each student is 
enrolled on. Only include the student in the view if they are enrolled for 
more than 2 sections. The view should include the Student ID, First Name, 
Last Name and the number of sections they are enrolled on. Use appropriate
column names/alias where ever necessary for the VIEW.
*/
CREATE OR REPLACE VIEW BUSY_STUDENT as 
(
  SELECT s.STUDENT_ID, 
         s.FIRST_NAME, 
         s.LAST_NAME,
         (SELECT COUNT(*) FROM ENROLLMENT e WHERE (e.STUDENT_ID = s.STUDENT_ID))
         AS SECTIONS_ENROLLED
  FROM STUDENT s
  WHERE 
  (
    SELECT COUNT(*) FROM ENROLLMENT e WHERE (e.STUDENT_ID = s.STUDENT_ID)
  ) > 2
);
SELECT * FROM BUSY_STUDENT;

/*
Create a VIEW named JUN_JUL_SCHEDULE that shows every scheduled section for 
the month of June and July. The VIEW should include Course Description, 
Section ID, Section Number, Start Date Time (formatted to display the date 
and time), Location, Instructor’s Name (First Name, LAST NAME). 
Use appropriate column alias.
*/
CREATE OR REPLACE VIEW JUN_JUL_SCHEDULE AS
(
  SELECT c.DESCRIPTION,
         s.SECTION_ID, 
         s.SECTION_NO, 
         s.START_DATE_TIME,
         s.LOCATION, i.FIRST_NAME, i.LAST_NAME
         FROM SECTION s
         INNER JOIN COURSE c ON (c.COURSE_NO = s.COURSE_NO)
         INNER JOIN INSTRUCTOR i ON (i.INSTRUCTOR_ID = s.INSTRUCTOR_ID)
         WHERE EXTRACT(MONTH FROM s.START_DATE_TIME) in (6, 7)
);
SELECT * FROM JUN_JUL_SCHEDULE;