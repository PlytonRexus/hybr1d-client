import React from 'react';

const navigation = (props) => {
	const {
		loading,
		showPrevLink,
		showNextLink,
		handlePrevClick,
		handleNextClick,
		authorName,
		handleAuthorNulling
	} = props;
	return (
		<div className="nav-link-container">
			<a
				href="#"
				className={
					`nav-link 
					${showPrevLink ? 'show' : 'hide'}
					${loading ? 'greyed-out' : ''
					}`
				}
				onClick={handlePrevClick}
			>
				{'<'}
			</a>
			<a
				href="#"
				className={
					`nav-link 
					${showNextLink ? 'show' : 'hide'}
					${loading ? 'greyed-out' : ''}
					`}
				onClick={handleNextClick}
			>
				{'>'}
			</a>
			{!!authorName ? <a
				href="#"
				className={
					`nav-link
					${showNextLink ? 'show' : 'hide'}
					${loading ? 'greyed-out' : ''}`
				}
				onClick={handleAuthorNulling}
			>
				{'All authors'}
			</a> : null }
		</div>
	)
}

export default navigation
