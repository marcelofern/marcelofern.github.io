/* List all the courses and the sections scheduled for each course.
The result should include course number, course description, section
number section start date and location. Ensure to display every (all) course,
even if there are no scheduled sections */

SELECT c.COURSE_NO, c.DESCRIPTION, s.SECTION_NO, s.START_DATE_TIME, s.LOCATION
FROM COURSE c
LEFT OUTER JOIN SECTION s ON (c.COURSE_NO = s.COURSE_NO);

/* List the description, section number and location of all the courses 
with course number 350 as the prerequisite. The result should include all
the courses (even if there are no scheduled sections) */

SELECT c.COURSE_NO, c.PREREQUISITE, s.SECTION_NO, s.LOCATION
FROM COURSE c
LEFT OUTER JOIN SECTION s ON (c.COURSE_NO = s.COURSE_NO)
WHERE (c.PREREQUISITE = 350);

/* List the student ID, First Name, Last Name, Section ID,
Enrol Date for all students. The results should include
all/every student even if they are not enrolled on any
sections. Sort the results by their enrollment date. */

SELECT s.STUDENT_ID, s.FIRST_NAME, s.LAST_NAME, e.SECTION_ID, e.ENROLL_DATE
FROM Student s
LEFT OUTER JOIN ENROLLMENT e ON (s.STUDENT_ID = e.STUDENT_ID);

/* For students with student ID 102 and 301, display/list the sections
they are enrolled in.Also show the grades and grade type they received,
regardless whether they are enrolled or received grades. (The result set
should display Student ID, First Name, Last
Name, Section ID, Grade Type Code and Numeric Grade.). */

SELECT s.STUDENT_ID,
       s.FIRST_NAME,
       s.LAST_NAME,
       e.SECTION_ID,
       g.GRADE_TYPE_CODE,
       g.NUMERIC_GRADE
FROM STUDENT s
LEFT OUTER JOIN ENROLLMENT e ON (e.STUDENT_ID = s.STUDENT_ID)
LEFT OUTER JOIN GRADE g ON (s.STUDENT_ID = g.STUDENT_ID AND e.SECTION_ID = g.SECTION_ID)
WHERE s.STUDENT_ID IN (102, 301);

/* List the student id and section number of students who enrolled 
in classes held in L210.The result should display student id, 
section number and start date and should include all
sections in L210 even if there are no students. */

SELECT e.STUDENT_ID, s.SECTION_NO, s.START_DATE_TIME, s.LOCATION
FROM Section s
LEFT OUTER JOIN ENROLLMENT e ON (e.SECTION_ID = s.SECTION_ID)
WHERE s.LOCATION = 'L210';

/* List/display the course number, description, cost, section id, section 
number, section start date, class location and instructors’ last name 
for all the courses. The result should
include courses where no section or instructors have been assigned and all the
instructors even if they have no sections assigned. */

SELECT c.COURSE_NO,
       c.DESCRIPTION,
       c.COST, s.SECTION_ID,
       s.SECTION_NO,
       s.START_DATE_TIME,
       s.LOCATION,
       i.LAST_NAME
FROM COURSE c
LEFT OUTER JOIN SECTION s ON (s.COURSE_NO = c.COURSE_NO)
FULL OUTER JOIN INSTRUCTOR i ON (i.INSTRUCTOR_ID = s.INSTRUCTOR_ID);