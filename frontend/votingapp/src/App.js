import React, { Component } from 'react';
import './App.css';
import ProductsContainer from './components/ProductsContainer'
import './semantic-dist/semantic.css'

class App extends Component {
  render() {
    return (
       <div className="main ui text container">
          <h1 className="ui dividing centered header">Popular Products</h1>
        <ProductsContainer/>
      </div>
    );
  }
}

export default App;
