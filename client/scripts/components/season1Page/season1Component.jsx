import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

export class SeasonOnePageComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.exitToMainPage = this.exitToMainPage.bind(this);

	}

	getCurrentLocation() {
		return window.location.protocol + "//" + window.location.host + "/";
	}

	exitToMainPage() {
		window.location = this.getCurrentLocation();
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
					<div className="mdl-layout__header-row">
						<span className="mdl-layout-title">Season 1 - Trials Evolution 2</span>
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
				<div className="mdl-layout__drawer">
					<span className="mdl-layout-title">Season 1</span>
					<nav className="mdl-navigation">
						<a className="mdl-navigation__link" href="">Link</a>
						<a className="mdl-navigation__link" href="">Link</a>
						<a className="mdl-navigation__link" href="">Link</a>
						<a className="mdl-navigation__link" onClick={this.exitToMainPage}>Exit</a>
					</nav>
				</div>
				<main className="mdl-layout__content">
					<div className="page-content">


						<div className="demo-card-wide mdl-card mdl-shadow--2dp">
							<div className="mdl-card__title">
								<h2 className="mdl-card__title-text">Welcome</h2>
							</div>
							<div className="mdl-card__supporting-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    							Mauris sagittis pellentesque lacus eleifend lacinia...
  							</div>
							<div className="mdl-card__actions mdl-card--border">
								<a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
									Get Started
    							</a>
							</div>
							<div className="mdl-card__menu">
								<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
									<i className="material-icons">share</i>
								</button>
							</div>
						</div>


					</div>
				</main>

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

		);
	}
}