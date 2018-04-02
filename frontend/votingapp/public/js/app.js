import React, { Component } from 'react';
import './App.css';
import ProductsContainer from './components/ProductsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Popular Products</h1>
        </div>
        <ProductsContainer />
      </div>
    );
  }
}

export default App;

