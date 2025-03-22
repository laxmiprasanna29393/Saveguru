import React from 'react';
import { Paper, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

function FilterControls({ filters, setFilters, onApplyFilters }) {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="time-period-label">Time Period</InputLabel>
            <Select
              labelId="time-period-label"
              id="time-period"
              name="timePeriod"
              value={filters.timePeriod}
              label="Time Period"
              onChange={handleFilterChange}
            >
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="30">Last 30 Days</MenuItem>
              <MenuItem value="60">Last 60 Days</MenuItem>
              <MenuItem value="90">Last 90 Days</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="resource-group-label">Resource Group</InputLabel>
            <Select
              labelId="resource-group-label"
              id="resource-group"
              name="resourceGroup"
              value={filters.resourceGroup}
              label="Resource Group"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All Resource Groups</MenuItem>
              <MenuItem value="production">Production</MenuItem>
              <MenuItem value="development">Development</MenuItem>
              <MenuItem value="testing">Testing</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={onApplyFilters}
            sx={{ minWidth: '120px' }}
          >
            APPLY FILTERS
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FilterControls;