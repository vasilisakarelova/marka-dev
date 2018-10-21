import React, { Component } from 'react'
import page from 'page'
import * as css from 'classnames'

import Header from './components/Header'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: null,
      route: null,
    }

    this.initRouting = this.initRouting.bind(this)
  }

  componentDidMount() {
    //this.initRouting(firebaseData)
  }

  initRouting(data) {
    page('/', (ctx, next) => {
      this.setState({
        page: <Main data={data} />,
        route: ctx.path
      })
    })

    /*
    Object.keys(data).forEach(project => {
      page(`/${data[project].url}`, (ctx, next) => {
        this.setState({
          page: <Project data={data[project]} />,
          route: ctx.path,
        })
      })
    })
    */

    page()
  }

  render() {
    return (
      <div className='main' ref='main'>
	  hello
        <Header />
        {this.state.page}
      </div>
    )
  }
}
