import * as React from "react"
import * as _ from "lodash"

import { observer } from "mobx-react"

import { Segment } from "./segment"
import ClockState from "./state/ClockState"
import { putClock } from "../client/clockApi"
import { clockGroupStore } from "../stores"

import { addListener } from "../event/ServerSentEventDispatcher"

type ClockProps = {
  clockState: ClockState
  // segments: number,
  // progress: number,
  
  // name?: string,
  // color?: string
}

const addListenerOnce = (func: (e: string) => void) => {
  let called = false;
  const justOnce = () => {
    addListener(func)
  }
  if (!called) {
    called = true
    justOnce()
  }
}

const Clock = observer( (props: ClockProps) => {

  const {
    segments,
    progress,
    name = "Clock",
    addSegment,
    removeSegment,
    updateProgress,
    // color = "#"
  } = props.clockState

  // addListenerOnce( (data) => {
  //   if (data.toLowerCase() === "ping") return
  //   props.clockState.updateData(JSON.parse(data))
  // })
  
  // TODO typing
  const changeWrap = (func: () => any) => () => {
    func();
    // putClock(props.clockState.asObj())
    clockGroupStore.publishGlobalClockGroup()

  }

  // const [ clockState, setClockState ] = React.useState(ClockState.makeClock(name, segments, progress))

  return <>
    <div className="clock" style={{ display: 'flex', '--n': segments } as React.CSSProperties} >
      {_.range(segments).map(segmentNumber =>
        <Segment key={segmentNumber}
          // urk
          segmentNumber={segmentNumber}
          active={progress > segmentNumber}
          onClick={ changeWrap(() => updateProgress(segmentNumber)) } />
      )}
      <div className="disc">
        <div></div>
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <button onClick={changeWrap(addSegment)}>Add segment</button>
      <button onClick={changeWrap(removeSegment)}>Remove segment</button>
    </div>
  </>
})

export default Clock