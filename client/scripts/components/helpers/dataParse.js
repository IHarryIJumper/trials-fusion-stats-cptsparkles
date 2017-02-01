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

			if (data.length === 0) {
				return {
					code: 814,
					message: 'Data are empty'
				};
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
		parsedData.extremeMaps = DataParse.extremeMapsData(data);
		parsedData.lastEpisodeData = DataParse.lastEpisodeData(data);
		parsedData.scoreLineChartData = DataParse.scoreLineChartData(data);
		parsedData.faultsData = DataParse.faultsData(parsedData.easyMaps, parsedData.mediumMaps, parsedData.hardMaps);
		parsedData.dnfsData = DataParse.dnfsData(parsedData.easyMaps, parsedData.mediumMaps, parsedData.hardMaps);
		parsedData.mapsData = DataParse.mapsData(parsedData.easyMaps, parsedData.mediumMaps, parsedData.hardMaps);
		parsedData.donkeyData = DataParse.donkeyData(parsedData.easyMaps, parsedData.mediumMaps, parsedData.hardMaps);
		parsedData.pandaData = DataParse.pandaData(parsedData.easyMaps, parsedData.mediumMaps, parsedData.hardMaps);

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
				if (mainCardData.wins[finalElement.name] === undefined) {
					mainCardData.wins[finalElement.name] = 0;
				}
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
				if (lastTenCardData.wins[finalElement.name] === undefined) {
					lastTenCardData.wins[finalElement.name] = 0;
				}
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
				faults: {},
				maps: 0,
				mapsDropped: 0,
				dnfsCounter: {},
				dnfs: '',
				dnfsPerEpisode: '',
				winner: '',
				winnerPerEpisode: '',
				mapsPlayed: {},
				donkey: {},
				panda: {}
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

						if (mapElement === 'dropped') {
							easyMapsCardData.mapsDropped++;
						} else {

							if (mapElement.length !== 0) {
								_.each(mapElement, (personElement, personElementIndex) => {

									if (easyMapsCardData.wins[personElement.name] === undefined) {
										easyMapsCardData.wins[personElement.name] = 0;
									}


									if (personElement.status === 1) {
										easyMapsCardData.wins[personElement.name]++;
									}

									if (_dnfs[personElement.name] === undefined) {
										_dnfs[personElement.name] = 0;
									}

									if (personElement.status === 0) {
										_dnfs[personElement.name]++;
									}

									if (easyMapsCardData.faults[personElement.name] === undefined) {
										easyMapsCardData.faults[personElement.name] = 0;
									}

									easyMapsCardData.faults[personElement.name] += personElement.faults;

									if (_mapsPlayed[personElement.name] === undefined) {
										_mapsPlayed[personElement.name] = 0;
									}

									_mapsPlayed[personElement.name]++;

									if (personElement.donkey !== undefined) {
										if (easyMapsCardData.donkey[personElement.name] === undefined) {
											easyMapsCardData.donkey[personElement.name] = 0;
										}

										if (personElement.donkey && (personElement.status === 1)) {
											easyMapsCardData.donkey[personElement.name]++;
										}
									}

									if (personElement.panda !== undefined) {
										if (easyMapsCardData.panda[personElement.name] === undefined) {
											easyMapsCardData.panda[personElement.name] = 0;
										}

										if (personElement.panda && (personElement.status === 1)) {
											easyMapsCardData.panda[personElement.name]++;
										}
									}

								});
							}

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

		easyMapsCardData.mapsPlayed = _mapsPlayed;
		easyMapsCardData.dnfsCounter = _dnfs;

		if (!_foundMaps) {
			return false;
		}

		return easyMapsCardData;

	},

	mediumMapsData: (seasonData) => {
		let mediumMapsCardData = {
				wins: {},
				episodes: {},
				faults: {},
				maps: 0,
				mapsDropped: 0,
				dnfsCounter: {},
				dnfs: '',
				dnfsPerEpisode: '',
				winner: '',
				winnerPerEpisode: '',
				mapsPlayed: {},
				donkey: {},
				panda: {}
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

						if (mapElement === 'dropped') {
							mediumMapsCardData.mapsDropped++;
						} else {

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

									if (mediumMapsCardData.faults[personElement.name] === undefined) {
										mediumMapsCardData.faults[personElement.name] = 0;
									}

									mediumMapsCardData.faults[personElement.name] += personElement.faults;

									if (_mapsPlayed[personElement.name] === undefined) {
										_mapsPlayed[personElement.name] = 0
									}

									_mapsPlayed[personElement.name]++;

									if (personElement.donkey !== undefined) {
										if (mediumMapsCardData.donkey[personElement.name] === undefined) {
											mediumMapsCardData.donkey[personElement.name] = 0;
										}

										if (personElement.donkey && (personElement.status === 1)) {
											mediumMapsCardData.donkey[personElement.name]++;
										}
									}

									if (personElement.panda !== undefined) {
										if (mediumMapsCardData.panda[personElement.name] === undefined) {
											mediumMapsCardData.panda[personElement.name] = 0;
										}

										if (personElement.panda && (personElement.status === 1)) {
											mediumMapsCardData.panda[personElement.name]++;
										}
									}

								});
							}
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

		mediumMapsCardData.mapsPlayed = _mapsPlayed;
		mediumMapsCardData.dnfsCounter = _dnfs;

		if (!_foundMaps) {
			return false;
		}

		return mediumMapsCardData;

	},

	hardMapsData: (seasonData) => {
		let hardMapsCardData = {
				wins: {},
				episodes: {},
				faults: {},
				maps: 0,
				mapsDropped: 0,
				dnfsCounter: {},
				dnfs: '',
				dnfsPerEpisode: '',
				winner: '',
				winnerPerEpisode: '',
				mapsPlayed: {},
				donkey: {},
				panda: {}
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

						if (mapElement === 'dropped') {
							hardMapsCardData.mapsDropped++;
						} else {

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

									if (hardMapsCardData.faults[personElement.name] === undefined) {
										hardMapsCardData.faults[personElement.name] = 0;
									}

									hardMapsCardData.faults[personElement.name] += personElement.faults;

									if (_mapsPlayed[personElement.name] === undefined) {
										_mapsPlayed[personElement.name] = 0
									}

									_mapsPlayed[personElement.name]++;

									if (personElement.donkey !== undefined) {
										if (hardMapsCardData.donkey[personElement.name] === undefined) {
											hardMapsCardData.donkey[personElement.name] = 0;
										}

										if (personElement.donkey && (personElement.status === 1)) {
											hardMapsCardData.donkey[personElement.name]++;
										}
									}

									if (personElement.panda !== undefined) {
										if (hardMapsCardData.panda[personElement.name] === undefined) {
											hardMapsCardData.panda[personElement.name] = 0;
										}

										if (personElement.panda && (personElement.status === 1)) {
											hardMapsCardData.panda[personElement.name]++;
										}
									}

								});
							}

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

		hardMapsCardData.mapsPlayed = _mapsPlayed;
		hardMapsCardData.dnfsCounter = _dnfs;

		if (!_foundMaps) {
			return false;
		}

		return hardMapsCardData;

	},

	extremeMapsData: (seasonData) => {
		let extremeMapsCardData = {
				wins: {},
				episodes: {},
				faults: {},
				maps: 0,
				mapsDropped: 0,
				dnfsCounter: {},
				dnfs: '',
				dnfsPerEpisode: '',
				winner: '',
				winnerPerEpisode: '',
				mapsPlayed: {},
				donkey: {},
				panda: {}
			},
			_dnfs = {},
			_mapsPlayed = {},
			_foundMaps = false;

		_.each(seasonData, (episode, episodeIndex) => {

			_.each(episode.persons, (personElement, personElementIndex) => {

				if (extremeMapsCardData.episodes[personElement.name] === undefined) {
					extremeMapsCardData.episodes[personElement.name] = 0
				}

				extremeMapsCardData.episodes[personElement.name]++;

			});

			if (episode.maps.extreme !== undefined) {
				if (episode.maps.extreme.length !== 0) {

					_foundMaps = true;

					extremeMapsCardData.maps += episode.maps.extreme.length;

					_.each(episode.maps.extreme, (mapElement, mapElementIndex) => {

						if (mapElement === 'dropped') {
							extremeMapsCardData.mapsDropped++;
						} else {

							if (mapElement.length !== 0) {
								_.each(mapElement, (personElement, personElementIndex) => {

									if (extremeMapsCardData.wins[personElement.name] === undefined) {
										extremeMapsCardData.wins[personElement.name] = 0
									}

									if (personElement.status === 1) {
										extremeMapsCardData.wins[personElement.name]++;
									}

									if (_dnfs[personElement.name] === undefined) {
										_dnfs[personElement.name] = 0
									}

									if (personElement.status === 0) {
										_dnfs[personElement.name]++;
									}

									if (extremeMapsCardData.faults[personElement.name] === undefined) {
										extremeMapsCardData.faults[personElement.name] = 0;
									}

									extremeMapsCardData.faults[personElement.name] += personElement.faults;

									if (_mapsPlayed[personElement.name] === undefined) {
										_mapsPlayed[personElement.name] = 0
									}

									_mapsPlayed[personElement.name]++;

									if (personElement.donkey !== undefined) {
										if (extremeMapsCardData.donkey[personElement.name] === undefined) {
											extremeMapsCardData.donkey[personElement.name] = 0;
										}

										if (personElement.donkey && (personElement.status === 1)) {
											extremeMapsCardData.donkey[personElement.name]++;
										}
									}

									if (personElement.panda !== undefined) {
										if (extremeMapsCardData.panda[personElement.name] === undefined) {
											extremeMapsCardData.panda[personElement.name] = 0;
										}

										if (personElement.panda && (personElement.status === 1)) {
											extremeMapsCardData.panda[personElement.name]++;
										}
									}

								});
							}

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

		_.each(Object.keys(extremeMapsCardData.wins), (winner, winnerIndex) => {
			if (extremeMapsCardData.wins[winner] > winnerData.wins) {
				winnerData.name = winner;
				winnerData.wins = extremeMapsCardData.wins[winner];
			}

			let winnerPerEpisodeRate = extremeMapsCardData.wins[winner] / _mapsPlayed[winner];

			if (winnerPerEpisodeRate > winnerDataPerEpisode.wins) {
				winnerDataPerEpisode.name = winner;
				winnerDataPerEpisode.wins = winnerPerEpisodeRate;
			}
		})

		extremeMapsCardData.winner = winnerData.name;
		extremeMapsCardData.winnerPerEpisode = winnerDataPerEpisode.name;

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

		extremeMapsCardData.dnfs = dnfsData.name;
		extremeMapsCardData.dnfsPerEpisode = dnfsDataPerEpisode.name

		extremeMapsCardData.mapsPlayed = _mapsPlayed;
		extremeMapsCardData.dnfsCounter = _dnfs;

		if (!_foundMaps) {
			return false;
		}

		return extremeMapsCardData;

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

	},

	faultsData: (easyMapsData, mediumMapsData, hardMapsData, extremeMapsData) => {
		let faultsCardData = {
				faults: {},
				winner: '',
				winnerPerEpisode: ''
			},
			_mapsPlayed = {};


		if (easyMapsData !== undefined) {
			if (easyMapsData) {
				_.each(Object.keys(easyMapsData.faults), (faultsElement, faultsElementIndex) => {

					if (faultsCardData.faults[faultsElement] === undefined) {
						faultsCardData.faults[faultsElement] = 0;
					}
					faultsCardData.faults[faultsElement] += easyMapsData.faults[faultsElement];

					if (_mapsPlayed[faultsElement] === undefined) {
						_mapsPlayed[faultsElement] = 0;
					}
					_mapsPlayed[faultsElement] += easyMapsData.mapsPlayed[faultsElement];

				});
			}
		}
		if (mediumMapsData !== undefined) {
			if (mediumMapsData) {
				_.each(Object.keys(mediumMapsData.faults), (faultsElement, faultsElementIndex) => {
					if (faultsCardData.faults[faultsElement] === undefined) {
						faultsCardData.faults[faultsElement] = 0;
					}
					faultsCardData.faults[faultsElement] += mediumMapsData.faults[faultsElement];

					if (_mapsPlayed[faultsElement] === undefined) {
						_mapsPlayed[faultsElement] = 0;
					}
					_mapsPlayed[faultsElement] += mediumMapsData.mapsPlayed[faultsElement];
				});
			}
		}
		if (hardMapsData !== undefined) {
			if (hardMapsData) {
				_.each(Object.keys(hardMapsData.faults), (faultsElement, faultsElementIndex) => {
					if (faultsCardData.faults[faultsElement] === undefined) {
						faultsCardData.faults[faultsElement] = 0;
					}
					faultsCardData.faults[faultsElement] += hardMapsData.faults[faultsElement];

					if (_mapsPlayed[faultsElement] === undefined) {
						_mapsPlayed[faultsElement] = 0;
					}
					_mapsPlayed[faultsElement] += hardMapsData.mapsPlayed[faultsElement];
				});
			}
		}
		if (extremeMapsData !== undefined) {
			if (extremeMapsData) {
				_.each(Object.keys(extremeMapsData.faults), (faultsElement, faultsElementIndex) => {
					if (faultsCardData.faults[faultsElement] === undefined) {
						faultsCardData.faults[faultsElement] = 0;
					}
					faultsCardData.faults[faultsElement] += extremeMapsData.faults[faultsElement];

					if (_mapsPlayed[faultsElement] === undefined) {
						_mapsPlayed[faultsElement] = 0;
					}
					_mapsPlayed[faultsElement] += extremeMapsData.mapsPlayed[faultsElement];
				});
			}
		}

		let winnerData = {
			name: '',
			faults: -1
		};

		let winnerDataPerEpisode = {
			name: '',
			faults: -1
		};

		_.each(Object.keys(faultsCardData.faults), (winner, winnerIndex) => {
			if (faultsCardData.faults[winner] > winnerData.faults) {
				winnerData.name = winner;
				winnerData.faults = faultsCardData.faults[winner];
			}

			let winnerPerEpisodeRate = faultsCardData.faults[winner] / _mapsPlayed[winner];

			if (winnerPerEpisodeRate > winnerDataPerEpisode.faults) {
				winnerDataPerEpisode.name = winner;
				winnerDataPerEpisode.faults = winnerPerEpisodeRate;
			}
		});

		faultsCardData.winner = winnerData.name;
		faultsCardData.winnerPerEpisode = winnerDataPerEpisode.name;

		if (faultsCardData.winner === '') {
			return false;
		}

		return faultsCardData;

	},

	dnfsData: (easyMapsData, mediumMapsData, hardMapsData, extremeMapsData) => {
		let dnfsCardData = {
				dnfs: {},
				winner: '',
				winnerPerEpisode: ''
			},
			_mapsPlayed = {};


		if (easyMapsData !== undefined) {
			if (easyMapsData) {
				_.each(Object.keys(easyMapsData.dnfsCounter), (dnfsElement, dnfsElementIndex) => {

					if (dnfsCardData.dnfs[dnfsElement] === undefined) {
						dnfsCardData.dnfs[dnfsElement] = 0;
					}
					dnfsCardData.dnfs[dnfsElement] += easyMapsData.dnfsCounter[dnfsElement];

					if (_mapsPlayed[dnfsElement] === undefined) {
						_mapsPlayed[dnfsElement] = 0;
					}
					_mapsPlayed[dnfsElement] += easyMapsData.mapsPlayed[dnfsElement];

				});
			}
		}
		if (mediumMapsData !== undefined) {
			if (mediumMapsData) {
				_.each(Object.keys(mediumMapsData.faults), (dnfsElement, dnfsElementIndex) => {
					if (dnfsCardData.dnfs[dnfsElement] === undefined) {
						dnfsCardData.dnfs[dnfsElement] = 0;
					}
					dnfsCardData.dnfs[dnfsElement] += mediumMapsData.dnfsCounter[dnfsElement];

					if (_mapsPlayed[dnfsElement] === undefined) {
						_mapsPlayed[dnfsElement] = 0;
					}
					_mapsPlayed[dnfsElement] += mediumMapsData.mapsPlayed[dnfsElement];
				});
			}
		}
		if (hardMapsData !== undefined) {
			if (hardMapsData) {
				_.each(Object.keys(hardMapsData.faults), (dnfsElement, dnfsElementIndex) => {
					if (dnfsCardData.dnfs[dnfsElement] === undefined) {
						dnfsCardData.dnfs[dnfsElement] = 0;
					}
					dnfsCardData.dnfs[dnfsElement] += hardMapsData.dnfsCounter[dnfsElement];

					if (_mapsPlayed[dnfsElement] === undefined) {
						_mapsPlayed[dnfsElement] = 0;
					}
					_mapsPlayed[dnfsElement] += hardMapsData.mapsPlayed[dnfsElement];
				});
			}
		}
		if (extremeMapsData !== undefined) {
			if (extremeMapsData) {
				_.each(Object.keys(extremeMapsData.faults), (dnfsElement, dnfsElementIndex) => {
					if (dnfsCardData.dnfs[dnfsElement] === undefined) {
						dnfsCardData.dnfs[dnfsElement] = 0;
					}
					dnfsCardData.dnfs[dnfsElement] += extremeMapsData.dnfsCounter[dnfsElement];

					if (_mapsPlayed[dnfsElement] === undefined) {
						_mapsPlayed[dnfsElement] = 0;
					}
					_mapsPlayed[dnfsElement] += extremeMapsData.mapsPlayed[dnfsElement];
				});
			}
		}

		let winnerData = {
			name: '',
			dnfs: -1
		};

		let winnerDataPerEpisode = {
			name: '',
			dnfs: -1
		};

		_.each(Object.keys(dnfsCardData.dnfs), (winner, winnerIndex) => {
			if (dnfsCardData.dnfs[winner] > winnerData.dnfs) {
				winnerData.name = winner;
				winnerData.dnfs = dnfsCardData.dnfs[winner];
			}

			let winnerPerEpisodeRate = dnfsCardData.dnfs[winner] / _mapsPlayed[winner];

			if (winnerPerEpisodeRate > winnerDataPerEpisode.dnfs) {
				winnerDataPerEpisode.name = winner;
				winnerDataPerEpisode.dnfs = winnerPerEpisodeRate;
			}
		});

		dnfsCardData.winner = winnerData.name;
		dnfsCardData.winnerPerEpisode = winnerDataPerEpisode.name;

		if (dnfsCardData.winner === '') {
			return false;
		}

		return dnfsCardData;

	},

	mapsData: (easyMapsData, mediumMapsData, hardMapsData, extremeMapsData) => {
		let mapsCardData = {
			maps: 0,
			mapsDropped: 0
		};


		if (easyMapsData !== undefined) {
			if (easyMapsData) {
				mapsCardData.maps += easyMapsData.maps;
				mapsCardData.mapsDropped += easyMapsData.mapsDropped;
			}
		}
		if (mediumMapsData !== undefined) {
			if (mediumMapsData) {
				mapsCardData.maps += mediumMapsData.maps;
				mapsCardData.mapsDropped += mediumMapsData.mapsDropped;
			}
		}
		if (hardMapsData !== undefined) {
			if (hardMapsData) {
				mapsCardData.maps += hardMapsData.maps;
				mapsCardData.mapsDropped += hardMapsData.mapsDropped;
			}
		}
		if (extremeMapsData !== undefined) {
			if (extremeMapsData) {
				mapsCardData.maps += extremeMapsData.maps;
				mapsCardData.mapsDropped += extremeMapsData.mapsDropped;
			}
		}

		return mapsCardData;

	},

	donkeyData: (easyMapsData, mediumMapsData, hardMapsData, extremeMapsData) => {
		// debugger;
		let donkeyCardData = {
				donkey: {},
				winner: '',
				winnerPerEpisode: ''
			},
			_mapsPlayed = {};


		if (easyMapsData !== undefined) {
			if (easyMapsData) {
				_.each(Object.keys(easyMapsData.donkey), (donkeyElement, donkeyElementIndex) => {

					if (donkeyCardData.donkey[donkeyElement] === undefined) {
						donkeyCardData.donkey[donkeyElement] = 0;
					}
					donkeyCardData.donkey[donkeyElement] += easyMapsData.donkey[donkeyElement];

					if (_mapsPlayed[donkeyElement] === undefined) {
						_mapsPlayed[donkeyElement] = 0;
					}
					_mapsPlayed[donkeyElement] += easyMapsData.mapsPlayed[donkeyElement];

				});
			}
		}
		if (mediumMapsData !== undefined) {
			if (mediumMapsData) {
				_.each(Object.keys(mediumMapsData.donkey), (donkeyElement, donkeyElementIndex) => {
					if (donkeyCardData.donkey[donkeyElement] === undefined) {
						donkeyCardData.donkey[donkeyElement] = 0;
					}
					donkeyCardData.donkey[donkeyElement] += mediumMapsData.donkey[donkeyElement];

					if (_mapsPlayed[donkeyElement] === undefined) {
						_mapsPlayed[donkeyElement] = 0;
					}
					_mapsPlayed[donkeyElement] += mediumMapsData.mapsPlayed[donkeyElement];
				});
			}
		}
		if (hardMapsData !== undefined) {
			if (hardMapsData) {
				_.each(Object.keys(hardMapsData.donkey), (donkeyElement, donkeyElementIndex) => {
					if (donkeyCardData.donkey[donkeyElement] === undefined) {
						donkeyCardData.donkey[donkeyElement] = 0;
					}
					donkeyCardData.donkey[donkeyElement] += hardMapsData.donkey[donkeyElement];

					if (_mapsPlayed[donkeyElement] === undefined) {
						_mapsPlayed[donkeyElement] = 0;
					}
					_mapsPlayed[donkeyElement] += hardMapsData.mapsPlayed[donkeyElement];
				});
			}
		}
		if (extremeMapsData !== undefined) {
			if (extremeMapsData) {
				_.each(Object.keys(extremeMapsData.donkey), (donkeyElement, donkeyElementIndex) => {
					if (donkeyCardData.donkey[donkeyElement] === undefined) {
						donkeyCardData.donkey[donkeyElement] = 0;
					}
					donkeyCardData.donkey[donkeyElement] += extremeMapsData.donkey[donkeyElement];

					if (_mapsPlayed[donkeyElement] === undefined) {
						_mapsPlayed[donkeyElement] = 0;
					}
					_mapsPlayed[donkeyElement] += extremeMapsData.mapsPlayed[donkeyElement];
				});
			}
		}

		let winnerData = {
			name: '',
			donkey: -1
		};

		let winnerDataPerEpisode = {
			name: '',
			donkey: -1
		};

		_.each(Object.keys(donkeyCardData.donkey), (winner, winnerIndex) => {
			if (donkeyCardData.donkey[winner] > winnerData.donkey) {
				winnerData.name = winner;
				winnerData.donkey = donkeyCardData.donkey[winner];
			}

			let winnerPerEpisodeRate = donkeyCardData.donkey[winner] / _mapsPlayed[winner];

			if (winnerPerEpisodeRate > winnerDataPerEpisode.donkey) {
				winnerDataPerEpisode.name = winner;
				winnerDataPerEpisode.donkey = winnerPerEpisodeRate;
			}
		});

		donkeyCardData.winner = winnerData.name;
		donkeyCardData.winnerPerEpisode = winnerDataPerEpisode.name;

		if (donkeyCardData.winner === '') {
			return false;
		}

		return donkeyCardData;

	},

	pandaData: (easyMapsData, mediumMapsData, hardMapsData, extremeMapsData) => {
		let pandaCardData = {
				panda: {},
				winner: '',
				winnerPerEpisode: ''
			},
			_mapsPlayed = {};


		if (easyMapsData !== undefined) {
			if (easyMapsData) {
				_.each(Object.keys(easyMapsData.panda), (pandaElement, pandaElementIndex) => {

					if (pandaCardData.panda[pandaElement] === undefined) {
						pandaCardData.panda[pandaElement] = 0;
					}
					pandaCardData.panda[pandaElement] += easyMapsData.panda[pandaElement];

					if (_mapsPlayed[pandaElement] === undefined) {
						_mapsPlayed[pandaElement] = 0;
					}
					_mapsPlayed[pandaElement] += easyMapsData.mapsPlayed[pandaElement];

				});
			}
		}
		if (mediumMapsData !== undefined) {
			if (mediumMapsData) {
				_.each(Object.keys(mediumMapsData.panda), (pandaElement, pandaElementIndex) => {
					if (pandaCardData.panda[pandaElement] === undefined) {
						pandaCardData.panda[pandaElement] = 0;
					}
					pandaCardData.panda[pandaElement] += mediumMapsData.panda[pandaElement];

					if (_mapsPlayed[pandaElement] === undefined) {
						_mapsPlayed[pandaElement] = 0;
					}
					_mapsPlayed[pandaElement] += mediumMapsData.mapsPlayed[pandaElement];
				});
			}
		}
		if (hardMapsData !== undefined) {
			if (hardMapsData) {
				_.each(Object.keys(hardMapsData.panda), (pandaElement, pandaElementIndex) => {
					if (pandaCardData.panda[pandaElement] === undefined) {
						pandaCardData.panda[pandaElement] = 0;
					}
					pandaCardData.panda[pandaElement] += hardMapsData.panda[pandaElement];

					if (_mapsPlayed[pandaElement] === undefined) {
						_mapsPlayed[pandaElement] = 0;
					}
					_mapsPlayed[pandaElement] += hardMapsData.mapsPlayed[pandaElement];
				});
			}
		}
		if (extremeMapsData !== undefined) {
			if (extremeMapsData) {
				_.each(Object.keys(extremeMapsData.panda), (pandaElement, pandaElementIndex) => {
					if (pandaCardData.panda[pandaElement] === undefined) {
						pandaCardData.panda[pandaElement] = 0;
					}
					pandaCardData.panda[pandaElement] += extremeMapsData.panda[pandaElement];

					if (_mapsPlayed[pandaElement] === undefined) {
						_mapsPlayed[pandaElement] = 0;
					}
					_mapsPlayed[pandaElement] += extremeMapsData.mapsPlayed[pandaElement];
				});
			}
		}

		let winnerData = {
			name: '',
			panda: -1
		};

		let winnerDataPerEpisode = {
			name: '',
			panda: -1
		};

		_.each(Object.keys(pandaCardData.panda), (winner, winnerIndex) => {
			if (pandaCardData.panda[winner] > winnerData.panda) {
				winnerData.name = winner;
				winnerData.panda = pandaCardData.panda[winner];
			}

			let winnerPerEpisodeRate = pandaCardData.panda[winner] / _mapsPlayed[winner];

			if (winnerPerEpisodeRate > winnerDataPerEpisode.panda) {
				winnerDataPerEpisode.name = winner;
				winnerDataPerEpisode.panda = winnerPerEpisodeRate;
			}
		});

		pandaCardData.winner = winnerData.name;
		pandaCardData.winnerPerEpisode = winnerDataPerEpisode.name;

		if (pandaCardData.winner === '') {
			return false;
		}

		return pandaCardData;

	}



};