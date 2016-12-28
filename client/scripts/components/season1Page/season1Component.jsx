import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import request from 'request';

import { AppLocation } from '../helpers/appLocation.js';
import { DataParse } from '../helpers/dataParse.js';
import { PageContentComponent } from './pageContent/pageContent.jsx';
import { PreloaderComponent } from './preloader/preloader.jsx';

export class SeasonOnePageComponent extends React.Component {
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
		this.exitToMainPage = this.exitToMainPage.bind(this);
		this.renderPreloader = this.renderPreloader.bind(this);

	}

	getData() {

		const _this = this;

		this.setPreloaderProgress();

		request
			.get(AppLocation.getRequestUrl('season1data'), function (error, response, body) {
				if (!error && response.statusCode === 200) {
					if (body.code !== undefined) {
						const data = { message: JSON.stringify(body) };
						_this.snackbarContainer.MaterialSnackbar.showSnackbar(data);
						console.log(body) // Show the HTML for the Google homepage.
					} else {
						_this.parseStatisticData(body);
						_this.setPreloaderProgress();
					}
				}
			});
	}

	parseStatisticData(data) {
		this.cardsStatisticData = DataParse.cardsData(data);
		const snackData = { message: JSON.stringify(this.cardsStatisticData) };
		this.snackbarContainer.MaterialSnackbar.showSnackbar(snackData);
		this.setPreloaderProgress();
	}

	pageContentRendered(rendered) {
		if(rendered) {
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

	renderPageContent() {
		if (this.state.loadProgress >= 75) {
			return (
				<PageContentComponent loading={this.state.loadProgress} rendered={this.pageContentRendered} />
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
		/*let progress = 0;
		setTimeout(() => {
			progress += 20;
			this.setState({
				loadProgress: progress
			})

			setTimeout(() => {
				progress += 20;
				this.setState({
					loadProgress: progress
				})
				setTimeout(() => {
					progress += 20;
					this.setState({
						loadProgress: progress
					})
					setTimeout(() => {
						progress += 20;
						this.setState({
							loadProgress: progress
						})
						setTimeout(() => {
							progress += 20;
							this.setState({
								loadProgress: progress
							})
							setTimeout(() => {
								this.setState({
									preloader: false
								})
							}, 1000)
						}, 1000)
					}, 1000)
				}, 1000)
			}, 1000)
		}, 1000)*/
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