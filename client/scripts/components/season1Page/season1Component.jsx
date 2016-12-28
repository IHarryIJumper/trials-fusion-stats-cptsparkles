import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import Masonry from 'react-masonry-component';

import { AppLocation } from '../helpers/appLocation.js';
import { PageContentComponent } from './pageContent/pageContent.jsx';

export class SeasonOnePageComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.pageContentRef;

		this.exitToMainPage = this.exitToMainPage.bind(this);

	}

	exitToMainPage() {
		AppLocation.goToPage('');
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
						<span className="mdl-layout-title">Season 1 - Trials Evolution</span>
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
				<main className="mdl-layout__content content-scrollbar">
					<PageContentComponent />
					<div className="content-preloader">
						<div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
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