import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import { AppLocation } from '../helpers/appLocation.js';

import request from 'request';

export class DonationPageComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.exitToMainPage = this.exitToMainPage.bind(this);
		this.goBackPage = this.goBackPage.bind(this);

	}

	exitToMainPage() {
		AppLocation.goToPage('');
	}

	goBackPage() {
		AppLocation.goBack();
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
		this.snackbarContainer = document.querySelector('#toast-notification');
	}

	render() {
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
				<header className="mdl-layout__header">
					<div className="back-button mdl-layout__drawer-button" onClick={this.goBackPage}>
						<i className="material-icons">keyboard_arrow_left</i>
					</div>
					<div className="mdl-layout__header-row">
						<span className="mdl-layout-title">Donation</span>
						<div className="mdl-layout-spacer"></div>
						<nav className="mdl-navigation mdl-layout--large-screen-only">
							<a className="mdl-navigation__link" href="">Link</a>
							<a className="mdl-navigation__link" href="">Link</a>
							<a className="mdl-navigation__link" href="">Link</a>
							<button className="mdl-navigation__button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.exitToMainPage}>
								Exit
							</button>
						</nav>
					</div>
				</header>
				<main className="mdl-layout__content content-scrollbar">
					<div className="page-content">

						<div className="demo-card-wide mdl-card mdl-shadow--2dp donation-card">
							<div className="mdl-card__title">
								<h2 className="mdl-card__title-text">Donation</h2>
							</div>
							<div className="mdl-card__supporting-text">
								<div className="card-information">
									Donation info
								</div>
							</div>
							<div className="mdl-card__actions mdl-card--border">
								<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
									<input type="hidden" name="cmd" value="_s-xclick" />
									<input type="hidden" name="hosted_button_id" value="9VMUMJKKSJYPG" />
									<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" data-border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
									<img alt="" data-border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
								</form>
							</div>

						</div>

					</div>
					<div id="toast-notification" className="mdl-js-snackbar mdl-snackbar">
						<div className="mdl-snackbar__text"></div>
						<button className="mdl-snackbar__action" type="button"></button>
					</div>
				</main>

				<footer className="mdl-mini-footer">
					<div className="mdl-mini-footer__left-section">
						<div className="mdl-logo">Andrey Menshikh</div>
						<ul className="mdl-mini-footer__link-list">
							<li><a href="https://github.com/IHarryIJumper">Github</a></li>
							<li><a href="https://vk.com/iharryijumper">Contacts</a></li>
						</ul>
					</div>
				</footer>
			</div>

		);
	}
}