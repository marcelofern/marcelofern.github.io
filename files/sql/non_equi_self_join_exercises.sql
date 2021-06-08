/* For every student list their Mid Term Grade (numeric grade and 
Letter grade). The result should display Student ID, Section ID, 
Grade Type Code, Grade Code Occurrence,Numeric Grade, and Letter Grade for
every student (only their Mid Term Grade, Grade
Type Code is ‘MT’). Order the results by Student ID and then by Section ID. */

SELECT STUDENT_ID, SECTION_ID, GRADE_TYPE_CODE, GRADE_CODE_OCCURRENCE,NUMERIC_GRADE, LETTER_GRADE
FROM GRADE JOIN GRADE_CONVERSION
ON (NUMERIC_GRADE BETWEEN MIN_GRADE AND MAX_GRADE)
WHERE GRADE_TYPE_CODE  = 'MT'
ORDER BY STUDENT_ID, SECTION_ID;

/* Repeat the question 1, displaying Student ID, First Name, Last Name, 
Address (StreetAddress, City, State, and Zip), Numeric Grade, 
Letter Grade (only their Mid Term grade,Grade Type Code is ‘MT’) 
for those students who are from New Jersey (‘NJ’).
*/
SELECT s.STUDENT_ID, 
       s.FIRST_NAME,
       s.LAST_NAME,
       e.SECTION_ID, 
       g.GRADE_TYPE_CODE, 
       g.GRADE_CODE_OCCURRENCE, 
       g.NUMERIC_GRADE, 
       gc.LETTER_GRADE,
       z.STATE
FROM STUDENT s
LEFT OUTER JOIN Enrollment e ON (e.STUDENT_ID = s.STUDENT_ID)
LEFT OUTER JOIN Grade g ON (g.SECTION_ID = e.SECTION_ID)
LEFT OUTER JOIN GRADE_CONVERSION gc ON (g.NUMERIC_GRADE BETWEEN gc.MIN_GRADE AND gc.MAX_GRADE)
LEFT OUTER JOIN ZIPCODE z ON (z.ZIP = s.ZIP)
WHERE (g.GRADE_TYPE_CODE = 'MT') AND (z.STATE = 'NJ')
ORDER BY g.NUMERIC_GRADE;

/* Display the Course Number, Course Description, Prerequisite, and Prerequisite
Description for every course. Use appropriate column alias */
SELECT c.COURSE_NO as COURSE_NO,
       c.DESCRIPTION as COURSE_DESCRIPTION,
       p.COURSE_NO as PREREQUESITE_NO, 
       p.DESCRIPTION as PREREQUESITE_DESCRIPTION
FROM COURSE c
INNER JOIN COURSE p ON (c.PREREQUISITE = p.COURSE_NO);

/* Repeat the Question above (Display the Course Number, Course Description,
Prerequisite,and Prerequisite Description for every course. Use appropriate 
column alias.), also include the courses even if they don’t have 
any prerequisite. */
SELECT c.COURSE_NO as COURSE_NO,
       c.DESCRIPTION as COURSE_DESCRIPTION,
       p.COURSE_NO as PREREQUESITE_NO, 
       p.DESCRIPTION as PREREQUESITE_DESCRIPTION
FROM COURSE c
LEFT OUTER JOIN COURSE p ON (c.PREREQUISITE = p.COURSE_NO);

/* Display the Student ID, First Name, Last Name, Street Address, 
City, State and Zip of students living at the same Street Address and Zip */

SELECT f.STUDENT_ID, f.FIRST_NAME, f.LAST_NAME, 
       s.STUDENT_ID, s.FIRST_NAME, s.LAST_NAME,
       f.STREET_ADDRESS, f.ZIP,
       s.STREET_ADDRESS, s.ZIP,
       z.STATE, z.CITY
FROM STUDENT f
INNER JOIN STUDENT s ON (f.STREET_ADDRESS = s.STREET_ADDRESS)
INNER JOIN ZIPCODE z ON (f.ZIP = z.ZIP)
WHERE (f.STUDENT_ID != s.STUDENT_ID);

/* . For section id 86, determine which student/s received 
a lower grade on their final (Grade
Type Code ‘FI’) than on their midterm (Grade Type Code ‘MT’). 
The result should include the student id, grade for midterm (numeric grade), 
grade for final (numeric grade). Use appropriate column headings 
(column ALIAS). */

SELECT mg.STUDENT_ID,
       mg.NUMERIC_GRADE as MIDTERM_GRADE,
       fg.NUMERIC_GRADE as FINALS_GRADE,
       mg.SECTION_ID, fg.SECTION_ID
FROM GRADE mg
JOIN GRADE fg ON (fg.SECTION_ID = mg.SECTION_ID AND fg.STUDENT_ID = mg.STUDENT_ID)
WHERE mg.GRADE_TYPE_CODE = 'MT' AND fg.GRADE_TYPE_CODE = 'FI' 
AND (fg.NUMERIC_GRADE < mg.NUMERIC_GRADE) AND mg.SECTION_ID=86
ORDER BY fg.NUMERIC_GRADE ASC;

/* Identify and display any existing the room booking
conflicts (determine whether any sections are
scheduled at the same date, time, and location).
Display the Section ID, Start Date, and Location. */

SELECT s.SECTION_ID, s.LOCATION, s.START_DATE_TIME,
       cs.SECTION_ID, cs.LOCATION, cs.START_DATE_TIME
FROM SECTION s
INNER JOIN SECTION cs ON (cs.LOCATION = s.LOCATION AND s.START_DATE_TIME = cs.START_DATE_TIME)
WHERE (cs.SECTION_ID != s.SECTION_ID);

/* Identify and display any scheduling conflict for instructors: 
Are there any instructors scheduled to teach more than one sections 
on the same date and time? Display Instructor ID, Section ID, Start Date, 
and Location. Order the results by Instructor ID and
Section ID. */

SELECT i.INSTRUCTOR_ID, s.SECTION_ID, s.START_DATE_TIME, s.LOCATION,
       cs.SECTION_ID, cs.START_DATE_TIME, cs.LOCATION
FROM SECTION s
INNER JOIN INSTRUCTOR i ON (i.INSTRUCTOR_ID = s.INSTRUCTOR_ID)
INNER JOIN SECTION cs ON (cs.INSTRUCTOR_ID = s.INSTRUCTOR_ID AND cs.START_DATE_TIME = s.START_DATE_TIME)
WHERE (s.SECTION_ID != cs.SECTION_ID)
ORDER BY i.INSTRUCTOR_ID, s.SECTION_ID;