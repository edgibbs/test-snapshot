import React from 'react'
import PropTypes from 'prop-types'
import DateField from 'common/DateField'

class DateOfBirthDateField extends React.Component {
  handleFocus() {
    const {onChange} = this.props
    onChange('searchByAgeMethod', 'dob')
  }

  render() {
    const {value, onBlur, onChange, searchByAgeMethod, errors} = this.props
    const disableDateField = !(searchByAgeMethod === '' || searchByAgeMethod === 'dob')
    return (
      <div onFocus={this.handleFocus.bind(this)} role="presentation">
        <DateField
          id="search-date-of-birth"
          gridClassName="date-field"
          label="Date"
          value={value}
          onBlur={onBlur}
          onChange={value => onChange('searchDateOfBirth', value)}
          hasTime={false}
          disabled={disableDateField}
          errors={errors}
        />
      </div>
    )
  }
}

DateOfBirthDateField.propTypes = {
  errors: PropTypes.array,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  searchByAgeMethod: PropTypes.string,
  value: PropTypes.string,
}

export default DateOfBirthDateField
