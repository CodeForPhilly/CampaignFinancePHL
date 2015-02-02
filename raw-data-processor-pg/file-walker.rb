require 'csv'

sqlFile = File.new("../contrib-inserts.sql", 'w')
sqlFile.puts("INSERT INTO contributions (
	col0,
  year,
  cycle,
  schedule,
  name,
  address1,
  address2,
  city,
  state,
  zip,
  profession,
  employer,
  employerAddress1,
  employerAddress2,
  employerCity,
  employerState,
  employerZip,
  date,
  amount,
  col19,
  col20,
  col21,
  col22,
  description,
  reportedBy)
VALUES")

Dir.glob("**/*") do |x| 
	if File.file?(x)
		#if x.split('/').count == 4 and x.include?('contrib')
		if x.include?('contrib')
			puts "Processing #{x}"
			CSV.foreach(x) do |row|
				# Insert append to bulk insert file
				# first replace single quotes and wrap in sinqle quotes
				#puts row.join(',')
				#row.map! {|item| (item or "").to_s.sub!("'", "''")}
				row.map! {|item| "'#{(item or '').gsub("'", "''")}'"}
				reportedBy = "'" + x.split('/')[-3].gsub("'", "''") + "'"
				sqlFile.puts('(' + row.join(',') + ', ' + reportedBy +  '),')
			end

		else
			puts "Bad directory structure: #{x}"
		end

	end
end

sqlFile.close()