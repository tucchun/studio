import React from 'react'
// import PropTypes from 'prop-types'
import SiteNav from '../../components/siteNav'
import ClassifyNav from '../../components/classifyNav/ClassifyNav'
import Header from '../../components/header'
import Footer from '../../components/footer'
// import { IndexContext } from '../../components/context'

// export default class Template extends React.Component {
//   render () {
//     return (
//       <IndexContext.Consumer>
//         {
//           (context) => {
//             return (
//               <React.Fragment>
//                 <SiteNav />
//                 <Header HeaderNums={context.header.headerNums} />
//                 <ClassifyNav />
//                 {this.props.children}
//                 <Footer />
//               </React.Fragment>
//             )
//           }
//         }
//       </IndexContext.Consumer>
//     )
//   }
// }

export function withTemplate (Component) {
  return class WrapperTempate extends React.Component {
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
          <Component {...this.props} context={this.state} toggleHeaderNumber={this.toggleHeaderNumber} />
          <Footer />
        </React.Fragment>
      )
    }
  }
}

export function withIndexTemplate (Component) {
  return class WrapperTempate extends React.Component {
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
          <Component {...this.props} context={this.state} toggleHeaderNumber={this.toggleHeaderNumber} />
          <Footer />
        </React.Fragment>
      )
    }
  }
}
