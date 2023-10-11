import * as React from "react"
import * as _ from "lodash"

import { observer } from "mobx-react"

import { Segment } from "./segment"
import ClockState from "./state/ClockState"

type ClockProps = {
  segments: number,
  progress: number,
  
  name?: string,
  color?: string
}

const MINIMUM_CLOCK_SEGMENTS = 3;

const Clock = observer( (props: ClockProps) => {

  const {
    segments: initialSegments,
    progress,
    name = "Clock",
    color = "#"
  } = props

  const [ clockState, setClockState ] = React.useState(ClockState.makeClock(name, initialSegments, progress))

  const [ skewAngle, setSkewAngle ] = React.useState("0")

  return <>
    <div className="clock" style={{ display: 'flex', '--n': clockState.currentSegments } as React.CSSProperties} >
      {_.range(clockState.currentSegments).map(segmentNumber =>
        <Segment key={segmentNumber}
          // urk
          skewAngle={isNaN(parseInt(skewAngle)) ? '0' : skewAngle}
          segmentNumber={segmentNumber}
          active={clockState.currentProgress > segmentNumber}
          onClick={() => clockState.updateProgress(segmentNumber)} />
      )}
      <div className="disc">
        <div></div>
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <button onClick={clockState.addSegment}>Add segment</button>
      <button onClick={clockState.removeSegment}>Remove segment</button>
    </div>
    {/* <div style={{ display: 'flex' }}>
      <input type="range" min="-360" max="360" value={skewAngle} onChange={e => setSkewAngle(e.currentTarget.value) }/>
      <input type="text" value={skewAngle} onChange={e => setSkewAngle(e.currentTarget.value) }/>
    </div> */}
  </>
})

export default Clock