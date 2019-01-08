import React, { Component } from 'react'
import * as css from 'classnames'

export default class extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className={css('footer-wrap', {'is-invisible': this.props.isInvisible})} style={{opacity: this.props.footerOpacity, filter: `blur(${this.props.footerBlur}px)`}}>
        <div className='footer-container'>
          <div className='footer-block'>2018 © All rights reserved</div>
        </div>
      </div>
    )
  }
}
