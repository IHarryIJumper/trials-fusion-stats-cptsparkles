import React from 'react';
import { render } from 'react-dom';
import { SeasonTwoPageComponent } from '../components/seasonsPages/season2Component.jsx';

export const renderSeason2Page = render(<SeasonTwoPageComponent />, document.getElementById('season2-page-target'));