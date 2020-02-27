import {
  LOAD_CHEAP_FLIGHTS,
  LOAD_CHEAP_FLIGHTS_SUCCESS,
  LOAD_CHEAP_FLIGHTS_ERROR,
  LOAD_BUSINESS_FLIGHTS,
  LOAD_BUSINESS_FLIGHTS_SUCCESS,
  LOAD_BUSINESS_FLIGHTS_ERROR,
  UPDATE_SEARCH_FILTERS,
} from './constants';

export function loadCheapFlights() {
  return {
    type: LOAD_CHEAP_FLIGHTS,
  };
}

export function cheapFlightsLoaded(flights) {
  return {
    type: LOAD_CHEAP_FLIGHTS_SUCCESS,
    flights,
  };
}

export function cheapFlightsLoadingError(error) {
  return {
    type: LOAD_CHEAP_FLIGHTS_ERROR,
    error,
  };
}

export function loadBusinessFlights() {
  return {
    type: LOAD_BUSINESS_FLIGHTS,
  };
}

export function businessFlightsLoaded(flights) {
  return {
    type: LOAD_BUSINESS_FLIGHTS_SUCCESS,
    flights,
  };
}

export function businessFlightsLoadingError(error) {
  return {
    type: LOAD_BUSINESS_FLIGHTS_ERROR,
    error,
  };
}

export function updateSearchFilters(filters) {
  return {
    type: UPDATE_SEARCH_FILTERS,
    filters,
  };
}
