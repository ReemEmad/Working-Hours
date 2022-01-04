import React, { useState, useEffect } from "react"
import { Button, TimePicker } from "antd"
import { CoffeeOutlined } from "@ant-design/icons"
import moment from "moment"
import imgSrc from "../assets/Work_from_home.jpg"

function AppClock() {
  const [showShiftStart, setshowShiftStart] = useState(false)
  const [disableManual, setdisableManual] = useState(false)
  const [disableManualEnd, setdisableManualEnd] = useState(false)
  const [timeStarted, settimeStarted] = useState()
  const [timeEnd, settimeEnd] = useState()
  const [showEnd, setshowEnd] = useState(false)
  const [lunchBreak, setlunchBreak] = useState()
  const [showDayReport, setshowDayReport] = useState(false)
  const [totalTime, settotalTime] = useState()

  const onChange = (time, timeString) => {
    console.log(time)
    console.log(moment(time).format("hh:mm"))
    console.log(
      "teyyyyyyy",
      moment(new Date())
        .format("hh:mm")
        .diff(moment(time).format("hh:mm"), "hours"),
    )
    settimeStarted(time.format("LT"))
  }

  const handleCheck = () => {
    setshowShiftStart(true)
    setdisableManual(true)
    console.log(moment(new Date()).format("LT"))
    settimeStarted(moment(new Date()).format("LT"))
  }

  const handleCheckEnd = () => {
    setdisableManualEnd(true)
    console.log(moment(new Date()).format("LT"))
    settimeEnd(moment(new Date()).format("LT"))
  }

  const onChangeEnd = (time, timeString) => {
    console.log(timeString)
    console.log(moment(time).format("dddd"))
    settimeEnd(time.format("LT"))
    console.log(moment(time).format("h"))
    console.log(moment(time).format("m"))
  }

  const confirmStart = () => {
    setshowShiftStart(true)
  }

  const handleBreak = () => {
    setlunchBreak(moment(new Date()).format("LT"))
    console.log(moment(new Date()).format("LT"))
  }
  //   const confirmEnd = () => {
  //     settimeEnd()
  //   }

  const endSchedule = () => {
    setshowDayReport(true)
    console.log("start", timeStarted)
    console.log("end", timeEnd)
    const start = moment.duration(timeStarted)
    const end = moment.duration(timeEnd)
    console.log(start, end)
    // settimeEnd(moment(new Date()).format("LT"))

    console.log("helppp", end.subtract(start).asHours())

    // const time = moment.duration(
    //   moment(timeStarted)
    //     .format("HH:mm:ss a")
    //     .diff(moment(timeEnd).format("HH:mm:ss a")),
    // )
    console.log("plzzzzzzzz", moment(end).diff(moment(start), "hours"))
    // const totaltime = timeEnd - timeStarted
    // console.log(totaltime)
  }

  useEffect(() => {
    if (showShiftStart) {
      setTimeout(() => {
        setshowShiftStart(false)
        setshowEnd(true)
      }, 5000)
    }
  }, [showShiftStart])

  return (
    <>
      {!showShiftStart && !showEnd && (
        <section className="clock_container">
          <h1 align="center">Welcome!</h1>

          <strong>Click to start your shift</strong>

          <Button type="primary" onClick={handleCheck}>
            Check in
          </Button>

          <strong>Or Enter it manually:</strong>
          <div>
            <TimePicker
              //   use12Hours
              format="h:mm"
              onChange={onChange}
              disabled={disableManual}
            />
            <Button
              type="primary"
              disabled={disableManual}
              onClick={confirmStart}
            >
              Confirm
            </Button>
          </div>
        </section>
      )}

      {showShiftStart && (
        <section className="clock_started">
          <img src={imgSrc} width="300px" height="300px" alt="" />

          <p>Have a nice day!</p>
          <p>Your shift started at {timeStarted}</p>
        </section>
      )}

      {showEnd && !showShiftStart && (
        <section className="clock_container">
          <h1 align="center">Welcome!</h1>

          <strong>Click to end your shift</strong>

          <Button type="primary" onClick={handleCheckEnd}>
            Check out
          </Button>

          <strong>Or Enter it manually:</strong>
          <div>
            <TimePicker
              //   use12Hours
              format="h:mm"
              onChange={onChangeEnd}
              disabled={disableManualEnd}
            />
            <Button
              type="primary"
              disabled={disableManualEnd}
              onClick={endSchedule}
            >
              Confirm
            </Button>
          </div>
          {/* <div> */}
          {!lunchBreak && (
            <Button icon={<CoffeeOutlined />} onClick={handleBreak}>
              Take a lunch break
            </Button>
          )}

          {lunchBreak && (
            <>
              <p align="center">Your break started at {lunchBreak}</p>
              <Button type="primary">Stop break</Button>
            </>
          )}

          {showDayReport && (
            <>You've worked today for hours! Have a great rest of the day</>
          )}

          {/* </div> */}
        </section>
      )}
    </>
  )
}
export default AppClock
