import React, { Component } from 'react'
import * as css from 'classnames'
import * as $ from 'jquery'
import 'jquery-ui'

export default class extends Component {
  state = {
    currentSliderIdx: 0,
    top: window.innerHeight
  }

  constructor (props) {
    super(props)

    this.scrollSlider = this.scrollSlider.bind(this)
    this.showScroll = this.showScroll.bind(this)
    this.hideScroll = this.hideScroll.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleProjectScroll = this.handleProjectScroll.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
  }

  handleProjectScroll (ev) {
    if (ev.target.classList.contains('project-inner-constructor-slider-scroll')) return

    const scrolled = ev.target.scrollTop  - (ev.target.clientTop || 0)
    const maxScroll = ev.target.scrollHeight - ev.target.offsetHeight
    const threshold = maxScroll - ev.target.offsetHeight
    let backgroundOpacity = 0.75
    let check = 0.75

    if (scrolled >= threshold) {
      check = (1 - ((scrolled - threshold) / ev.target.offsetHeight)) * 0.75
      backgroundOpacity = (check < 0.06) ? 0 : check
    }

    this.props.handleProjectScroll(ev)
    this.refs.projectModal.style.background = `hsla(0,0%,100%,${backgroundOpacity})`

    if (check <= 0) {
      this.props.closeModal()
    }
  }

  closeModal (ev) {
    if (ev.target.contains(this.refs.projectModal)) {
      this.props.closeModal()
    }
  }

  showScroll(dir) {
    let scroll = (dir === 'right') ? -16 : 16
    this.refs.slider.style.transform = `translateX(${scroll}px)`
  }

  hideScroll(dir) {
    let scroll = 0
    this.refs.slider.style.transform = `translateX(${scroll}px)`
  }

  scrollSlider (dir, index) {
    let scroll = 0

    if (dir === 'left' && index === 0) return
    scroll = (dir === 'right') ? this.refs.slider.childNodes[index + 1].offsetLeft : this.refs.slider.childNodes[index - 1].offsetLeft

    $(this.refs.sliderWrap).animate({
      scrollLeft: scroll
    }, 800, 'swing');

    if (scroll > (this.refs.sliderWrap.scrollWidth - this.refs.sliderWrap.clientWidth) ) return

    this.setState(prevState => {
      return {
        currentSliderIdx: (dir === 'right') ? index + 1 : index - 1
      }
    })
  }

  componentWillMount () {
    let top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0)
    this.setState({
      top: top + window.innerHeight
    })
  }

  componentDidMount () {
    let top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0)
    setTimeout(() => {
      this.setState({
        top: 44
      })
    }, 500)
  }

  setLanguage (lang) {
    this.props.setLanguage(lang)
  }

  render () {
    const data = this.props.modalData[this.props.lang]

    return (
      <div className={css('project-modal-wrap', {'is-open': this.props.openModal})} onClick={this.closeModal} ref='projectModal' onScroll={ev => this.handleProjectScroll(ev)}>
        <div className='border-space-saver' style={{transform: `translateY(${this.state.top}px)`}}>
          <div className='border-space-saver-inner'>
            <div className='border-wrap'>
              <div className='project-wrap grid'>
                <div className='project-inner-close-btn'>
                  <div onClick={ev => this.props.closeModal()}>(X)</div>
                </div>
                <div className='project-container grid'>
                  <div className='project-inner-title'>
                    <span className='project-inner-close-btn project-inner-close-btn--mobile'>
                      <div onClick={ev => this.props.closeModal()}>(X)</div>
                    </span>
                    {data.title}
                    <div className='project-inner-short-desc'>{data.shortDesc}</div>
                  </div>
                  <div className='project-inner-constructor-desc'>
                    <div className='project-inner-constructor-desc-tags'>{data.tags}</div>
                    <div>{data.year}</div>
                    <div>{data.location}</div>
                    <div>
                      {this.props.lang === 'ru'
                        ? <span className='project-inner-constructor-lang-link' onClick={ev => this.setLanguage('en')}>(Read in Eglish)</span>
                        : <span className='project-inner-constructor-lang-link' onClick={ev => this.setLanguage('ru')}>(Прочитать на русском)</span>
                      }
                    </div>
                  </div>
                  { Object.keys(data.constructor).map((block, idx) => {
                      const info = data.constructor[block]

                      if (block === 'text') {
                        return (
                          <div className='project-inner-constructor-text' key={idx}>
                            {info}
                          </div>
                        )
                      } else if (block === 'slider') {
                        return (
                          <div className='project-inner-constructor-slider-wrap grid' key={idx}>
                            <div className='project-inner-constructor-slider-count'>{info.length} imgs</div>
                            <div className='project-inner-constructor-slider-scroll grid' ref='sliderWrap'>
                              <div className='project-inner-constructor-slider' ref='slider'>
                                { info.map((img,imgIdx) => {
                                    return (
                                      <div key={imgIdx} className='project-inner-constructor-slider-item'>
                                        <img className='project-inner-constructor-slider-img' src={img.url} alt='slider items' />
                                        <div className='project-inner-constructor-slider-desc'>
                                          {img.desc}
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                            <div className={css('project-inner-constructor-slider-left-btn', {'is-disabled': this.state.currentSliderIdx === 0})} onMouseOver={ev => this.showScroll('left')} onMouseLeave={ev => this.hideScroll('left')} onClick={ev => this.scrollSlider('left', this.state.currentSliderIdx)}></div>
                            <div className={css('project-inner-constructor-slider-right-btn', {'is-disabled': this.state.currentSliderIdx === (info.length - 2)})} onMouseOver={ev => this.showScroll('right')} onMouseLeave={ev => this.hideScroll('right')} onClick={ev => this.scrollSlider('right', this.state.currentSliderIdx)}></div>
                          </div>
                        )
                      }
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
