import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles, img = "default"}) => {
  return (
    <button
      type={btnType}
      className={styles}
      onClick={handleClick}
    >
        <img 
            className="w-4 h-4 sm:w-6 sm:h-6 "
            src={img}
        />
      <span className="hidden sm:inline">{title}</span>
    </button>
  )
}

export default CustomButton