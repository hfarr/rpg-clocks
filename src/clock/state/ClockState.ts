import { makeAutoObservable } from "mobx"
import * as _ from 'lodash'

const MINIMUM_SEGMENTS = 3;

class ClockState {

  public name: string
  
  private segments: number
  private progress: number

  constructor() {
    this.name = ""
    this.segments = 3
    this.progress = 0

    makeAutoObservable(this, {}, { autoBind: true })
  }

  static makeClock(name: string, segments: number, progress: number) {
    const clockState = new ClockState()
    clockState.name = name
    clockState.segments = segments
    clockState.progress = progress
    return clockState
  }

  private clampProgress() {
    this.progress = _.clamp(this.progress, 0, this.segments)
  }

  get percentComplete(): number {
    return this.progress / this.segments;
  }

  getSegments() {
    return this.segments
  }


  removeSegment() {
    if (this.segments > MINIMUM_SEGMENTS) {
      this.segments--;
      
      this.clampProgress()
    }
  }
  addSegment() {
    this.segments++;
  }
  updateProgress(segmentNumber: number) {

    const isActiveSegment = segmentNumber < this.progress;

    const newProgress = isActiveSegment ? segmentNumber : segmentNumber + 1
    console.log(`Current progress: ${this.currentProgress}. Click segment ${segmentNumber}. New progress: ${newProgress}`)

    this.progress = newProgress
    this.clampProgress()

  }

  get currentProgress() {
    return this.progress
  }
  get currentSegments() {
    return this.segments
  }
}

export default ClockState
