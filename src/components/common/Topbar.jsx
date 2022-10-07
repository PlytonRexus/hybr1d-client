import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'

import SearchBar from './SearchBar'

import '../../styles/topbar.css'

const mql = window.matchMedia('(min-width: 800px)')

class Topbar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			bigScreen: mql.matches
		}

		this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
	}

	componentDidMount() {
		mql.addListener(this.mediaQueryChanged)
	}

	componentWillUnmount() {
		mql.removeListener(this.mediaQueryChanged)
	}

	mediaQueryChanged() {
		this.setState({ bigScreen: mql.matches })
	}

	render() {
		return (
			<div
				className="topbar-container d-flex"
				style={{
					position: (this.props.fixed ? 'fixed' : 'sticky'),
					zIndex: '3',
					paddingLeft: this.state.bigScreen ? '10px' : '0px',
					paddingTop: '20px',
					paddingBottom: '20px',
					height: this.props.height || '10vh',
					background: this.props.bg
				}}
			>
				<div
					// fluid
					style={{
						marginRight: this.state.bigScreen ? '20px' : '3px',
						marginLeft: this.state.bigScreen ? '10px' : '3px',
					}}
					className="d-flex flex-row container-fluid align-items-center">
					<Nav>
						<SearchBar bigScreen={this.state.bigScreen} query={this.props.query}
							handleResult={this.props.handleResult}
						/>
					</Nav>
				</div>
			</div>
		)
	}
}

export default connect(null, { logoutUser })(Topbar)
