import React, { Component } from 'react'

export default class extends Component {
  render () {
    return (
      <div className='contact-wrap grid'>
        <div className='contact-container grid-menor'>
          <div className='contact-container-inner'>
            <div className='contact-link'><a href={`mailto:${this.props.data.email}`} target="_blank">{this.props.data.email}</a></div>
            <div className='contact-link'><a href={`tel:${this.props.data.phone}`} target="_blank">{this.props.data.phone}</a></div>
            <div className='contact-social'>
              <a href={this.props.data.facebook}>{this.props.data.facebook.replace(/^https?\:\/\//i, "")}</a>
            </div>
            <div className='contact-social'>
              <a href={this.props.data.instagram}>{this.props.data.instagram.replace(/^https?\:\/\//i, "")}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
