import Loading from './Loading'
import Loadable from 'react-loadable'

const asyncComponent = (component) => {
  return Loadable({
    loader: component,
    loading: Loading,
    delay: 300 // 0.3 seconds
  })
}

export default asyncComponent
