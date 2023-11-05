import { observer, useLocalObservable } from "mobx-react"
import * as React from "react"
import Clock from "./clock/clock"
import { ClockModel } from "./clock/model"
import ClockState from "./clock/state/ClockState"
import ClockStore from "./stores/ClockStore"
import ClockGroupStore from "./stores/ClockGroupStore"
import { ClockGroup } from "./model"

import { registerEventListener} from "./event/ServerSentEventDispatcher"
import { makeObservable, observable, runInAction } from "mobx"
import TablePage from "./pages/TablePage"


const Root = observer(() => {

  const params = new URLSearchParams(location.search)
  // console.log(params)

  // TODO
  // Fix this so Root can become observer, that we may update the url search params with the current data.
  // do so such that as an observer re-rendering we don't replace all the data by the URL again
  // let clockData = clockState.asObj();
  // location.
  /*
  if (params.has('data')) {
    try {
      const clockData: Record<string, any> = JSON.parse(params.get('data'))
      clockState.updateData(clockData as ClockModel)
      console.log(clockData)
    } catch(err) {
      console.warn('Could not parse JSON', err)
    }
  }
  */

  return <div style={{width: '75vw'}}>
    <TablePage />
  </div>
})

export default Root