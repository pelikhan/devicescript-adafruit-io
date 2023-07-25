import { MQTTClient, startMQTTClient } from "@devicescript/net"
import {
    FeedOptions,
    UserOptions,
    loadFeedOptions,
    loadUserOptions,
} from "./options"

/**
 * Starts a MQTT client for the  Adafruit.io broker
 * @see {@link https://io.adafruit.com/api/docs/mqtt.html#adafruit-io-mqtt-api}
 */
export async function startAdafruitIOMQTTClient(options?: UserOptions) {
    const { user, key } = await loadUserOptions(options)
    const client = await startMQTTClient({
        username: user,
        password: key,
        host: "io.adafruit.com",
        port: 8883,
    })
    return client
}

/**
 * Publishes a data entry on the given feed
 * @see {@link https://io.adafruit.com/api/docs/mqtt.html#adafruit-io-mqtt-api}
 * @param client MQTT client opened with startAdafruitIOMQTTClient
 */
export async function publishData(
    client: MQTTClient,
    value: number | Record<string, number>,
    options?: FeedOptions
) {
    const { feed, lon, lat, ele } = await loadFeedOptions(options)
    const user = client.opt.username
    const topic = `${user}/f/${feed}/json`
    const payload: any = { value }
    if (lon !== undefined) payload.lon = lon
    if (lat !== undefined) payload.lat = lat
    if (ele !== undefined) payload.ele = ele
    await client.publish(topic, payload)
}
