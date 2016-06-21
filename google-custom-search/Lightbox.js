import React, {PropTypes} from 'react';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: props.display };
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
  }

  componentWillReceiveProps(props) {
    const { display } = props;
    this.setState({display});
  }

  onCloseButtonClick(evt) {
    this.setState({display: false}, () => this.props.onClose());
    evt.preventDefault();
  }

  render() {
    const {children} = this.props;

    return this.state.display ? <div className="lightbox">
      <div className="lightbox_content" style={{minWidth: '1345px'}}>
        <a href="#" className="close-dialog" onClick={this.onCloseButtonClick}>
          x
        </a>
        {children}
      </div>
    </div> : null;
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func,
  display: PropTypes.bool
};

Lightbox.defaultProps = {
  display: true,
  onClose: () => {}
};
