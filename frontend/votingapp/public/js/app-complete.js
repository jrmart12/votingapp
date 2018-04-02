class ProductList extends React.Component {
  state = {
    products: [],
    };

  componentDidMount() {
    this.setState({ products: Seed.products });
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
        />
    ));
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}
