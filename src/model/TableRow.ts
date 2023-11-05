import ClockState from "../clock/state/ClockState"
import { ClockModel } from "./clock"

export type ClockRow = {
  name: string
  clocks: ClockModel[]
}
export type ClockRowState = {
  name: string
  clocks: ClockState[]
}

export type ClockGroup = ClockRow[]