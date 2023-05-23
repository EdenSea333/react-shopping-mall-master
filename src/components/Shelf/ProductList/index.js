import React from 'react';
import Product from './Product';
import { Row, Col } from 'antd';

function ProductList({ products }) {
  return (
    <Row gutter={16}>
      {products.map((p) => {
        return (
          <Col key={p.id} xs={12} sm={8} md={6} style={{ marginBottom: 10 }}>
            <Product key={p.id} product={p} />
          </Col>
        );
      })}
    </Row>
  );
}

export default ProductList;
