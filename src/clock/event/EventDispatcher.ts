
import { EVENT_SOURCE_URL } from "../../constants"


// Use over HTTP/2 !!!!!!!!!!!!!!!!!
const eventSource = new EventSource(EVENT_SOURCE_URL)

const listeners: Array<(e:string) => void> = []

eventSource.onmessage = (event: MessageEvent<string>) => {
  // console.log("Event received from server", event)
  console.log("Server Event", event.data)
  listeners.forEach( f => f(event.data) )
}

eventSource.addEventListener("updateclock", (event) => {
  console.log("Update clock event", event.data )
})


export const addListener = (func: (e:string) => void) => {
  listeners.push(func);
}

console.log("Event Dispatcher online")

export default {}