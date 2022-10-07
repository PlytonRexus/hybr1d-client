import React, { Component } from 'react'

import Topbar from '../components/common/Topbar'
import Filters from '../components/search/Filters'
import ResultsContainer from '../components/search/ResultsContainer'

import filters from '../components/search/defaultFilters'
import { parseQuery } from '../utils/url'
import axios from 'axios'

const mql = window.matchMedia(`(min-width: 800px)`)

export default class Search extends Component {
	constructor() {
		super()
		const params = parseQuery(window.location.href)
		this.state = {
			results: {
				people: [],
				posts: [
					{
	          userName: 'William Weasley', 
	          userHeading: 'billy', 
	          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ut asperiores illum nulla modi aut voluptatibus culpa totam eum voluptatem. Dolor aliquid voluptate beatae cupiditate autem quae quibusdam mollitia unde!',
	          image: 'https://static.wikia.nocookie.net/harrypotter/images/5/59/Bill_Weasley_DHF1_promo.jpg'
	        },
				]
			},
			bigScreen: mql.matches,
			mainSelectedOption: null,
    	subFilters: {},
    	filters,
    	query: params.q || '',
		}
	}

  handleReset = (ev) => {
  	this.setState({
  		mainSelectedOption: null,
  		subFilters: {}
  	})
  }

	componentDidMount() {
		mql.addListener(this.mediaQueryChanged)
		this.handleResult()
	}
	
	componentWillUnmount() {
		mql.removeListener(this.mediaQueryChanged)
	}

	mediaQueryChanged = () => {
    this.setState({ bigScreen: mql.matches })
  }

  handleMainFilterChange = (mainSelectedOption) => {
    this.setState({ mainSelectedOption, subFilters: {} })
  }

  handleSubFilterChange = (subSelectedOption, key) => {
  	this.setState({
  		subFilters: {
  			...this.state.subFilters,
  			[key]: subSelectedOption
  		}
  	})
  }

  handleResult = q => {
		axios.get('/api/v1/search/'+(q||this.state.query))
    .then((res)=>{
      var people = res.data.users
      for(var i=0; i < people.length; i++) {
          people[i]["heading"] = people[i]["email"]
      }
		  this.setState({
			  results:{
				  ...this.state.results,
				  people:people
			  }
		  })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  handleResultFromSearchPage = query => {
		this.setState({ query })
		this.handleResult(query)
  }

	render() {
		let user
		if(isLoggedIn())
		{
			user = BrowserStore.get('user-info', true);
		}
		
		return (
		<div className="d-flex flex-column">
			<LeftDash vertical={false} />
			<Topbar 
				height={this.state.bigScreen ? '12vh' : '10vh'} 
				showLogo={true} 
				query={this.state.query} 
				profileName={isLoggedIn() ? user.name : undefined}
				handleResult = {this.handleResultFromSearchPage}/>
			<div 
				style={{
					// position: 'relative', 
					height: '88vh', 
					overflow: 'hidden',
					flexShrink: '0',
					background: 'rgb(250, 250, 250)'
				}} 
				className="d-flex flex-column align-items-center"
			>
				<Filters 
					height="10vh" 
					handleReset={this.handleReset} 
					handleSubFilterChange={this.handleSubFilterChange} 
					handleMainFilterChange={this.handleMainFilterChange} 
					mainSelectedOption={this.state.mainSelectedOption}
					subFilters={this.state.subFilters} 
					filters={this.state.filters}
					clearValue={(key) => this.setState({ subFilters: {[key]: null} })} />
				<ResultsContainer bigScreen={this.state.bigScreen} results={this.state.results} />
			</div>
		</div>
		);
	}
}