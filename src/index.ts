import 'dotenv/config'
import { sum } from '@/function'

console.log(sum(1,2));
console.log(process.env.AIRTABLE_API_KEY)
console.log(process.env.AIRTABLE_BASE_ID)
