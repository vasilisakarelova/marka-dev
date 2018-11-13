import React, { Component } from 'react'

import ProjectView from './ProjectView'

export default class extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className='border-wrap'>
        <div className='project-list-wrap'>
          <div className='project-list-tags'>
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
          <div className='project-list-container'>
            { this.props.data.projects.map((project,idx) => {
                return <ProjectView data={project} key={idx}/>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
