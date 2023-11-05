import { makeAutoObservable } from "mobx";
import { getGlobalClockGroup } from "../client/clockApi";
import { ClockGroup, ClockRowState } from "../model";

import { registerEventListener } from "../event"
import ClockState from "../clock/state/ClockState";

const TABLE_EVENT_NAME = "tableUpdate";

class ClockGroupStore {

  // TODO won't be just one
  private globalClockGroup?: ClockGroup
  globalClockRows?: ClockRowState[]

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  updateGlobalClockGroup(clockGroup: ClockGroup) {
    console.log("Received table update event.")
    this.globalClockGroup = clockGroup
  }

  async loadGlobalClockGroup() {
    if (!this.globalClockGroup) {
      // fetch from server
      this.globalClockGroup = await getGlobalClockGroup()
      this.globalClockRows = this.globalClockGroup.map(
        row => ({
          ...row,
          clocks: row.clocks.map(ClockState.makeClockOfModel)
        })
      )
    }

    return this.globalClockGroup;
  }

  get hasClocks() {
    return Boolean(this.globalClockRows)
  }

}

const singletonStore = new ClockGroupStore();

// TODO I think I prefer having event registration somewhere else
registerEventListener(TABLE_EVENT_NAME, e => singletonStore.updateGlobalClockGroup(e.data) )

console.log("ClockGroupStore online")
export const clockGroupStore = singletonStore
export default singletonStore;