import React, { Component } from 'react'

import Link from '../helpers/Link'
import ProjectView from './ProjectView'

export default class extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className='border-space-saver'>
        <div className='border-space-saver-inner'>
          <div className='border-wrap'>
            <div className='project-list-wrap'>
              <div className='project-list-tags grid'>
                <div className='project-list-tags-container'>
                  <div className='project-list-tags-inner'>
                    { this.props.data.tags.map((tag,idx) => {
                        return (
                          <div className='project-list-tags-item' key={idx}>{tag}</div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='project-list-container grid'>
                <div className='project-list-container-inner grid-menor'>
                  { this.props.data.projects.filter(project => this.props.data.highlights.includes(project.url)).map((project,idx) => {
                      return <ProjectView data={project} key={idx} isBlur={true} />
                    })
                  }
                </div>
              </div>
              <div className='project-list-btn-wrap grid'>
                <div className='project-list-btn-inner grid-menor'>
                  <Link to='/projects' className='project-list-btn'>View all projects</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
