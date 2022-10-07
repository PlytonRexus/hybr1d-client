import React, { Component } from 'react'
import Select from 'react-select'

import '../../styles/search/filters.css'

const filterStyles = {
	menuPortal: base => ({ ...base, zIndex: 9999 }),
	control: (base, state) => ({ 
		...base, 
		borderRadius: '20px', 
		border: '1px dotted grey',
		minWidth: '90px',
		'&:hover': {
			border: '1px solid grey',
			cursor: 'pointer'
		},
		fontSize: '14px',
		fontWeight: 'bold',
		background: () => {}
	}),
	container: base => ({
		...base,
		paddingRight: '5px',
		paddingLeft: '5px'
	})
}

export default class Filters extends Component {
	render = () => {
		return (
			<div 
				style={{ 
					height: this.props.height || '8%',
					boxShadow: '0 .125rem rgba(0,0,0,.075)!important'
				}}
				className="d-flex flex-row container search-filter-list-container">

			 	{/* Primary-filter */}
			 	<div className={this.props.mainSelectedOption ? "search-main-filter-container" : ""}>
			 		<Select 
			 			options={this.props.filters}
			 			styles={filterStyles}
			 			selected={this.props.mainSelectedOption}
			 			isSearchable={false}
			 			menuPortalTarget={document.body}
			 			placeholder={'Filter...'}
			 			onChange={this.props.handleMainFilterChange}
			 			defaultValue={null}
			 			value={this.props.mainSelectedOption || null}
			 		/>
			 	</div>

			 	{/* Sub-filters */}
			 	{ this.props.mainSelectedOption ?
			 		<div className={"d-flex flex-row align-items-center justify-content-center"
			 		+ " search-sub-filter-container"}>
				 		{
				 			(this.props.mainSelectedOption?.subFilters || [])
				 			.map((f, idx) => {
				 				return (
				 					<div className={"search-filter-container"} key={idx}>
							 			<Select 
								 			instanceId={idx}
								 			options={f.values}
								 			styles={filterStyles}
								 			selected={this.props.subFilters[f.value]}
								 			isSearchable={false}
								 			menuPortalTarget={document.body}
								 			placeholder={f.placeholder}
								 			onChange={opt => (this.props.handleSubFilterChange(opt, f.value))}
								 			isClearable={true}
								 			clearValue={() => this.props.clearValue(f.value)}
								 			value={this.props.subFilters[f.value] || null}
								 			isMulti={f.multi || false}
								 			closeMenuOnSelect={(f.multi || false) ? false : true}
								 		/>
						 			</div>
				 				)
				 			})
				 		}
			 			
			 		</div>
			 		: null
			 	}
		 		{ this.props.mainSelectedOption ? 
		 			<div className={"d-flex align-items-center justify-content-center search-reset-filter-container"}>
				 		<div className="search-reset-container" onClick={this.props.handleReset}>
				 			<div>Reset</div>
			 			</div>
				 	</div>
				 	: null
				}
			</div>
		);
	}
}
