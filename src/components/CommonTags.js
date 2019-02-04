import React, { Component } from 'react'
import * as css from 'classnames'

export default class App extends Component {
  render () {
    return (
      <div className={css('common-tags', {'is-hidden': this.props.index === 2 || this.props.index === 3})}>
        <div className='project-list-tags grid'>
          <div className='project-list-tags-container'>
            <div className='project-list-tags-inner'>
              { (this.props.index === 1) && <div className={css('project-list-tags-item', {'is-active': this.props.activeTag === 'all'})} onClick={ev => this.props.filter('all')}>All</div>}
              { this.props.tags.map((tag,idx) => {
                  return (
                    <div className={css('project-list-tags-item', {'is-active': this.props.activeTag === tag})} key={idx} onClick={ev => this.props.filter(tag)}>{tag}</div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
