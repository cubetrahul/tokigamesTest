import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import SearchForm from './SearchForm';

const mockPlaces = [
  "Place 1",
  "Place 2",
  "Place 3"
];

const mockUpdateSearchFilterFunc = params => params;

describe('searchform component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchForm places={mockPlaces} onUpdateSearchFilters={mockUpdateSearchFilterFunc} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
