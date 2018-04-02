import React, { Component } from 'react';
import './App.css';
import ProductsContainer from './components/ProductsContainer'

class App extends Component {
  render() {
    return (
      <div>
        <ProductsContainer />
      </div>
    );
  }
}

export default App;