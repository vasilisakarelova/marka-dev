import React from 'react'
import page from 'page'

export default (props) => {
  let classes = props.className

  const handleClick = (ev) => {
    ev.preventDefault()
    page(props.to)
  }

  if (props.currentPage === props.to) {
    classes += ' is-active'
  }

  return (
    <a href={ props.to } className={ classes } onClick={ handleClick }>{ props.children }</a>
  )
}
