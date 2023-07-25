import { fetch } from "@devicescript/net"
import {
    FeedOptions,
    UserOptions,
    loadFeedOptions,
    loadUserOptions,
} from "./options"

/**
 * Creates a data point in a Adafruit.io feed using
 * the {@link https://io.adafruit.com/api/docs/#create-data | REST API}
 *
 * @param value numerical value to upload
 * @param options optional settings
 * @returns HTTP status code
 */
export async function createData(
    value: number,
    options?: UserOptions & FeedOptions
) {
    const { key, user } = await loadUserOptions(options)
    const { feed, lat, lon, ele } = await loadFeedOptions(options)

    const url = `https://io.adafruit.com/api/v2/${user}/feeds/${feed}/data`
    const headers = { "X-AIO-Key": key, "Content-Type": "application/json" }
    const body: { value: number; lat?: number; lon?: number; ele?: number } = {
        value,
    }
    if (lat) body.lat = lat
    if (lon) body.lon = lon
    if (ele) body.ele = ele

    const { status } = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers,
    })
    return status
}
