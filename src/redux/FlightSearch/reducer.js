import produce from 'immer';
import _ from 'lodash';
import {
  LOAD_CHEAP_FLIGHTS,
  LOAD_CHEAP_FLIGHTS_SUCCESS,
  LOAD_CHEAP_FLIGHTS_ERROR,
  LOAD_BUSINESS_FLIGHTS,
  LOAD_BUSINESS_FLIGHTS_SUCCESS,
  LOAD_BUSINESS_FLIGHTS_ERROR,
  UPDATE_SEARCH_FILTERS,
} from './constants';

export const initState = {
  cheapFlights: [],
  businessFlights: [],
  places: [],
  filters: {
    source: '',
    destination: '',
    category: '',
    trip:''
  },
  isLoading: false
};

const FlightSearchReducer = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CHEAP_FLIGHTS:
        draft.cheapFlights = [];
        draft.isLoading = true;
        break;

      case LOAD_CHEAP_FLIGHTS_SUCCESS:
        draft.cheapFlights = action.flights;
        draft.places = _.orderBy(
          _.union(
            state.places,
            _.map(action.flights, flight => flight.source),
            _.map(action.flights, flight => flight.destination)
          )
        );
        draft.isLoading = false;
        break;

      case LOAD_CHEAP_FLIGHTS_ERROR:
        // Handle Error
        draft.isLoading = false;
        break;

      case LOAD_BUSINESS_FLIGHTS:
        draft.businessFlights = [];
        draft.isLoading = true;
        break;

      case LOAD_BUSINESS_FLIGHTS_SUCCESS:
        draft.businessFlights = action.flights;
        draft.places = _.orderBy(
          _.union(
            state.places,
            _.map(action.flights, flight => flight.source),
            _.map(action.flights, flight => flight.destination)
          )
        );
        draft.isLoading = false;
        break;

      case LOAD_BUSINESS_FLIGHTS_ERROR:
        // Handle Error
        draft.isLoading = false;
        break;

      case UPDATE_SEARCH_FILTERS:
        draft.filters = action.filters;
        break;

      default:
        break;
    }
  });

export default FlightSearchReducer;
