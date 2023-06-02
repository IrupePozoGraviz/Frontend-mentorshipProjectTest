/* eslint-disable react/react-in-jsx-scope */
import React from 'react'

const Image = (props) => {
  return (
    <div>
      <img src={props.src} className={props.className} alt="" allowFullScreen />
    </div>
  )
}
export default Image