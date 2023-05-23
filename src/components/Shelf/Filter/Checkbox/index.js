import React, { Component } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  };

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    this.setState({
      isChecked: !this.state.isChecked,
    });

    handleCheckboxChange(label);
  };

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div>
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          &nbsp;
          <span>{label}</span>
        </label>
      </div>
    );
  }
}

export default Checkbox;
