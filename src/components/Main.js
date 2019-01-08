import React, { Component } from 'react'
import * as css from 'classnames'

import ProjectView from './ProjectView'
import Link from '../helpers/Link'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: props.data,
      activeTag: 'all',
      tagsFixed: false,
    }

    this.filter = this.filter.bind(this)
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
  }

  filter (tag) {
    this.props.filter(tag)
  }

  render () {
    const { lang } = this.props

    return (
      <div className='border-space-saver' ref='test'>
        <div className='border-space-saver-inner'>
          <div className='border-wrap'>
            <div className='main-list-wrap'>
              <div className='main-list-tags grid'>
                <div className={css('main-list-tags-container', {'is-fixed': this.state.tagsFixed })} ref='tagsContainer'>
                  <div className='main-list-tags-inner' style={{top: `${this.props.scroll}px`, width: `${this.state.tagsWidth}px`}}>
                    { this.props.data[lang].tags.map((tag,idx) => {
                        return (
                          <div className={css('main-list-tags-item', {'is-active': this.state.activeTag === tag})} key={idx} onClick={ev => this.filter(tag)}>{tag}</div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='main-list-container grid'>
                <div className='main-list-container-inner grid-menor'>
                  { this.state.data[lang].projects.filter(project => this.props.data[lang].highlights.includes(project.url)).map((project,idx) => {
                      return <ProjectView data={project} key={idx} isBlur={true} scroll={this.props.scroll}/>
                    })
                  }
                </div>
              </div>
              <div className='main-list-btn-wrap grid'>
                <div className='main-list-btn-inner grid-menor'>
                  <Link to='/projects' className='main-list-btn'>View all projects</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
