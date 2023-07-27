import { delay } from "@devicescript/core"
import { createData, publishData, startAdafruitIOMQTTClient } from "."
import { schedule } from "@devicescript/runtime"

console.log(`post data using http`)
await createData(123)

console.log(`post data using mqtt in 5s`)
await delay(5000)
const client = await startAdafruitIOMQTTClient()

schedule(
    async () => {
        await publishData(client, 456)
    },
    { interval: 5000 }
)
