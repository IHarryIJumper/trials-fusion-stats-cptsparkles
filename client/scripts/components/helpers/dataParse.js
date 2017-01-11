import _ from 'lodash';

import materialColor from 'random-material-color';

import {
	ObjectHelper
} from './objectHelper.js';

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
		parsedData.easyMaps = DataParse.easyMapsData(data);
		parsedData.mediumMaps = DataParse.mediumMapsData(data);
		parsedData.hardMaps = DataParse.hardMapsData(data);
		parsedData.lastEpisodeData = DataParse.lastEpisodeData(data);
		parsedData.scoreLineChartData = DataParse.scoreLineChartData(data);

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

	},

	easyMapsData: (seasonData) => {
		let easyMapsCardData = {
				wins: {},
				episodes: {},
				maps: 0,
				dnfs: '',
				dnfsPerEpisode: '',
				winner: '',
				winnerPerEpisode: ''
			},
			_dnfs = {},
			_mapsPlayed = {},
			_foundMaps = false;

		_.each(seasonData, (episode, episodeIndex) => {

			_.each(episode.persons, (personElement, personElementIndex) => {

				if (easyMapsCardData.episodes[personElement.name] === undefined) {
					easyMapsCardData.episodes[personElement.name] = 0
				}

				easyMapsCardData.episodes[personElement.name]++;

			});

			if (episode.maps.easy !== undefined) {
				if (episode.maps.easy.length !== 0) {

					_foundMaps = true;

					easyMapsCardData.maps += episode.maps.easy.length;

					_.each(episode.maps.easy, (mapElement, mapElementIndex) => {

						if (mapElement.length !== 0) {
							_.each(mapElement, (personElement, personElementIndex) => {

								if (easyMapsCardData.wins[personElement.name] === undefined) {
									easyMapsCardData.wins[personElement.name] = 0
								}

								if (personElement.status === 1) {
									easyMapsCardData.wins[personElement.name]++;
								}

								if (_dnfs[personElement.name] === undefined) {
									_dnfs[personElement.name] = 0
								}

								if (personElement.status === 0) {
									_dnfs[personElement.name]++;
								}

								if (_mapsPlayed[personElement.name] === undefined) {
									_mapsPlayed[personElement.name] = 0
								}

								_mapsPlayed[personElement.name]++;

							});
						}

					});
				}
			}

		});

		let winnerData = {
			name: '',
			wins: -1
		};

		let winnerDataPerEpisode = {
			name: '',
			wins: -1
		};

		_.each(Object.keys(easyMapsCardData.wins), (winner, winnerIndex) => {
			if (easyMapsCardData.wins[winner] > winnerData.wins) {
				winnerData.name = winner;
				winnerData.wins = easyMapsCardData.wins[winner];
			}

			let winnerPerEpisodeRate = easyMapsCardData.wins[winner] / _mapsPlayed[winner];

			if (winnerPerEpisodeRate > winnerDataPerEpisode.wins) {
				winnerDataPerEpisode.name = winner;
				winnerDataPerEpisode.wins = winnerPerEpisodeRate;
			}
		})

		easyMapsCardData.winner = winnerData.name;
		easyMapsCardData.winnerPerEpisode = winnerDataPerEpisode.name;

		let dnfsData = {
			name: '',
			dnfs: -1
		};

		let dnfsDataPerEpisode = {
			name: '',
			dnfs: -1
		};

		_.each(Object.keys(_dnfs), (dnfElement, dnfElementIndex) => {
			if (_dnfs[dnfElement] > dnfsData.dnfs) {
				dnfsData.name = dnfElement;
				dnfsData.dnfs = _dnfs[dnfElement];
			}

			let dnfsPerEpisodeRate = _dnfs[dnfElement] / _mapsPlayed[dnfElement];

			if (dnfsPerEpisodeRate > dnfsDataPerEpisode.dnfs) {
				dnfsDataPerEpisode.name = dnfElement;
				dnfsDataPerEpisode.dnfs = dnfsPerEpisodeRate;
			}
		})

		easyMapsCardData.dnfs = dnfsData.name;
		easyMapsCardData.dnfsPerEpisode = dnfsDataPerEpisode.name

		if (!_foundMaps) {
			return false;
		}

		return easyMapsCardData;

	},

	mediumMapsData: (seasonData) => {
		let mediumMapsCardData = {
				wins: {},
				episodes: {},
				maps: 0,
				dnfs: '',
				dnfsPerEpisode: '',
				winner: '',
				winnerPerEpisode: ''
			},
			_dnfs = {},
			_mapsPlayed = {},
			_foundMaps = false;

		_.each(seasonData, (episode, episodeIndex) => {

			_.each(episode.persons, (personElement, personElementIndex) => {

				if (mediumMapsCardData.episodes[personElement.name] === undefined) {
					mediumMapsCardData.episodes[personElement.name] = 0
				}

				mediumMapsCardData.episodes[personElement.name]++;

			});

			if (episode.maps.medium !== undefined) {
				if (episode.maps.medium.length !== 0) {

					_foundMaps = true;

					mediumMapsCardData.maps += episode.maps.medium.length;

					_.each(episode.maps.medium, (mapElement, mapElementIndex) => {

						if (mapElement.length !== 0) {
							_.each(mapElement, (personElement, personElementIndex) => {

								if (mediumMapsCardData.wins[personElement.name] === undefined) {
									mediumMapsCardData.wins[personElement.name] = 0
								}

								if (personElement.status === 1) {
									mediumMapsCardData.wins[personElement.name]++;
								}

								if (_dnfs[personElement.name] === undefined) {
									_dnfs[personElement.name] = 0
								}

								if (personElement.status === 0) {
									_dnfs[personElement.name]++;
								}

								if (_mapsPlayed[personElement.name] === undefined) {
									_mapsPlayed[personElement.name] = 0
								}

								_mapsPlayed[personElement.name]++;

							});
						}

					});
				}
			}

		});

		let winnerData = {
			name: '',
			wins: -1
		};

		let winnerDataPerEpisode = {
			name: '',
			wins: -1
		};

		_.each(Object.keys(mediumMapsCardData.wins), (winner, winnerIndex) => {
			if (mediumMapsCardData.wins[winner] > winnerData.wins) {
				winnerData.name = winner;
				winnerData.wins = mediumMapsCardData.wins[winner];
			}

			let winnerPerEpisodeRate = mediumMapsCardData.wins[winner] / _mapsPlayed[winner];

			if (winnerPerEpisodeRate > winnerDataPerEpisode.wins) {
				winnerDataPerEpisode.name = winner;
				winnerDataPerEpisode.wins = winnerPerEpisodeRate;
			}
		})

		mediumMapsCardData.winner = winnerData.name;
		mediumMapsCardData.winnerPerEpisode = winnerDataPerEpisode.name;

		let dnfsData = {
			name: '',
			dnfs: -1
		};

		let dnfsDataPerEpisode = {
			name: '',
			dnfs: -1
		};

		_.each(Object.keys(_dnfs), (dnfElement, dnfElementIndex) => {
			if (_dnfs[dnfElement] > dnfsData.dnfs) {
				dnfsData.name = dnfElement;
				dnfsData.dnfs = _dnfs[dnfElement];
			}

			let dnfsPerEpisodeRate = _dnfs[dnfElement] / _mapsPlayed[dnfElement];

			if (dnfsPerEpisodeRate > dnfsDataPerEpisode.dnfs) {
				dnfsDataPerEpisode.name = dnfElement;
				dnfsDataPerEpisode.dnfs = dnfsPerEpisodeRate;
			}
		})

		mediumMapsCardData.dnfs = dnfsData.name;
		mediumMapsCardData.dnfsPerEpisode = dnfsDataPerEpisode.name

		if (!_foundMaps) {
			return false;
		}

		return mediumMapsCardData;

	},

	hardMapsData: (seasonData) => {
		let hardMapsCardData = {
				wins: {},
				episodes: {},
				maps: 0,
				dnfs: '',
				dnfsPerEpisode: '',
				winner: '',
				winnerPerEpisode: ''
			},
			_dnfs = {},
			_mapsPlayed = {},
			_foundMaps = false;

		_.each(seasonData, (episode, episodeIndex) => {

			_.each(episode.persons, (personElement, personElementIndex) => {

				if (hardMapsCardData.episodes[personElement.name] === undefined) {
					hardMapsCardData.episodes[personElement.name] = 0
				}

				hardMapsCardData.episodes[personElement.name]++;

			});

			if (episode.maps.hard !== undefined) {
				if (episode.maps.hard.length !== 0) {

					_foundMaps = true;

					hardMapsCardData.maps += episode.maps.hard.length;

					_.each(episode.maps.hard, (mapElement, mapElementIndex) => {

						if (mapElement.length !== 0) {
							_.each(mapElement, (personElement, personElementIndex) => {

								if (hardMapsCardData.wins[personElement.name] === undefined) {
									hardMapsCardData.wins[personElement.name] = 0
								}

								if (personElement.status === 1) {
									hardMapsCardData.wins[personElement.name]++;
								}

								if (_dnfs[personElement.name] === undefined) {
									_dnfs[personElement.name] = 0
								}

								if (personElement.status === 0) {
									_dnfs[personElement.name]++;
								}

								if (_mapsPlayed[personElement.name] === undefined) {
									_mapsPlayed[personElement.name] = 0
								}

								_mapsPlayed[personElement.name]++;

							});
						}

					});
				}
			}

		});

		let winnerData = {
			name: '',
			wins: -1
		};

		let winnerDataPerEpisode = {
			name: '',
			wins: -1
		};

		_.each(Object.keys(hardMapsCardData.wins), (winner, winnerIndex) => {
			if (hardMapsCardData.wins[winner] > winnerData.wins) {
				winnerData.name = winner;
				winnerData.wins = hardMapsCardData.wins[winner];
			}

			let winnerPerEpisodeRate = hardMapsCardData.wins[winner] / _mapsPlayed[winner];

			if (winnerPerEpisodeRate > winnerDataPerEpisode.wins) {
				winnerDataPerEpisode.name = winner;
				winnerDataPerEpisode.wins = winnerPerEpisodeRate;
			}
		})

		hardMapsCardData.winner = winnerData.name;
		hardMapsCardData.winnerPerEpisode = winnerDataPerEpisode.name;

		let dnfsData = {
			name: '',
			dnfs: -1
		};

		let dnfsDataPerEpisode = {
			name: '',
			dnfs: -1
		};

		_.each(Object.keys(_dnfs), (dnfElement, dnfElementIndex) => {
			if (_dnfs[dnfElement] > dnfsData.dnfs) {
				dnfsData.name = dnfElement;
				dnfsData.dnfs = _dnfs[dnfElement];
			}

			let dnfsPerEpisodeRate = _dnfs[dnfElement] / _mapsPlayed[dnfElement];

			if (dnfsPerEpisodeRate > dnfsDataPerEpisode.dnfs) {
				dnfsDataPerEpisode.name = dnfElement;
				dnfsDataPerEpisode.dnfs = dnfsPerEpisodeRate;
			}
		})

		hardMapsCardData.dnfs = dnfsData.name;
		hardMapsCardData.dnfsPerEpisode = dnfsDataPerEpisode.name

		if (!_foundMaps) {
			return false;
		}

		return hardMapsCardData;

	},

	lastEpisodeData: (seasonData) => {
		let lastEpisodeCardData = {
				score: {},
				winner: ''
			},
			lastEpisode;

		if (seasonData.length > 0) {
			lastEpisode = seasonData[seasonData.length - 1];
		} else {
			return false;
		}

		_.each(lastEpisode.final, (person, personIndex) => {
			lastEpisodeCardData.score[person.name] = person.score;
		});

		let winnerData = {
			name: '',
			score: -1
		};

		_.each(Object.keys(lastEpisodeCardData.score), (winner, winnerIndex) => {
			if (lastEpisodeCardData.score[winner] > winnerData.score) {
				winnerData.name = winner;
				winnerData.score = lastEpisodeCardData.score[winner];
			}
		})

		lastEpisodeCardData.winner = winnerData.name;

		return lastEpisodeCardData;

	},

	scoreLineChartData: (seasonData) => {
		let scoreLineChartCardData = {
				labels: [],
				datasets: []
			},
			personsDatasets = {};

		_.each(seasonData, (episode, episodeIndex) => {

			_.each(episode.persons, (person, personIndex) => {
				if (personsDatasets[person.name] === undefined) {
					personsDatasets[person.name] = [];
				}
			});

		});

		_.each(seasonData, (episode, episodeIndex) => {

			scoreLineChartCardData.labels.push(episode.episode.id + ' ep');

			_.each(episode.final, (finalScore, finalScoreIndex) => {
				if (personsDatasets[finalScore.name] !== undefined) {
					personsDatasets[finalScore.name].push(finalScore.score);
				}
			});

			_.each(Object.keys(personsDatasets), (personsDataset, personsDatasetIndex) => {
				if (personsDatasets[personsDataset].length < scoreLineChartCardData.labels.length) {
					personsDatasets[personsDataset].push(0);
				}
			});

		});


		_.each(Object.keys(personsDatasets), (personsDataset, personsDatasetIndex) => {
			let _dataset = {
				label: personsDataset,
				data: personsDatasets[personsDataset],
				fill: false,
				lineTension: 0.1
			};

			switch (personsDataset) {
				case 'Jordan':
					_dataset.borderColor = '#c62828';
					_dataset.backgroundColor = '#c62828';
					break;
				case 'Nick':
					_dataset.borderColor = '#1565C0';
					_dataset.backgroundColor = '#1565C0';
					break;
				default:
					_dataset.borderColor = materialColor.getColor({
						shades: ['700', '800']
					});
					_dataset.backgroundColor = _dataset.borderColor;
					break;
			}

			scoreLineChartCardData.datasets.push(_dataset);
		});

		if (scoreLineChartCardData.labels.length === 0) {
			return false;
		} else if (scoreLineChartCardData.labels.length < 2) {
			scoreLineChartCardData.labels.push(scoreLineChartCardData.labels.length + 1 + ' ep');
		}

		return scoreLineChartCardData;

	}



};