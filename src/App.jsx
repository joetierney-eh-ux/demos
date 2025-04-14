import React from 'react';
import Heading from "./components/Heading";

function App() {

  const NavItem = ({label = 'Label', url = "/"}) => {

    const naveStyle = {display : 'flex', justifyContent: 'center', alignContent: 'center'};

    return (
      <div className='nav-item'>
        <a href={url} className='button button-primary button-lg' style={naveStyle}>
          {label} 
        </a>
      </div>
    )
  }

  return (
    <>
      <nav className="nav-base">
        <Heading level={1}>Demos</Heading>
        <div className="nav-items">
          <NavItem label='Birth Date inputs' url='/demos/date-of-birth/' />
          <NavItem label='Date range' url='/demos/date-range/' />
          <NavItem label='Time inputs' url='/demos/time-input/' />
          <NavItem label='Time selections' url='/demos/time-select/' />
        </div>
      </nav>
    </>
  )
}

export default App
