import { fetch } from "@devicescript/net"
import { readSetting } from "@devicescript/settings"

// read configurations
const defaultFeed = await readSetting("AIO_FEED")
const defaultUser = await readSetting("AIO_USER")
const defaultLat = await readSetting<number>("AIO_LAT")
const defaultLon = await readSetting<number>("AIO_LON")
const defaultEle = await readSetting<number>("AIO_ELE")
const key = await readSetting("AIO_KEY")

/**
 * Creates a data point in a Adafruit.io feed using
 * the {@link https://io.adafruit.com/api/docs/#create-data | REST API}
 *
 * This extension uses the following settings:
 *
 * - AIO_KEY: (required) access key
 * - AIO_FEED: feed name
 * - AIO_USER: io.adafruit.com user name
 * - AIO_LAT: (optional) latitude (as a number)
 * - AIO_LON: (optional) longitude (as a number)
 * - AIO_ELE: (optional) elevation (as a number)
 *
 * @param value numerical value to upload
 * @param options optional latitude longitude
 * @returns HTTP status code
 */
export async function createData(
    value: number,
    options?: {
        feed?: string
        user?: string
        lat?: number
        lon?: number
        ele?: number
    }
) {
    if (!key) throw new Error("Adafruit.io: missing secret AIO_KEY")

    const { feed, user, lat, lon, ele } = options || {}
    const u = user || defaultUser
    if (!u) throw new Error("Adafruit.io: missing setting AIO_USER")
    const f = feed || defaultFeed
    if (!f) throw new Error("Adafruit.io: missing setting AIO_FEED")

    const la = lat || defaultLat
    const lo = lon || defaultLon
    const el = ele || defaultEle

    const url = `https://io.adafruit.com/api/v2/${u}/feeds/${f}/data`
    const headers = { "X-AIO-Key": key, "Content-Type": "application/json" }
    const body: { value: number; lat?: number; lon?: number; ele?: number } = {
        value,
    }
    if (la) body.lat = la
    if (lo) body.lon = lo
    if (el) body.ele = el

    const { status } = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers,
    })
    return status
}
