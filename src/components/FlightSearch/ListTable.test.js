import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import ListTable from './ListTable';

const mockFlights = [
  "Place 1",
  "Place 2",
  "Place 3"
];

describe('listtable component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListTable flights={mockFlights} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
