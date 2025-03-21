import React from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Chip
} from '@mui/material';

function RecommendationsTable({ recommendations }) {
  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>Optimization Recommendations</Typography>
        <Typography variant="body1">No recommendations available at this time.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>Optimization Recommendations</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="recommendations table">
          <TableHead>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Current Configuration</TableCell>
              <TableCell>Recommendation</TableCell>
              <TableCell>Current Cost</TableCell>
              <TableCell>Potential Savings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recommendations.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.resourceName}
                </TableCell>
                <TableCell>{row.resourceType}</TableCell>
                <TableCell>{row.currentSize || row.currentTier}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.recommendedSize || row.recommendedTier || row.recommendedAction} 
                    color="primary" 
                    variant="outlined" 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{formatCurrency(row.currentMonthlyCost)}/month</TableCell>
                <TableCell sx={{ color: 'success.main', fontWeight: 'bold' }}>
                  {formatCurrency(row.potentialSavings)}/month
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default RecommendationsTable;