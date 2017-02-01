/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
const API_KEY = 'AIzaSyDnw7Y2mhvlUt8C8xJ79Imow6q8HqcJD6g';
const SEARCH_ENGINE_ID = '013854806862222881746:eeyn7jawz24';

const SearchResult = ({title, snippet, link, pagemap }) =>
  <a href={link}>
    <div className="search-result">
      <div className="search-result_img_container" style={{minWidth: '30%'}}>
        {pagemap && pagemap.cse_image && pagemap.cse_image.length > 0 ? <img height="200" width="200" alt="" src={pagemap.cse_image[0].src} /> : null}
      </div>
      <div className="search-result_bd">
        <h2 className="search-result_title" dangerouslySetInnerHTML={{__html: title}} />
        <span style={{color: 'green'}}>{link}</span>
        <div className="search-result_description" dangerouslySetInnerHTML={{__html: snippet}}>
        </div>
      </div>
    </div>
  </a>
;

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  pagemap: PropTypes.object,
  link: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
};

export default class GoogleCustomSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      oembed: {
        display: false
      },
      filters: [
        {name: 'All', key: ''},
        {name: 'StoryWeaver', key: 'more:storyweaver'},
        {name: 'African Storybook', key: 'more:africanstorybook'},
        {name: 'Let\'s Read', key: 'more:letsreadbooksorg'},
        {name: 'Bookshare', key: 'more:bookshare'},
      ],
      selectedFilter: undefined,
      filter: '',
      query: ''
    };
  }


  render() {
    const handleQueryChange = (event) => {
      this.setState({query: event.target.value});
    };

    const search = (filter = '') => {
      fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${this.state.query} ${filter}`)
        .then(res => res.json())
        .then(json => {
          console.log(json.items);
          this.setState({items: json.items});
        });
    };

    const searchWithFilter = (filter) => {
      this.setState({selectedFilter: filter.key});
      search(filter.key);
    };


    const handleSubmit = (event) => {
      event.preventDefault();
      search();
    };

    return (
      <div>
        <div className="page-header">
          <form onSubmit={handleSubmit} className="search-form search-form--on-dark" >
            <input
              type="text" className="search-form_query"
              onChange={handleQueryChange}
              value={this.state.query}
              placeholder="Search for books"
            />

            <button type="submit" className="search-form_btn">Search</button>
          </form>
        </div>
        <ul style={{margin: '0 auto', padding: '0 0 3em', maxWidth: '920px', display: 'flex' }}>
          {this.state.filters.map((item, i) =>
            <li
              style={{
                display: 'inline-block',
                fontWeight: item.key === this.state.selectedFilter ? 'bold' : 'normal',
                float: 'left',
                cursor: 'pointer',
                padding: '10px 15px',
                color: '#005987',
                fontSize: '15px'
              }}
              key={i}
              onClick={() => searchWithFilter(item)}
            >
              {item.name}
            </li>)}
        </ul>
        <div className="search-results">
          {this.state.items ? this.state.items.map((item, i) => <SearchResult key={i} {...item} />) : <p>No Results</p>}
        </div>
      </div>
    );
  }
}
