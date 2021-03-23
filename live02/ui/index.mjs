import { database } from '../shared/database.mjs'

const path = globalThis.window ? 'browser' : 'console'
const { default: ViewFactory } =  await import (`./../platforms/${path}/index.mjs`)

const app = new ViewFactory()
app.render(database)