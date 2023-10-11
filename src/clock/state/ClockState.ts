import { makeAutoObservable } from "mobx"
import * as _ from 'lodash'
import { ClockModel } from "../model";

const MINIMUM_SEGMENTS = 3;

class ClockState implements ClockModel {

  public name: string
  
  private currentSegments: number
  private currentProgress: number

  constructor() {
    this.name = ""
    this.currentSegments = 3
    this.currentProgress = 0

    makeAutoObservable(this, {}, { autoBind: true })
  }

  static makeClock(name: string, segments: number, progress: number) {
    const clockState = new ClockState()
    clockState.name = name
    clockState.currentSegments = segments
    clockState.currentProgress = progress
    return clockState
  }

  private clampProgress() {
    this.currentProgress = _.clamp(this.currentProgress, 0, this.currentSegments)
  }

  get percentComplete(): number {
    return this.currentProgress / this.currentSegments;
  }

  getSegments() {
    return this.currentSegments
  }


  removeSegment() {
    if (this.currentSegments > MINIMUM_SEGMENTS) {
      this.currentSegments--;
      
      this.clampProgress()
    }
  }
  addSegment() {
    this.currentSegments++;
  }
  updateProgress(segmentNumber: number) {

    const isActiveSegment = segmentNumber < this.currentProgress;

    const newProgress = isActiveSegment ? segmentNumber : segmentNumber + 1
    console.log(`Current progress: ${this.currentProgress}. Click segment ${segmentNumber}. New progress: ${newProgress}`)

    this.currentProgress = newProgress
    this.clampProgress()

  }

  get progress() {
    return this.currentProgress
  }
  get segments() {
    return this.currentSegments
  }
}

export default ClockState
