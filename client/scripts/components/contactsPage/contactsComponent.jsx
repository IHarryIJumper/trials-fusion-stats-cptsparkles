import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import DeveloperPhoto from './images/me.jpg';

import { AppLocation } from '../helpers/appLocation.js';

export class ContactsPageComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

	}

	exitToMainPage() {
		AppLocation.goToPage('');
	}

	goBackPage() {
		AppLocation.goBack();
	}

	openDonationPage() {
		AppLocation.goToPage('donation');
	}

	openGithub() {
		window.open('https://github.com/IHarryIJumper');
	}

	openTwitter() {
		window.open('https://twitter.com/iharryijumper');
	}

	openFacebook() {
		window.open('https://www.facebook.com/iharryijumper');
	}

	openVK() {
		window.open('https://vk.com/iharryijumper');
	}

	openEmail() {
		window.open('mailto:harrydevfs@gmail.com');
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
	}

	render() {
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
				<header className="mdl-layout__header">
					<div className="back-button mdl-layout__drawer-button" onClick={this.goBackPage}>
						<i className="material-icons">keyboard_arrow_left</i>
					</div>
					<div className="mdl-layout__header-row">
						<span className="mdl-layout-title">Contacts</span>
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

						<div className="mdl-card mdl-shadow--2dp contacts-card">
							<div className="mdl-card__title">
								<h2 className="mdl-card__title-text">Developer</h2>
							</div>
							<div className="mdl-card__supporting-text">
								<div className="card-information">
									<div className="developer-photo">
										<img src={DeveloperPhoto} alt='Developer photo' />
									</div>
									<div className="developer-message">

										<p>Hello, guys! My name is Andrey Menshikh. I love <a href="https://www.youtube.com/channel/UCshoKvlZGZ20rVgazZp5vnQ">CaptainSparklez</a> Trials series, and I decided to create this statistic dashboard.</p>
										<p>Hope you like it! :)</p>
										<p> – Andrey</p>

									</div>
									<div className="contact-message">
										<p>If you want, you can contact me with questions or suggestions.</p>
										<p>Just send me e-mail, or contact me with any of social networks.</p>
									</div>
								</div>
							</div>
							<div className="mdl-card__actions mdl-card--border contacts-options">
								<div className="social-networks">
									<div id="github-button" className="buttons">
										<button className="mdl-button mdl-js-button mdl-button--icon mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.openGithub}>
											<i className="fa fa-github fa-1x" aria-hidden="true"></i>
										</button>
									</div>
									<div id="twitter-button" className="buttons">
										<button className="mdl-button mdl-js-button mdl-button--icon mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.openTwitter}>
											<i className="fa fa-twitter fa-1x" aria-hidden="true"></i>
										</button>
									</div>
									<div id="fb-button" className="buttons">
										<button className="mdl-button mdl-js-button mdl-button--icon mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.openFacebook}>
											<i className="fa fa-facebook fa-1x" aria-hidden="true"></i>
										</button>
									</div>
									<div id="vk-button" className="buttons">
										<button className="mdl-button mdl-js-button mdl-button--icon mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.openVK}>
											<i className="fa fa-vk fa-1x" aria-hidden="true"></i>
										</button>
									</div>
									<div id="email-button" className="buttons">
										<button className="mdl-button mdl-js-button mdl-button--icon mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.openEmail}>
											<i className="fa fa-envelope-o fa-1x" aria-hidden="true"></i>
										</button>
									</div>
								</div>
							</div>

						</div>

					</div>
				</main>

				<footer className="mdl-mini-footer">
					<div className="mdl-mini-footer__left-section">
						<div className="mdl-logo">Andrey Menshikh</div>
						<ul className="mdl-mini-footer__link-list">
							<li><a href="https://github.com/IHarryIJumper/trials-fusion-stats-cptsparkles">Github</a></li>
							<li><a onClick={this.openDonationPage}>Donation</a></li>
						</ul>
					</div>
				</footer>
			</div>

		);
	}
}


// old donation button link

// https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif