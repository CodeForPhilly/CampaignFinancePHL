#!/usr/bin/env ruby

require 'pg'

conn = PG.connect( dbname: 'open_disclosure_philly' )
result = conn.exec( "SELECT committee_id, name FROM committees" ).values

newCommittees = []

reportedBy = 'Nutter for Mayo'
committee_id = 0

matchrow = result.find {|x| x['name'] == reportedBy}

if matchrow
	committee_id = matchrow['committee_id'].to_i
else
	# new committee
	new_id = conn.exec("INSERT INTO committees (name) VALUES ('%s') RETURNING committee_id" % [reportedBy])
	puts new_id
end

puts 'I''m done'
# conn.exec( "SELECT committee_id, name FROM committees" ) do |result|
#   puts result.count
#   puts result[0]
# end