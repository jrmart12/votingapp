import React, {Component} from 'react'
import axios from 'axios'
import Product from './Product'
import ProductForm from './ProductForm'
import update from 'immutability-helper'

class ProductsContainer extends Component{

	constructor(props){
		super(props)
		this.state = {
			products: [],
			images: [],
			editingProductId: null,
			notification: ''
		}
	}

	componentDidMount(){
		axios.get('https://serene-ridge-78379.herokuapp.com/api/v1/products.json').then(
			response => {
				console.log(response)
				this.setState({products: response.data})
			}).catch(error => {
				console.log(error)
			})
	}

	handleProductUpVote = (productId) =>{ //se crea un nuevo array de productos y si se modifica, se modifica un clone envez del original
		const nextProducts = this.state.products.map((product) => {
		  if (product.id === productId) {
			return Object.assign({}, product, {
			  votes: product.votes + 1,
			});
		  } else {
			return product;
			}
		  });
		  this.setState({
		  products: nextProducts,
		});
		}

	addNewProduct = () => {
		axios.post(
			'https://serene-ridge-78379.herokuapp.com/api/v1/products',
			{ product:
				{
					title: '',
					description: '',
					productImageUrl: '',
					submitterAvatarUrl: ''
				}
			}
		).then(response => {
			//agregar las nuevas ideas sin tener que refresh manualmente 
			console.log(response)
			const products = update(this.state.products, {
				$splice: [[0,0,response.data]]
			})
			this.setState({
				products: products,
				editingProductId: response.data.id
			})
		}).catch(error => {
			console.log(error)
		})
	}

	updateProduct = (product) => {
		const productIndex = this.state.products.findIndex(x => x.id === product.id)
		const products = update(this.state.products,{
			[productIndex]: { $set: product }
		})
		this.setState({products: products, notification: 'Saved'})
	}

	reset = () => {
		{this.setState({notification: ''})}
	}

	enableEditing = (id) => {
		this.setState({editingProductId: id})
	}

	delete = (id) => {
		axios.delete(
			`https://serene-ridge-78379.herokuapp.com/api/v1/products/${id}`
		).then(response => {
			const productIndex = this.state.products.findIndex(x => x.id === id)
			const products = update(this.state.products, {
				$splice: [[productIndex, 1]]
			})
			this.setState({products: products})
		}).catch(error => {
			console.log(error)
		})
	}


	render() {
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
      ));
      const productComponents = products.map((product) => (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
					onVote={this.handleProductUpVote}
					onClick={this.enableEditing}
					onDelete={this.delete}
        />
    ));
    return (
      <div className='ui unstackable items'>
				{productComponents}
					<button className="newProductButton" onClick={this.addNewProduct}>
						New Product
					</button>
					<span className="notified">{this.state.notification}</span>
						{this.state.products.map((product) => {
							if(this.state.editingProductId === product.id){
								return(<ProductForm product={product} key={product.id} updateProduct={this.updateProduct}
								reset={this.reset}/>)
							} 
						})}
      </div>
    );
  }
}

export default ProductsContainer