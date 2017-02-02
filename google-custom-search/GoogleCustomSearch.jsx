/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import Lightbox from './Lightbox';

const API_KEY = 'AIzaSyDnw7Y2mhvlUt8C8xJ79Imow6q8HqcJD6g';
const SEARCH_ENGINE_ID = '002440041655193717423:vmlkbehvgxq';

const PreviewEmbed = ({link, pagemap, onPreview}) => {
  if (pagemap.videoobject && pagemap.videoobject.length === 1) {
    const obj = pagemap.videoobject[0];
    return <button onClick={() => onPreview(obj.embedurl, obj.height, obj.width)} className="button button--outline">Forhåndsvis</button>;
  } else if (link.startsWith('https://en.wikipedia.org')) {
    const parts = link.split('/');
    const title = parts[parts.length - 1];
    const emebedLink = `https://en.wikipedia.org/w/index.php?title=${title}&printable=yes`;
    return <button onClick={() => onPreview(emebedLink, '720', '100%')} className="button button--outline">Forhåndsvis</button>;
  } else if (link.startsWith('https://quizlet.com/')) {
    return <button onClick={() => onPreview('https://quizlet.com/75304482/flashcards/embed', '420', '100%')} className="button button--outline">Forhåndsvis</button>;
  } else if (link.startsWith('http://ndla.no/')) {
    const group = link.match(/http:\/\/ndla\.no\/(.+)\/node\/(\d+)/);
    if (group.length === 3) {
      const [, lang, id] = group;
      return <button onClick={() => onPreview(`http://ndla.no/${lang}/easyreader/${id}`, '720', '100%')} className="button button--outline">Forhåndsvis</button>;
    }
  }

  return null;
};

PreviewEmbed.propTypes = {
  link: PropTypes.string.isRequired,
  pagemap: PropTypes.object.isRequired,
  onPreview: PropTypes.func.isRequired
};

const SearchResult = ({title, snippet, link, pagemap, onPreview }) =>
  <div className="search-result">
    <div className="search-result_img_container">
      {pagemap && pagemap.cse_image && pagemap.cse_image.length > 0 ? <img height="200" width="200" alt="iasdgesdjkfl" src={pagemap.cse_image[0].src} /> : null}
    </div>
    <div className="search-result_bd">
      <h2 className="search-result_title" dangerouslySetInnerHTML={{__html: title}} />
      <a href={link} style={{color: 'green'}}>{link}</a>
      <div className="search-result_description" dangerouslySetInnerHTML={{__html: snippet}}>
      </div>
      <div style={{padding: '10px 0'}}>
        <PreviewEmbed link={link} pagemap={pagemap} onPreview={onPreview} />
      </div>
    </div>
  </div>
;

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  pagemap: PropTypes.object,
  link: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  onPreview: PropTypes.func.isRequired
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
        {name: 'Alle', key: ''},
        {name: 'Khan', key: 'more:khan'},
        {name: 'Quizlet', key: 'more:quizlet'},
        {name: 'Youtube', key: 'more:youtube'},
        {name: 'Wikipedia', key: 'more:wikipedia'},
        {name: 'Ted', key: 'more:ted'},
        {name: 'NDLA', key: 'more:ndla'},
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


    const handlePreview = (src, height, width) => {
      this.setState({oembed: {
        display: true,
        src,
        height,
        width
      }});
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

    const searchKhan = (type) => {
      search(`more:khan more:pagemap:document-type:${type}`);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      search();
    };

    let onLightboxClose = () => this.setState({oembed: {display: false}});

    return (
      <div>
        <div className="page-header">
          <form onSubmit={handleSubmit} className="search-form search-form--on-dark" >
            <input
              type="text" className="search-form_query"
              onChange={handleQueryChange}
              value={this.state.query}
              placeholder="Søk etter embeddable innhold"
            />

            <button type="submit" className="search-form_btn">Søk</button>
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
                fontSize: '15px'}}
              key={i}
              onClick={() => searchWithFilter(item)}
            >
              {item.name}
            </li>)}
        </ul>
        {this.state.selectedFilter === 'more:khan' ?
          <ul style={{margin: '0 auto', padding: '0 0 0.5em', marginTop: '-3em', maxWidth: '920px', display: 'flex' }}>
            <li
              style={{ display: 'inline-block', float: 'left', cursor: 'pointer', padding: '10px 15px', color: '#005987', fontSize: '15px'}}
              key={1}
              onClick={() => searchKhan('video')}
            >
              Videos
            </li>
            <li
              style={{ display: 'inline-block', float: 'left', cursor: 'pointer', padding: '10px 15px', color: '#005987', fontSize: '15px'}}
              key={2}
              onClick={() => searchKhan('article')}
            >
              Articles
            </li>
            <li
              style={{ display: 'inline-block', float: 'left', cursor: 'pointer', padding: '10px 15px', color: '#005987', fontSize: '15px'}}
              key={3}
              onClick={() => searchKhan('exercise')}
            >
              Exercises
            </li>
          </ul>

        : null}
        <div className="search-results">
          {this.state.items ? this.state.items.map((item, i) => <SearchResult onPreview={handlePreview} key={i} {...item} />) : <p>Ingen treff</p>}
        </div>
        <Lightbox display={this.state.oembed.display} onClose={onLightboxClose}>
          <iframe border="0" src={this.state.oembed.src} height={this.state.oembed.height} width={this.state.oembed.width}></iframe>
        </Lightbox>
      </div>
    );
  }
}
