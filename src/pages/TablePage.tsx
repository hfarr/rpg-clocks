import * as React from "react"
import { observer } from "mobx-react"

import { clockGroupStore } from "../stores"
import ClockRow from "../clock/ClockRow"

type TablePageProps = {

}

const TablePage = observer((props: TablePageProps) => {

  React.useEffect( () => {
    clockGroupStore.loadGlobalClockGroup()
  })

  if (!clockGroupStore.hasClocks) {
    return null
  }

  const clockRows = clockGroupStore.globalClockRows

  console.log("Table Page: Clock rows: ", clockRows)

  return <div>
    {clockRows.map( clRow => <ClockRow key={clRow.name} clockRow={clRow}/>)}

  </div>
})

export default TablePage