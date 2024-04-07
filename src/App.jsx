import React, { useState, useEffect } from 'react';
import './App.css';
import News from './news';

function App() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= lastScrollTop) {
        setHeaderVisible(true);
      } else if (currentScroll > lastScrollTop && currentScroll > 100) {
        setHeaderVisible(false);
      }
      setLastScrollTop(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="App">
      <header className={`App-header ${headerVisible ? '' : 'header-hidden'}`}>
        <h1>The News App</h1>
      </header>
      <main>
        <News />
      </main>
      <button onClick={scrollToTop} className="top-button">Top</button>
    </div>
  );
}

export default App;
