import * as React from "react"
import * as _ from "lodash"

type SegmentProps = {
  active: boolean

  // temp
  sideLength?: string 
}
const Segment = (props: SegmentProps) => {
  const {
    active,
    sideLength = "50px"
  } = props
  const backgroundColor = active ? "#00aa55" : "#333"
  return <div data-cl={active} style={{ width: sideLength, height: sideLength, backgroundColor }}>
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

  return <div style={{ display: 'flex' }}>
    {_.range(segments).map( segmentNumber => <Segment key={segmentNumber} active={progress > segmentNumber} /> )}
  </div>
}

export default Clock