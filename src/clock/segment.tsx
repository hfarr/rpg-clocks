import * as React from "react"
import * as _ from "lodash"

type SegmentProps = {
  active: boolean
  segmentNumber: number
  skewAngle: string
  onClick: () => void

  // temp
  sideLength?: string 
}
const Segment = (props: SegmentProps) => {
  const {
    active,
    sideLength = "50px",
    skewAngle = '0',
    segmentNumber,
    onClick,
  } = props
  const flags: Record<string, ""> = active ? { active: "" } : {}
  return <div {...flags}
    className="segment"
    style={{ 
      // width: sideLength, 
      // height: sideLength, 
      // backgroundColor, 
      '--i': segmentNumber ,
      '--skew': `${skewAngle}deg`,
    } as React.CSSProperties}
    onClick={onClick}>
  </div>
}


export { Segment }