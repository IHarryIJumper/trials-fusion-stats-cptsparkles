import React, { PropTypes } from 'react';

export class DNFsCardComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.renderDNFs = this.renderDNFs.bind(this);

	}

	renderDNFs() {
		const _this = this;
		return Object.keys(this.props.data.dnfs).map((person) => (
			<div className="card-information-row mdl-grid" key={person + '-' + new Date().getTime()}>
				<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone mdl-cell--4-col-tablet">{person}:</div>
				<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone mdl-cell--4-col-tablet">{_this.props.data.dnfs[person]}</div>
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
					<h2 className="mdl-card__title-text">DNF Master</h2>
				</div>
				<div className="mdl-card__supporting-text">
					<div className="card-information">
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone mdl-cell--4-col-tablet main-info">DNF Master:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone mdl-cell--4-col-tablet">{this.props.data.winner}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone mdl-cell--4-col-tablet">DNFs/maps:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone mdl-cell--4-col-tablet">{this.props.data.winnerPerEpisode}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-phone mdl-cell--12-col-tablet card-separator">DNFs:</div>
						</div>
						{this.renderDNFs()}
					</div>
				</div>

			</div>

		);
	}
}

DNFsCardComponent.propTypes = {
	data: PropTypes.object.isRequired
};