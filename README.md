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

## createData

The createData function will upload a value to the Adafruit.io feed
and return the HTTP status code.

```ts
import { createData } from "devicescript-adafruit-io"
const value = await temperature.reading.read()
const status = await createData(value)
console.log({ status })
```
