import React from 'react';
import { render } from 'react-dom';
import { ContactsPageComponent } from '../components/contactsPage/contactsComponent.jsx';

export const renderContactsPage = render(<ContactsPageComponent />, document.getElementById('contacts-page-target'));