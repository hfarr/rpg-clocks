import { ClockModel } from "./clock"

export type ClockRow = {
  name: string
  clocks: ClockModel[]
}

export type ClockGroup = ClockRow[]