import React from 'react';
import Sort from '../Sort';
import './style.scss';

const ShelfHeader = (props) => {
  return (
    <div className="shelf-container-header">
      <span>{props.productsLength} Product(s) found.</span>
      <Sort />
    </div>
  );
};

export default ShelfHeader;
