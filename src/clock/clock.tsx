import * as React from "react"
import * as _ from "lodash"

import { observer } from "mobx-react"

import { Segment } from "./segment"
import ClockState from "./state/ClockState"
import { putClock } from "../client/clockApi"

type ClockProps = {
  clockState: ClockState
  // segments: number,
  // progress: number,
  
  // name?: string,
  // color?: string
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

  
  // TODO typing
  const changeWrap = (func: () => any) => () => {
    func();
    putClock(props.clockState.asObj())
  }

  // const [ clockState, setClockState ] = React.useState(ClockState.makeClock(name, segments, progress))

  const [ skewAngle, setSkewAngle ] = React.useState("0")

  return <>
    <div className="clock" style={{ display: 'flex', '--n': segments } as React.CSSProperties} >
      {_.range(segments).map(segmentNumber =>
        <Segment key={segmentNumber}
          // urk
          skewAngle={isNaN(parseInt(skewAngle)) ? '0' : skewAngle}
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
    {/* <div style={{ display: 'flex' }}>
      <input type="range" min="-360" max="360" value={skewAngle} onChange={e => setSkewAngle(e.currentTarget.value) }/>
      <input type="text" value={skewAngle} onChange={e => setSkewAngle(e.currentTarget.value) }/>
    </div> */}
  </>
})

export default Clock