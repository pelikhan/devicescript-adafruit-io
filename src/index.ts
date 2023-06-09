import { fetch } from "@devicescript/net"
import { readSetting } from "@devicescript/settings"

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
    const key = await readSetting("IO_KEY")
    if (!key) throw new Error("Adafruit.io: missing secret IO_KEY")

    const { feed, user, lat, lon, ele } = options || {}
    const u = user || await readSetting("IO_USER")
    if (!u) throw new Error("Adafruit.io: missing setting IO_USER")
    const f = feed || await readSetting("IO_FEED")
    if (!f) throw new Error("Adafruit.io: missing setting IO_FEED")

    const la = lat || await readSetting<number>("IO_LAT")
    const lo = lon || await readSetting<number>("IO_LON")
    const el = ele || await readSetting<number>("IO_ELE")

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
