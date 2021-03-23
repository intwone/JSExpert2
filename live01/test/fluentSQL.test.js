import { expect, describe, test } from '@jest/globals'
import FluentSQLBuilder from '../src/fluentSQL'

const database = [
  { 
    id: 0,
    name: 'AJohn One',
    category: 'developer Jr.'
  },

  { 
    id: 1,
    name: 'CJohn Doe',
    category: 'QA Tester'
  },

  { 
    id: 2,
    name: 'BJohn Three',
    category: 'developer Sr.'
  },

  { 
    id: 3,
    name: 'DJohn Three',
    category: 'developer Sr.'
  },

  { 
    id: 4,
    name: 'FJohn Three',
    category: 'developer Sr.'
  },

  { 
    id: 5,
    name: 'EJohn Three',
    category: 'developer Sr.'
  },

  { 
    id: 6,
    name: 'FJohn Three',
    category: 'developer Sr.'
  },

  { 
    id: 7,
    name: 'AJohn Three',
    category: 'developer Sr.'
  },
]

describe('Test Suite for FluentSQL Builder', () => {
  test('#for should return a FluentSQLBuilder instance', () => {
    const result = FluentSQLBuilder.for(database)
    const expected = new FluentSQLBuilder({ database })
    expect(result).toStrictEqual(expected)
  })

  test('#build should return the empty object instance', () => {
    const result = FluentSQLBuilder.for(database).build()
    const expected = database
    expect(result).toStrictEqual(expected)
  })

  test('#limit given a colletion it should limit results', () => {
    const result = FluentSQLBuilder.for(database).limit(1).build()
    const expected = [database[0]]

    expect(result).toStrictEqual(expected)
  })

  test('#where given a colletion it should filter data', () => {
    const result = FluentSQLBuilder
      .for(database)
      .where({
        category: /^dev/
      })
      .build()
    
    const expected = database.filter(({ category }) => category.slice(0, 3) === 'dev')

    expect(result).toStrictEqual(expected)
  })

  test('#select given a colletion it should return only specific fields', () => {
    const result = FluentSQLBuilder.for(database)
      .select(['name', 'category'])
      .build()

    const expected = database.map(({ name, category }) => ({ name, category }))

    expect(result).toStrictEqual(expected)
  })

  test('#orderBy given a colletion it should order results by fields', () => {
    const result = FluentSQLBuilder.for(database)
      .orderBy('name')
      .build()
    const expected = [
      { 
        id: 0,
        name: 'AJohn One',
        category: 'developer Jr.'
      },

      { 
        id: 7,
        name: 'AJohn Three',
        category: 'developer Sr.'
      },

      { 
        id: 2,
        name: 'BJohn Three',
        category: 'developer Sr.'
      },

      { 
        id: 1,
        name: 'CJohn Doe',
        category: 'QA Tester'
      },
      
      { 
        id: 3,
        name: 'DJohn Three',
        category: 'developer Sr.'
      },
    
      { 
        id: 5,
        name: 'EJohn Three',
        category: 'developer Sr.'
      },

      { 
        id: 4,
        name: 'FJohn Three',
        category: 'developer Sr.'
      },
    
      { 
        id: 6,
        name: 'FJohn Three',
        category: 'developer Sr.'
      }
    ]

    expect(result).toStrictEqual(expected)
  })

  test('pipeline', () => {
    const result = FluentSQLBuilder
      .for(database)
      .where({ category: 'developer' })
      .where({ name: /A/ })
      .select(['name', 'id'])
      .orderBy('id')
      .build()

    const expected = database.filter(({ category, name }) => {
      return category.includes('dev') && name.includes('A')
    }).map(({ id, name }) => ({ id, name }))

    expect(result).toStrictEqual(expected)
  })
})