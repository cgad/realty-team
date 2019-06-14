import React from 'react';
import './App.scss';
import Container from './Components/Container/Container';
import Nav from './Components/Nav/Nav';

function App() {
  return (
    <div className="app">
      <Container>
        <Nav />
      </Container>
    </div>
  );
}

export default App;
