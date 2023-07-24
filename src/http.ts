import { fetch } from "@devicescript/net"
import { FeedOptions, loadOptions } from "./options"

/**
 * Creates a data point in a Adafruit.io feed using
 * the {@link https://io.adafruit.com/api/docs/#create-data | REST API}
 *
 * This extension uses the following settings:
 *
 * - IO_KEY: (required) access key
 * - IO_FEED: feed name
 * - IO_USER: io.adafruit.com user name
 * - IO_LAT: (optional) latitude (as a number)
 * - IO_LON: (optional) longitude (as a number)
 * - IO_ELE: (optional) elevation (as a number)
 *
 * @param value numerical value to upload
 * @param options optional latitude longitude
 * @returns HTTP status code
 */
export async function createData(value: number, options?: FeedOptions) {
    const { key, feed, user, lat, lon, ele } = await loadOptions(options)

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
