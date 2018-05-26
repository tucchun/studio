import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SiteNav from '../../components/siteNav'
import ClassifyNav from '../../components/classifyNav/ClassifyNav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Modal from '../../components/modal'
import Breadcrumb from '../../components/breadcrumb'
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
    global: PropTypes.object,
    history: PropTypes.object
  }

  componentWillMount (nextProps) {
  }

  componentDidMount () {
  }

  doClickBread = (path) => {
    this.props.history.push(path.href)
  }

  render () {
    const { showLoading, breadList, headerNums } = this.props.global
    return (
      <React.Fragment>
        <SiteNav />
        <Header HeaderNums={headerNums} />
        <ClassifyNav />
        <Breadcrumb breads={breadList} onClick={this.doClickBread} />
        <Switch>
          {this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
        <Footer />
        <Modal modalRoot={this.modalRoot}>
          {
            showLoading ? (<Loading />) : null
          }
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    global: state.global
  }
}
export default connect(
  mapStateToProps
)(WrapperTempate)

// export default withRouter(WrapperTempate)
