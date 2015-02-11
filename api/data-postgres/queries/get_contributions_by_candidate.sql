SELECT
	contribution_id,
	name,
    amount,
    city
FROM contributions
INNER JOIN candidates
ON contributions.committee_id = candidates.committee_id
%s%s;