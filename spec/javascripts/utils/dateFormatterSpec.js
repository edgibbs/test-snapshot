import {dateFormatter, dateTimeFormatter, dateRangeFormatter, isValidDate} from 'utils/dateFormatter'

describe('dateFormatter', () => {
  it('returns empty string when passed undefined', () => {
    expect(dateFormatter(undefined)).toEqual('')
  })

  it('returns empty string when passed null', () => {
    expect(dateFormatter(null)).toEqual('')
  })

  it('returns empty string when passed empty string', () => {
    expect(dateFormatter('')).toEqual('')
  })

  it("displays date in 'MM/DD/YYYY' when passed date in format 'YYYY-MM-DD'", () => {
    expect(dateFormatter('2011-01-21')).toEqual('01/21/2011')
  })
})

describe('dateTimeFormatter', () => {
  it('returns empty string when passed undefined', () => {
    expect(dateTimeFormatter(undefined)).toEqual('')
  })

  it('returns empty string when passed null', () => {
    expect(dateTimeFormatter(null)).toEqual('')
  })

  it('returns empty string when passed empty string', () => {
    expect(dateTimeFormatter('')).toEqual('')
  })

  it("displays date in 'MM/DD/YYYY h:mm A' when passed date in ISO 8601 format", () => {
    expect(dateTimeFormatter('2011-01-21T16:00:00.000Z')).toEqual('01/21/2011 8:00 AM')
  })

  it('respects daylight savings time', () => {
    expect(dateTimeFormatter('2011-07-21T16:00:00.000Z')).toEqual('07/21/2011 9:00 AM')
  })
})

describe('dateRangeFormatter', () => {
  it('returns No Date if neither start date nor end date are present', () => {
    const dateableObject = {}
    expect(dateRangeFormatter(dateableObject)).toEqual('No Date')
  })

  it('returns a properly formatted start date if start_date is present', () => {
    const dateableObject = {start_date: '2016-09-12'}
    expect(dateRangeFormatter(dateableObject)).toEqual('09/12/2016')
  })

  it('returns a properly formatted end date if end_date is present', () => {
    const dateableObject = {end_date: '2016-09-12'}
    expect(dateRangeFormatter(dateableObject)).toEqual('09/12/2016')
  })

  it('returns a properly formatted date range if both start and end date are present', () => {
    const dateableObject = {start_date: '2016-07-08', end_date: '2016-09-12'}
    expect(dateRangeFormatter(dateableObject)).toEqual('07/08/2016 - 09/12/2016')
  })
})

describe('isValidDate', () => {
  it('returns true if date is in a valid format', () => {
    const date = '12/12/2000'
    expect(isValidDate(date)).toEqual(true)
  })

  it('returns false if date is not in a valid format', () => {
    const date = '2000/12/12'
    expect(isValidDate(date)).toEqual(false)
  })
})
