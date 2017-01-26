import React from 'react';
import { render } from 'react-dom';
import { SeasonOnePageComponent } from '../components/seasonsPages/season1Component.jsx';

export const renderSeason1Page = render(<SeasonOnePageComponent />, document.getElementById('season1-page-target'));