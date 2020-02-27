import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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

import ListTable from '../../components/FlightSearch/ListTable';
import LoadingIndicator from '../../components/LoadingIndicator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function ShowFlights({
  cheapFlights,
  businessFlights,
  filters,
  isLoading,
}) {

  const allFlights = _.filter(
    _.union(
      _.map(cheapFlights, flight => _.extend(flight, { category: "Cheap" })),
      _.map(businessFlights, flight => _.extend(flight, { category: "Business" }))
    ),
    (flight) => {
      if (filters && filters.source) {
        if (flight.source !== filters.source) {
          return false;
        }
      }
      if (filters && filters.destination) {
        if (flight.destination !== filters.destination) {
          return false;
        }
      }
      if (filters && filters.category) {
        if (flight.category !== filters.category) {
          return false;
        }
      }
      return true;
    }
  );
  const returnFlights = _.filter(
    _.union(
      _.map(cheapFlights, flight => _.extend(flight, { category: "Cheap" })),
      _.map(businessFlights, flight => _.extend(flight, { category: "Business" }))
    ),
    (flight) => {
      if (filters && filters.source) {
        if (flight.source !== filters.destination) {
          return false;
        }
      }
      if (filters && filters.destination) {
        if (flight.destination !== filters.source) {
          return false;
        }
      }
      if (filters && filters.category) {
        if (flight.category !== filters.category) {
          return false;
        }
      }
      return true;
    }
  );
  const { source, destination, trip } = filters
  const history = useHistory()
  const handleback = () => {
    history.goBack()
  }
  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <Grid
            justify="space-between"
            container
            spacing={4}
          >
            <Grid item>
              <Typography variant="h6" align="center" >
                {source && destination && <>{source} {trip === 'one' ? <ArrowRightAltIcon /> : trip === 'two' ? <SyncAltIcon /> : null} {destination}</>}
                {source && !destination && <>Flights from {source}</>}
                {!source && destination && <>Flights to {destination}</>}
              </Typography>
            </Grid>

            <Grid item>
              <div>
                <Button raised="true" color="inherit" onClick={handleback}>Modify</Button>
              </div>
            </Grid>
          </Grid>


        </Toolbar>
      </AppBar>
      {isLoading ? <LoadingIndicator /> :
        <Grid item xs={12}>
          <ListTable flights={allFlights} />
          {filters.source && filters.destination && filters.trip === "two" ? <>
            <Typography variant="h5">Return Flights</Typography>
            <ListTable flights={returnFlights} />
          </> : ''}
        </Grid>
      }


    </Grid>
  )
}

ShowFlights.propTypes = {
  cheapFlights: PropTypes.array.isRequired,
  businessFlights: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  onLoadCheapFlights: PropTypes.func.isRequired,
  onLoadBusinessFlights: PropTypes.func.isRequired,
  updateSearchFilters: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cheapFlights: makeSelectCheapFlights(),
  businessFlights: makeSelectBusinessFlights(),
  places: makeSelectPlaces(),
  filters: makeSelectFilters(),
  isLoading: makeSelectIsLoading(),
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
)(ShowFlights);
