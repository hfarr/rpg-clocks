import { observer } from "mobx-react"
import * as React from "react"
import Clock from "./clock/clock"
import { ClockModel } from "./clock/model"
import ClockState from "./clock/state/ClockState"

const clockState = new ClockState()

const Root = observer(() => {

  const params = new URLSearchParams(location.search)
  console.log(params)
  // TODO
  // Fix this so Root can become observer, that we may update the url search params with the current data.
  // do so such that as an observer re-rendering we don't replace all the data by the URL again
  // let clockData = clockState.asObj();
  // location.
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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>Number of segments: </p>
      <p>{clockState.progress}/{clockState.segments}</p>
    </div>
  </div>
})

export default Root