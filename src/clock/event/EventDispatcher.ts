
import { EVENT_SOURCE_URL } from "../../constants"


// Use over HTTP/2 !!!!!!!!!!!!!!!!!
const eventSource = new EventSource(EVENT_SOURCE_URL)

eventSource.onmessage = (event) => {
  // console.log("Event received from server", event)
  console.log("Server Event", event.data)
}

eventSource.addEventListener("updateclock", (event) => {
  console.log("Update clock event", event.data )
})


export const addListener = () => {
  
}

console.log("Event Dispatcher online")

export default {}