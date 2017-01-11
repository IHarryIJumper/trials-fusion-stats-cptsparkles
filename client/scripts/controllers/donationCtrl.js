import React from 'react';
import { render } from 'react-dom';
import { DonationPageComponent } from '../components/donationPage/donationComponent.jsx';

export const renderDonationPage = render(<DonationPageComponent />, document.getElementById('donation-page-target'));