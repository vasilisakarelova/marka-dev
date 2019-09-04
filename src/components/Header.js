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
      strings: ["\\//\\/\\\\\\\\\/", "/\\/\\ARKA", "M/\\RKA", "_MA|^KA_", "MAR|&#60;A", "MARK/\\", "MARKA"],
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

  render () {
    return (
      <div className={css('header-wrap', {'is-arrived': this.state.animationEnded, 'is-index': this.props.page === 0, 'is-ready': this.state.animationArrived})} ref={this.props.headerRef}>
        <div className='header-container grid'>
          <div className={css('header-block-wrap', {'is-blurred': this.props.headerBlurred})} style={{opacity: this.props.headerOpacity, filter: `blur(${this.props.headerBlur}px)`}}>
            <div className='header-block'><Link motion='scrollTop' className="header-block-link" to='/projects'>{ (this.props.page === 1) && '(' }{ (this.props.floatingMenu) ? 'prj' : 'Projects' }{ (this.props.page === 1) && ')' }</Link></div>
            <div className='header-block'><Link motion='scrollTop' className="header-block-link" to='/about-us'>{ (this.props.page === 2) && '(' }{ (this.props.floatingMenu) ? 'abt' : 'About us' }{ (this.props.page === 2) && ')' }</Link></div>
            <div className='header-block'><Link motion='scrollTop' className="header-block-link" to='/contact'>{ (this.props.page === 3) && '(' }{ (this.props.floatingMenu) ? 'cnt' : 'Contact' }{ (this.props.page === 3) && ')' }</Link></div>
          </div>
          <div className={css('header-block-wrap', {'is-blurred': this.props.headerBlurred})} style={{opacity: this.props.headerOpacity, filter: `blur(${this.props.headerBlur}px)`}}>
            <div className='header-block hide-on-mob'><a className='header-block-link-small' target='_blank' href={this.props.facebook}>Fb</a></div>
            <div className='header-block hide-on-mob'><a className='header-block-link-small' target='_blank' href={this.props.instagram}>Inst</a></div>
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
