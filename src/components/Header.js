import React, { Component } from 'react'
import * as css from 'classnames'
import Link from '../helpers/Link'
import Typed from 'typed.js'

export default class extends Component {
  state = {
    hasScrolled: false,
    isMobile: window.innerWidth < 768
  }

  constructor (props) {
    super(props)

    this.animationEnded = this.animationEnded.bind(this)
  }

  componentDidMount () {
    const options = {
      strings: ["\\//\\/\\\\\\\\\/", "/\\/\\ARKA", "¯\_(ツ)_/¯", "_MA|^KA_", "_MARK/\\_", "_M/\\RKA_"],/*  \//\/\\\\\\\/  */
      typeSpeed: 30,
      showCursor: false,
      onStringTyped: (arrayPos, self) => {
        if (arrayPos === 1) this.animationEnded()
      },
      onComplete: (self) => {
        setTimeout(() => {
          self.reset()
        }, 2000)
      }
    }

    const typed = new Typed(this.refs.typingLogo, options)

    document.addEventListener('resized', () => {
      this.setState({
        isMobile: window.innerWidth < 768
      })
    })
  }

  animationEnded () {
    //this.props.setAnimationEnded(true)
    this.setState({
      animationEnded: true
    })

    setTimeout(() => {
      //this.props.setAnimationArrived(true)
      this.setState({
        animationArrived: true
      })
    }, 400)
  }

  setLanguage (lang) {
    this.props.setLanguage(lang)
  }

  render () {
    return (
      <div className={css('header-wrap', {'is-floating': this.props.floatingMenu, 'is-arrived': this.state.animationEnded, 'is-index': this.props.page === 0, 'is-ready': this.state.animationArrived})}>
        <div className='header-container grid'>
          <div className={css('header-block-arrow-wrap', {'is-hidden': !this.props.hasScrolled, 'is-visible': (this.props.page === 1) || (this.props.page === 2) || (this.props.page === 3), 'is-index': this.props.page === 0})}>
            <Link className="header-block-link" to='/'>
              <span className='header-block-arrow'>
                <svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-33.000000, -246.000000)" fill="#000000">
                            <path d="M41.96,246.784 L35.624,266.248 L33.8,266.248 L40.184,246.784 L41.96,246.784 Z M53.996,266.296 L52.244,266.296 L45.86,246.856 L47.66,246.856 L53.996,266.296 Z"></path>
                        </g>
                    </g>
                </svg>
              </span>
            </Link>
          </div>
          <div className={css('header-block-wrap', {'is-floating': this.props.floatingMenu, 'is-blurred': this.props.headerBlurred})} style={{opacity: this.props.headerOpacity, filter: `blur(${this.props.headerBlur}px)`}}>
            <div className='header-block'><Link className="header-block-link" to='/projects'>{ (this.props.page === 1) && '(' }{ (this.props.floatingMenu) ? 'prj' : 'Projects' }{ (this.props.page === 1) && ')' }</Link></div>
            <div className='header-block'><Link className="header-block-link" to='/about-us'>{ (this.props.page === 2) && '(' }{ (this.props.floatingMenu) ? 'abt' : 'About us' }{ (this.props.page === 2) && ')' }</Link></div>
            <div className='header-block'><Link className="header-block-link" to='/contact'>{ (this.props.page === 3) && '(' }{ (this.props.floatingMenu) ? 'cnt' : 'Contact' }{ (this.props.page === 3) && ')' }</Link></div>
          </div>
          <div className={css('header-block-wrap', {'is-floating': this.props.floatingMenu, 'is-blurred': this.props.headerBlurred})} style={{opacity: this.props.headerOpacity, filter: `blur(${this.props.headerBlur}px)`}}>
            <div className='header-block hide-on-mob'><a className='header-block-link-small' href={this.props.facebook}>Fb</a></div>
            <div className='header-block hide-on-mob'><a className='header-block-link-small' href={this.props.instagram}>Inst</a></div>
            <div className='header-block'>
              {this.props.lang === 'ru'
                ? <span className='header-block-link-small is-btn' onClick={ev => this.setLanguage('en')}>{(this.props.floatingMenu || this.state.isMobile) ? 'En' : 'English'}</span>
                : <span className='header-block-link-small is-btn' onClick={ev => this.setLanguage('ru')}>{(this.props.floatingMenu || this.state.isMobile) ? 'Ru' : 'Russian'}</span>
              }
            </div>
          </div>
        </div>
        <div className={css('header-block-logo-wrap', {'is-animation-ended': this.state.animationEnded, 'is-arrived': this.state.animationArrived})}
            style={{opacity: this.props.headerOpacity, filter: `blur(${this.props.headerBlur}px)`, visibility: (this.props.headerOpacity === 0) ? 'hidden' : 'visible'}}>
          <div className='header-block-logo'>
            <span ref='typingLogo'></span>
          </div>
        </div>
      </div>
    )
  }
}
