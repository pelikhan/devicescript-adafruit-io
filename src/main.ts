import { pins, board } from "@dsboard/adafruit_qt_py_c3"
import { fetch } from "@devicescript/net"
import { schedule } from "@devicescript/runtime"
import { readSetting } from "@devicescript/settings"
import { startSHTC3 } from "@devicescript/drivers"
import { createData } from "."

const { temperature } = await startSHTC3()
schedule(
    async () => {
        const value = await temperature.reading.read()
        const status = await createData(value)
        console.log({ status })
    },
    { timeout: 1000, interval: 10000 }
)
