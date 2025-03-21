import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function CostSummaryCard({ title, amount, trend, isSavings, count, subtitle }) {
  // Format currency values
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        
        {amount !== undefined && (
          <Typography variant="h4" component="div" sx={{ mb: 1, color: isSavings ? 'success.main' : 'text.primary' }}>
            {formatCurrency(amount)}
          </Typography>
        )}
        
        {count !== undefined && (
          <Typography variant="h4" component="div" sx={{ mb: 1 }}>
            {count}
          </Typography>
        )}
        
        {trend !== undefined && trend !== null && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {trend > 0 ? (
              <TrendingUpIcon color={isSavings ? "success" : "error"} fontSize="small" />
            ) : (
              <TrendingDownIcon color={isSavings ? "error" : "success"} fontSize="small" />
            )}
            <Typography variant="body2" sx={{ ml: 0.5 }} color={trend > 0 ? (isSavings ? "success.main" : "error.main") : (isSavings ? "error.main" : "success.main")}>
              {Math.abs(trend).toFixed(1)}% {trend > 0 ? "increase" : "decrease"} vs. previous period
            </Typography>
          </Box>
        )}
        
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default CostSummaryCard;