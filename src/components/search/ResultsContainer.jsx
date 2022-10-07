import PeopleResult from './PeopleResult'
import PostResult from './PostResult'

import '../../styles/search/results.css'
import { useHistory } from 'react-router-dom'

const ResultsContainer = props => {
  const results = props.results || {
    people: null,
    posts: null,
    events: null,
    organisations: null,
    jobs: null
  }

  const history = useHistory()

  const categories = Object.keys(results)

  const handleClick = (type, id) => {
    if (!type || type === 'people') type = 'profile'
    history.push('/' + type + '/' + id)
  }

  return (
    <div
      style={{ height: '80vh', overflow: 'auto' }}
      className='d-flex flex-column container'
    >
      {categories.map((c, idx) => {
			  if (!!results[c] && results[c].length > 0) {
          return (
            <div className='search-results-category-container'>
              <div className='search-results-category-title text-blue'>
                {c[0].toUpperCase() + c.substring(1)}
              </div>
              {(results[c]).map((i, idx) => {
							  switch (c) {
							    case 'people':
							      return <PeopleResult result={i} bigScreen={props.bigScreen} handleClick={handleClick} />
							    case 'posts':
							      return <PostResult result={i} bigScreen={props.bigScreen} />
							    default:
							      return null
							  }
              })}
            </div>
			    )
        }
			  return null
      })}

    </div>
  )
}

export default ResultsContainer