export default class FluentSQLBuilder {
  #database = []
  #limit = 0
  #select = []
  #where = []
  #orderBy = ''

  constructor({ database }) {
    this.#database = database 
  }

  static for(database) {
    return new FluentSQLBuilder({ database })
  }

  limit(max) {
    this.#limit = max

    return this
  }

  select(props) {
    this.#select = props
    
    return this
  }

  where(query) {
    const [[prop, selectedValue]] = Object.entries(query)
    const whereFilter = selectedValue instanceof RegExp 
      ? selectedValue
      : new RegExp(selectedValue)

    this.#where.push({ prop, filter: whereFilter })
    return this
  }

  orderBy(field) {
    this.#orderBy = field

    return this
  }

  #performLimit(results) {
    return this.#limit && results.length === this.#limit
  }

  #performWhere(item) {
    for(const { prop, filter } of this.#where) {
      if(!filter.test(item[prop])) return false
    }

    return true
  }

  #performSelect(item) {
    const currentItem = {}
    const entries = Object.entries(item)

    for(const [key, value] of entries) {
      const length = this.#select.length
      const keyExistInSelect = !this.#select.includes(key)

      if(length && keyExistInSelect) continue
      currentItem[key] = value
    }

    return currentItem
  }

  #performOrderBy(results) {
    if(!this.#orderBy) return results 
    if(this.#orderBy === 'id') {
      return results.sort((a, b) => a[this.#orderBy] - b[this.#orderBy])
    }
    return results.sort((a, b) => a[this.#orderBy].localeCompare(b[this.#orderBy]))
  }

  build() {
    const results = []

    for(const item of this.#database) {
      const patternNotFound = !this.#performWhere(item)
      if(patternNotFound) continue 

      const currentItem = this.#performSelect(item)

      results.push(currentItem)

      const isLimit = this.#performLimit(results)
      if(isLimit) break
    }

    const resultOrder = this.#performOrderBy(results)

    return resultOrder
  }
}