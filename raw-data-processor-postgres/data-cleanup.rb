require 'pg'
require_relative './sql-strings'

# Find records with city names like "%phila%" and rename to Philadelphia
conn = PG.connect( dbname: 'campaign_finance_phl' )
update_city_sql = "UPDATE contributions SET city = 'Philadelphia' WHERE lower(city) LIKE '%phila%';"
contribCitiesUpdated = conn.exec( update_city_sql )


# Identify self-funded contributions
candidate_self_funding = conn.exec("SELECT candidate_id, 



conn.close()
