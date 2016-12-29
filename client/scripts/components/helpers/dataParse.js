import _ from 'lodash';

export const DataParse = {
	cardsData: (data) => {
		let parsedData = {
			mainCard: {}
		};

		if (Array.isArray(data)) {
			parsedData.mainCard = DataParse.mainCardData(data);
		} else {

			let dataUnstringify = null;

			try {

				dataUnstringify = JSON.parse(data);

			} catch (err) {
				console.log(err);
			}

			if (Array.isArray(dataUnstringify)) {
				parsedData.mainCard = DataParse.mainCardData(dataUnstringify);
			} else {
				console.log('Data not array');
			}
		}

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

	}



};