import { makeAutoObservable } from "mobx";
import { ClockModel } from "../clock/model";

import * as clockClient from "../client/clockApi"

class ClockStore {

  private currentClock?: ClockModel = undefined;

  constructor() {
    // this.currentClock = undefined;
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async getClock()/*: Promise<ClockModel> */ {
    if (!this.hasClock) {
      this.currentClock = await clockClient.getClock()
    }
    return this.currentClock
  }

  get hasClock() {
    return Boolean(this.currentClock)
  }

}

export default new ClockStore()
