SELECT c.candidate_id, c.committee_id, contrib_amount, expense_amount
FROM candidates c
INNER JOIN

(SELECT cont.committee_id, contrib_amount, expense_amount
FROM
  (SELECT committee_id, sum(amount) AS contrib_amount
   FROM contributions
   GROUP BY committee_id) cont
LEFT JOIN
  (SELECT committee_id, sum(amount) AS expense_amount
   FROM expenses
   GROUP BY committee_id) exp
   on cont.committee_id = exp.committee_id) sums

ON c.committee_id = sums.committee_id
WHERE c.candidate_id = $1