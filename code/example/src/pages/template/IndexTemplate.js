import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SiteNav from '../../components/siteNav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Modal from '../../components/modal'
import { Loading } from '../../components/loading'
import { RouteWithSubRoutes } from '../../router'
import { Switch } from 'react-router-dom'

export class WrapperTempate extends React.Component {
  constructor (props) {
    super(props)
    this.modalRoot = document.getElementById('modal-root')
  }

  static propTypes = {
    routes: PropTypes.any,
    headerNums: PropTypes.object,
    global: PropTypes.object
  }

  componentWillMount (nextProps) {
  }

  componentDidMount () {

  }

  render () {
    console.log(this.props.global)
    return (
      <React.Fragment>
        <SiteNav />
        <Header HeaderNums={this.props.headerNums} />
        <Switch>
          {(this.props.routes || []).map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
        <Footer />
        <Modal modalRoot={this.modalRoot}>
          {
            this.props.global.showLoading ? (<Loading />) : null
          }
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    header: state.collects,
    global: state.global
  }
}
export default connect(
  mapStateToProps
)(WrapperTempate)

// export default withRouter(WrapperTempate)