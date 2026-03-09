import { useState } from 'react'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleShow = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible} >
        <button onClick={toggleShow} >{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} >
        {props.children}
        <button onClick={toggleShow} >cancel</button>
      </div>
    </>
  )
}

export default Toggle