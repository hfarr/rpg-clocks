import { makeAutoObservable, computed } from "mobx"
import * as _ from 'lodash'
import { ClockModel } from "../model";

const MINIMUM_SEGMENTS = 3;
const MAXIMUM_SEGMENTS = 20;

class ClockState implements ClockModel {

  public name: string
  
  public segments: number
  public progress: number

  constructor() {
    this.name = undefined
    this.segments = 3
    this.progress = 0

    makeAutoObservable(this, {}, { autoBind: true })
  }

  static makeClock(name: string, segments: number, progress: number) {
    const clockState = new ClockState()
    clockState.name = name
    clockState.segments = segments
    clockState.progress = progress
    clockState.clampValues()
    return clockState
  }

  static makeClockOfModel(clockModel: ClockModel) {
    return ClockState.makeClock(clockModel.name ?? "", clockModel.segments, clockModel.progress)
  }

  private clampValues() {
    // this.currentSegments = _.clamp(this.currentSegments, MINIMUM_SEGMENTS, this.currentSegments)
    this.segments = _.clamp(this.segments, MINIMUM_SEGMENTS, MAXIMUM_SEGMENTS)
    this.progress = _.clamp(this.progress, 0, this.segments)
  }

  get percentComplete(): number {
    return this.progress / this.segments;
  }

  updateData(newClockData: ClockModel) {
    this.name = newClockData.name ?? ""
    this.progress = newClockData.progress
    this.segments = newClockData.segments
    this.clampValues()
  }
  asObj(): ClockModel {
    return {
      name: this.name,
      progress: this.progress,
      segments: this.segments,
    }
  }

  removeSegment() {
    if (this.segments > MINIMUM_SEGMENTS) {
      this.segments--;
      
      this.clampValues()
    }
  }
  addSegment() {
    this.segments++;
    this.clampValues()
  }
  updateProgress(segmentNumber: number) {

    const isActiveSegment = segmentNumber < this.progress;

    const newProgress = isActiveSegment ? segmentNumber : segmentNumber + 1
    console.log(`Current progress: ${this.progress}. Click segment ${segmentNumber}. New progress: ${newProgress}`)

    this.progress = newProgress
    this.clampValues()

  }

}

export default ClockState
