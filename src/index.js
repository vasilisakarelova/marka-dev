import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import resized from './utils/resized'
import 'intersection-observer'

import App from './App'
import { unregister } from './registerServiceWorker'

// const origin = window.location.origin

// fetch(`${origin}/admin/api`)
//   .then((response) => {
//     if (response.status >= 400) {
//       throw new Error("Bad response from server")
//     }
//     return response.json()
//   })
//   .then((apiEn) => {
//     let data = {
//       ru: {},
//       en: apiEn
//     }
//
//     fetch(`${origin}/admin/ru/api`)
//       .then((response) => {
//         if (response.status >= 400) {
//           throw new Error("Bad response from server")
//         }
//         return response.json()
//       })
//       .then((apiRu) => {
//         data.ru = apiRu
//
//         ReactDOM.render(<App data={data} />, document.getElementById('root'))
//         unregister()
//         resized()
//       })
//
//   })

import testEn from './testEn.js'
import testRu from './testRu.js'

let data = {
  ru: testRu,
  en: testEn
}

ReactDOM.render(<App data={data} />, document.getElementById('root'))
unregister()
resized()
