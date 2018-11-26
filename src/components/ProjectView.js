import React, { Component } from 'react'
import * as css from 'classnames'

export default class extends Component {
  render () {
    const data = this.props.data
    return (
      <div className={css('project-view-wrap', `is-${data.cover.orientation}`, {'is-blur': this.props.isBlur})}>
        <div className='project-view-container'>
          <div className='project-view-cover-wrap'>
            <img className='project-view-cover' alt='cover' src={data.cover.src}/>
          </div>
          <div className='project-view-name'>{data.title}</div>
          <div className='project-view-tag'>({data.tags})</div>
        </div>
      </div>
    )
  }
}
