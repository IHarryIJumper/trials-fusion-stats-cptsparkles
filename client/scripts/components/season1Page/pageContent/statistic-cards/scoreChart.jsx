import React, { PropTypes } from 'react';

export class ScoreChartCardComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.chart;
		this.chartCanvas;

		this.renderChart = this.renderChart.bind(this);

	}

	renderChart() {
		this.chart = new Chart(this.chartCanvas, {
			type: 'line',
			data: this.props.data,
			options: {}
		});
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
		this.chartCanvas = document.getElementById('chart-canvas').getContext('2d');

		this.renderChart();
	}

	render() {

		return (
			<div className="demo-card-wide mdl-card mdl-shadow--2dp statistic-card chart-card score-chart">
				<div className="mdl-card__title">
					<h2 className="mdl-card__title-text">Score Season Chart</h2>
				</div>
				<div className="mdl-card__supporting-text">
					<canvas id="chart-canvas" width="660" height="400"></canvas>
				</div>

			</div>

		);
	}
}

ScoreChartCardComponent.propTypes = {
	data: PropTypes.object.isRequired
};