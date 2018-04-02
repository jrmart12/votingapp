import React, { Component } from 'react'
import axios from 'axios'

class ProductForm extends Component{
    constructor(props){
		super(props)
		this.state = {
            title: this.props.product.title,
            description: this.props.product.description,
            url: this.props.product.url,
            votes: this.props.product.votes,
            submitterAvatarUrl: this.props.product.submitterAvatarUrl,
            productImageUrl: this.props.product.productImageUrl
        }
    }

    handleInput = (e) => {
        this.props.reset()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleBlur = () => {
        const product = {
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            votes: this.state.votes,
            submitterAvatarUrl: this.state.submitterAvatarUrl,
            productImageUrl: this.state.productImageUrl
        }
        axios.put(
            `https://serene-ridge-78379.herokuapp.com/api/v1/products/${this.props.product.id}`,
            {
                product: product
            }
        ).then(response => {
            console.log(response)
            this.props.updateProduct(response.data);
        }).catch(error => console.log(error))
    }
    
    render() {
        return(
            <div className= "tile">
                <form onBlur={this.handleBlur}>
                <h4 className="posLabel">Title: </h4>
                    <input className="input-two" type="text" name="title" 
                    value={this.state.title} 
                    onChange={this.handleInput} />
                    <textarea className="input" name="description" placeholder="Description: "
                    value={this.state.description} onChange={this.handleInput}></textarea>
                    <h4 className="posLabelUrl">Image Url: </h4>
                    <input className="input-three" type="text" name="productImageUrl" 
                    value={this.state.productImageUrl} 
                    onChange={this.handleInput} />
                    <h4 className="posLabelUrl2">Avatar Url: </h4>
                    <input className="input-four" type="text" name="submitterAvatarUrl" 
                    value={this.state.submitterAvatarUrl} 
                    onChange={this.handleInput} />

                </form>
            </div>
        );
    }
}

export default ProductForm