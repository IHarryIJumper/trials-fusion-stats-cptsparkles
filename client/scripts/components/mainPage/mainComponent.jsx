import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import '../../../lib/jquery-focuspoint/js/jquery.focuspoint.min.js';

export class MainPageComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

	}

	componentWillMount() {
		this.setState({
			_isMounted: true
		});
	}

	componentWillUnmount() {
		this.setState({
			_isMounted: false
		});
	}

	componentDidMount() {
		$('.focuspoint').focusPoint();
	}

	render() {
		return (
			<div id='main-page-container'>
				<div id='main-page-background' className="focuspoint"
					data-focus-x="0"
					data-focus-y="0"
					data-image-w="900"
					data-image-h="900">
					<div></div>
					<img src="logo-blur.jpg" />
				</div>

				<div id='menu-container'>
					<div id='menu-elements'>
						<button type="season1" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
							<div className='menu-button-name'>
								Season 1
							</div>
						</button>
						<button type="season2" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
							<div className='menu-button-name'>
								Season 2
							</div>
						</button>
					</div>
				</div>

				<div id="main-footer">
					<footer className="mdl-mini-footer">
						<div className="mdl-mini-footer__left-section">
							<div className="mdl-logo">Andrey Menshikh</div>
							<ul className="mdl-mini-footer__link-list">
								<li><a href="https://github.com/IHarryIJumper">Github</a></li>
								<li><a href="https://vk.com/iharryijumper">Contacts</a></li>
								<li><a href="#">Donation</a></li>
							</ul>
						</div>
					</footer>
				</div>

			</div>

		);
	}
}