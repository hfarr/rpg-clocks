import * as React from "react"
import * as _ from "lodash"

type SegmentProps = {
  active: boolean
  segmentNumber: number
  onClick: () => void

  // temp
  sideLength?: string 
}
const Segment = (props: SegmentProps) => {
  const {
    active,
    sideLength = "50px",
    segmentNumber,
    onClick,
  } = props
  const backgroundColor = active ? "#00aa55" : "#333"
  return <div data-cl={active} 
    className="segment"
    style={{ width: sideLength, height: sideLength, backgroundColor, '--i': segmentNumber } as React.CSSProperties}
    onClick={onClick}>
  </div>
}

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

    // progress = 2
    // x  x
    // 0, 1, 2, 3, 4, 5
    //
    // click 2 -> progress = 3
    // x  x  x
    // 0, 1, 2, 3, 4, 5
    //
    // click 2 -> progress = 2
    // x  x
    // 0, 1, 2, 3, 4, 5
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