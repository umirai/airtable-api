import 'dotenv/config'
import Airtable from 'airtable'

const apiKey = process.env.AIRTABLE_API_KEY

const baseId = process.env.AIRTABLE_BASE_ID

const createAirtable = (tableName: string) => {
  if (apiKey === undefined || baseId === undefined)
    throw new Error('AIRTABLE_API_KEY or AIRTABLE_BASE_ID is not defined')

  return new Airtable({ apiKey }).base(baseId).table(tableName)
}

export { createAirtable }
