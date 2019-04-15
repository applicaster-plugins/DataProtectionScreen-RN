import React from 'react';
import { create } from 'react-test-renderer';
import App from '../App';

describe('App component', () => {
  it('renders', () => {
    const component = create(<App />);
    expect(component.toJSON()).toBeTruthy();
  });
});
