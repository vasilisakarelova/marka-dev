import React, { Component } from 'react'
import * as css from 'classnames'

import Link from '../helpers/Link'

export default class extends Component {
  render () {
    return (
      <div className={css('header-floating-wrap', {'is-active': this.props.floatingMenu})} ref={this.props.floatingMenuRef}>
        <div className='header-floating-menu'>
          <div className='header-floating-menu-block'>
            <Link className={this.props.page === 1 ? 'header-floating-menu-block-link is-active' : `header-floating-menu-block-link`} to='/projects'>PRJ</Link>
          </div>
          <div className='header-floating-menu-block'>
            <Link className={this.props.page === 2 ? 'header-floating-menu-block-link is-active' : `header-floating-menu-block-link`} to='/about-us'>ABT</Link>
          </div>
          <div className='header-floating-menu-block'>
            <Link className={this.props.page === 3 ? 'header-floating-menu-block-link is-active' : `header-floating-menu-block-link`} to='/contact'>CNT</Link>
          </div>
        </div>
        <div className='header-floating-footer'>
          <div className='header-floating-footer-block'><a className='header-floating-footer-block-link' href={this.props.facebook}>Fb</a></div>
          <div className='header-floating-footer-block'><a className='header-floating-footer-block-link' href={this.props.instagram}>Inst</a></div>
          <div className='header-floating-footer-block'>
            {this.props.lang === 'ru'
              ? <span className='header-floating-footer-block-link is-btn' onClick={ev => this.setLanguage('en')}>En</span>
              : <span className='header-floating-footer-block-link is-btn' onClick={ev => this.setLanguage('ru')}>Ru</span>
            }
          </div>
        </div>
      </div>
    )
  }
}
