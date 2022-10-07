import { Component } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'

import '../../styles/loader.css'

const withRouter = Component => props => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  return (
    <Component
      {...props}
      location={location}
      navigate={navigate}
      params={params}
    />
  );
}

class PageLoader extends Component {
  render() {
    return (
      <div id='loader-container'>
        <div style={{ margin: '10px auto' }}>
          {<Audio
            type={this.props.type || 'Puff'}
            arialLabel='tail-spin-loading'
            color={this.props.color || '#01218B'}
            visible
            secondaryColor='transparent'
            height={this.props.height || '200'}
            width={this.props.width || '200'}
          />}
        </div>
      </div>
    )
  }
}

export default withRouter(PageLoader)
