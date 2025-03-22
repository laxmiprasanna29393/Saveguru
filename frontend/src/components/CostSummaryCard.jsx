import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function CostSummaryCard({ title, amount, count, trend, subtitle, isSavings }) {
  // Format currency values
  const formattedAmount = typeof amount === 'number' 
    ? `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : amount;

  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      
      {amount !== undefined && (
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          {formattedAmount}
        </Typography>
      )}
      
      {count !== undefined && (
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          {count}
        </Typography>
      )}
      
      {trend !== undefined && trend !== null && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {trend > 0 ? (
            <>
              <TrendingUpIcon 
                sx={{ color: isSavings ? 'success.main' : 'error.main', mr: 1 }} 
              />
              <Typography 
                variant="body2" 
                color={isSavings ? 'success.main' : 'error.main'}
              >
                {Math.abs(trend).toFixed(1)}% {isSavings ? 'potential savings' : 'increase vs. previous period'}
              </Typography>
            </>
          ) : (
            <>
              <TrendingDownIcon 
                sx={{ color: isSavings ? 'error.main' : 'success.main', mr: 1 }} 
              />
              <Typography 
                variant="body2" 
                color={isSavings ? 'error.main' : 'success.main'}
              >
                {Math.abs(trend).toFixed(1)}% {isSavings ? 'decrease in savings' : 'decrease vs. previous period'}
              </Typography>
            </>
          )}
        </Box>
      )}
      
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
}

export default CostSummaryCard;