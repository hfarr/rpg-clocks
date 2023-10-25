import { makeAutoObservable } from "mobx";
import { getGlobalClockGroup } from "../client/clockApi";
import { ClockGroup } from "../model";

import { registerEventListener } from "../event"

const TABLE_EVENT_NAME = "tableUpdate";

class ClockGroupStore {

  // TODO won't be just one
  globalClockGroup?: ClockGroup

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  updateGlobalClockGroup(clockGroup: ClockGroup) {
    console.log("Received table update event.")
    this.globalClockGroup = clockGroup
  }

  async getGlobalClockGroup() {
    if (!this.globalClockGroup) {
      // fetch from server
      this.globalClockGroup = await getGlobalClockGroup()
    }

    return this.globalClockGroup;
  }

}

const singletonStore = new ClockGroupStore();

// TODO I think I prefer having event registration somewhere else
registerEventListener(TABLE_EVENT_NAME, e => singletonStore.updateGlobalClockGroup(e.data) )

console.log("ClockGroupStore online")
export default singletonStore;