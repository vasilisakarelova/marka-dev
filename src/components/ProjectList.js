import React, { Component } from 'react'
import * as css from 'classnames'
import Waypoint from 'react-waypoint'

import ProjectView from './ProjectView'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: props.data,
      tagsFixed: false,
    }
  }

  componentDidMount () {
    this.setState({
      tagsWidth: this.refs.tagsContainer.offsetWidth
    })

    document.addEventListener('resized', () => {
      if (this.refs.tagsContainer !== undefined) {
        this.setState({
          tagsWidth: this.refs.tagsContainer.offsetWidth
        })
      }
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      tagsFixed: this.refs.tagsContainer.getBoundingClientRect().top <= 0
    })
    if (newProps.filterTag !== undefined) this.filter(newProps.filterTag)
  }

  render () {
    const { lang } = this.props
    const projects = this.props.filtered.length === 0 ? this.state.data[lang].projects : this.props.filtered

    return (
      <div className='border-space-saver' ref={this.props.projectListRef}>
        <div className='border-space-saver-inner'>
          <div className='border-wrap'>
            <div className='project-list-wrap'>
              <div className='project-list-tags grid'>
                <div className={css('project-list-tags-container', {'is-fixed': this.state.tagsFixed })} ref='tagsContainer'>
                  <div className='project-list-tags-inner' style={{top: `${this.props.scroll}px`, width: `${this.state.tagsWidth}px`}}>
                    <div className={css('project-list-tags-item', {'is-active': this.props.activeTag === 'all'})} onClick={ev => this.props.filter('all')}>All</div>
                    { this.props.data[lang].tags.map((tag,idx) => {
                        return (
                          <div className={css('project-list-tags-item', {'is-active': this.props.activeTag === tag})} key={idx} onClick={ev => this.props.filter(tag)}>{tag}</div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='project-list-container grid'>
                <div className='project-list-container-inner grid-menor'>
                  { projects.map((project,idx) => {
                      return <ProjectView data={project} key={idx} isBlur={false} />
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
