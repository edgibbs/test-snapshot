import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {dateFormatter} from 'utils/dateFormatter'
import {capitalizedStr} from 'utils/textFormatter'
import ReactTooltip from 'react-tooltip'
import {phoneNumberFormatter} from 'utils/phoneNumberFormatter'
import AlertMessageResultsLimit from 'common/search/AlertMessageResultsLimit'
import DateOfBirthWithTooltip from 'common/search/DateOfBirthWithTooltip'

const commonStyle = {headerClassName: 'search-results-header'}

class SearchResultsTable extends React.Component {
  constructor() {
    super()
    this.state = {
      previousPageNumber: -1,
    }
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  columns = (onAuthorize) => [
    {
      Header: '',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      className: 'search-results',
      Cell: (row) => {
        return `${(row.page * row.pageSize) + row.index + 1}.`
      },
    },
    {
      id: 'name',
      Header: 'Name',
      accessor: 'fullName',
      Cell: (row) => {
        const person = row.original
        const id = person.legacyDescriptor && person.legacyDescriptor.legacy_id
        const akaFullName = person.akaFullName
        return (
          <div>
            {person.isSensitive && <span data-tip="Sensitive" data-for="Sensitive">&nbsp;<i className="fa fa-eye-slash search-information-flag" aria-hidden="true"/></span>}
            <ReactTooltip id='Sensitive' className="custom-tool-tip" />
            {person.isSealed && <span data-tip="Sealed" data-for="Sealed">&nbsp;<i className="fa fa-shield search-information-flag" aria-hidden="true"/></span>}
            <ReactTooltip id='Sealed' className="custom-tool-tip" />
            {<button className='person-search-detail-link' onClick={() => onAuthorize(id)}>{person.fullName}</button>}
            <span>{akaFullName}</span>
          </div>
        )
      },
      ...commonStyle,
    },
    {
      Header: <DateOfBirthWithTooltip/>,
      accessor: 'dateOfBirth',
      Cell: (row) => {
        const isApproximateAge = row.original.isApproximateAge
        const dateOfBirth = row.original.dateOfBirth
        return isApproximateAge === 'Y' ? `~${dateFormatter(dateOfBirth)}` : dateFormatter(dateOfBirth)
      },
      ...commonStyle,
    },
    {
      Header: 'Sex at Birth',
      accessor: 'gender',
      Cell: (row) => capitalizedStr(row.original.gender),
      ...commonStyle,
    },
    {
      Header: 'Service Provider County',
      accessor: 'spCounty',
      ...commonStyle,
    },
    {
      Header: 'Service Provider Phone',
      accessor: 'spPhone',
      Cell: (row) => phoneNumberFormatter(row.original.spPhone),
      ...commonStyle,
    },
    {
      id: 'address',
      Header: 'Address',
      accessor: (result) => {
        const address = result.address
        return address ?
          `${address.streetAddress}, ${address.city}, ${address.state} ${address.zip}` :
          ''
      },
      ...commonStyle,
    },
    {
      Header: 'Case Status',
      accessor: 'caseStatus',
      ...commonStyle,
    },
  ]

  fetchData(totalResultsReceived) {
    const {onLoadMoreResults, personSearchFields} = this.props
    onLoadMoreResults(personSearchFields, totalResultsReceived)
  }

  setRowAndFetchData(pageSize, pageIndex) {
    const {
      setCurrentRowNumber,
      setCurrentPageNumber,
      onLoadMoreResults,
      personSearchFields,
      results,
    } = this.props
    const currentPageNumber = pageIndex + 1
    const totalResultsReceived = results.length
    setCurrentRowNumber(pageSize)
    setCurrentPageNumber(currentPageNumber)
    onLoadMoreResults(personSearchFields, totalResultsReceived)
  }

  calculateNumberOfPages(total, currentRow) {
    const maxResults = 250
    const totalForPageCount = total > maxResults ? maxResults : total
    const pageCount = totalForPageCount / currentRow
    return Math.ceil(pageCount)
  }

  shouldRequestResults(currentPageNumber, previousPageNumber) {
    const {currentRow, results} = this.props
    const totalResultsReceived = results.length
    const nextPageRequested = currentPageNumber > previousPageNumber
    const haveResults = totalResultsReceived >= currentRow * currentPageNumber
    const requestResults = nextPageRequested && !haveResults
    return requestResults
  }

  handlePageChange(pageIndex) {
    const {setCurrentPageNumber, results} = this.props
    const {previousPageNumber} = this.state
    const currentPageNumber = ++pageIndex
    const totalResultsReceived = results.length
    const requestResults = this.shouldRequestResults(currentPageNumber, previousPageNumber)
    setCurrentPageNumber(currentPageNumber)
    if (requestResults) {
      this.fetchData(totalResultsReceived)
    }
    this.setState({previousPageNumber: pageIndex})
  }

  render() {
    const {resultsSubset, total, currentRow, onAuthorize} = this.props
    return (
      <Fragment>
        <AlertMessageResultsLimit total={total} />
        <ReactTable
          columns={this.columns(onAuthorize)}
          sortable={false}
          manual
          data={resultsSubset}
          minRows={0}
          pages={this.calculateNumberOfPages(total, currentRow)}
          onPageChange={(pageIndex) => this.handlePageChange(pageIndex)}
          defaultPageSize={currentRow}
          onPageSizeChange={(pageSize, pageIndex) => this.setRowAndFetchData(pageSize, pageIndex)}
        />
      </Fragment>
    )
  }
}

SearchResultsTable.propTypes = {
  currentRow: PropTypes.number,
  onAuthorize: PropTypes.func,
  onLoadMoreResults: PropTypes.func,
  personSearchFields: PropTypes.object,
  results: PropTypes.array,
  resultsSubset: PropTypes.array,
  setCurrentPageNumber: PropTypes.func,
  setCurrentRowNumber: PropTypes.func,
  total: PropTypes.number,
}

export default SearchResultsTable
