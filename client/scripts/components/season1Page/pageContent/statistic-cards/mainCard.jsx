import React, { PropTypes } from 'react';

import moment from 'moment';
// import * as moment from 'moment';

export class MainCardComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.getEpisodeDate = this.getEpisodeDate.bind(this);
		this.renderWins = this.renderWins.bind(this);

	}

	getEpisodeDate() {
		const localDate = moment([this.props.data.lastEpisode.date.year, this.props.data.lastEpisode.date.month, this.props.data.lastEpisode.date.day]).format('LL');

		return localDate;
	}

	renderWins() {
		const _this = this;
		return Object.keys(this.props.data.wins).map((winner) => (
			<div className="card-information-row mdl-grid" key={winner + '-' + new Date().getTime()}>
				<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone">{winner} wins:</div>
				<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone">{_this.props.data.wins[winner]}</div>
			</div>
		));
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
		/*<div className="mdl-card__actions mdl-card--border">
			<a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				Get Started
					</a>
		</div>*/
		
		return (
			<div className="demo-card-wide mdl-card mdl-shadow--2dp statistic-card main-card">
				<div className="mdl-card__title">
					<h2 className="mdl-card__title-text">Main information</h2>
				</div>
				<div className="mdl-card__supporting-text">
					<div className="card-information">
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone main-info">Total winner:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone">{this.props.data.totalWinner}</div>
						</div>
						{this.renderWins()}
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-phone card-separator">Last episode:</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-phone">Number:</div>
							<div className="mdl-cell mdl-cell--8-col mdl-cell--2-col-phone">{this.props.data.lastEpisode.id}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-phone">Date:</div>
							<div className="mdl-cell mdl-cell--8-col mdl-cell--2-col-phone">{this.getEpisodeDate()}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-phone">Name:</div>
							<div className="mdl-cell mdl-cell--8-col mdl-cell--2-col-phone">{this.props.data.lastEpisode.name}</div>
						</div>
					</div>
				</div>

			</div>

		);
	}
}

MainCardComponent.propTypes = {
	data: PropTypes.object.isRequired
};