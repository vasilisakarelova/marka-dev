import React, { Component } from 'react'
import * as css from 'classnames'
import Link from '../helpers/Link'
import Typist from 'react-typist'

export default class extends Component {
  state = {
    language: 'en',
    hasScrolled: false,
  }

  constructor (props) {
    super(props)

    this.animationEnded = this.animationEnded.bind(this)
  }

  animationEnded () {
    this.props.setAnimationEnded(true)

    setTimeout(() => {
      this.props.setAnimationArrived(true)
    }, 400)
  }

  setLanguage (lang) {
    console.log(lang)
  }

  render () {
    return (
      <div className={css('header-wrap', {'is-floating': this.props.floatingMenu})}>
        <div className='header-container grid'>
          <div className={css('header-block-arrow-wrap', {'is-hidden': !this.props.hasScrolled, 'is-visible': this.props.page === 3, 'is-index': this.props.page === 0})}>
            <Link className="header-block-link" to='/'><span className='header-block-arrow'>/\</span></Link>
          </div>
          <div className={css('header-block-wrap', {'is-floating': this.props.floatingMenu})} style={{opacity: this.props.headerOpacity}}>
            <div className='header-block'><Link className="header-block-link" to='/projects'>{ (this.props.page === 1) && '(' }{ (this.props.floatingMenu) ? 'prj' : 'Projects' }{ (this.props.page === 1) && ')' }</Link></div>
            <div className='header-block'><Link className="header-block-link" to='/about-us'>{ (this.props.page === 2) && '(' }{ (this.props.floatingMenu) ? 'abt' : 'About us' }{ (this.props.page === 2) && ')' }</Link></div>
            <div className='header-block'><Link className="header-block-link" to='/contact'>{ (this.props.page === 3) && '(' }{ (this.props.floatingMenu) ? 'cnt' : 'Contact' }{ (this.props.page === 3) && ')' }</Link></div>
          </div>
          <div className={css('header-block-wrap', {'is-floating': this.props.floatingMenu})} style={{opacity: this.props.headerOpacity}}>
            <div className='header-block'><a className='header-block-link-small' href=''>Inst</a></div>
            <div className='header-block'><a className='header-block-link-small' href=''>Fb</a></div>
            <div className='header-block'>
              {this.state.language === 'ru'
                ? <span className='header-block-link-small' onClick={ev => this.setLanguage('en')}>{(this.props.floatingMenu) ? 'EN' : 'English'}</span>
                : <span className='header-block-link-small' onClick={ev => this.setLanguage('ru')}>{(this.props.floatingMenu) ? 'RU' : 'Russian'}</span>
              }
            </div>
          </div>
        </div>
        <div className={css('header-block-logo-wrap', {'is-animation-ended': this.props.animationEnded, 'is-arrived': this.props.animationArrived})}
            style={{opacity: this.props.headerOpacity, visibility: (this.props.headerOpacity === 0) ? 'hidden' : 'visible'}}>
          <div className='header-block-logo'>
            <Typist cursor={{ hideWhenDone: true }} onTypingDone={ev => this.animationEnded()}>
              <span>\//\/\\\\\\\/</span>
            </Typist>
          </div>
        </div>
      </div>
    )
  }
}
