import React, { Component, PropTypes } from 'react';
// import Masthead from '../components/Masthead';
// import { Wrapper, Content, Footer } from '../common/Layout';
// import { resolveJsonOrRejectWithError } from '../sources/helpers';
import Lightbox from './Lightbox';

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
        {link.startsWith('https://quizlet.com/') ? <button onClick={() => onPreview(link)} className="button button--outline">Forhåndsvis</button> : <button className="button button--outline">Forhåndsvis</button>}
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
      quizletFilter: 'more:quizlet',
      khanFilter: 'more:khan',
      displayPreview: false,
      filters: [
        {name: 'Alle', key: ''},
        {name: 'Khan', key: 'more:khan'},
        {name: 'Quizlet', key: 'more:quizlet'},
        {name: 'Youtube', key: 'more:youtube'},
        {name: 'Wikipedia', key: 'more:wikipedia'},
        {name: 'Ted', key: 'more:ted'},
      ],
      filter: '',
      query: ''
    };
  }


  render() {
    const handleQueryChange = (event) => {
      this.setState({query: event.target.value});
    };


    const handlePreview = (link) => {
      this.setState({displayPreview: true});
    };

    const search = (filter = '') => {
      fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDicPKhQKogss0BInZAe6FxJ3FDtMoyhM4&cx=001183900486732250060:meto1wr3d0g&q=${this.state.query} ${filter}`)
        .then(res => res.json())
        .then(json => {
          console.log(json.items);
          this.setState({items: json.items});
        });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      search();
    };

    let onLightboxClose = () => this.setState({displayPreview: false});

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
                float: 'left',
                cursor: 'pointer',
                padding: '10px 15px',
                color: '#005987',
                fontSize: '15px'}}
              key={i}
              onClick={() => search(item.key)}
            >
              {item.name}
            </li>)}
        </ul>
        <div className="search-results">
          {this.state.items ? this.state.items.map((item, i) => <SearchResult onPreview={handlePreview} key={i} {...item} />) : <p>Ingen treff</p>}
        </div>
        <Lightbox display={this.state.displayPreview} onClose={onLightboxClose}>
          <iframe src="https://quizlet.com/75304482/flashcards/embed" height="410" width="100%"></iframe>
        </Lightbox>
      </div>
    );
  }
}
