import React, {PropTypes} from 'react';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: props.display };
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
    const onClose = this.onCloseButtonClick.bind(this);

    return this.state.display ? <div className="lightbox">
      <div className="lightbox_content" style={{minWidth: '900px'}}>
        <a href="#" className="close-dialog" onClick={onClose}>
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
