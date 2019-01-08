import React, { Component } from 'react'
import page from 'page'
import SwipeableViews from 'react-swipeable-views'
import * as css from 'classnames'

import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import ProjectList from './components/ProjectList'
import Project from './components/Project'
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
      floatingMenu: false,
      openModal: false,
      modalData: null,
      isMobile: window.innerWidth < 768,
      lang: 'en',
      filtered: [],
      activeTag: 'all'
    }

    this.initRouting = this.initRouting.bind(this)
    this.setAnimationEnded = this.setAnimationEnded.bind(this)
    this.setAnimationArrived = this.setAnimationArrived.bind(this)
    this.setScroll = this.setScroll.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.scrollTo = this.scrollTo.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.scrollTo = this.scrollTo.bind(this)
    this.filter = this.filter.bind(this)
  }

  componentDidMount() {
    this.initRouting(this.props.data['en'],this.props.data['ru'])
    document.addEventListener('resized', () => {
      this.handleResize()

      this.setState({
        isMobile: window.innerWidth < 768
      })
    })
  }

  scrollTo (to, duration) {
    const element = this.refs.main
    const start = element.scrollTop
    const change = to - start
    const startDate = +new Date()
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad = function(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
    const animateScroll = function() {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration),10)
        if(currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
        else {
            element.scrollTop = to;
        }
    };
    animateScroll();
  }

  handleResize (height) {
    this.updateHeight()
    this.refs.SwipeableViews.containerNode.style.height = `${height}px`
  }

  initRouting(dataEn, dataRu) {
    page.base('/new')

    page('/', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 0,
        isInvert: false,
        openModal: false
      })
    })

    page('/projects', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 1,
        isInvert: false,
        openModal: false
      })
    })

    page('/about-us', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 2,
        isInvert: false,
        openModal: false
      })
    })

    page('/contact', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 3,
        isInvert: true,
        openModal: false
      })
    })

    dataEn.projects.forEach((project, idx) => {
      const projectRu = dataRu.projects[idx]

      page(`/${project.url}`, (ctx, next) => {
        this.setState({
          openModal: true,
          modalData: { 'en': project, 'ru': projectRu},
          route: ctx.path,
          isInvert: false
        })

        this.scrollTo(0, 400)
      })
    })

    page()
  }

  filter (tag) {
    page('/new/projects')

    const result = (tag === 'all') ? [] : this.props.data[this.state.lang].projects.filter(project => {
      return project.tags === tag
    })

    this.setState(prevState => ({
        filtered: result,
        activeTag: tag
    }))

    console.log(this.projectListRef)
    setTimeout(() => {
      this.handleResize(this.projectListRef)
    }, 100)
  }

  scrollTo (to, duration) {
    const
    element = this.refs.main,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    },
    animateScroll = function() {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration),10)
        if(currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
        else {
            element.scrollTop = to;
        }
    };
    animateScroll();
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
    let opacity = 0
    let blur = 0
    let footerOpacity = 1
    let footerBlur = 0

    let threshold = ev.currentTarget.scrollHeight - ev.currentTarget.offsetHeight - 80 - 16
    let diff = ev.currentTarget.scrollTop - threshold
    if (diff >= 0) {
      footerOpacity = diff * 100 / (80 + 16) / 100
      footerBlur = 10 - (diff * 100 / (80 + 16) / 10)
    }

    switch (this.state.index) {
      case 0:
        opacity = (ev.currentTarget.scrollTop * 100 / (280 - (60 - 16)) / 100)
        blur = (ev.currentTarget.scrollTop * 100 / (280 - (60 - 16)) / 10)
        break
      default:
        opacity = (ev.currentTarget.scrollTop * 100 / (60 - 16) / 100)
        blur = (ev.currentTarget.scrollTop * 100 / (60 - 16) / 10)
        break
    }

    this.setState({
      scrolled: ev.currentTarget.scrollTop,
      headerOpacity: (opacity <= 1) ? (1 - opacity) : 0,
      footerOpacity: footerOpacity,
      footerBlur: footerBlur,
      headerBlur: blur,
      floatingMenu: (opacity <= 1) ? false : true
    })

    this.setState({
      hasScrolled: ev.currentTarget.scrollTop !== 0
    })
  }

  setLanguage (newLang) {
    this.setState({
      lang: newLang
    })

    setTimeout(() => {
      this.handleResize()
    },10)
  }

  closeModal () {
    this.setState({
      openModal: false
    })

    if (this.state.index === 0) {
      page('/')
    } else if (this.state.index === 1) {
      page('/projects')
    } else if (this.state.index === 2) {
      page('/about')
    } else if (this.state.index === 3) {
      page('/contact')
    }
  }

  render() {
    const { index, lang } = this.state
    const { facebook, instagram } = this.props.data[lang].contact

    return (
      <div className={css('scroll-wrap', {'is-invert': this.state.isInvert})} ref='main' onScroll={ev => this.setScroll(ev) }>
        <div className={css('scroll-inner', {'is-index': index === 0})}>
          <Header page={this.state.index} hasScrolled={this.state.hasScrolled}
            setAnimationEnded={this.setAnimationEnded}
            setAnimationArrived={this.setAnimationArrived}
            animationEnded={this.state.animationEnded}
            animationArrived={this.state.animationArrived}
            lang={this.state.lang} setLanguage={this.setLanguage}
            facebook={facebook} instagram={instagram}
            headerOpacity={this.state.headerOpacity} headerBlur={this.state.headerBlur} floatingMenu={this.state.floatingMenu} />
          <div className={css('main-modal', {'is-arrived': this.state.animationEnded, 'is-ready': this.state.animationArrived, 'is-index': index === 0})}>
            <SwipeableViews
              ref='SwipeableViews'
              animateHeight
              action={hooks => this.updateHeight = hooks.updateHeight }
              index={index} className={`is-active-slide-${index}`}>
              <Main data={this.props.data} lang={lang} scroll={this.state.scrolled} filter={this.filter} handleResize={this.handleResize} />
              <ProjectList data={this.props.data} lang={lang}
                filtered={this.state.filtered} filter={this.filter} activeTag={this.state.activeTag}
                projectListRef={el => this.projectListRef = el}
                scroll={this.state.scrolled} handleResize={this.handleResize} />
              <About data={this.props.data[lang].about} scroll={this.state.scrolled} />
              <Contact data={this.props.data[lang].contact} />
            </SwipeableViews>
          </div>
          { this.state.openModal && <Project openModal={this.state.openModal} lang={lang} closeModal={this.closeModal} modalData={this.state.modalData} />}
          <Footer isInvisible={!this.state.animationArrived} footerOpacity={this.state.footerOpacity} footerBlur={this.state.footerBlur} />
          { this.state.isMobile &&
            <div className={css('scroll-top-btn', {'is-visible': this.state.floatingMenu})} onClick={ev => this.scrollTo(0, 500)}>/\</div>
          }
        </div>
      </div>
    )
  }
}
