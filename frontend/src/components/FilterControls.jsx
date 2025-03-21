import React from 'react';
import { 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Button,
  Box
} from '@mui/material';

function FilterControls({ filters, setFilters, onApplyFilters }) {
  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="time-period-label">Time Period</InputLabel>
            <Select
              labelId="time-period-label"
              id="time-period"
              name="timePeriod"
              value={filters.timePeriod}
              label="Time Period"
              onChange={handleChange}
            >
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="30">Last 30 Days</MenuItem>
              <MenuItem value="90">Last 90 Days</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="resource-group-label">Resource Group</InputLabel>
            <Select
              labelId="resource-group-label"
              id="resource-group"
              name="resourceGroup"
              value={filters.resourceGroup}
              label="Resource Group"
              onChange={handleChange}
            >
              <MenuItem value="all">All Resource Groups</MenuItem>
              <MenuItem value="production">Production</MenuItem>
              <MenuItem value="development">Development</MenuItem>
              <MenuItem value="testing">Testing</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box display="flex" justifyContent="flex-end">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={onApplyFilters}
            >
              Apply Filters
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FilterControls;