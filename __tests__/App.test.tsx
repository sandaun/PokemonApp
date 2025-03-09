/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/App';

const MockNavigationContainer = ({children}: {children: React.ReactNode}) => (
  <div data-testid="mock-navigation-container">{children}</div>
);

const MockAppNavigator = () => <div data-testid="mock-app-navigator" />;

const MockPokemonProvider = ({children}: {children: React.ReactNode}) => (
  <div data-testid="mock-pokemon-provider">{children}</div>
);

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => (
    <MockNavigationContainer>{children}</MockNavigationContainer>
  ),
}));

jest.mock('../src/navigation/AppNavigator', () => () => <MockAppNavigator />);

jest.mock('../src/context/PokemonContext', () => ({
  PokemonProvider: ({children}: {children: React.ReactNode}) => (
    <MockPokemonProvider>{children}</MockPokemonProvider>
  ),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    const renderer = ReactTestRenderer.create(<App />);
    expect(renderer).toBeDefined();
  });
});
