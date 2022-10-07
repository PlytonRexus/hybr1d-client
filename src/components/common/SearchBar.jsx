import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import '../../styles/autosuggest.css'
import axios from 'axios'

const people = [
    {
        first: 'Charlie',
        last: 'Brown',
        twitter: 'dancounsell'
    },
    {
        first: 'Charlotte',
        last: 'White',
        twitter: 'mtnmissy'
    },
    {
        first: 'Chloe',
        last: 'Jones',
        twitter: 'ladylexy'
    },
    {
        first: 'Cooper',
        last: 'King',
        twitter: 'steveodom'
    }
]

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
function getSuggestionValue(suggestion) {
    return `${suggestion.name}` || `${suggestion.first} ${suggestion.last}`
}

// Use your imagination to render suggestions.
function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.name}` || `${suggestion.first} ${suggestion.last}`
    const matches = AutosuggestHighlightMatch(suggestionText, query)
    const parts = AutosuggestHighlightParse(suggestionText, matches)

    return (
        <span className={'suggestion-content ' + suggestion.twitter}>
            <span className='name'>
                {
                    parts.map((part, index) => {
                        const className = part.highlight ? 'highlight' : null

                        return (
                            <span className={className} key={index}>{part.text}</span>
                        )
                    })
                }
            </span>
        </span>
    )
}

const SearchBar = (props) => {
    const [data5, setData5] = useState({
        loading: true,
        arr: [],
        flag: 0
    })
    if (data5.flag === 0)
        axios.get("http://127.0.0.1:8000/api/v1/suggestions", {})
            .then((res) => {
                setData5({
                    loading: false,
                    arr: res.data,
                    flag: 1
                })
            })
            .catch((err) => {
                console.log(err);
            });
    const history = useHistory()

    const [value, setValue] = useState(props.query || '')
    const [suggestions, setSuggestions] = useState([])

    // const possibleValues = props.possibleValues || people
    const possibleValues = data5.loading ? people : data5.arr.user;

    const handleChange = (_ev, { newValue }) => setValue(newValue)

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const pathname = '/search?q=' + value
        history.push(pathname)
        if (props.handleResult) {
            props.handleResult(value)
        }
    }

    const getSuggestions = value => {
        const escapedValue = escapeRegexCharacters(value.trim())
        if (escapedValue === '') {
            return []
        }
        const regex = new RegExp('\\b' + escapedValue, 'i')
        return possibleValues.filter(person => regex.test(getSuggestionValue(person)))
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const handleSuggestionsFetchRequested = ({ value }) => setSuggestions(getSuggestions(value))

    // Autosuggest will call this function every time you need to clear suggestions.
    const handleSuggestionsClearRequested = () => setSuggestions([])

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: props.placeholder || '🔍 Connect with your alma mater',
        value: value,
        onChange: handleChange,
        type: props.type || 'search'
    }

    // Finally, render it!
    return (
        <form onSubmit={handleSubmit}>
            <Autosuggest
                suggestions={props.possibleSuggestions || suggestions}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={handleSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                focusInputOnSuggestionClick
            />
        </form>
    )
}

export default SearchBar
