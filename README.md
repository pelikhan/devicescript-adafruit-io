# Adafruit.IO DeviceScript Client

This project is a [DeviceScript](https://microsoft.github.io/devicescript/) library that uses [Adafruit.io REST APIs](https://io.adafruit.com/api/docs/#create-data) to upload data.

> Requires a microcontroller with network connectivity such as the [Adafruit QT Py C3](https://microsoft.github.io/devicescript/devices/esp32/adafruit-qt-py-c3).

## Setup

Install this project to your DeviceScript project

```bash
npm install --save pelikhan/devicescript-adafruit-io#v...
```

where `v...` is the current release

## Settings

The APIs will read a default username, feed and key from the [settings](https://microsoft.github.io/devicescript/developer/settings).

```.env
# env.defaults
IO_USER=user
IO_FEED=feed
```

```.env
# env.local
IO_KEY=...
```

This extension uses the following settings:

-   IO_KEY: (required) access key
-   IO_FEED: feed name
-   IO_USER: io.adafruit.com user name
-   IO_LAT: (optional) latitude (as a number)
-   IO_LON: (optional) longitude (as a number)
-   IO_ELE: (optional) elevation (as a number)

## REST

The createData function will upload a value to the Adafruit.io feed using the [REST APIs](https://io.adafruit.com/api/docs/#create-data) and return the HTTP status code.

```ts
import { createData } from "devicescript-adafruit-io"
const value = await temperature.reading.read()
const status = await createData(value)
console.log({ status })
```

## MQTT

This API connects to the [MQTT](https://io.adafruit.com/api/docs/mqtt.html#adafruit-io-mqtt-api)
broker and let's you publish sensor data through the feed topics.

```ts
import {
    publishData,
    startAdafruitIOMQTTClient,
} from "devicescript-adafruit-io"

const client = await startAdafruitIOMQTTClient()

await publishData(client, 456)
```
