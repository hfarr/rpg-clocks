import * as React from "react"
import * as _ from "lodash"

type SegmentProps = {
  active: boolean
  // segmentNumber: number
  onClick: () => void

  // temp
  sideLength?: string 
}
const Segment = (props: SegmentProps) => {
  const {
    active,
    sideLength = "50px",
    onClick,
  } = props
  const backgroundColor = active ? "#00aa55" : "#333"
  return <div data-cl={active} 
    style={{ width: sideLength, height: sideLength, backgroundColor }}
    onClick={onClick}>
  </div>
}

type ClockProps = {
  segments: number,
  progress: number,
  
  name?: number,
  color?: string
}


const Clock = (props: ClockProps) => {

  const {
    segments,
    progress,
    name = "Clock",
    color = "#"
  } = props

  const [ currentProgress, setCurrentProgress ] = React.useState(progress)

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

  return <div style={{ display: 'flex' }} >
    {_.range(segments).map( segmentNumber => 
      <Segment key={segmentNumber} 
        active={currentProgress > segmentNumber} 
        onClick={ () => updateProgress(segmentNumber) } /> 
    )}
  </div>
}

export default Clock