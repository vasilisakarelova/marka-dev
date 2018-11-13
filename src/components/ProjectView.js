import React, { Component } from 'react'

export default class extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const data = this.props.data

    return (
      <div className='project-view-wrap'>
        <div className='project-view-container'>
          <div className='project-view-cover-wrap'>
            <img className='project-view-cover' alt='cover' src={data.cover}/>

          </div>
          <div className='project-view-name'>{data.title}</div>
          <div className='project-view-tag'>({data.tags})</div>
        </div>
      </div>
    )
  }
}
