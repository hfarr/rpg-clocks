import * as React from "react"
import Clock from "./clock/clock"
import { ClockModel } from "./clock/model"
import ClockState from "./clock/state/ClockState"

const Root = () => {
  const clockState = new ClockState()

  const params = new URLSearchParams(location.search)
  console.log(params)
  if (params.has('data')) {
    try {
      const clockData: Record<string, any> = JSON.parse(params.get('data'))
      clockState.updateData(clockData as ClockModel)
      console.log(clockData)
    } catch(err) {
      console.warn('Could not parse JSON', err)
    }
  }

  return <div style={{width: '75vw'}}>
    <div>
      <h1>Clocks</h1>
      {/* <Clock segments={3} progress={2} /> */}
      <Clock clockState={clockState} />
    </div>
  </div>
}

export default Root