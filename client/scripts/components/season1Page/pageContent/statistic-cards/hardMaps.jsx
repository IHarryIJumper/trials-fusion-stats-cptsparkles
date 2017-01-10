import React, { PropTypes } from 'react';

export class HardMapsCardComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.renderWins = this.renderWins.bind(this);

	}

	renderWins() {
		const _this = this;
		return Object.keys(this.props.data.wins).map((winner) => (
			<div className="card-information-row mdl-grid" key={winner + '-' + new Date().getTime()}>
				<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone">{winner}:</div>
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
		
		return (
			<div className="demo-card-wide mdl-card mdl-shadow--2dp statistic-card main-card">
				<div className="mdl-card__title">
					<h2 className="mdl-card__title-text">Hard Maps</h2>
				</div>
				<div className="mdl-card__supporting-text">
					<div className="card-information">
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone main-info">Winner:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone">{this.props.data.winner}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone">Winner/played map:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone">{this.props.data.winnerPerEpisode}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone">Most DNFs:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone">{this.props.data.dnfs}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone">DNFs/played map:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone">{this.props.data.dnfsPerEpisode}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone">Maps:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone">{this.props.data.maps}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-phone card-separator">Wins:</div>
						</div>
						{this.renderWins()}
					</div>
				</div>

			</div>

		);
	}
}

HardMapsCardComponent.propTypes = {
	data: PropTypes.object.isRequired
};