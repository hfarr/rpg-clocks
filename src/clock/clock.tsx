import * as React from "react"
import * as _ from "lodash"

import { Segment } from "./segment"

type ClockProps = {
  segments: number,
  progress: number,
  
  name?: number,
  color?: string
}

const MINIMUM_CLOCK_SEGMENTS = 2;

const Clock = (props: ClockProps) => {

  const {
    segments: initialSegments,
    progress,
    name = "Clock",
    color = "#"
  } = props

  const [ currentProgress, setCurrentProgress ] = React.useState(progress)
  const [ currentSegments, setSegments ] = React.useState(initialSegments)

  const decreaseSegment = () => {
    if (currentSegments > MINIMUM_CLOCK_SEGMENTS) {
      setSegments( currentSegments - 1)
    }
  }
  const increaseSegments = () => {
    setSegments( currentSegments + 1)
  }

  const updateProgress = (segmentNumber: number) => {

    const isActiveSegment = segmentNumber < currentProgress;

    const newProgress = isActiveSegment ? segmentNumber : segmentNumber + 1
    console.log(`Current progress: ${currentProgress}. Click segment ${segmentNumber}. New progress: ${newProgress}`)

    setCurrentProgress(newProgress)
  }

  return <>
    <div className="clock" style={{ display: 'flex', '--n': currentSegments } as React.CSSProperties} >
      {_.range(currentSegments).map(segmentNumber =>
        <Segment key={segmentNumber}
          segmentNumber={segmentNumber}
          active={currentProgress > segmentNumber}
          onClick={() => updateProgress(segmentNumber)} />
      )}
    </div>
    <div style={{ display: 'flex' }}>
      <button onClick={increaseSegments}>Add segment</button>
      <button onClick={decreaseSegment}>Remove segment</button>
    </div>
  </>
}

export default Clock