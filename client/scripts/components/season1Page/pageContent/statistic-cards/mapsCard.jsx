import React, { PropTypes } from 'react';

export class MapsCardComponent extends React.Component {
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
			<div className="demo-card-wide mdl-card mdl-shadow--2dp statistic-card main-card">
				<div className="mdl-card__title">
					<h2 className="mdl-card__title-text">Played maps</h2>
				</div>
				<div className="mdl-card__supporting-text">
					<div className="card-information">
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone mdl-cell--4-col-tablet main-info">Maps:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone mdl-cell--4-col-tablet">{this.props.data.maps}</div>
						</div>
						<div className="card-information-row mdl-grid">
							<div className="mdl-cell mdl-cell--7-col mdl-cell--2-col-phone mdl-cell--4-col-tablet">Dropped:</div>
							<div className="mdl-cell mdl-cell--5-col mdl-cell--2-col-phone mdl-cell--4-col-tablet">{this.props.data.mapsDropped}</div>
						</div>
					</div>
				</div>

			</div>

		);
	}
}

MapsCardComponent.propTypes = {
	data: PropTypes.object.isRequired
};