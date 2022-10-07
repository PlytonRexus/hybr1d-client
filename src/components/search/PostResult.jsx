import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import ConnectButton from '../feed/ConnectButton'

export default class PostResult extends Component {
  render () {
    const i = this.props.result
    return (
      <div
        className='search-result-container container-fluid d-flex flex-column' style={{
			  maxHeight: '200px'
        }}
      >
        <div className='d-flex flex-row'>
          <div className='d-flex align-items-center'>
            <Image
              src={i.image}
              roundedCircle
              width={this.props.bigScreen ? '65px' : '50px'}
              height={this.props.bigScreen ? '65px' : '50px'}
              style={{
			    				border: '3px solid purple',
			    				boxSizing: 'border-box',
			    				objectFit: 'cover',
			    				marginRight: '10px'
			    			}}
            />
          </div>
          <div
            className='d-flex flex-column justify-content-center'
            style={{ textAlign: 'left' }}
          >
            <div
              className='fw-bold'
              style={{
							  fontSize: this.props.bigScreen ? '18px' : '15px'
              }}
            >
              {i.userName}
            </div>
            <div
              className='text-muted'
              style={{
				    		fontSize: this.props.bigScreen ? '16px' : '13px'
				    	}}
            >
              {i.userHeading}
            </div>
          </div>
          <div
            className='d-flex text-center align-items-center search-result-connect-container'
          >
            <div style={{ marginRight: '5px' }}>
              <ConnectButton
                size={this.props.bigScreen ? 'lg' : 'md'}
                border='2px solid #05438b'
                background='#05438b'
                colorClass='text-white'
              />
            </div>
          </div>
        </div>
        <div className='d-flex flex-row search-post-result-content-container'>
          <div className='search-post-result-content-container-inner'>
            {i.content}
          </div>
        </div>
      </div>
    )
  }
}
