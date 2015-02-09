CREATE OR REPLACE FUNCTION get_candidate(id integer) RETURNS setof candidates AS $$
BEGIN
    RETURN QUERY SELECT * FROM candidates WHERE candidate_id = (quote_literal(id) as integer);
END;
$$ LANGUAGE plpgsql;