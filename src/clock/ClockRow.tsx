import * as React from "react"
import { observer } from "mobx-react"

import Clock from "./clock"
import { ClockRowState } from "../model"

type ClockRowProps = {
  clockRow: ClockRowState
}

const ClockRow = observer(({ clockRow }: ClockRowProps) => {

  return <div className="clockRow">
    <p>{clockRow.name}</p>
    {clockRow.clocks.map( (c,i) => <div><Clock key={i} clockState={c} /></div>)}
  </div>

})

export default ClockRow