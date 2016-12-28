import React, { PropTypes } from 'react';

export class PreloaderComponent extends React.Component {
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
		const _this = this;
		this.refs.progressBar.addEventListener('mdl-componentupgraded', function () {
			this.MaterialProgress.setProgress(_this.props.progress);
		});
		/*document.querySelector('#progress-bar').addEventListener('mdl-componentupgraded', function () {
			this.MaterialProgress.setProgress(_this.props.progress);
		});*/
	}

	componentDidUpdate() {
		if (this.refs.progressBar.MaterialProgress !== undefined) {
			this.refs.progressBar.MaterialProgress.setProgress(this.props.progress);
		}
	}

	render() {
		let preloaderContentClassName = "content-preloader";

		if (this.props.progress === 100) {
			preloaderContentClassName += ' complete';
		}
		return (

			<div className={preloaderContentClassName}>
				<div id="progress-bar" className="mdl-progress mdl-js-progress" ref="progressBar"></div>
			</div>

		);
	}
}

PreloaderComponent.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	progress: PropTypes.number.isRequired
};