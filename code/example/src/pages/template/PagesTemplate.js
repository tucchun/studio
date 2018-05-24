import React from 'react'
import PropTypes from 'prop-types'
import SiteNav from '../../components/siteNav'
import ClassifyNav from '../../components/classifyNav/ClassifyNav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { RouteWithSubRoutes } from '../../router'
import { withRouter } from 'react-router'
export class WrapperTempate extends React.Component {
  constructor (props) {
    super(props)
    this.toggleHeaderNumber = this.toggleHeaderNumber.bind(this)
    this.state = {
      header: {
        headerNums: {
          cartNums: 10,
          collectNums: 10
        }
      }
    }
  }

  static propTypes = {
    routes: PropTypes.any
  }

  toggleHeaderNumber (result) {
    this.setState({
      ...this.state,
      header: {
        ...this.state.header,
        headerNums: {
          ...this.state.header.headerNums,
          ...result
        }
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        <SiteNav />
        <Header HeaderNums={this.state.header.headerNums} />
        <ClassifyNav />
        {(this.props.routes || []).map((route, i) => <RouteWithSubRoutes
          key={i}
          {...route}
          context={this.state}
          toggleHeaderNumber={this.toggleHeaderNumber}
        />)}
        <Footer />
      </React.Fragment>
    )
  }
}

export default withRouter(WrapperTempate)
