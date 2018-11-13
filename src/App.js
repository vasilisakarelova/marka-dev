import React, { Component } from 'react'
import page from 'page'
import SwipeableViews from 'react-swipeable-views'
import * as css from 'classnames'

import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import ProjectList from './components/ProjectList'
import About from './components/About'
import Contact from './components/Contact'

import DataActions from './flux/actions/DataActions.js'
import data from './testdb'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: null,
      route: null,
      index: 0
    }

    this.initRouting = this.initRouting.bind(this)
  }

  componentDidMount() {
    this.initRouting(this.props.data)
  }

  initRouting(data) {
    page('/', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 0
      })
    })

    page('/projects', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 1
      })
    })

    page('/about-us', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 2
      })
    })

    page('/contact', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 3
      })
    })

    data.projects.forEach(project => {
      console.log(project)
      /*page(`/${project.title.replace(/\s/g , '-')}`, (ctx, next) => {
        this.setState({
          page: <Project data={project} />,
          route: ctx.path,
        })
      })*/
    })

    page()
  }

  render() {
    const { index } = this.state

    return (
      <div className='main' ref='main'>
        <Header page={this.state.index} />
        <SwipeableViews
          ref='SwipeableViews'
          index={index} className={`is-active-slide-${index}`}>
          <Main data={data} />
          <ProjectList data={data}/>
          <About />
          <Contact />
        </SwipeableViews>
        <Footer />
      </div>
    )
  }
}
