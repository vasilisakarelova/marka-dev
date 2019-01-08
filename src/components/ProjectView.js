import React, { Component } from 'react'
import * as css from 'classnames'

import Link from '../helpers/Link'

export default class extends Component {
  state = {
    isVisible: false
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      isVisible: this.refs.preview.getBoundingClientRect().top <= window.innerHeight * 0.7
    })
  }

  render () {
    const data = this.props.data

    return (
      <div className={css('project-view-wrap', `is-${data.cover.orientation}`, {'on-project': !this.props.isBlur, 'on-index': this.props.isBlur, 'is-blur': this.props.isBlur, 'is-visible': this.state.isVisible})} ref='preview'>
        <Link to={`/new/${data.url}`} className='project-view-link'>
          <div className='project-view-container'>
            <div className='project-view-cover-wrap'>
              <img className='project-view-cover' alt='cover' src={data.cover.src}/>
            </div>
            <div className='project-view-name'>{data.title}</div>
            <div className='project-view-tag'>{data.tags}</div>
          </div>
        </Link>
      </div>
    )
  }
}
