import React, { Component } from 'react'
import * as css from 'classnames'

import ProjectView from './ProjectView'
import HeaderFooterFloating from './HeaderFloatingFooter'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: props.data,
      toggleFiedTags: false,
    }
  }

  componentDidMount () {
    document.addEventListener('scrolled', (ev) => {
      const scrolled = ev.data.top
      this.props.rotateArrow(scrolled > 0)
      this.props.toggleTags(this.refs.projectTags.getBoundingClientRect().top <= 0)
      this.setState({
        toggleFiedTags: this.refs.projectTags.getBoundingClientRect().top <= 0
      })
    })
  }

  componentWillReceiveProps(newProps) {
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
                <div className={css('project-list-tags-container', {'is-hidden': this.state.toggleFiedTags})} ref='projectTags'>
                  <div className='project-list-tags-inner'>
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
                <HeaderFooterFloating isStatic={true} isVisible={this.props.isFooterFixed} />
                <div className='project-list-container-inner grid-menor'>
                  { projects.map((project,idx) => {
                      let isLast = (idx + 1 === projects.length)
                      return <ProjectView data={project} dataKey={idx} key={idx} isLast={isLast} isBlur={false} fixScrollBtn={this.props.fixScrollBtn}/>
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
