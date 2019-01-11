import React, { Component } from 'react'
import * as css from 'classnames'

import Link from '../helpers/Link'

export default class extends Component {
  render () {
    return (
      <div className={css('header-block-arrow-wrap', {'is-hidden': !this.props.hasScrolled, 'is-visible': (this.props.index === 1) || (this.props.index === 2) || (this.props.index === 3)})}>
        <Link className="header-block-link" to='/'>
          <span className={css('header-block-arrow', {'is-inversed': this.props.index === 3, 'is-index': this.props.index === 0, 'is-rotated': this.props.arrowRotated})}>
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
    )
  }
}
