#Campaign Finance PHL#

A project to improve access to/report on/organize Philadelphia's public campaign finance data.

Based on <a href='http://opendisclosure.io' target='_blank'>Open Disclosure Oakland</a>, but currently not using any code directly.

Grabbing Philly campaign finance data from the city's ftp store `ftp://ftp.phila-records.com/`. Also check out the <a href='http://www.phila.gov/ethicsboard/campaignfinance/Pages/default.aspx' target='_blank'>Board of Ethics page</a> and the <a href='http://www.phila.gov/records/campaignfinance/CampaignFinance.html' target='_blank'>Reports page</a>.

###Project Status/TODO:###

- [ ] Parse raw data and get it into a database
	- [x] Get a sample contrib.txt file into a DB
	- [ ] Do it for other types (expenses, receipts) and committees
- [ ] Create a REST api to access the data. Something like:
	- [ ] /candidates
	- [ ] /committees
	- [ ] /contributions
- [ ] Create a frontend to report on data, including
	- [ ] Totals by candidate (see Oakland's)
	- [ ] Mapping
	- [ ] Spending by unaffiliated committees (need to figure this out)
- [ ] Create an admin frontend to manage candidates and other manual entities
