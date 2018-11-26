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

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: null,
      route: null,
      index: 0,
      scrolled: 0,
      hasScrolled: false,
      isInvert: false,
      animationEnded: false,
      animationArrived: false,
      floatingMenu: false
    }

    this.initRouting = this.initRouting.bind(this)
    this.setAnimationEnded = this.setAnimationEnded.bind(this)
    this.setAnimationArrived = this.setAnimationArrived.bind(this)
    this.setScroll = this.setScroll.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    this.initRouting(this.props.data)
    window.addEventListener('resize', this.handleResize)
  }

  handleResize (e) {
    this.updateHeight()
  }

  initRouting(data) {
    page.base('/new')

    page('/', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 0,
        isInvert: false
      })
    })

    page('/projects', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 1,
        isInvert: false
      })
    })

    page('/about-us', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 2,
        isInvert: false
      })
    })

    page('/contact', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 3,
        isInvert: true
      })
    })

    data.projects.forEach(project => {
      //console.log(project)
      /*page(`/${project.title.replace(/\s/g , '-')}`, (ctx, next) => {
        this.setState({
          page: <Project data={project} />,
          route: ctx.path,
        })
      })*/
    })

    page()
  }

  setAnimationEnded(type) {
    this.setState({
      animationEnded: type
    })
  }

  setAnimationArrived(type) {
    this.setState({
      animationArrived: type
    })
  }

  setScroll (ev) {
    const opacity = (ev.currentTarget.scrollTop * 100 / (280 - (60 - 16)) / 100)

     this.setState({
       scrolled: ev.currentTarget.scrollTop,
       headerOpacity: (opacity <= 1) ? (1 - opacity) : 0,
       floatingMenu: (opacity <= 1) ? false : true
     })

     if(!this.state.hasScrolled) {
       this.setState({
         hasScrolled: true
       })
     }
  }

  render() {
    const { index } = this.state

    return (
      <div className={css('scroll-wrap', {'is-invert': this.state.isInvert})} ref='main' onScroll={ev => this.setScroll(ev) }>
        <div className='scroll-inner'>
          <Header page={this.state.index} hasScrolled={this.state.hasScrolled}
            setAnimationEnded={this.setAnimationEnded}
            setAnimationArrived={this.setAnimationArrived}
            animationEnded={this.state.animationEnded}
            animationArrived={this.state.animationArrived}
            headerOpacity={this.state.headerOpacity} floatingMenu={this.state.floatingMenu} />
          <div className={css('main-modal', {'is-arrived': this.state.animationEnded, 'is-ready': this.state.animationArrived})}>
            <SwipeableViews
              ref='SwipeableViews'
              animateHeight
              action={hooks => this.updateHeight = hooks.updateHeight }
              index={index} className={`is-active-slide-${index}`}>
              <Main data={this.props.data} />
              <ProjectList data={this.props.data}/>
              <About data={this.props.data.about} scroll={this.state.scrolled} />
              <Contact data={this.props.data.contact} />
            </SwipeableViews>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}
