import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function useWindowSize() {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

const extractElementSize = element => ({innerWidth: element.innerWidth, innerHeight: element.innerHeight})

  useEffect(() => {
    const {innerWidth, innerHeight} = extractElementSize(window);
    setWidth(innerWidth);
    setHeight(innerHeight);

    window.addEventListener('resize', e => {
      const {innerWidth, innerHeight} = extractElementSize(e.target);
      setWidth(innerWidth);
      setHeight(innerHeight);
    })
  })

  return {width, height}
}

function App() {
  const {width, height} = useWindowSize();

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            Width: <span>{width}</span>
          </div>
          <div>
            Height: <span>{height}</span>
          </div>
        </header>
      </div>
  );
}

export default App;
