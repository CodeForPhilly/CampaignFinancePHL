require 'csv'
require 'pg'
require_relative './sql-strings'
require_relative './file-processors.rb'

# Get existing committees for foreign key constraints
conn = PG.connect( dbname: 'open_disclosure_philly' )
committeesResults = conn.exec( "SELECT committee_id, name FROM committees" )
committees = []
# Convert from PG::result to array of hashes so we can append to it
committeesResults.each {|x| committees.push(x)}

contribs_sql = ''
expenses_sql = ''
receipts_sql = ''

Dir.glob("raw-data/**/*") do |x|
	if File.file?(x)
    #if x.split('/').count == 4
  		if x.include?('contrib')
  			OpdDataProcessor::process_file(x, committees, contribs_sql, conn)
      elsif x.include?('expense')
        OpdDataProcessor::process_file(x, committees, expenses_sql, conn)
      elsif x.include?('receipt')
        OpdDataProcessor::process_file(x, committees, receipts_sql, conn)
  		end
    #else
      #puts "ERROR **** Bad path structure for #{x}"
    #end
	end
end

sql_file = File.new("raw-data/inserts.sql", 'w')
sql_file.puts("INSERT INTO contributions ( %s ) VALUES " % [OpdDataProcessor::CONTRIBUTIONS_COLS])
sql_file.puts(contribs_sql[0...-2] + ';')

sql_file.puts("\nINSERT INTO expenses ( %s ) VALUES " % [OpdDataProcessor::EXPENSES_COLS])
sql_file.puts(expenses_sql[0...-2] + ';')

sql_file.puts("\nINSERT INTO receipts ( %s ) VALUES " % [OpdDataProcessor::RECEIPTS_COLS])
sql_file.puts(receipts_sql[0...-2] + ';')
sql_file.close()


