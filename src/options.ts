import { readSetting } from "@devicescript/settings"

/**
 * Adafruit.io configuration options
 */
export interface FeedOptions {
    feed?: string
    user?: string
    lat?: number
    lon?: number
    ele?: number
}

/**
 * Merges the passed options and the options in the settings
 * - IO_KEY: (required) access key
 * - IO_FEED: feed name
 * - IO_USER: io.adafruit.com user name
 * - IO_LAT: (optional) latitude (as a number)
 * - IO_LON: (optional) longitude (as a number)
 * - IO_ELE: (optional) elevation (as a number)
 * @param options
 * @returns a valid option object, including the key
 * @throws Error missing user or feed information
 */
export async function loadOptions(
    options?: FeedOptions
): Promise<FeedOptions & { key: string }> {
    const key = await readSetting("IO_KEY")
    if (!key) throw new Error("Adafruit.io: missing secret IO_KEY")
    let { feed, user, lat, lon, ele } = options || {}
    user = user || (await readSetting("IO_USER"))
    if (!user) throw new Error("Adafruit.io: missing setting IO_USER")
    feed = feed || (await readSetting("IO_FEED"))
    if (!feed) throw new Error("Adafruit.io: missing setting IO_FEED")

    lat = lat || (await readSetting<number>("IO_LAT"))
    lon = lon || (await readSetting<number>("IO_LON"))
    ele = ele || (await readSetting<number>("IO_ELE"))

    return {
        key,
        feed,
        user,
        lat,
        lon,
        ele,
    }
}
