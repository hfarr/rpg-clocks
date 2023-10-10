import * as React from "react"

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
  const backgroundColor = active ? "#00aa55" : "#333"
  return <div data-cl={active} 
    className="segment"
    style={{ 
      width: sideLength, 
      height: sideLength, 
      backgroundColor, 
      '--i': segmentNumber ,
      '--skew': `${skewAngle}deg`,
    } as React.CSSProperties}
    onClick={onClick}>
  </div>
}


export { Segment }