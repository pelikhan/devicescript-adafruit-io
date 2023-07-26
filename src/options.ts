import { readSetting } from "@devicescript/settings"

/**
 * Adafruit.io configuration options
 */
export interface UserOptions {
    user?: string
}

/**
 * Merges the passed options and the options in the settings
 * - IO_KEY: (required) access key
 * - IO_USERNAME: io.adafruit.com user name
 * @param options
 * @returns a valid option object, including the key
 * @throws Error missing user or feed information
 */
export async function loadUserOptions(
    options?: UserOptions
): Promise<UserOptions & { key: string }> {
    const key = await readSetting("IO_KEY")
    if (!key) throw new Error("Adafruit.io: missing secret IO_KEY")
    let { user } = options || {}
    user =
        user ||
        (await readSetting("IO_USERNAME")) ||
        (await readSetting("IO_USER"))
    if (!user) throw new Error("Adafruit.io: missing setting IO_USERNAME")
    return { user, key }
}

/**
 * Adafruit.io configuration options
 */
export interface FeedOptions {
    feed?: string
    lat?: number
    lon?: number
    ele?: number
}

/**
 * Merges the passed options and the options in the settings
 * - IO_FEED: feed name
 * - IO_LAT: (optional) latitude (as a number)
 * - IO_LON: (optional) longitude (as a number)
 * - IO_ELE: (optional) elevation (as a number)
 * @param options
 * @returns a valid option object, including the key
 * @throws Error missing user or feed information
 */
export async function loadFeedOptions(
    options?: FeedOptions
): Promise<FeedOptions> {
    let { feed, lat, lon, ele } = options || {}
    feed = feed || (await readSetting("IO_FEED"))
    if (!feed) throw new Error("Adafruit.io: missing setting IO_FEED")

    lat = lat || (await readSetting<number>("IO_LAT"))
    lon = lon || (await readSetting<number>("IO_LON"))
    ele = ele || (await readSetting<number>("IO_ELE"))

    return {
        feed,
        lat,
        lon,
        ele,
    }
}
