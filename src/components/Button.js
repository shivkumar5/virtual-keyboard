import React from 'react'

const Button = ({value,clickButton}) => {
  return (
    <div className="button" data-attr={value.length>2?value:value[0]} onClick={clickButton}>
      {
        value.length===1 || value.length > 2 ? <div className="btn__text--single"><p>{value}</p></div> : 
        <div className="btn__text--double">
          <p>{value[0]}</p> 
          <p>{value[1]}</p>
        </div>
      }
    </div>
  )
}

export default Button
