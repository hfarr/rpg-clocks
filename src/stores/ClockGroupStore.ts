import { makeAutoObservable, toJS } from "mobx";
import { getGlobalClockGroup, setGlobalClockGroup } from "../client/clockApi";
import { ClockGroup, ClockRowState } from "../model";

import { registerEventListener } from "../event"
import ClockState from "../clock/state/ClockState";

const TABLE_EVENT_NAME = "tableUpdate";

class ClockGroupStore {

  // TODO won't be just one
  private globalClockGroup?: ClockGroup
  // TODO make computed?
  globalClockRows?: ClockRowState[]

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  private establishState(clockGroup: ClockGroup) {
    this.globalClockGroup = clockGroup
    this.globalClockRows = this.globalClockGroup.map(
        row => ({
          ...row,
          clocks: row.clocks.map(ClockState.makeClockOfModel)
        })
      )
  }

  updateGlobalClockGroup(clockGroup: ClockGroup) {
    console.log("Received table update event.")
    this.establishState(clockGroup)

  }

  async loadGlobalClockGroup() {
    if (!this.globalClockGroup) {
      // fetch from server
      this.establishState(await getGlobalClockGroup())
      // this.globalClockGroup = await getGlobalClockGroup()
      // this.globalClockRows = this.globalClockGroup.map(
      //   row => ({
      //     ...row,
      //     clocks: row.clocks.map(ClockState.makeClockOfModel)
      //   })
      // )
    }

    return this.globalClockGroup;
  }

  async publishGlobalClockGroup() {
    if (!this.globalClockGroup) {
      return
    }
    const payload: ClockGroup = toJS(this.globalClockRows)
    return setGlobalClockGroup(payload)
  }

  get hasClocks() {
    return Boolean(this.globalClockRows)
  }

  get totalProgress(): [number, number] {
    return this.globalClockRows.reduceRight( 
      ([prog, seg], cs) => { 
          const [curProg,curSeg] = cs.clocks.reduceRight( ([ prog, seg ], c) => [ prog + c.progress, seg + c.segments ], [0, 0]) 
          return [prog + curProg, seg + curSeg]
        }
      , [0,0])
  }

}

const singletonStore = new ClockGroupStore();

const handleTableEvent = (data: string) => {
  // TODO validate data
  singletonStore.updateGlobalClockGroup(JSON.parse(data))
}

// TODO I think I prefer having event registration somewhere else
registerEventListener(TABLE_EVENT_NAME, e => handleTableEvent(e.data) )

console.log("ClockGroupStore online")
export const clockGroupStore = singletonStore
export default singletonStore;