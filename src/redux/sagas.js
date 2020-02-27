import { all } from 'redux-saga/effects';
import flightSearchSagas from './FlightSearch/saga';

export default function* rootSaga() {
  yield all([
    flightSearchSagas(),
  ]);
}
