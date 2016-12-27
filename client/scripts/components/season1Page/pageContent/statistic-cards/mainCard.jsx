import React from 'react';

export class MainCardComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

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
			<div className="demo-card-wide mdl-card mdl-shadow--2dp statistic-card">
				<div className="mdl-card__title">
					<h2 className="mdl-card__title-text">Main information</h2>
				</div>
				<div className="mdl-card__supporting-text">
					<div className="card-information">
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-phone">Jordan wins:</div>
							<div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-phone">54</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--6-col">Nick wins:</div>
							<div className="mdl-cell mdl-cell--6-col">31</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--6-col">Nick wins:</div>
							<div className="mdl-cell mdl-cell--6-col">31</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--6-col">Nick wins:</div>
							<div className="mdl-cell mdl-cell--6-col">31</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--6-col">Nick wins:</div>
							<div className="mdl-cell mdl-cell--6-col">31</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--6-col">Nick wins:</div>
							<div className="mdl-cell mdl-cell--6-col">31</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--6-col">Nick wins:</div>
							<div className="mdl-cell mdl-cell--6-col">31</div>
						</div>
					</div>
				</div>
				<div className="mdl-card__actions mdl-card--border">
					<a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
						Get Started
					</a>
				</div>
			</div>

		);
	}
}