/*
List the first name and last name of the instructors
who have at least 6 characters in their last name. 
*/
SELECT FIRST_NAME, LAST_NAME
FROM INSTRUCTOR
WHERE LENGTH(LAST_NAME) > 5;

/*
List the name of the students living in the zip 
code 07047 in the format given below.
LAST NAME, First Name. i.e. the Last name in 
UPPER case, followed by a comma, and
space, followed by the first name with the initial letter in 
Upper case) all in one column,
use appropriate column alias. 
Sort (Order) the results by the last name
*/
SELECT CONCAT(CONCAT(UPPER(LAST_NAME), ', '), INITCAP(FIRST_NAME)) as NAME
FROM STUDENT
WHERE ZIP = 007047
ORDER BY LAST_NAME;

/*
List the course number and description of all courses which 
has ‘IN’ in the description.
The query should ignore the case using an appropriate function, 
i.e. the course should
be listed if the name contains IN, in or In.
*/
SELECT COURSE_NO, DESCRIPTION
FROM COURSE
WHERE INSTR(UPPER(DESCRIPTION), 'IN') > 0;

/*
Find and display the area codes from the student 
phone number. The area code is made
of the digits before the first occurrence on ‘-‘, 
use appropriate function to calculate the
length of the substring. Display the area code once (avoid duplication). 
*/

SELECT DISTINCT LPAD(PHONE, INSTR(PHONE, '-') - 1) as AREA_CODE
FROM STUDENT;

/*
List the course number, description and prerequisite for all courses 
which cost 1195. If the Prerequisite is NULL, display ‘Foundation Level’, 
use column alias to label the prerequisite as Entry Criteria
*/
SELECT COURSE_NO, DESCRIPTION, NVL(TO_CHAR(PREREQUISITE), 'FOUNDATION LEVEL')
FROM COURSE
WHERE COST = '1195';

/*
What is the date six months from 2nd December 2020 in the format 02/Dec/2019? 
*/
SELECT TO_CHAR(ADD_MONTHS('02-Dec-2020', 6), 'dd/Mon/yyyy')
FROM DUAL;

/*
Calculate the Age of a person who born on 17th January 1993.
*/
SELECT EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM DATE '1993-01-17')
FROM DUAL;

/*
Display the student id, last name, and registration date
including the time (use an appropriate format), of every student
who registered on 22-JAN-07. 
*/
SELECT STUDENT_ID, LAST_NAME, TO_CHAR(REGISTRATION_DATE, 'DD-Mon-YYYY HH24:MI:SS')
FROM STUDENT
WHERE REGISTRATION_DATE = '22-JAN-07';

/*
Display the student id, last name, registration date including the time 
(use an appropriate format), section id, and enrolment date including the
time (use an appropriate format), of every student who enrolled on 30-JAN-07.).
*/
SELECT student.STUDENT_ID, LAST_NAME, 
       TO_CHAR(REGISTRATION_DATE, 'DD-MON-YYYY HH24:MI:SS') REG_DATE_TIME, 
       TO_CHAR(enroll_DATE, 'DD-MON-YYYY HH24:MI:SS') enrol_DATE_TIME
FROM STUDENT, enrollment
WHERE student.student_id = enrollment.student_id
AND TO_CHAR(enroll_DATE, 'DD-MON-YYYY') = '30-JAN-2007';

/*
 Find how many courses are there in the database which does 
 not have a prerequisite?
 */
 SELECT COUNT(*)
 FROM COURSE
 WHERE PREREQUISITE IS NULL;
 
 /*
 Find how many students are enrolled for courses? Count each student only once 
 irrespective of the number of courses they enrolled on.
 */
 SELECT COUNT(DISTINCT STUDENT_ID)
 FROM ENROLLMENT;
 
 /*
 Find how many instructors are living in the zip code 10015
 */
 SELECT COUNT(*)
 FROM INSTRUCTOR
 WHERE ZIP = 10015;
 
 /*
 Find the average cost for all courses, round the result to 2 decimal places.
 */
 SELECT ROUND(AVG(COST), 2)
 FROM COURSE;
 
 /*
 Find the most recent (latest) enrolment date in the default (DD-MON-YY) format.
 */
 SELECT ENROLL_DATE
 FROM ENROLLMENT
 ORDER BY ENROLL_DATE DESC;
 
 /*
 Find the highest and lowest numeric grade awarded to
 the students for the section ID 87.
 */
 SELECT MAX(NUMERIC_GRADE), MIN(NUMERIC_GRADE)
 FROM GRADE
 WHERE SECTION_ID=87;
 
 /*
 List each student (student id, last name - the result must display ID and 
 last name) and the number of sections each student enrolled for. 
 Use appropriate sorting
 */
 SELECT s.STUDENT_ID, s.LAST_NAME, COUNT(DISTINCT e.SECTION_ID) as TOTAL
 FROM STUDENT s
 INNER JOIN ENROLLMENT e ON (e.student_id = s.student_id)
 GROUP BY s.STUDENT_ID, s.LAST_NAME
 ORDER BY TOTAL DESC;
 
 /*
Which Course is assigned the most as a prerequisite 
(give the course number of the prerequisite)?
 */
 
SELECT c.COURSE_NO, COUNT(p.COURSE_NO) as TOTAL
FROM COURSE c
LEFT OUTER JOIN COURSE p ON (c.COURSE_NO = p.PREREQUISITE)
GROUP BY c.COURSE_NO
ORDER BY TOTAL;
 
 /*
 How many courses are there with no Prerequisite?
 */
SELECT COUNT(c.COURSE_NO)
FROM COURSE c
WHERE c.PREREQUISITE IS NULL;

/*
Find the highest Mid Term (Grade Type Code – MT) grade
achieved for each section.
*/
SELECT SECTION_ID, MAX(NUMERIC_GRADE) MAX_GRADE
FROM GRADE
WHERE GRADE_TYPE_CODE = 'MT'
GROUP BY SECTION_ID
ORDER BY MAX_GRADE;

/*
Find the number of sections assigned to each instructor. List the
last name of the instructor, number of sections assigned to them.
Display the result only if the instructor has at least 10
sections assigned to them
*/
SELECT i.LAST_NAME, COUNT(se.SECTION_ID) as SECTION_TOTAL
FROM INSTRUCTOR i
INNER JOIN SECTION se ON (i.INSTRUCTOR_ID = se.INSTRUCTOR_ID)
GROUP BY i.LAST_NAME
HAVING COUNT(se.SECTION_ID) > 9;

/*
Count the number students living in each city in the state of New York 
(State – NY). Display the city name and the count, only display the city 
and the count if there are at least 5 students living in the city. Order 
the results by the count and City name.
*/

SELECT z.CITY, COUNT(s.student_id) TOTAL_STUDENTS
FROM ZIPCODE z
INNER JOIN STUDENT s ON (s.ZIP = z.ZIP)
WHERE z.STATE = 'NY'
GROUP BY z.CITY
HAVING COUNT(s.student_id) > 4
ORDER BY TOTAL_STUDENTS DESC, z.CITY;