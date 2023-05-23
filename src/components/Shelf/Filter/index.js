import React, { Component } from 'react';
import Checkbox from './Checkbox';
import { connect } from 'react-redux';
import { updateFilters } from './store/actions';

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

class Filter extends Component {
  componentDidMount() {
    this.selectedCheckboxes = new Set(); // Be careful, this is NOT this.state.selectedCheckboxes
  }

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  };

  createCheckbox = (label) => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  render() {
    return (
      <div>
        <h4>Sizes:</h4>
        {availableSizes.map(this.createCheckbox)}
      </div>
    );
  }
}

export default connect(null, { updateFilters })(Filter);
