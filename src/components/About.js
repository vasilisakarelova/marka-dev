import React, { Component } from 'react'
import * as css from 'classnames'

import HeaderFooterFloating from './HeaderFloatingFooter'

export default class extends Component {
  state = {
    currentMember: null,
    randomLeft: 0,
    randomTop: 0
  }

  constructor (props) {
    super(props)

    this.setMemeberImage = this.setMemeberImage.bind(this)
    this.removeMemeberImage = this.removeMemeberImage.bind(this)
  }

  setMemeberImage(src) {
    const getRandomArbitrary = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    this.setState({
      currentMember: src,
      randomLeft: getRandomArbitrary(0, (window.innerWidth - 300)),
      randomTop: getRandomArbitrary((this.props.scroll - 280), (this.props.scroll + window.innerHeight - 300 - 280))
    })
  }

  removeMemeberImage(src) {
    this.setState({
      currentMember: null,
    })
  }

  render () {
    return (
      <div className='border-space-saver'>
        <div className='border-space-saver-inner'>
          <div className='border-wrap'>
            <div className='about-wrap'>
              <div className='about-container grid'>
                <HeaderFooterFloating isStatic={true} isVisible={this.props.isFooterFixed} />
                <div className={css('about-team-member-photo', {'is-active': this.state.currentMember !== null })}
                  style={{top: `${this.state.randomTop}px`, left: `calc(200% + 32px + ${this.state.randomLeft}px)`}}>
                  <img src={this.state.currentMember} alt='get who it is!'/>
                </div>
                <div className='about-intro grid-menor'>
                  <div className='about-intro-container' dangerouslySetInnerHTML={{__html: this.props.data.intro}}></div>
                </div>
                <div className='about-deed-wrap'>
                  { this.props.data.whatWeDo.split(', ').map((deed,idx) => {
                      return (
                        <div className='about-deed' key={idx}>
                          <div className='about-deed-scroll'>
                            <div className='about-deed-inner'>
                              {deed}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className='about-credits-wrap grid-menor'>
                  <div className='about-credits-headline'>(C)redits</div>
                  <div className='about-team-wrap'>
                    { this.props.data.team.map((member,idx) => {
                        return (
                          <div className='about-team-member' key={idx}>
                            <a href={member.social} className='about-team-member-link'
                              onMouseEnter={ev => this.setMemeberImage(member.photo)}
                              onMouseLeave={ev => this.removeMemeberImage(member.photo)}
                              terget='_blank'>
                              <span className='about-team-member-name'>{member.name}</span>
                            </a>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
