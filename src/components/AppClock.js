import React, { useState, useEffect } from "react"
import { Modal, Button, TimePicker, message } from "antd"
import { CoffeeOutlined } from "@ant-design/icons"
import moment from "moment"
import imgSrc from "../assets/Work_from_home.jpg"
import { sendData } from "../Apis"

function AppClock() {
  const [showShiftStart, setshowShiftStart] = useState(false)
  const [disableManual, setdisableManual] = useState(false)
  const [disableManualEnd, setdisableManualEnd] = useState(false)
  const [timeStarted, settimeStarted] = useState()
  const [timeEnd, settimeEnd] = useState()
  const [showEnd, setshowEnd] = useState(false)
  const [lunchBreak, setlunchBreak] = useState()
  const [lunchBreakEnd, setlunchBreakEnd] = useState()
  const [breakDuration, setbreakDuration] = useState()
  const [showDayReport, setshowDayReport] = useState(false)
  const [totalTime, settotalTime] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))

  const sendStartEndTimeBreak = async () => {
    try {
      await sendData(user.id, {
        ...user,
        start_time: timeStarted,
        exit_time: timeEnd,
        lunch_break: breakDuration,
      })

      message.success("User data saved successfully")
    } catch (error) {
      console.log(error.response)
    }
  }

  const onChange = (time) => {
    settimeStarted(time.format("LT"))
  }

  const handleCheck = () => {
    setshowShiftStart(true)
    setdisableManual(true)
    settimeStarted(moment(new Date()).format("LT"))
  }

  const handleCheckEnd = () => {
    settimeEnd(moment(new Date()).format("LT"))
    setdisableManualEnd(true)
  }

  const onChangeEnd = (time) => {
    settimeEnd(time.format("LT"))
  }

  const confirmStart = () => {
    setshowShiftStart(true)
  }

  const handleBreak = () => {
    setlunchBreak(moment(new Date()).format("LT"))
    setIsModalVisible(true)
  }

  const handleBreakEnd = () => {
    setlunchBreakEnd(moment(new Date()).format("LT"))
    setIsModalVisible(false)
  }

  const endSchedule = () => {
    setdisableManualEnd(true)
  }

  const handleShowReport = () => {
    setbreakDuration(
      moment(lunchBreakEnd, "hh:mm a").diff(
        moment(lunchBreak, "hh:mm a"),
        "minutes",
      ),
    )
    settotalTime(
      moment(timeEnd, "hh:mm a").diff(moment(timeStarted, "hh:mm a"), "hours"),
    )
    setdisableManualEnd(true)
    setshowDayReport(true)
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
          {!lunchBreakEnd && (
            <Button icon={<CoffeeOutlined />} onClick={handleBreak}>
              Take a lunch break
            </Button>
          )}
          <Modal title="Lunch Break" visible={isModalVisible} footer={null}>
            {lunchBreak && (
              <>
                <p align="center">Your break started at {lunchBreak}</p>
                <Button type="primary" onClick={handleBreakEnd}>
                  Stop break
                </Button>
              </>
            )}
          </Modal>

          <strong>Click to end your shift</strong>

          <Button
            type="primary"
            onClick={handleCheckEnd}
            disabled={disableManualEnd}
          >
            Check out
          </Button>

          <strong>Or Enter it manually:</strong>
          <div>
            <TimePicker
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

          <Button type="primary" onClick={handleShowReport} disabled={!timeEnd}>
            Show report
          </Button>
          {showDayReport && (
            <>
              <p>Official Working hours: 8</p>
              <p>You've worked today for {totalTime} hours!</p>
              <p>
                During which you took a lunch break that lasted{" "}
                {breakDuration ? breakDuration : 0}
                {"  "}
                minutes
              </p>
              <p> Have a great rest of the day! ✨</p>
              <Button onClick={sendStartEndTimeBreak} type="primary">
                Save Today's Report
              </Button>
            </>
          )}
        </section>
      )}
    </>
  )
}
export default AppClock
