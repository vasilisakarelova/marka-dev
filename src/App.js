import React, { Component } from 'react'
import page from 'page'
import SwipeableViews from 'react-swipeable-views'
import * as css from 'classnames'

import getBrowser from './helpers/getBrowser.js'
import Link from './helpers/Link'
import scrollTo from './helpers/scrollTo.js'

import Header from './components/Header'
import HeaderFloating from './components/HeaderFloating'
import Footer from './components/Footer'
import Main from './components/Main'
import ProjectList from './components/ProjectList'
import Project from './components/Project'
import About from './components/About'
import Contact from './components/Contact'
import CommonTags from './components/CommonTags'
import BackArrow from './components/BackArrow'

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
      activeTag: 'all',
      toggleTags: false,
      headerBlurred: false,
      arrowRotated: false
    }

    this.initRouting = this.initRouting.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.filter = this.filter.bind(this)
    this.fixScrollBtn = this.fixScrollBtn.bind(this)
    this.toggleTags = this.toggleTags.bind(this)
    this.rotateArrow = this.rotateArrow.bind(this)
    this.handleProjectScroll = this.handleProjectScroll.bind(this)
  }

  handleProjectScroll (ev) {
    const scrolled = (window.pageYOffset || ev.target.scrollTop)  - (ev.target.clientTop || 0)
    const maxScroll = ev.target.scrollHeight - ev.target.offsetHeight
    if (scrolled >= (maxScroll - ev.target.offsetHeight)) {
      //console.log('start to fade')
    }
  }

  componentDidMount() {
    this.initRouting(this.props.data['en'],this.props.data['ru'])
    document.addEventListener('resized', () => {
      this.handleResize()

      this.setState({
        isMobile: window.innerWidth < 768
      })
    })

    document.addEventListener('scrolled', (ev) => {
      const scrolled = ev.data.top

      // блюр и прозрачность меню и футера про скролле
      let opacity = 0
      let blur = 0
      let footerOpacity = 1
      let footerBlur = 0

      let threshold = document.documentElement.scrollHeight - window.innerHeight - 80 - 16
      let diff = scrolled - threshold
      if (diff >= 0) {
        footerOpacity = diff * 100 / (80 + 16) / 100
        footerBlur = 10 - (diff * 100 / (80 + 16) / 10)
      }

      switch (this.state.index) {
        case 0:
          opacity = (scrolled * 100 / (280 - (60 - 16)) / 100)
          blur = (scrolled * 100 / (280 - (60 - 16)) / 10)
          break
        default:
          opacity = (scrolled * 100 / (60 - 16) / 100)
          blur = (scrolled * 100 / (60 - 16) / 10)
          break
      }

      this.setState({
        scrolled: scrolled,
        headerOpacity: (opacity <= 1) ? (1 - opacity) : 0,
        footerOpacity: footerOpacity,
        footerBlur: footerBlur,
        headerBlur: blur,
        floatingMenu: (opacity <= 1) ? false : true
      })

      this.setState({
        hasScrolled: scrolled !== 0
      })
    })
  }

  rotateArrow (type) {
    this.setState({
      arrowRotated: type
    })
  }

  handleResize (height) {
    this.updateHeight()
    this.refs.SwipeableViews.containerNode.style.height = `${height}px`
    setTimeout(() => {
      if (this.refs.main.offsetHeight === window.innerHeight) {
        this.setState({
          footerOpacity: 1,
          footerBlur: 0
        })
      }
    }, 400)
  }

  initRouting(dataEn, dataRu) {
    page.base('/new')

    page('/', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 0,
        isInvert: false,
        openModal: false,
        headerBlurred: false
      })

      document.documentElement.classList.remove('is-locked')

      //this.scrollTo(0, 400)
    })

    page('/projects', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 1,
        isInvert: false,
        openModal: false,
        headerBlurred: false
      })

      document.documentElement.classList.remove('is-locked')

      //this.scrollTo(0, 400)
    })

    page('/about-us', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 2,
        isInvert: false,
        openModal: false,
        headerBlurred: false
      })

      document.documentElement.classList.remove('is-locked')
    })

    page('/contact', (ctx, next) => {
      this.setState({
        route: ctx.path,
        index: 3,
        isInvert: true,
        openModal: false,
        headerBlurred: false
      })

      document.documentElement.classList.remove('is-locked')
    })

    dataEn.projects.forEach((project, idx) => {
      const projectRu = dataRu.projects[idx]

      page(`/${project.url}`, (ctx, next) => {
        this.setState({
          openModal: true,
          modalData: { 'en': project, 'ru': projectRu},
          route: ctx.path,
          isInvert: false,
          headerBlurred: true
        })

        document.documentElement.classList.add('is-locked')
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

    setTimeout(() => {
      this.handleResize(this.projectListRef)
    }, 100)
  }

  setLanguage (newLang) {
    this.setState({
      lang: newLang
    })

    setTimeout(() => {
      this.handleResize()
    },10)
  }

  fixScrollBtn (mode, page) {
    if (this.state.index === page) {
      this.setState({
        [`fixScrollBtn${page}`]: mode
      })
    }
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

  toggleTags (type) {
    this.setState({
      toggleTags: type
    })
  }

  render() {
    const { index, lang } = this.state
    const { facebook, instagram } = this.props.data[lang].contact

    return (
      <div>
        { this.state.toggleTags && <CommonTags index={this.state.index} activeTag={this.state.activeTag} filter={this.filter} tags={this.props.data[lang].tags} /> }
        <div className={css('scroll-wrap', {'is-invert': this.state.isInvert})} ref='main'>
        <div className={css('scroll-inner', {'is-index': index === 0})}>
          <BackArrow index={this.state.index} hasScrolled={this.state.hasScrolled} arrowRotated={this.state.arrowRotated} />
          <Header headerRef={el => this.headerRef = el} page={this.state.index} hasScrolled={this.state.hasScrolled}
            animationEnded={this.state.animationEnded}
            animationArrived={this.state.animationArrived}
            lang={this.state.lang} setLanguage={this.setLanguage}
            facebook={facebook} instagram={instagram}
            headerOpacity={this.state.headerOpacity} headerBlurred={this.state.headerBlurred} headerBlur={this.state.headerBlur} />
          <div className={css('main-modal')}>
            <HeaderFloating
              floatingMenu={this.state.floatingMenu} page={this.state.index}
              facebook={facebook} instagram={instagram} lang={this.state.lang} setLanguage={this.setLanguage} />
            <SwipeableViews
              ref='SwipeableViews'
              animateHeight
              action={hooks => this.updateHeight = hooks.updateHeight }
              index={index} className={`is-active-slide-${index}`}>
              <Main data={this.props.data} lang={lang} scroll={this.state.scrolled} filter={this.filter} handleResize={this.handleResize} fixScrollBtn={this.fixScrollBtn} toggleTags={this.toggleTags}/>
              <ProjectList data={this.props.data} lang={lang}
                toggleTags={this.toggleTags}
                filtered={this.state.filtered} filter={this.filter} activeTag={this.state.activeTag}
                projectListRef={el => this.projectListRef = el}
                rotateArrow={this.rotateArrow}
                scroll={this.state.scrolled} handleResize={this.handleResize}
                setTagsWidth={this.setTagsWidth}
                fixScrollBtn={this.fixScrollBtn} />
              <About data={this.props.data[lang].about} scroll={this.state.scrolled} />
              <Contact data={this.props.data[lang].contact} />
            </SwipeableViews>
          </div>
          { this.state.openModal && <Project openModal={this.state.openModal} lang={lang} setLanguage={this.setLanguage} closeModal={this.closeModal} modalData={this.state.modalData} handleProjectScroll={this.handleProjectScroll}/>}
          { this.state.isMobile &&
            <div className={css('scroll-top-btn', {'is-visible': this.state.floatingMenu, 'is-arrived-0': this.state.fixScrollBtn0, 'is-arrived-1': this.state.fixScrollBtn1})} onClick={ev => scrollTo(0, 500)}>
              <svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g transform="translate(-33.000000, -246.000000)" fill="#000000">
                          <path d="M41.96,246.784 L35.624,266.248 L33.8,266.248 L40.184,246.784 L41.96,246.784 Z M53.996,266.296 L52.244,266.296 L45.86,246.856 L47.66,246.856 L53.996,266.296 Z"></path>
                      </g>
                  </g>
              </svg>
            </div>
          }
          <Footer page={this.state.index} footerOpacity={this.state.footerOpacity} footerBlur={this.state.footerBlur} />
        </div>
      </div>
      </div>
    )
  }
}
