import * as React from "react"
import Clock from "./clock/clock"

const Root = () => {
  return <>
    <div>
      <h1>Clocks</h1>
      <Clock segments={6} progress={2} />
    </div>
  </>
}

export default Root