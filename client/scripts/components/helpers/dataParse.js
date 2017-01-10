import _ from 'lodash';

export const DataParse = {
	cardsData: (data) => {
		let parsedData = {};

		if (!Array.isArray(data)) {
			let dataUnstringify = null;

			try {

				dataUnstringify = JSON.parse(data);

			} catch (err) {
				console.log(err);
			}

			if (!Array.isArray(dataUnstringify)) {
				console.log('Data not array');
				return parsedData;
			} else {
				data = dataUnstringify;
			}
		}

		parsedData = DataParse.getData(data);

		return parsedData;
	},

	getData: (data) => {
		let parsedData = {};

		parsedData.mainCard = DataParse.mainCardData(data);
		parsedData.lastTen = DataParse.lastTenData(data);

		return parsedData;
	},

	mainCardData: (seasonData) => {
		let mainCardData = {
			wins: {}
		};

		_.each(seasonData, (episode, episodeIndex) => {
			let episodeWinner = {
				score: -1
			};

			_.each(episode.final, (finalElement, finalElementIndex) => {
				mainCardData.wins[finalElement.name] = 0;
				if (episodeWinner.score < finalElement.score) {
					episodeWinner.score = finalElement.score;
					episodeWinner.personId = finalElement.personId;
					episodeWinner.name = finalElement.name;
				}

			});

			mainCardData.wins[episodeWinner.name]++;


		});

		let totalWinner = {
			name: '',
			wins: -1
		};
		_.each(Object.keys(mainCardData.wins), (winner, winnerIndex) => {
			if (mainCardData.wins[winner] > totalWinner.wins) {
				totalWinner.name = winner;
				totalWinner.wins = mainCardData.wins[winner];
			}
		})

		mainCardData.totalWinner = totalWinner.name;

		mainCardData.lastEpisode = {
			date: seasonData[seasonData.length - 1].date,
			id: seasonData[seasonData.length - 1].episode.id,
			name: seasonData[seasonData.length - 1].episode.name
		};

		return mainCardData;

	},

	lastTenData: (seasonData) => {
		let lastTenCardData = {
				wins: {}
			},
			lastTenEpisodes;
		if (seasonData.length > 10) {
			lastTenEpisodes = seasonData.slice(seasonData.length - 10);
		} else {
			lastTenEpisodes = seasonData;
		}

		_.each(lastTenEpisodes, (episode, episodeIndex) => {
			let episodeWinner = {
				score: -1
			};

			_.each(episode.final, (finalElement, finalElementIndex) => {
				lastTenCardData.wins[finalElement.name] = 0;
				if (episodeWinner.score < finalElement.score) {
					episodeWinner.score = finalElement.score;
					episodeWinner.personId = finalElement.personId;
					episodeWinner.name = finalElement.name;
				}

			});

			lastTenCardData.wins[episodeWinner.name]++;

		});

		let winnerData = {
			name: '',
			wins: -1
		};
		_.each(Object.keys(lastTenCardData.wins), (winner, winnerIndex) => {
			if (lastTenCardData.wins[winner] > winnerData.wins) {
				winnerData.name = winner;
				winnerData.wins = lastTenCardData.wins[winner];
			}
		})

		lastTenCardData.winner = winnerData.name;

		return lastTenCardData;

	}



};