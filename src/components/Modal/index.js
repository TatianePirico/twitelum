import React , { Component } from 'react';
import Widget from '../Widget';

import './modal.css';

class Modal extends Component {

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
					{ children }
					</Widget>
				</div>
			</div>
		);
	}
}

export default Modal;