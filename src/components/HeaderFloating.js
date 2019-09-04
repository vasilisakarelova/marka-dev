import React, { Component } from 'react'
import * as css from 'classnames'

import Link from '../helpers/Link'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  componentDidMount () {
    document.addEventListener('scrolled', () => {
      this.setState({
        isVisible: this.props.floatingMenu
      })
    })
  }

  render () {
    return (
      <div className={css('header-floating-wrap', {'is-active': this.props.floatingMenu})} style={{ visibility: this.state.isVisible ? 'visible' : 'hidden'}} ref={this.props.floatingMenuRef}>
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
        <div className={css('header-floating-footer', {'is-hidden': this.props.isFooterFixed})}>
          <div className='header-floating-footer-block'><a className='header-floating-footer-block-link' href={this.props.facebook}>Fb</a></div>
          <div className='header-floating-footer-block'><a className='header-floating-footer-block-link' href={this.props.instagram}>Inst</a></div>
        </div>
      </div>
    )
  }
}
