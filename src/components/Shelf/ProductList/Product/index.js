import React from 'react';
import { connect } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { actions } from '../../../Cart/store';

const Product = ({ product, addProduct }) => {
  // set quantity to be 1, and not change the original product obj
  product = { ...product, quantity: 1 };

  return (
    <Card
      data-sku={product.sku}
      bordered={false}
      cover={
        <img
          alt="product thumbnail"
          src={require(`../../../../static/products/${product.sku}_1.jpg`)}
        />
      }
      actions={[
        <ShoppingCartOutlined key="add" onClick={() => addProduct(product)} />,
      ]}
    >
      <Card.Meta
        title={product.title}
        description={'$ ' + product.price}
        style={{ textAlign: 'center' }}
      />
    </Card>
  );
};

export default connect(null, { addProduct: actions.addProduct })(Product);
