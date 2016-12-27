import React from 'react';

import Masonry from 'react-masonry-component';

import { MainCardComponent } from './statistic-cards/mainCard.jsx';

export class PageContentComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.pageContentRef;

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

			<div className="page-content" ref={this.pageContentRef}>

				<Masonry
					className={'masonry-grid'}
					elementType={'div'}
					options={{
						transitionDuration: 100
					}}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}>

					<MainCardComponent/>

				</Masonry>

			</div>

		);
	}
}