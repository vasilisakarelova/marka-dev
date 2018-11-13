import React, { Component } from 'react'
import * as css from 'classnames'
import Link from '../helpers/Link'

export default class extends Component {
  state = {
    language: 'ru',
    hasScrolled: false,
    animationEnded: false
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        animationEnded: true
      })
    }, 2000)
  }

  setLanguage (lang) {
    console.log(lang)
  }

  render () {
    return (
      <div className='header-wrap'>
        <div className='header-container'>
          <div className={css('header-block-arrow', {'is-hidden': !this.state.hasScrolled})}>/\</div>
          <div className='header-block-wrap'>
            <div className='header-block'><Link className="header-block-link" to='/projects'>{ (this.props.page === 1) ? '(Projects)' : 'Projects'}</Link></div>
            <div className='header-block'><Link className="header-block-link" to='/about-us'>{ (this.props.page === 2) ? '(About us)' : 'About us'}</Link></div>
            <div className='header-block'><Link className="header-block-link" to='/contact'>{ (this.props.page === 3) ? '(Contact)' : 'Contact'}</Link></div>
          </div>
          <div className='header-block-wrap'>
            <div className='header-block'><a className='header-block-link-small' href=''>Inst</a></div>
            <div className='header-block'><a className='header-block-link-small' href=''>Fb</a></div>
            <div className='header-block'>{this.state.language === 'ru' ? <span className='header-block-link-small' onClick={ev => this.setLanguage('en')}>English</span> : <span onClick={ev => this.setLanguage('en')}>Russian</span>}</div>
          </div>
        </div>
        <div className={css('header-block-logo-wrap', {'is-animation-ended': this.state.animationEnded, 'is-arrived': this.state.hasScrolled})}>
          <div className='header-block-logo'>
            <span>\//\/\\\\\\\/</span>
          </div>
        </div>
      </div>
    )
  }
}
