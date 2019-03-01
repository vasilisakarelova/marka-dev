import React, { Component } from 'react'
import * as css from 'classnames'

export default class extends Component {
  constructor (props) {
    super(props)

    this.setLanguage = this.setLanguage.bind(this)
  }

  setLanguage (lang) {
    this.props.setLanguage(lang)
  }

  render () {
    return (
      <div className={css('header-floating-footer', {'is-hidden': !this.props.isVisible, 'is-static': this.props.isStatic})}>
        <div className='header-floating-footer-block'><a className='header-floating-footer-block-link' target='_blank' href={this.props.facebook}>Fb</a></div>
        <div className='header-floating-footer-block'><a className='header-floating-footer-block-link' target='_blank' href={this.props.instagram}>Inst</a></div>
        <div className='header-floating-footer-block'>
          {this.props.lang === 'ru'
            ? <span className='header-floating-footer-block-link is-btn' onClick={ev => this.setLanguage('en')}>En</span>
            : <span className='header-floating-footer-block-link is-btn' onClick={ev => this.setLanguage('ru')}>Ru</span>
          }
        </div>
      </div>
    )
  }
}
