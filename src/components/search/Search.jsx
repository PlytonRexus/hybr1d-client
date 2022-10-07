import React from 'react';
import '../../styles/search.css';
import axios from 'axios';
import PageNavigation from './PageNavigation'
import { parseQuery } from '../../utils/url'
import PageLoader from '../common/PageLoader';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {},
            loading: true,
            message: '',
            totalResults: 0,
            totalPages: 0,
            currentPageNo: 0,
            authorName: null
        };

        this.cancel = '';
    }

    componentDidMount() {
        const queryParams = parseQuery( window.location.href )
        let query = ''
        if ( typeof queryParams.query !== 'undefined' && queryParams.query !== '' ) {
            query = queryParams.query
        }

        const pageNumber = typeof queryParams.page !== 'undefined' && queryParams.page !== '' ? queryParams.page : ''
        const authorName = typeof queryParams.author !== 'undefined' && queryParams.author !== '' ? queryParams.author : ''

        this.fetchSearchResults( pageNumber, query, authorName )

    }

    /**
     * Get the Total Pages count.
     *
     * @param total
     * @param denominator Count of results per page
     * @return {number}
     */
    getPageCount = (total, denominator) => {
        const divisible = 0 === total % denominator;
        const valueToBeAdded = divisible ? 0 : 1;
        return Math.floor(total / denominator) + valueToBeAdded;
    };

    /**
     * Fetch the search results and update the state with the result.
     * Also cancels the previous query before making the new one.
     *
     * @param {int} updatedPageNo Updated Page No.
     * @param {String} query Search Query.
     *
     */
    fetchSearchResults = (updatedPageNo = '', query, author) => {
        if (!!author) this.setState( { authorName: author } )
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const authorName = author ? `&tags=author_${author}` : ''
        const searchUrl = `http://hn.algolia.com/api/v1/search?query=${query}${pageNumber}${authorName}`;

        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        })
            .then(res => {
                const total = res.data.nbHits;
                const totalPagesCount = this.getPageCount(total, 20);
                const resultNotFoundMsg = !res.data.hits.length
                    ? 'There are no more search results. Please try a new search'
                    : '';
                this.setState({
                    results: res.data.hits,
                    message: resultNotFoundMsg,
                    totalResults: total,
                    totalPages: totalPagesCount,
                    currentPageNo: updatedPageNo,
                    loading: false
                })
            })
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: 'Still working ...'
                    })
                }
            })
    };

    handleOnInputChange = (event) => {
        const query = event.target.value;
        if (!query) {
            this.setState({ query, results: {}, message: '', totalPages: 0, totalResults: 0 });
        } else {
            const { authorName } = this.state
            this.setState({ query, loading: true, message: '' }, () => {
                window.history.pushState({}, 'Search results: ' + query, '?query=' + query + '&page=' + 0 + (authorName ? '&author=' + authorName : '' ) )
                this.fetchSearchResults(0, query, this.state.authorName);
            });
        }
    };

    /**
     * Fetch results according to the prev or next page requests.
     *
     * @param {String} type 'prev' or 'next'
     */
    handlePageClick = (type, event) => {
        event.preventDefault();
        const updatePageNo = 'prev' === type
            ? this.state.currentPageNo - 1
            : this.state.currentPageNo + 1;

        if (!this.state.loading) {
            this.setState({ loading: true, message: '' }, () => {
                const { query, authorName } = this.state
                window.history.pushState({}, 'Search results: ' + query, '?query=' + query + '&page=' + updatePageNo + (authorName ? '&author=' + authorName : '' ) )
                this.fetchSearchResults(updatePageNo, this.state.query, this.state.authorName);
            });
        }
    };

    handleAuthorNulling = (_ev) => {
        this.setState( { authorName: null } )
        this.fetchSearchResults( 0, this.state.query )
    }

    renderSearchResults = () => {
        const { results } = this.state;

        if (Object.keys(results).length && results.length) {
                
            return (
                <div className="results-container">
                    {results.map(result => {
                        let red = Math.floor(Math.random() * 255) + 200
                        let green = Math.floor(Math.random() * 255) + 200
                        let blue = Math.floor(Math.random() * 255) + 200
                        return (
                            <a key={result.id}
                                href={`/posts/${result.objectID}`}
                                className="result-item"
                                style={{ background: `rgb(${red}, ${green}, ${blue})` }}>
                                <div className='result-title'>
                                    {result.title ?? result.text}
                                </div>
                                {/* {!!result.url && result.url !== '' ? <div>
                                    <a href="{result.url}">{result.url}</a>
                                </div> : null} */}
                                <p className="result-username">By <a href={'/?author=' + result.author}>{result.author}</a></p>
                                <p className='result-tags'>
                                    { result._tags && result._tags.slice(0, 2).join(', ') }
                                </p>

                            </a>
                        )
                    })}
                </div>
            )
        }
    };

    render() {
        const { query, loading, message, currentPageNo, totalPages } = this.state;

        const showPrevLink = 0 < currentPageNo;
        const showNextLink = totalPages > currentPageNo;

        return (
            <div className="container">
                {/* Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        name="query"
                        value={query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                    />
                    <i className="fa fa-search search-icon" aria-hidden="true" />
                </label>

                {/*	Error Message*/}
                {message && <p className="message">{message}</p>}

                {/*	Loader*/}
                {/* <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loader" /> */}

                {loading ? <PageLoader /> : null}

                {/*Navigation*/}
                <PageNavigation
                    loading={loading}
                    showPrevLink={showPrevLink}
                    showNextLink={showNextLink}
                    handlePrevClick={(event) => this.handlePageClick('prev', event)}
                    handleNextClick={(event) => this.handlePageClick('next', event)}
                    authorName={this.state.authorName}
                    handleAuthorNulling={this.handleAuthorNulling}
                />

                {/*	Result*/}
                {this.renderSearchResults()}

                {/*Navigation*/}
                <PageNavigation
                    loading={loading}
                    showPrevLink={showPrevLink}
                    showNextLink={showNextLink}
                    handlePrevClick={(event) => this.handlePageClick('prev', event)}
                    handleNextClick={(event) => this.handlePageClick('next', event)}
                    authorName={this.state.authorName}
                    handleAuthorNulling={this.handleAuthorNulling}
                />

            </div>
        )
    }
}

export default Search
