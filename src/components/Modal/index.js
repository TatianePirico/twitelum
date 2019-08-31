import React , { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget';

import './modal.css';

class Modal extends Component {

	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		children: PropTypes.node,
		onClose: PropTypes.func.isRequired
	};

	static defaultProps = {
		children: '',
	};

	closeModal = (event) => {
		const clicouNoConteudo =  event.target.closest('.modal__conteudo');
    if(this.props.onClose && !clicouNoConteudo) this.props.onClose();
  }


	render(){

		const { isOpen, children } = this.props;

		return(
			<div className={`modal ${isOpen ? 'modal--active' : ''}`} onClick={this.closeModal} >
				<div className="modal__conteudo">
					<Widget>
					{ isOpen && children }
					</Widget>
				</div>
			</div>
		);
	}
}

export default Modal;