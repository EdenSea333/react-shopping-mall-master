import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import CartProduct from './CartProduct';
import './style.scss';
import { actions as CartAction } from './store';
const {
  loadCart,
  removeProduct,
  changeProductQuantity,
  updateCartTotal,
} = CartAction;

class Cart extends Component {
  state = {
    isOpen: false,
  };

  componentDidUpdate(prevProps) {
    const {
      productToAdd: prevProductToAdd,
      productToRemove: prevProductToRemove,
      productToChange: prevProductToChange,
    } = prevProps;
    const { productToAdd, productToRemove, productToChange } = this.props;

    if (prevProductToAdd !== productToAdd) {
      this.addProduct(productToAdd);
    }

    if (prevProductToRemove !== productToRemove) {
      this.removeProduct(productToRemove);
    }

    if (prevProductToChange !== productToChange) {
      this.changeProductQuantity(productToChange);
    }
  }

  openCart = () => {
    this.setState({ isOpen: true });
  };

  closeCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = (product) => {
    const { cartProducts, updateCartTotal } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach((cp) => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCartTotal(cartProducts);
    this.openCart();
  };

  removeProduct = (product) => {
    const { cartProducts, updateCartTotal } = this.props;

    const index = cartProducts.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCartTotal(cartProducts);
    }
  };

  proceedToCheckout = () => {
    const { totalPrice, productQuantity } = this.props.totalPrice;

    if (!productQuantity) {
      alert('Add some product in the cart!');
    } else {
      alert(`Checkout - Subtotal: $ ${totalPrice}`);
    }
  };

  changeProductQuantity = (changedProduct) => {
    const { cartProducts, updateCartTotal } = this.props;

    const product = cartProducts.find((p) => p.id === changedProduct.id);
    product.quantity = changedProduct.quantity;
    if (product.quantity <= 0) {
      this.removeProduct(product);
    }
    updateCartTotal(cartProducts);
  };

  render() {
    const {
      totalPrice,
      cartProducts,
      removeProduct,
      changeProductQuantity,
    } = this.props;

    const products = cartProducts.map((p) => {
      return (
        <CartProduct
          product={p}
          removeProduct={removeProduct}
          changeProductQuantity={changeProductQuantity}
          key={p.id}
        />
      );
    });

    let classes = ['cart'];

    if (this.state.isOpen) {
      classes.push('cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <CloseOutlined
            className="cart--toggle-btn"
            style={{
              color: 'white',
            }}
            onClick={() => this.closeCart()}
          />
        )}

        {/* If cart is closed, show open (cart) button */}
        {!this.state.isOpen && (
          <ShoppingCartOutlined
            className="cart--toggle-btn"
            style={{
              color: 'white',
            }}
            onClick={() => this.openCart()}
          />
        )}

        <div className="cart--content">
          <div className="cart--header">
            <ShoppingCartOutlined style={{ fontSize: 50, color: 'white' }} />
            Cart
          </div>

          <div className="cart--shelf-container">
            {products}
            {!products.length && (
              <div className="shelf-empty">
                Add some products in the cart :)
              </div>
            )}
          </div>

          <div className="cart--footer">
            <div className="total-title">TOTAL</div>
            <div className="total-price">{`$ ${totalPrice}`}</div>
            <button
              onClick={() => this.proceedToCheckout()}
              className="buy-btn"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProducts: state.cart.products,
  productToAdd: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  productToChange: state.cart.productToChange,
  totalPrice: state.cart.totalPrice,
});

export default connect(mapStateToProps, {
  loadCart,
  updateCartTotal,
  removeProduct,
  changeProductQuantity,
})(Cart);
