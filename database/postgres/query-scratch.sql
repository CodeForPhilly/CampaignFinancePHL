select candidate_id, sum(amount) from 
	(SELECT candidate_id, string_agg(name, ',') as sf_name_array  FROM self_funded_names sf GROUP BY candidate_id) sf_names
	INNER JOIN contributions cont
	ON (cont.name IN (sf_names.sf_name_array))
	GROUP BY candidate_id