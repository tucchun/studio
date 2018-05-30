import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchShopCartNums, authName } from '../../store/actions'
import SiteNav from '../../components/siteNav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Modal from '../../components/modal'
import { Loading } from '../../components/loading'
import { RouteWithSubRoutes } from '../../router'
import { Switch } from 'react-router-dom'
import ajax from '../../utils/ajax'
export class WrapperTempate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nickName: 'guest',
      login: false
    }
    this.modalRoot = document.getElementById('modal-root')
    this.doSearch = this.doSearch.bind(this)
    this.logout = this.logout.bind(this)
  }

  static propTypes = {
    routes: PropTypes.any,
    loading: PropTypes.bool,
    breadList: PropTypes.array,
    headerNums: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func
  }

  componentWillMount (nextProps) {
  }

  componentDidMount () {
    const { dispatch } = this.props
    let loginData = sessionStorage.getItem('loginData')
    if (loginData) {
      loginData = JSON.parse(loginData)
      this.setState({
        ...loginData
      })
    }
    dispatch(fetchShopCartNums())
  }

  doClickBread = (path) => {
    this.props.history.push(path.href)
  }

  doSearch (val) {
    this.props.history.push({
      pathname: `/pages/prdList`,
      search: `?search=${encodeURI(val)}`,
      state: {
        search: encodeURI(val)
      }
    })
  }

  logout () {
    const { dispatch } = this.props
    ajax({
      url: '/los/2b-admin-front.logout'
    }).then(res => {
      if (!(res && res.responseCode)) {
        sessionStorage.removeItem('loginData')
        localStorage.removeItem('loginData')
        dispatch(authName({
          nickName: 'guest',
          login: false
        }))
        this.props.history.push({
          pathname: '/login'
        })
      }
    })
  }

  render () {
    const { loading, headerNums } = this.props
    const { nickName, login } = this.state
    return (
      <React.Fragment>
        <SiteNav nickName={nickName} login={login} onLogout={this.logout} />
        <Header cartNums={headerNums.cartNums} onSearch={this.doSearch} />
        <Switch>
          {this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
        <Footer />
        <Modal modalRoot={this.modalRoot}>
          {
            loading ? (<Loading />) : null
          }
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    headerNums: state.headerNums
  }
}
export default connect(
  mapStateToProps
)(WrapperTempate)

// export default withRouter(WrapperTempate)
