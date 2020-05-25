import React from 'react';
import './header.scss'

function Header({run}) {
  return (
    <div className="header">
      <div className="header-item" onClick={() => run()}>
        Run
      </div>
    </div>
  )
}

export default Header;
