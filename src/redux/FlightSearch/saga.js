import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import request from '../../utils/request';
import { formatTime } from '../../utils/helpers';
import {
  LOAD_CHEAP_FLIGHTS,
  LOAD_BUSINESS_FLIGHTS,
} from './constants';
import {
  cheapFlightsLoaded,
  cheapFlightsLoadingError,
  businessFlightsLoaded,
  businessFlightsLoadingError,
} from './actions';

export function* loadCheapFlightsRequest() {
  yield takeEvery(LOAD_CHEAP_FLIGHTS, function* (action) {
    try {
      const requestURL = 'https://tokigames-challenge.herokuapp.com/api/flights/cheap';
      const flights = yield call(request, requestURL);

      if (flights && flights.data) {
        const data = flights.data.map((flight) => ({
          source: flight.route.split('-')[0],
          destination: flight.route.split('-')[1],
          arrivalTime: formatTime(flight.arrival),
          departureTime: formatTime(flight.departure),
          category: 'Cheap'
        }));
        yield put(cheapFlightsLoaded(data));
      } else {
        yield put(cheapFlightsLoadingError(new Error("No cheap flights available")));
      }
    } catch (err) {
      yield put(cheapFlightsLoadingError(err));
    }
  });
}

export function* loadBusinessFlightsRequest() {
  yield takeEvery(LOAD_BUSINESS_FLIGHTS, function* (action) {
    try {
      const requestURL = 'https://tokigames-challenge.herokuapp.com/api/flights/business';
      const flights = yield call(request, requestURL);

      if (flights && flights.data) {
        const data = flights.data.map((flight) => ({
          source: flight.arrival,
          destination: flight.departure,
          arrivalTime: formatTime(flight.arrivalTime),
          departureTime: formatTime(flight.departureTime),
          category: 'Business'
        }));
        yield put(businessFlightsLoaded(data));
      } else {
        yield put(businessFlightsLoadingError(new Error("No business flights available")));
      }
    } catch (err) {
      yield put(businessFlightsLoadingError(err));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(loadCheapFlightsRequest),
    fork(loadBusinessFlightsRequest),
  ]);
}
