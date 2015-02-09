WITH in_philly AS
  ( SELECT count(1) as contrib_count
   FROM contributions
   WHERE city = 'Philadelphia'
   AND committee_id = $1),
 	total AS
  ( SELECT count(1) as contrib_count
   FROM contributions
   WHERE committee_id = $1)
SELECT contrib_count, 'Philadelphia' as city
FROM in_philly
UNION ALL
SELECT contrib_count, 'all' as city
FROM total;