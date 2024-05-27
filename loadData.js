// loadData.js
const csv = require("csv-parser");
const fs = require("fs");
const results = [];

const parseDate = (dateString) => {
  // Create a Date object
  let date = new Date(dateString);

  // Check if date is Invalid Date
  if (isNaN(date)) {
    // Manually parse the date
    let [month, day, year] = dateString.split(" ")[0].split("/");
    let [hour, minute] = dateString.split(" ")[1].split(":");

    // Adjust for two-digit year
    year = year.length === 2 ? "20" + year : year;

    // Create a new Date object
    date = new Date(`${year}-${month}-${day}T${hour}:${minute}`);
  }

  // Convert to ISO 8601 format
  let isoDate = date.toISOString();
return isoDate;
};

fs.createReadStream("data/MathDNN.csv", 'utf-8')
  .pipe(csv())
  .on('headers', (headers) => {
    console.log('Parsed Headers:', headers); // Log the headers to see the exact names
  })
  .on("data", (data) => {
    // Change the format of Date
    const key_date = Object.keys(data)[0];
    data['Date'] = parseDate(data[key_date]);
    delete(data[key_date]);
    results.push(data);
  })
  .on("end", () => {
    const resultsWithId = results.map((result, index) => {
        return {
          id: index, // Use the index as the id
          ...result
        };
      });

    fs.writeFileSync("db.json", JSON.stringify({ chat: resultsWithId }, null, 2));
  });
