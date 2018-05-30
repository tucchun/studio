import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchShopCartNums, authName, fetchClissifyTree } from '../../store/actions'
import SiteNav from '../../components/siteNav'
import ClassifyNav from '../../components/classifyNav/ClassifyNav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Modal from '../../components/modal'
import Breadcrumb from '../../components/breadcrumb'
import { Loading } from '../../components/loading'
import { RouteWithSubRoutes } from '../../router'
import { Switch } from 'react-router-dom'
import ajax from '../../utils/ajax'
export class WrapperTempate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nickName: 'guest',
      login: false,
      classifyList: []
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
    dispatch: PropTypes.func,
    classify: PropTypes.any
  }

  componentWillMount (nextProps) {
  }

  componentDidMount () {
    const { dispatch } = this.props

    let loginData = sessionStorage.getItem('loginData')
    if (loginData) {
      loginData = JSON.parse(loginData)
      this.setState({
        nickName: loginData.nickName,
        login: loginData.login
      })
    }
    dispatch(fetchClissifyTree())
    dispatch(fetchShopCartNums())
  }

  doClickBread = (path) => {
    if (path.href) this.props.history.push(path.href)
  }
  doClick = () => {
    this.props.history.push('/pages/prdList')
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
    const { loading, breadList, headerNums, classify } = this.props
    const { nickName, login } = this.state
    return (
      <React.Fragment>
        <SiteNav nickName={nickName} login={login} onLogout={this.logout} />
        <Header cartNums={headerNums.cartNums} onSearch={this.doSearch} />
        <ClassifyNav list={classify.list} onClick={this.doClick} />
        <Breadcrumb breads={breadList} onClick={this.doClickBread} />
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
    breadList: state.breadList,
    headerNums: state.headerNums,
    classify: state.classify
  }
}
export default connect(
  mapStateToProps
)(WrapperTempate)

// export default withRouter(WrapperTempate)
