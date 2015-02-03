module OpdDataProcessor
  
  def OpdDataProcessor.process_file(file, existing_committees, sql_string, connection)
    puts "Processing #{file}"
    CSV.foreach(file) do |row|
      # Escape quotes for SQL insert
      row.map! {|item| "'#{(item or '').gsub("'", "''")}'"}
      # Get "Reported By" from directory structure
      # (So unfortunately dependent on running from root of text file directory!)
      reportedBy = (file.split('/')[-3].gsub("'", "''"))
      row.push("'" + reportedBy + "'")
      # Committee foreign key:
      # If committee already exists, use its ID
      # Otherwise, insert it into the committees table and use that new ID
      committee_id = 0
      matchrow = existing_committees.find do |x|
        x['name'].downcase == reportedBy.downcase
      end

      if matchrow
        committee_id = matchrow['committee_id'].to_i
      else
        # new committee
        new_id = connection.exec("INSERT INTO committees (name) VALUES ('%s') RETURNING committee_id" % [reportedBy])
        committee_id = new_id[0]['committee_id']
        # Add to our in-memory collection too
        existing_committees.push({'committee_id' => committee_id, 'name' => reportedBy})
      end
      row.push(committee_id)
      sql_string << '(' + row.join(',') + "),\n"
    end
  end
  
end
