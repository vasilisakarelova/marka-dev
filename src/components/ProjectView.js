import React, { Component } from 'react'
import * as css from 'classnames'

import Link from '../helpers/Link'

export default class extends Component {
  state = {
    isVisible: false
  }

  componentDidMount() {
    setTimeout(()=>{
      document.addEventListener('scrolled', (ev) => {
        if (this.props.isBlur && (this.refs.preview !== undefined)) {
          this.setState({
            isVisible: this.refs.preview.getBoundingClientRect().top <= window.innerHeight * 0.7
          })
        }

        if (this.props.isLast && (this.refs.preview !== undefined)) {
          let btnIsFixed = this.refs.preview.getBoundingClientRect().top + this.refs.preview.getBoundingClientRect().height <= window.innerHeight
          let page = this.props.isBlur ? 0 : 1
          this.props.fixScrollBtn(btnIsFixed, page)
        }
      })

    },100)

    if (!this.props.isBlur && ((this.props.dataKey + 1) % 2 === 1)) {
      let height = this.refs.titleHeight.offsetHeight
      let sibling = document.querySelector(`[data-title-key="${this.props.dataKey + 1}"]`)
      sibling.style.height = `${height}px`
    }
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
            <div className='project-view-name' data-title-key={this.props.dataKey} ref='titleHeight'>{data.title}</div>
            <div className='project-view-tag'>{data.tags}</div>
          </div>
        </Link>
      </div>
    )
  }
}
