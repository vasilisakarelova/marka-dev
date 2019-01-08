import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import resized from './utils/resized'
import 'intersection-observer'

import App from './App'
import { unregister } from './registerServiceWorker'

fetch('https://marka.moscow/admin/api')
  .then((response) => {
    if (response.status >= 400) {
      throw new Error("Bad response from server")
    }
    return response.json()
  })
  .then((apiEn) => {
    let data = {
      ru: {},
      en: apiEn
    }
    let dataBase = data.en

    fetch('https://marka.moscow/admin/ru/api')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then((apiRu) => {
        data.ru = apiRu

        ReactDOM.render(<App data={data} />, document.getElementById('root'))
        unregister()
        resized()
      })

  })
