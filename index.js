const fs = require('fs')
const { parse } = require('csv-parse')
const csvFilePath = './data.csv'
const entries = []

fs.createReadStream(csvFilePath)
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', function (row) {
    const entry = {
      ts: row[0],
      name: row[1],
      GA_1: row[2],
      GA_2: row[4]
    }
    entries.push(entry)
  })
  .on('end', function () {
    console.log(entries)
  })
