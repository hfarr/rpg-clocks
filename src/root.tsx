import * as React from "react"
import Clock from "./clock/clock"

const Root = () => {
  return <div style={{width: '75vw'}}>
    <div>
      <h1>Clocks</h1>
      <Clock segments={3} progress={2} />
    </div>
  </div>
}

export default Root