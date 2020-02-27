import { createSelector } from 'reselect';
import { initState } from './reducer';

const selectFlightSearch = state => state.FlightSearch || initState;

const makeSelectCheapFlights = () =>
  createSelector(
    selectFlightSearch,
    flightSearchState => flightSearchState.cheapFlights,
  );

const makeSelectBusinessFlights = () =>
  createSelector(
    selectFlightSearch,
    flightSearchState => flightSearchState.businessFlights,
  );

const makeSelectPlaces = () =>
  createSelector(
    selectFlightSearch,
    flightSearchState => flightSearchState.places,
  );

const makeSelectFilters = () =>
  createSelector(
    selectFlightSearch,
    flightSearchState => flightSearchState.filters,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectFlightSearch,
    flightSearchState => flightSearchState.isLoading,
  );

export {
  selectFlightSearch,
  makeSelectCheapFlights,
  makeSelectBusinessFlights,
  makeSelectPlaces,
  makeSelectFilters,
  makeSelectIsLoading,
};