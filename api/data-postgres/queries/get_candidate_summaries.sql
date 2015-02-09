select c.candidate_id,  c.first_name, c.last_name, total_raised, number_of_contributions, philly_contributions, self_funded
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

inner join

(SELECT contrib.committee_id, count(1) as philly_contributions
	FROM contributions contrib
	WHERE contrib.city = 'Philadelphia'
	GROUP BY contrib.committee_id) philly_contrib
on c.committee_id = philly_contrib.committee_id

left join

(select candidate_id, sum(amount) as self_funded from 
	(SELECT candidate_id, string_agg(name, ',') as sf_name_array  FROM self_funded_names sf GROUP BY candidate_id) sf_names
	INNER JOIN contributions cont
	ON (cont.name IN (sf_names.sf_name_array))
	GROUP BY candidate_id) sf_amounts
	
on sf_amounts.candidate_id = c.candidate_id