import React, { PropTypes } from 'react';

import Masonry from 'react-masonry-component';

import { MainCardComponent } from './statistic-cards/mainCard.jsx';
import { LastTenCardComponent } from './statistic-cards/lastTen.jsx';

export class PageContentComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.pageContentRef;

		this.renderMainCard = this.renderMainCard.bind(this);
		this.renderLastTenCard = this.renderLastTenCard.bind(this);

	}

	renderMainCard() {
		if (this.props.data.mainCard !== undefined) {

			return (
				<MainCardComponent data={this.props.data.mainCard} />
			);
		}
	}

	renderLastTenCard() {
		if (this.props.data.lastTen !== undefined) {

			return (
				<LastTenCardComponent data={this.props.data.lastTen} />
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
		this.props.rendered(true);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.loading > 75) {
			return false;
		} else {
			return true;
		}
	}

	render() {
		return (

			<div className="page-content" ref={this.pageContentRef}>

				<Masonry
					className={'masonry-grid'}
					elementType={'div'}
					options={{
						transitionDuration: 100
					}}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}>

					{this.renderMainCard()}
					{this.renderLastTenCard()}

				</Masonry>

			</div>

		);
	}
}

PageContentComponent.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	loading: PropTypes.number.isRequired,
	rendered: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};