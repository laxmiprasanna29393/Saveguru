import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function RecommendationsTable({ recommendations }) {
  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Cost Optimization Recommendations
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="recommendations table">
          <TableHead>
            <TableRow>
              <TableCell>Resource Name</TableCell>
              <TableCell>Resource Type</TableCell>
              <TableCell>Current Configuration</TableCell>
              <TableCell>Recommended Configuration</TableCell>
              <TableCell align="right">Current Monthly Cost</TableCell>
              <TableCell align="right">Potential Savings</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recommendations.map((recommendation, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {recommendation.resourceName}
                </TableCell>
                <TableCell>{recommendation.resourceType}</TableCell>
                <TableCell>
                  {recommendation.currentSize || recommendation.currentTier}
                </TableCell>
                <TableCell>
                  {recommendation.recommendedSize || recommendation.recommendedTier}
                </TableCell>
                <TableCell align="right">
                  ${recommendation.currentMonthlyCost.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                  ${recommendation.potentialSavings.toFixed(2)}
                </TableCell>
                <TableCell>{recommendation.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default RecommendationsTable;