import database from './../database/data.json'
import FluentSQLBuilder from './fluentSQL.js'

const result = FluentSQLBuilder
  .for(database)
  .where({ registered: /^(2019|2020)/ })
  .where({ category: /^(developer|security)$/ })
  .where({ phone: /(\(869|868|923\))/ })
  .select(['name', '_id'])
  .orderBy('name')
  .build()

console.table(result)