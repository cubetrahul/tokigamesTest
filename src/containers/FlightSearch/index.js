import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectCheapFlights,
  makeSelectBusinessFlights,
  makeSelectPlaces,
  makeSelectFilters,
  makeSelectIsLoading,
} from '../../redux/FlightSearch/selectors';
import {
  loadCheapFlights,
  loadBusinessFlights,
  updateSearchFilters,
} from '../../redux/FlightSearch/actions';

import SearchForm from '../../components/FlightSearch/SearchForm';
import LoadingIndicator from '../../components/LoadingIndicator';

function FlightSearch({
  filters,
  places,
  onLoadCheapFlights,
  onLoadBusinessFlights,
  updateSearchFilters,
  isLoading,
}) {

  useEffect(() => {
    if (!places || !places.length) {
      onLoadCheapFlights();
      onLoadBusinessFlights();
    }
  }, [onLoadBusinessFlights, onLoadCheapFlights, places]);

  return (
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      {isLoading ? <LoadingIndicator /> :
        <Grid item xs={5}>
          <SearchForm places={places} initialFilters={filters} onUpdateSearchFilters={updateSearchFilters} />
        </Grid>
      }
    </Grid>
  );
}

FlightSearch.propTypes = {
  places: PropTypes.array.isRequired,
  onLoadCheapFlights: PropTypes.func.isRequired,
  onLoadBusinessFlights: PropTypes.func.isRequired,
  updateSearchFilters: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cheapFlights: makeSelectCheapFlights(),
  businessFlights: makeSelectBusinessFlights(),
  places: makeSelectPlaces(),
  isLoading: makeSelectIsLoading(),
  filters: makeSelectFilters(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadCheapFlights: () => dispatch(loadCheapFlights()),
    onLoadBusinessFlights: () => dispatch(loadBusinessFlights()),
    updateSearchFilters: (filter) => dispatch(updateSearchFilters(filter)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(FlightSearch);
