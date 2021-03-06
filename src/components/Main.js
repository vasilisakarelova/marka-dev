import React, { Component } from 'react'
import * as css from 'classnames'

import ProjectView from './ProjectView'
import Link from '../helpers/Link'
import HeaderFooterFloating from './HeaderFloatingFooter'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: props.data,
      activeTag: 'all',
      toggleFiedTags: false,
    }

    this.filter = this.filter.bind(this)
  }

  componentDidMount () {
    document.addEventListener('scrolled', (ev) => {
      if (this.refs.projectTags !== undefined) {
        this.props.toggleTags(this.refs.projectTags.getBoundingClientRect().top <= 0)
        this.setState({
          toggleFiedTags: this.refs.projectTags.getBoundingClientRect().top <= 0
        })
      }
    })
  }

  filter (tag) {
    this.props.filter(tag)
  }

  render () {
    const { lang } = this.props

    let highlights = this.props.data[lang].highlights.map(highlight => {
      return this.state.data[lang].projects.find((project, projectId) => project.url === highlight)
    })

    return (
      <div className='border-space-saver' ref='test'>
        <div className='border-space-saver-inner'>
          <div className='border-wrap'>
            <div className='main-list-wrap'>
              <div className='main-list-tags grid'>
                <div className={css('main-list-tags-container', {'is-hidden': this.state.toggleFiedTags})} ref='projectTags'>
                  <div className='main-list-tags-inner'>
                    <div className='main-list-tags-scroll'>
                      { this.props.data[lang].tags.map((tag,idx) => {
                          return (
                            <div className={css('main-list-tags-item', {'is-active': this.state.activeTag === tag})} key={idx} onClick={ev => this.filter(tag)}>{tag}</div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className='main-list-container grid'>
                {/*<HeaderFooterFloating isStatic={true} isVisible={this.props.isFooterFixed} />*/}
                <div className='main-list-container-inner grid-menor'>
                  { highlights.map((project,idx) => {
                      let isLast = (idx + 1 === this.props.data[lang].highlights.length)
                      return <ProjectView data={project} key={idx} isBlur={true} isLast={isLast} scroll={this.props.scroll} fixScrollBtn={this.props.fixScrollBtn}/>
                    })
                  }
                </div>
              </div>
              <div className='main-list-btn-wrap grid'>
                <div className='main-list-btn-inner grid-menor'>
                  <Link to='/projects' className='main-list-btn' motion='scrollTop'>View all projects</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
