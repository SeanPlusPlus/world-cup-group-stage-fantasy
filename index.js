const fs = require('fs')
const { parse } = require('csv-parse')
const _sortBy = require('lodash/sortBy')
const csvFilePath = './data.csv'
const entries = []

const FIRST = 7
const SECOND = 3

const FINAL = {
  Group_A_1: '',
  Group_A_2: '',
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
  Group_H_2: ''
}

fs.createReadStream(csvFilePath)
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', function (row) {
    const entry = {
      ts: row[0],
      name: row[20],
      total: null
    }

    const keys = _sortBy(Object.keys(FINAL))
    keys.forEach((k, i) => {
      const idx = i + 2
      entry[k] = getEntry(row[idx])
    })

    entries.push(entry)
  })
  .on('end', function () {
    fs.writeFileSync('data.json', JSON.stringify(entries))

    const data = _sortBy(entries, (e) => e.name)
    const json = JSON.stringify(data)
    fs.writeFileSync('./entries.json', json)
  })

const getEntry = (str) => ({ name: str.split(' ')[0], score: null })

// to be implemented in web app
const getScores = (entry) => {
  const keys = _sortBy(Object.keys(FINAL))
  keys.forEach((k, i) => {
    const isFirstSeed = i % 2 === 0
    if (entry[k].name === FINAL[k] && isFirstSeed) {
      entry[k].score = FIRST
      entry.total += FIRST
    }
    if (entry[k].name === FINAL[k] && !isFirstSeed) { // second place
      entry[k].score = SECOND
      entry.total += SECOND
    }
  })

  return entry
}
