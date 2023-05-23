import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ShelfHeader from './ShelfHeader';
import ProductList from './ProductList';
import Filter from './Filter';
import { connect } from 'react-redux';
import { actions } from './store';

class Shelf extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  // After either the filter or sort changes
  // Need to trigger the second change for the product list
  componentDidUpdate(prevProps) {
    const { filters: prevFilters, sort: prevSort } = prevProps;
    const { filters, sort } = this.props;

    if (prevFilters.length !== filters.length) {
      this.props.fetchProducts();
    }

    if (prevSort !== sort) {
      this.props.fetchProducts();
    }
  }

  render() {
    const { products } = this.props;

    return (
      <Row style={{ width: '100%' }}>
        <Col span={4}>
          <Filter />
        </Col>
        <Col span={20}>
          <ShelfHeader productsLength={products.length} />
          <ProductList products={products} />
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.shelf.products,
    filters: state.filters.sizes,
    sort: state.sort.order,
  };
};

const mapDispatch = (dispatch) => ({
  fetchProducts() {
    dispatch(actions.fetchProducts());
  },
});

export default connect(mapState, mapDispatch)(Shelf);
