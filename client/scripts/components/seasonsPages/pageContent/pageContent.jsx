import React, { PropTypes } from 'react';

import Masonry from 'react-masonry-component';

import { MainCardComponent } from './statistic-cards/mainCard.jsx';
import { LastEpisodeCardComponent } from './statistic-cards/lastEpisode.jsx';
import { LastTenCardComponent } from './statistic-cards/lastTen.jsx';
import { EasyMapsCardComponent } from './statistic-cards/easyMaps.jsx';
import { MediumMapsCardComponent } from './statistic-cards/mediumMaps.jsx';
import { HardMapsCardComponent } from './statistic-cards/hardMaps.jsx';
import { ScoreChartCardComponent } from './statistic-cards/scoreChart.jsx';
import { FaultsCardComponent } from './statistic-cards/faultsCard.jsx';
import { DNFsCardComponent } from './statistic-cards/dnfsCard.jsx';
import { MapsCardComponent } from './statistic-cards/mapsCard.jsx';
import { DonkeyCardComponent } from './statistic-cards/donkeyCard.jsx';
import { PandaCardComponent } from './statistic-cards/pandaCard.jsx';

export class PageContentComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			_isMounted: false
		};

		this.pageContentRef;

		this.renderMainCard = this.renderMainCard.bind(this);
		this.renderLastEpisodeCard = this.renderLastEpisodeCard.bind(this);
		this.renderLastTenCard = this.renderLastTenCard.bind(this);
		this.renderEasyMapsCard = this.renderEasyMapsCard.bind(this);
		this.renderMediumMapsCard = this.renderMediumMapsCard.bind(this);
		this.renderHardMapsCard = this.renderHardMapsCard.bind(this);
		this.renderScoreChartCard = this.renderScoreChartCard.bind(this);
		this.renderFaultsCard = this.renderFaultsCard.bind(this);
		this.renderDNFsCard = this.renderDNFsCard.bind(this);
		this.renderMapsCard = this.renderMapsCard.bind(this);
		this.renderDonkeyCard = this.renderDonkeyCard.bind(this);
		this.renderPandaCard = this.renderPandaCard.bind(this);

	}

	renderMainCard() {
		if (this.props.data.mainCard !== undefined) {

			return (
				<MainCardComponent data={this.props.data.mainCard} />
			);
		}
	}

	renderLastEpisodeCard() {
		if (this.props.data.lastEpisodeData !== undefined) {
			if (this.props.data.lastEpisodeData) {
				return (
					<LastEpisodeCardComponent data={this.props.data.lastEpisodeData} />
				);
			}
		}
	}

	renderLastTenCard() {
		if (this.props.data.lastTen !== undefined) {

			return (
				<LastTenCardComponent data={this.props.data.lastTen} />
			);
		}
	}

	renderEasyMapsCard() {
		if (this.props.data.easyMaps !== undefined) {
			if (this.props.data.easyMaps) {
				return (
					<EasyMapsCardComponent data={this.props.data.easyMaps} />
				);
			}
		}
	}

	renderMediumMapsCard() {
		if (this.props.data.mediumMaps !== undefined) {
			if (this.props.data.mediumMaps) {
				return (
					<MediumMapsCardComponent data={this.props.data.mediumMaps} />
				);
			}
		}
	}

	renderHardMapsCard() {
		if (this.props.data.hardMaps !== undefined) {
			if (this.props.data.hardMaps) {
				return (
					<HardMapsCardComponent data={this.props.data.hardMaps} />
				);
			}
		}
	}

	renderScoreChartCard() {
		if (this.props.data.scoreLineChartData !== undefined) {
			if (this.props.data.scoreLineChartData) {
				return (
					<ScoreChartCardComponent data={this.props.data.scoreLineChartData} />
				);
			}
		}
	}

	renderFaultsCard() {
		if (this.props.data.faultsData !== undefined) {
			if (this.props.data.faultsData) {
				return (
					<FaultsCardComponent data={this.props.data.faultsData} />
				);
			}
		}
	}

	renderDNFsCard() {
		if (this.props.data.dnfsData !== undefined) {
			if (this.props.data.dnfsData) {
				return (
					<DNFsCardComponent data={this.props.data.dnfsData} />
				);
			}
		}
	}

	renderMapsCard() {
		if (this.props.data.mapsData !== undefined) {
			if (this.props.data.mapsData) {
				return (
					<MapsCardComponent data={this.props.data.mapsData} />
				);
			}
		}
	}

	renderDonkeyCard() {
		if (this.props.data.donkeyData !== undefined) {
			if (this.props.data.donkeyData) {
				return (
					<DonkeyCardComponent data={this.props.data.donkeyData} />
				);
			}
		}
	}

	renderPandaCard() {
		if (this.props.data.pandaData !== undefined) {
			if (this.props.data.pandaData) {
				return (
					<PandaCardComponent data={this.props.data.pandaData} />
				);
			}
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
					updateOnEachImageLoad={false}
					onLayoutComplete={(laidOutItems) => {
						// console.log('Masonry!');
						// console.log(laidOutItems);
					}}>

					{this.renderMainCard()}
					{this.renderLastEpisodeCard()}
					{this.renderLastTenCard()}
					{this.renderEasyMapsCard()}
					{this.renderMediumMapsCard()}
					{this.renderHardMapsCard()}
					{this.renderScoreChartCard()}
					{this.renderFaultsCard()}
					{this.renderDNFsCard()}
					{this.renderMapsCard()}
					{this.renderDonkeyCard()}
					{this.renderPandaCard()}

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