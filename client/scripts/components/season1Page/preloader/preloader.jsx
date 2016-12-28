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
	}

	render() {
		return (

			<div className="content-preloader">
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