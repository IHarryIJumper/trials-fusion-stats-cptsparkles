import React from 'react';
import { render } from 'react-dom';
import { MainPageComponent } from '../components/mainPage/mainComponent.jsx';

export const renderMainPage = render(<MainPageComponent />, document.getElementById('main-page-target'));