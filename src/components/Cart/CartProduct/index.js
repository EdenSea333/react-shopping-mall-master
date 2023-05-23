import React, { Component } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Thumb from '../../Thumb';

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
    };
  }

  handleOnIncrease = () => {
    const { changeProductQuantity } = this.props;
    const { product } = this.state;
    product.quantity = product.quantity + 1;
    changeProductQuantity(product);
  };

  handleOnDecrease = () => {
    const { changeProductQuantity } = this.props;
    const { product } = this.state;
    product.quantity = product.quantity - 1;
    changeProductQuantity(product);
  };

  render() {
    const { removeProduct } = this.props;
    const { product } = this.state;

    return (
      <div className="cart-item">
        <Thumb
          classes="cart-item--thumb"
          src={require(`../../../static/products/${product.sku}_2.jpg`)} // 找到相对路径
          alt={product.title}
        />
        <div className="cart-item--details">
          <div className="title">{product.title}</div>
          <div className="desc">
            Size: {product.size} <br />
            Quantity: {product.quantity}
          </div>
        </div>
        <div className="cart-item--price">
          <Button
            className="cart-item--del"
            icon={<CloseOutlined />}
            type="link"
            onClick={() => removeProduct(product)}
          />
          <div>{`$ ${product.price}`}</div>
          <div>
            <button
              onClick={this.handleOnDecrease}
              disabled={product.quantity === 1 ? true : false}
              className="change-product-button"
            >
              -
            </button>
            <button
              onClick={this.handleOnIncrease}
              className="change-product-button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
