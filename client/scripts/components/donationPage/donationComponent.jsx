import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import { AppLocation } from '../helpers/appLocation.js';

import PayPalButtonImage from './images/donation-paypal.png';

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
								<h2 className="mdl-card__title-text">Project support</h2>
							</div>
							<div className="mdl-card__supporting-text">
								<div className="card-information">
									Here you can donate for the glory of Steez God. And Steez God will grant you the blessing for winning every Trials Map.
									<br /> <br />
									Also for your donations Steez God will help me to improve this project.
									<br /> <br />
									Money will be spent for:
									<ul>
										<li>Server payment</li>
										<li>More beautiful domain name</li>
										<li>Project improvement</li>
										<li>Food for developer</li>
									</ul>
									<br />
									Thank you very much!
								</div>
							</div>
							<div className="mdl-card__actions mdl-card--border donation-options">
								<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" className="paypal-donation">
									<input type="hidden" name="cmd" value="_s-xclick" />
									<input type="hidden" name="hosted_button_id" value="9VMUMJKKSJYPG" />
									
									<input type="image" src={PayPalButtonImage} data-border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" className='paypal-button-image'/>
									<img alt="" data-border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
								</form>
								<div style={{ fontSize: '16px', margin: '0 auto', width: '300' + 'px' }} className="blockchain-btn blockchain-donation"
									data-address="1DJKNg48c2Wu2fTVhgcnXpkYogaPxob5NG"
									data-shared="false">
									<div className="blockchain stage-begin">
										<img src="https://blockchain.info/Resources/buttons/donate_64.png" />
									</div>
									<div className="blockchain stage-loading" style={{ textAlign: 'center' }}>
										<img src="https://blockchain.info/Resources/loading-large.gif" />
									</div>
									<div className="blockchain stage-ready">
										<p data-align="center">Please Donate To Bitcoin Address: <b>[[address]]</b></p>
										<p data-align="center" className="qr-code"></p>
									</div>
									<div className="blockchain stage-paid">
										Donation of <b>[[value]] BTC</b> Received. Thank You.
    								</div>
									<div className="blockchain stage-error">
										<font color="red">[[error]]</font>
									</div>
								</div>
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


// old donation button link

// https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif