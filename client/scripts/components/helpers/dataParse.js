import _ from 'lodash';

export const DataParse = {
	cardsData: (data) => {
		let parsedData = {
			mainCard: {}
		};

		if (Array.isArray(data)) {
			parsedData.mainCard = DataParse.mainCardData(data)

		}
		return {
			test: data
		};
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
				if (episodeWinner.score < finalElement.score) {
					episodeWinner.score = finalElement.score;
					episodeWinner.personId = finalElement.personId;
					episodeWinner.name = finalElement.name;
				}

			});

			if (episodeWinner.name !== undefined) {
				const personName = finalElement.name + ' wins';
				if (mainCardData.wins[personName] !== undefined) {
					mainCardData.wins[personName]++;
				} else {
					mainCardData.wins[personName] = 1;
				}
			}
		});
	}



};