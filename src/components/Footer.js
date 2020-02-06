import React, { Component } from 'react'
import * as css from 'classnames'

export default class extends Component {
  render () {
    return (
      <div className={css('footer-wrap', {'is-inversed': this.props.page === 3})} style={{opacity: this.props.footerOpacity, filter: `blur(${this.props.footerBlur}px)`}}>
        <div className='footer-container'>
          <div className='footer-block'>
            <span className='footer-side'>2018 © All rights reserved</span>
            <div className='footer-side footer-side--mobile'>
              <div className='footer-block--mobile'><a className='footer-block-link-small' target='_blank' href={this.props.facebook}>Fb</a></div>
              <div className='footer-block--mobile'><a className='footer-block-link-small' target='_blank' href={this.props.instagram}>Inst</a></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
