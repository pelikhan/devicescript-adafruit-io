import { delay } from "@devicescript/core"
import { createData, publishData, startAdafruitIOMQTTClient } from "."

console.log(`post data using http`)
await createData(123)

console.log(`post data using mqtt in 5s`)
await delay(5000)
const client = await startAdafruitIOMQTTClient()
await publishData(client, 456)
