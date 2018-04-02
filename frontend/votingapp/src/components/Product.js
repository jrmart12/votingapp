import React from 'react'

class Product extends React.Component {
    handleUpVote = () => (
      this.props.onVote(this.props.id)
      );

      handleClick = () => {
          this.props.onClick(this.props.id)
      }

      handleDelete = () => {
        this.props.onDelete(this.props.id)
      }

    render() {
        return (
        <div className='item'>
        
            <div className='image' onClick={this.handleClick}>
              <img src={this.props.productImageUrl}/>
            </div>
            <div className='middle aligned content'>
                <div className='header'>
                    <a onClick={this.handleUpVote}>
                      <i className='large caret up icon' />
                    </a>
                    {this.props.votes}
                </div>
                <div className='description' onClick={this.handleClick}>
                    <a href={this.props.url}>
                      {this.props.title}
                    </a>
                    <p> {this.props.description} </p>
                </div>
                <div className='extra'>
                    <span>Submitted by:</span>
                    <img className='ui avatar image'src={this.props.submitterAvatarUrl}/>
                    <span className='delete' onClick={this.handleDelete}>Delete</span>
                </div>
            </div>
        </div>
        );
    }
}

export default Product