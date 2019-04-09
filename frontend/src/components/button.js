import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ sortDirection, children, onClick }) => 
{
    return(
  <button
    onClick={onClick}
    style={{
      marginLeft: '4px'
    }}
  >
    {children}
    {sortDirection && sortDirection === "DESC" ? "-": sortDirection === "ASC" ? "+" : ""} 
  </button>)
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button