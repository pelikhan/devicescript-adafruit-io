# Adafruit.IO DeviceScript Client

This project is a [DeviceScript](https://microsoft.github.io/devicescript/) library that [Adafruit.io REST APIs](https://io.adafruit.com/api/docs/#create-data)
to upload data.

## Setup

Install this project to your DeviceScript project

```bash
npm install --save pelikhan/devicescript-adafruit-io#v0.0.2
```

## Settings

The APIs will read a default username, feed and key from the [settings](https://microsoft.github.io/devicescript/developer/settings).

```.env
# env.defaults
AIO_USER=user
AIO_FEED=feed
```

```.env
# env.local
AIO_KEY=...
```

## createData

The createData function will upload a value to the Adafruit.io feed
and return the HTTP status code.

```ts
const value = await temperature.reading.read()
const status = await createData(value)
console.log({ status })
```
