/* 1) List the details of equipment and associated software */
SELECT e.id as EQUIPMENT_ID,
       em.NAME as EQUIPMENT_MODEL_NAME,
       em.RELEASE_DATE as EQUIPMENT_RELEASE_DATE,
       et.NAME as EQUIPMENT_TYPE,
       emake.NAME as EQUIPMENT_MAKE,
       s.name as SOFTWARE_NAME,
       sv.name as SOFTWARE_VERSION_NAME,
       sv.RELEASE_DATE as SOFTWARE_RELEASE_DATE
FROM equipment e
INNER JOIN equipment_model em ON (e.equipment_model_id = em.id)
INNER JOIN equipment_type et ON (em.equipment_type_id = et.id)
INNER JOIN equipment_make emake ON (em.equipment_make_id = emake.id)
LEFT OUTER JOIN equipment_software es ON (e.id = es.equipment_id)
LEFT OUTER JOIN software_version sv ON (sv.id = es.SOFTWARE_VERSION_ID)
LEFT OUTER JOIN software s ON (s.id = sv.SOFTWARE_ID);

 /*
  2) Produce a list of experts (support staff) for a given problem area.

  First call "SELECT * FROM PROBLEM_TYPE" to know the available
  problem areas, then call the query below to find specialists
  for a given problem area.
*/
SELECT s.id as STAFF_ID,
       s.FIRST_NAME as FIRST_NAME,
       s.LAST_NAME as LAST_NAME,
       r.NAME as ROLE,
       pt.NAME as PROBLEM_TYPE_SPECIALISATION
FROM staff s
INNER JOIN staff_role r ON (r.id = s.staff_role_id)
INNER JOIN problem_type_specialist pts ON (pts.staff_id = s.id)
INNER JOIN problem_type pt ON (pts.problem_type_id = pt.id)
WHERE pt.NAME = '&PROBLEM_TYPE_NAME';

/*
  3) Produce a list of all unresolved problems
  with the assigned Specialist
*/
SELECT p.id as PROBLEM_ID,
       p.description as PROBLEM_DESCRIPTION,
       pt.name as PROBLEM_TYPE_NAME,
       s.first_name || ' ' || s.last_name as STAFF_FULL_NAME,
       ps.name AS PROBLEM_STATUS_NAME
FROM problem p
INNER JOIN problem_type pt ON (pt.id = p.problem_type_id)
INNER JOIN problem_status ps ON (ps.id = p.problem_status_id)
INNER JOIN problem_assignment pa ON (pa.problem_id = p.id)
LEFT OUTER JOIN staff s ON (pa.staff_id = s.id)
WHERE ps.name != 'RESOLVED';

/*
  4) Produce a list of problems reported by a member of staff,
  the details of the support staff who attended the
  problem and the solution provided by the support staff

  Note the question is unclear as to whether problems without a solution
  should be displayed. The query below excludes problems without a solution.
*/
SELECT c.id as CALL_ID,
       clr.first_name || ' ' || clr.last_name as CALLER_NAME,
       c_s.first_name || ' ' || c_s.last_name as CALL_OPERATOR_NAME,
       p.description as PROBLEM_DESCRIPTION,
       p_s.first_name || ' ' || p_s.last_name as PROBLEM_ASSIGNEE,
       ps.description as PROBLEM_SOLUTION
FROM call c
INNER JOIN caller clr ON (clr.id = c.caller_id)
INNER JOIN staff c_s ON (c_s.id = c.staff_id)
INNER JOIN problem_call pc ON (pc.call_id = c.id)
INNER JOIN problem p ON (p.id = pc.problem_id)
INNER JOIN problem_assignment pa ON (pa.problem_id = p.id)
INNER JOIN staff p_s ON (pa.staff_id = p_s.id)
INNER JOIN problem_solution ps ON (ps.problem_id = p.id);

/*
  5) Find (display) the average time taken to fix a fault for a 
  given problem area.

  Note that I am counting the time the problem was created rather than
  the time the call was picked up. Therefore this is more a measurement
  of how the help desk department performs to solve a problem once this problem
  is categorised rather than how much time operators spend on the line
  clarifying a problem until the problem is solved. If we are interested
  in the later, it is better to separate the concerns and do a query
  measuring the lenght of calls for a certain problem type instead.
*/
SELECT pt.NAME as PROBLEM_TYPE_NAME,
       AVG(extract(day from (ps.datetime_created-p.datetime_created))*24*60
        + extract(hour from (ps.datetime_created-p.datetime_created))*60
        + extract(minute from (ps.datetime_created-p.datetime_created)))
       as AVERAGE_TIME_SPENT_MINUTES
FROM problem_type pt
LEFT OUTER JOIN problem p ON (p.problem_type_id = pt.id)
LEFT OUTER JOIN problem_solution ps ON (ps.problem_id = p.id)
GROUP BY pt.NAME
ORDER BY pt.NAME;

/*
 6) Display a list of the most common problems and order them in according
 to the frequency of their occurrence. 
*/
SELECT pt.NAME as PROBLEM_TYPE_NAME,
       COUNT(p.id) as OCCURRENCES
FROM problem_type pt
LEFT OUTER JOIN problem p ON (p.problem_type_id = pt.id)
GROUP BY pt.NAME
ORDER BY COUNT(p.id) DESC;

