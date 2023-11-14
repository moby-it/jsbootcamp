import { logger1 } from './barrel/index.js'

console.log(logger1())

async function getFile() {
const res = await import('./index.js')
console.log('this is the dynamically imported file', res)
}
(async () => {
await getFile()
})()
