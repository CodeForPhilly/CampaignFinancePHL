-- select * from (
-- 	select 
-- 	sum(amount) as totalRaised,
-- 	cand.committee_id 
-- 	from 
-- 	candidates cand join committees com 
-- 	on cand.committee_id = com.committee_id 
-- 	join contributions cont 
-- 	on com.committee_id = cont.committee_id
-- 	where last_name = 'Nutter'
-- 	group by cand.committee_id) sub 

-- join candidates on sub.committee_id = candidates.committee_id

select sum(amount) from (
	select sum(amount) as amount from contributions where committee_id = 229 and cycle = 6
	union
	select sum(amount) as amount from receipts where committee_id = 229 and cycle = 6
) sub