/*
 7) Display the equipment with the most reported problems showing
 problem details.

 Note: equipment details aren't asked, so only the equipment id
 is displayed on the resulting query.
*/
SELECT p.description, p.equipment_id
FROM problem p
WHERE p.equipment_id = (
    SELECT EQUIPMENT_ID FROM (
        SELECT p.equipment_id AS EQUIPMENT_ID, COUNT(p.equipment_id) as COUNTER
        FROM problem p
        GROUP BY p.equipment_id
        ORDER BY COUNTER DESC
        FETCH FIRST 1 ROWS ONLY
    )
);

/*
 8) Produce a list of problems that have been solved by a helpdesk operator
*/
SELECT p.id,
       p.description as PROBLEM_DESCRIPTION,
       ps.description as SOLUTION_DESCRIPTION,
       sr.name as ROLE,
       s.first_name || ' ' || s.last_name as STAFF_NAME
FROM problem p
INNER JOIN problem_assignment pa ON (pa.problem_id = p.id)
INNER JOIN staff s ON (pa.staff_id = s.id)
INNER JOIN problem_solution ps ON (ps.problem_id = p.id)
INNER JOIN staff_role sr ON (sr.id = s.staff_role_id)
WHERE sr.NAME = 'OPERATOR';

/*
 9) Add a new Specialist to the database
*/
INSERT INTO STAFF VALUES (
 STAFF_ID_SEQ.NEXTVAL, 'James', 'Smith',
 (SELECT sr.id FROM staff_role sr WHERE sr.NAME = 'SPECIALIST')
);
INSERT INTO PROBLEM_TYPE_SPECIALIST VALUES (
 PROBLEM_TYPE_SPECIALIST_ID_SEQ.NEXTVAL,
 (SELECT id FROM problem_type WHERE name = 'CHARGER MALFUNCTION'),
 (SELECT id FROM staff ORDER BY id DESC FETCH FIRST 1 ROWS ONLY)
);
COMMIT;

/*
 10) Assign a specialist to a given problem (it must be an unresolved,
unassigned and should find a matching Specialist)
*/
INSERT INTO PROBLEM_ASSIGNMENT VALUES (
 PROBLEM_ASSIGNMENT_ID_SEQ.NEXTVAL,
 (
    /* oldest unassigned problem */
    SELECT p.id
    FROM problem p
    INNER JOIN problem_status ps ON (p.problem_status_id = ps.id)
    LEFT OUTER JOIN problem_solution psol ON (psol.problem_id = p.id)
    WHERE ps.name = 'UNASSIGNED' AND psol.id IS NULL
    ORDER BY p.datetime_created FETCH FIRST 1 ROWS ONLY
 ),
 (
    /* least busy specialist in the area */
    SELECT s.id
    FROM staff s
    INNER JOIN problem_type_specialist pts ON (pts.staff_id = s.id)
    LEFT OUTER JOIN problem_assignment pa ON (pa.staff_id = s.id)
    WHERE pts.problem_type_id = (
        SELECT p.problem_type_id
        FROM problem p
        INNER JOIN problem_status ps ON (p.problem_status_id = ps.id)
        LEFT OUTER JOIN problem_solution psol ON (psol.problem_id = p.id)
        WHERE (ps.name = 'UNASSIGNED' AND psol.id IS NULL)
        FETCH FIRST 1 ROWS ONLY
    )
    GROUP BY s.id
    ORDER BY COUNT(pa.id) FETCH FIRST 1 ROWS ONLY
 ),
 TO_CHAR(sysdate,'DD-MON-YYYY HH:MI:SS AM')
);
/* make sure the problem status is now ASSIGNED */
UPDATE problem
SET problem_status_id = (SELECT id FROM problem_status WHERE name = 'ASSIGNED')
WHERE problem.id = (
    /* oldest unassigned problem */
    SELECT p.id
    FROM problem p
    INNER JOIN problem_status ps ON (p.problem_status_id = ps.id)
    LEFT OUTER JOIN problem_solution psol ON (psol.problem_id = p.id)
    WHERE ps.name = 'UNASSIGNED' AND psol.id IS NULL
    ORDER BY p.datetime_created FETCH FIRST 1 ROWS ONLY
);
COMMIT;

/*
 11) Update the Call-log with appropriate details when
 the problem has been resolved.
*/
INSERT INTO PROBLEM_SOLUTION VALUES (
  PROBLEM_SOLUTION_ID_SEQ.NEXTVAL,
/* oldest assigned and unresolve problem */
  (SELECT p.id
   FROM problem p
   INNER JOIN problem_status ps on (ps.id = p.problem_status_id)
   WHERE ps.name NOT IN ('UNASSIGNED', 'RESOLVED')
   ORDER BY p.datetime_created FETCH FIRST 1 ROWS ONLY
  ),
  'The battery was replaced and worked',
   TO_CHAR(sysdate,'DD-MON-YYYY HH:MI:SS AM')
);
UPDATE problem
SET problem_status_id = (SELECT id FROM problem_status WHERE name = 'RESOLVED')
WHERE problem.id = (
 /* Latest problem solution */
 SELECT ps.problem_id
 FROM problem_solution ps
 ORDER BY ps.datetime_created DESC FETCH FIRST 1 ROWS ONLY
);
COMMIT;

/*
  12) An item of Equipment which, has previously had a fault reported, has
  now become redundant so Delete it from the database. 
*/
DELETE FROM equipment
WHERE id = (
  SELECT e.id FROM equipment e
  INNER JOIN problem p ON (e.id = p.equipment_id)
  ORDER BY id FETCH FIRST 1 ROWS ONLY
);
COMMIT;
