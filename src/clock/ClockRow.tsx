import * as React from "react"
import { observer } from "mobx-react"

import Clock from "./clock"
import { ClockRowState } from "../model"

type ClockRowProps = {
  clockRow: ClockRowState
}

const ClockRow = observer(({ clockRow }: ClockRowProps) => {

  return <div>
    <p>{clockRow.name}</p>
    {clockRow.clocks.map( c => <Clock clockState={c} />)}
  </div>

})

export default ClockRow