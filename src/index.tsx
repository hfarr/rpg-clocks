import * as React from "react"
import { createRoot } from "react-dom/client"
import * as _ from 'lodash'

import Root from "./root"

console.log("Hi! Bye! I made a change! another one ")

console.log(_.range(1))

document.body.innerHTML = '<div id="app"></div>'

const root = createRoot(document.getElementById('app'))

// root.render(Root())
root.render(<Root />)

