import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import * as request from '../../../lib/request/request.js';

import { AppLocation } from '../helpers/appLocation.js';
import { DataParse } from '../helpers/dataParse.js';
import { PageContentComponent } from './pageContent/pageContent.jsx';
import { PreloaderComponent } from './preloader/preloader.jsx';

export class SeasonTwoPageComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false,
			preloader: true,
			loadProgress: 0
		};

		this.progressStep = 25;

		this.pageContentRef;

		this.cardsStatisticData = {};

		this.snackbarContainer;

		this.getData = this.getData.bind(this);
		this.parseStatisticData = this.parseStatisticData.bind(this);
		this.pageContentRendered = this.pageContentRendered.bind(this);
		this.setPreloaderProgress = this.setPreloaderProgress.bind(this);
		this.renderPreloader = this.renderPreloader.bind(this);


	}

	getData() {

		const _this = this;

		this.setPreloaderProgress();

		request
			.get(AppLocation.getRequestUrl('season2data'), (body) => {

				if (body.code !== undefined) {
					const data = { message: JSON.stringify(body) };
					_this.snackbarContainer.MaterialSnackbar.showSnackbar(data);
				} else {
					_this.parseStatisticData(body);
					_this.setPreloaderProgress();
				}
			}, (error) => {
				_this.snackbarContainer.MaterialSnackbar.showSnackbar(JSON.stringify(error));
			});


	}

	parseStatisticData(data) {
		this.cardsStatisticData = DataParse.cardsData(data);

		let snackData;

		if (this.cardsStatisticData.code !== undefined) {
			snackData = { message: JSON.stringify(this.cardsStatisticData) };
		} else {
			// const snackData = { message: JSON.stringify(this.cardsStatisticData) };
			snackData = { message: 'Statistical dashboard rendered!' };
			this.setPreloaderProgress();
		}

		if (this.snackbarContainer.MaterialSnackbar === undefined) {
			this.snackbarContainer = document.querySelector('#toast-notification');
		}

		setTimeout(() => {
			if (this.snackbarContainer.MaterialSnackbar !== undefined) {
				this.snackbarContainer.MaterialSnackbar.showSnackbar(snackData);
			}
		}, 200);


	}

	pageContentRendered(rendered) {
		if (rendered) {
			this.setPreloaderProgress();
		}
	}

	setPreloaderProgress() {
		this.setState({
			loadProgress: this.state.loadProgress + this.progressStep
		});

		if (this.state.loadProgress === 100) {
			setTimeout(() => {
				this.setState({
					preloader: false
				})
			}, 500)
		}
	}

	exitToMainPage() {
		AppLocation.goToPage('');
	}

	openDonationPage() {
		AppLocation.goToPage('donation');
	}

	openContactsPage() {
		AppLocation.goToPage('contacts');
	}

	goToSeason1() {
		AppLocation.goToPage('season1');
	}

	renderPageContent() {
		if (this.state.loadProgress >= 75) {
			return (
				<PageContentComponent loading={this.state.loadProgress} rendered={this.pageContentRendered} data={this.cardsStatisticData} />
			);
		}
	}

	renderPreloader() {
		if (this.state.preloader) {
			return (
				<PreloaderComponent progress={this.state.loadProgress} />
			);
		}
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
		this.getData();
		this.snackbarContainer = document.querySelector('#toast-notification');
	}

	render() {
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
				<header className="mdl-layout__header">
					<div className="mdl-layout__header-row">
						<span className="mdl-layout-title">Season 2 - Trials Fusion</span>
						<div className="mdl-layout-spacer"></div>
						<nav className="mdl-navigation mdl-layout--large-screen-only">
							<button className="mdl-navigation__button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.exitToMainPage}>
								Exit
							</button>
						</nav>
					</div>
				</header>
				<div className="mdl-layout__drawer">
					<span className="mdl-layout-title">Season 2</span>
					<nav className="mdl-navigation">
						<a className="mdl-navigation__link" onClick={this.goToSeason1}>Season 1</a>
						<a className="mdl-navigation__link" onClick={this.openContactsPage}>Contacts</a>
						<a className="mdl-navigation__link" onClick={this.openDonationPage}>Donation</a>
						<a className="mdl-navigation__link exit" onClick={this.exitToMainPage}>Exit</a>
					</nav>
				</div>
				<main className="mdl-layout__content content-scrollbar">

					{this.renderPageContent()}
					{this.renderPreloader()}

					<div id="toast-notification" className="mdl-js-snackbar mdl-snackbar">
						<div className="mdl-snackbar__text"></div>
						<button className="mdl-snackbar__action" type="button"></button>
					</div>
				</main>

				<footer className="mdl-mini-footer">
					<div className="mdl-mini-footer__left-section">
						<div className="mdl-logo">Andrey Menshikh</div>
						<ul className="mdl-mini-footer__link-list">
							<li><a href="https://github.com/IHarryIJumper/trials-fusion-stats-cptsparkles">Github</a></li>
							<li><a onClick={this.openContactsPage}>Contacts</a></li>
							<li><a onClick={this.openDonationPage}>Donation</a></li>
						</ul>
					</div>
				</footer>
			</div>

		);
	}
}