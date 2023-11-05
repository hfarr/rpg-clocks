import * as React from "react"
import { observer } from "mobx-react"

import { clockGroupStore } from "../stores"
import ClockRow from "../clock/ClockRow"

type TablePageProps = {

}

// TODO Register the listeners here? this being view and controller in a way. Or a view, and the elements on the page are the controllers.

const TablePage = observer((props: TablePageProps) => {

  React.useEffect( () => {
    clockGroupStore.loadGlobalClockGroup()
  })

  if (!clockGroupStore.hasClocks) {
    return null
  }

  const clockRows = clockGroupStore.globalClockRows
  const [progress, totalSegments] = clockGroupStore.totalProgress

  console.log("Table Page: Clock rows: ", clockRows)

  return <>
    <div>
      Progress {progress}/{totalSegments}
    </div>
    <div>
      {clockRows.map(clRow => <ClockRow key={clRow.name} clockRow={clRow} />)}

    </div>
  </>
})

export default TablePage