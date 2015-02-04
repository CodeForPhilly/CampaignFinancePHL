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
--  join candidates on sub.committee_id = candidates.committee_id
 select sum(amount) from (
	select sum(amount) as amount from contributions where committee_id = 230
	union
	select sum(amount) as amount from receipts where committee_id = 230
) sub

-- SELECT first_name,
--        last_name,
--        image_url,
--        total_raised
-- FROM candidates c1
-- INNER JOIN
--   (SELECT committee_id,
--           sum(amount) AS total_raised
--    FROM
--      (SELECT c2.committee_id,
--              amount
--       FROM candidates c2
--       INNER JOIN contributions ON c2.committee_id = contributions.committee_id
--       UNION SELECT c2.committee_id,
--                    amount
--       FROM candidates c2
--       INNER JOIN receipts ON c2.committee_id = receipts.committee_id) income
--    GROUP BY committee_id) sums ON c1.committee_id = sums.committee_id 