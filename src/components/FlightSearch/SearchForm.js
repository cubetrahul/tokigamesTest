import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import Switch from '@material-ui/core/Switch';
import { Link} from "react-router-dom";

const travelClass = [
  { key: '', value: 'All' },
  { key: 'Cheap', value: 'Cheap' },
  { key: 'Business', value: 'Business' },
];

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formContent: {
    width: '500px',
    padding: '20px',
    marginTop: '40px',
    border: '1px solid lightgray',
    'border-radius': '10px',
    'box-shadow': '1px 1px 5px lightgray',
  },
  tripToggle: {
    marginTop: '25px',
    marginLeft: '30px',
  }
}));

function SearchForm({ places, initialFilters, onUpdateSearchFilters }) {
  const classes = useStyles();
  const [source, setSource] = useState(initialFilters.source || "");
  const [destination, setDestination] = useState(initialFilters.destination || "");
  const [category, setCategory] = useState(initialFilters.category || "");
  const [trip, setTrip] = useState(initialFilters.trip || "one");

  useEffect(() => {
    if (!source || !destination) {
      setTrip("one");
    }
  }, [ source, destination ]);

  const handleSubmit = () => {
    onUpdateSearchFilters({
      source,
      destination,
      category,
      trip
    });
  };

  const swapRoutes = () => {
    setSource(destination);
    setDestination(source)
  }

  const tripToggle = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setTrip("two");
    } else {
      setTrip("one");
    }
  };

  const handleReset = () => {
    setSource("");
    setDestination("");
    setCategory("");
    setTrip("one");
    onUpdateSearchFilters({
      source: "",
      destination: "",
      category: "",
      trip: "one"
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.formContent}>
        <TextField
          id="source-location"
          name="sourceLocation"
          select
          value={source}
          label="Source"
          helperText="Please select your source"
          onClick={(e) => setSource(e.target.value)}
        >
          {["All", ...places].map(option => (
            <MenuItem key={option} value={option === "All" ? "" : option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <SwapHorizRoundedIcon onClick={swapRoutes} style={{cursor: 'pointer', marginTop: '30px'}} />
        <TextField
          id="destination-location"
          name="destinationLocation"
          select
          value={destination}
          label="Destination"
          helperText="Please select your destination"
          onClick={(e) => setDestination(e.target.value)}
        >
          {["All", ...places].map(option => (
            <MenuItem key={option} value={option === "All" ? "" : option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="travel-class"
          name="travelClass"
          select
          value={category}
          label="Class"
          helperText="Please select your class"
          onClick={(e) => setCategory(e.target.value)}
        >
          {travelClass.map(option => (
            <MenuItem key={option.value} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" onChange={tripToggle} checked={trip==="two"} />}
          label="Round Trip"
          labelPlacement="start"
          disabled={!(source && destination)}
          className={classes.tripToggle}
        />
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            <Link to="/flights" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>Search</Link>
          </Button>
          <Button variant="contained" onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </form>
  );
}

SearchForm.propTypes = {
  places: PropTypes.array.isRequired,
  initialFilters: PropTypes.object.isRequired,
  onUpdateSearchFilters: PropTypes.func.isRequired,
};

export default SearchForm;
