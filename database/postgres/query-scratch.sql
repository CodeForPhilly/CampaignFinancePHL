select c.first_name, c.last_name, c.image_url, total_raised, number_of_contributions
from candidates c
inner join 	

(SELECT c.committee_id, sum(amount) as total_raised, count(1) as number_of_contributions
FROM candidates c
INNER JOIN
  (SELECT amount,
          committee_id
   FROM contributions
   UNION ALL SELECT amount,
                    committee_id
   FROM receipts) sub
ON c.committee_id = sub.committee_id
GROUP BY c.committee_id) tr

on c.committee_id = tr.committee_id