const fs = require('fs')
const { parse } = require('csv-parse')
const csvFilePath = './data.csv'
const entries = []

const FIRST = 7
const SECOND = 3

const FINAL = {
  Group_A_1: 'Netherlands',
  Group_A_2: 'Ecuador',
  Group_B_1: '', 
  Group_B_2: '',
  Group_C_1: '',
  Group_C_2: '',
  Group_D_1: '',
  Group_D_2: '',
  Group_E_1: '',
  Group_E_2: '',
  Group_F_1: '',
  Group_F_2: '',
  Group_G_1: '',
  Group_G_2: '',
  Group_H_1: '',
  Group_H_2: '',
}

fs.createReadStream(csvFilePath)
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', function (row) {
    const entry = {
      ts: row[0],
      name: row[1],
      Group_A_1: getEntry(row[2]),
      Group_A_2: getEntry(row[3]),
      Group_B_1: getEntry(row[4]),
      Group_B_2: getEntry(row[5]),
      Group_C_1: getEntry(row[6]),
      Group_C_2: getEntry(row[7]),
      Group_D_1: getEntry(row[8]),
      Group_D_2: getEntry(row[9]),
      Group_E_1: getEntry(row[10]),
      Group_E_2: getEntry(row[11]),
      Group_F_1: getEntry(row[12]),
      Group_F_2: getEntry(row[13]),
      Group_G_1: getEntry(row[14]),
      Group_G_2: getEntry(row[15]),
      Group_H_1: getEntry(row[16]),
      Group_H_2: getEntry(row[17]),
    }
    entries.push(entry)
  })
  .on('end', function () {
    const scores = entries.map((e) => getScores(e))
    console.log(scores);
  })


const getEntry = (str) => ({ name: str.split(' ')[0], score: 0 })

const getScores = (entry) => {
  let total = 0
  if (entry.Group_A_1.name === FINAL.Group_A_1) {
    entry.Group_A_1.score = FIRST
  }
  return entry
}