import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withListProvider, withListContext } from './ListContext'
import Header from '../Header'
// import SearchResult from 'ui/next/SearchResult'

const DEFAULT_QUERY = ''

class Layout extends PureComponent {
  static propTypes = {
    headerTitle: PropTypes.string,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.node,
        icon: PropTypes.node,
        onPress: PropTypes.func,
        testId: PropTypes.object,
      })
    ),
    search: PropTypes.object,
    renderSearch: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    listContext: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      query: DEFAULT_QUERY,
      searchActive: false,
    }
  }

  handleQueryChange = query => {
    this.setState({ query })
  }

  handleSearchFocus = () => {
    this.setState({ searchActive: true })
  }

  handleSearchCancel = () => {
    this.setState({ searchActive: false, query: DEFAULT_QUERY })
  }

  handleSearchClear = () => {
    this.handleQueryChange(DEFAULT_QUERY)
  }

  renderTabBar() {
    // const { routes, index, handleTabChange } = this.props.listContext
    // return (
    //   <TabView
    //     routes={routes}
    //     index={index}
    //     renderTabBar={this.renderHeader}
    //     onIndexChange={handleTabChange}
    //   />
    // )
  }

  renderSearch() {
    const { renderSearch } = this.props

    if (!renderSearch) return null

    // return <SearchResult active={this.state.searchActive}>{renderSearch(this.state)}</SearchResult>
    return null
  }

  renderHeader = () => {
    const { actions, headerTitle, search } = this.props

    return (
      <Header
        actions={actions}
        onQueryChange={this.handleQueryChange}
        headerTitle={headerTitle}
        query={this.state.query}
        search={search}
        onSearchFocus={this.handleSearchFocus}
        onSearchCancel={this.handleSearchCancel}
        onSearchClear={this.handleSearchClear}
        searchActive={this.state.searchActive}
      />
    )
  }

  render() {
    const { children } = this.props

    return (
      <>
        {this.renderHeader()}
        {children}
      </>
    )
  }
}

export default withListProvider(withListContext(Layout))
