import React from 'react';

import '../less/global.less';
import '../less/search-dropdown.less';

export default class SearchDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
      inputValue: '',
      dropdownOptions: []
    };
  }

  onInputChangeTimeoutId = undefined;

  onInputBlur() {
    setTimeout(
      () => {
        this.setState({isDropdownVisible: false, inputValue: ''})
      },
      200
    )
  }

  handleInputChange(value) {
    clearTimeout(this.onInputChangeTimeoutId);

    this.setState({
      inputValue: value
    });

    if (value.length < 3) {
      return;
    }

    if (value.length === 0) {
      this.setState({
        isDropdownVisible: false
      });
      return;
    }

    this.onInputChangeTimeoutId = setTimeout(async () => { 
      const dropdownOptions = await this.props.onInputChange(value);

      if (dropdownOptions) {
        this.setState({
          dropdownOptions,
          isDropdownVisible: true
        });
      }
    }, 500); 
  }

  async handleOptionClick(optionId) {
    await this.props.onOptionClick(optionId);

    this.setState({
      dropdownOptions: [],
      isDropdownVisible: false,
      inputValue: ''
    });
  }

  render() {
    const dropdownClasses = ['search-dropdown'];
    if (!this.state.isDropdownVisible) {
      dropdownClasses.push('hide');
    }
    const optionClasses = [this.props.optionClassName, 'search-dropdown-option'];
    return (
      <div className='foody-search-dropdown-component'>
        <input
          id={this.props.inputId}
          placeholder={this.props.inputPlaceholder}
          value={this.state.inputValue}
          onChange={(e) => this.handleInputChange(e.target.value)}
          onBlur={() => { this.onInputBlur() }}
        />
        <div id={this.props.dropdownId} className={dropdownClasses.join(' ')}>
          {this.state.dropdownOptions.map(option =>
            <div
              key={`${this.props.dropdownId}-option-${option[this.props.optionIdField]}`}
              onClick={() => {this.handleOptionClick(option[this.props.optionIdField])}}
              className={optionClasses.join(' ')}
            >{option[this.props.optionTextField]}</div>)}
        </div>
      </div>
    )
  }
}
