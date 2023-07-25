import { createData, publishData, startAdafruitIOMQTTClient } from "."

await createData(123)

const client = await startAdafruitIOMQTTClient()

await publishData(client, 456)
