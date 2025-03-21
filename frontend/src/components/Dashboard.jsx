import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CostSummaryCard from './CostSummaryCard';
import RecommendationsTable from './RecommendationsTable';
import FilterControls from './FilterControls';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  
  const [filters, setFilters] = useState({
    timePeriod: '30',
    resourceGroup: 'all',
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  });

  // Function to generate mock data
  function generateMockData() {
    const today = new Date();
    const dailyCosts = [];
    
    // Generate past 30 days of cost data
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      dailyCosts.push({
        date: date.toISOString().substring(0, 10),
        cost: 300 + Math.random() * 100  // Random cost between 300-400
      });
    }
    
    return {
      costSummary: {
        totalCost: 12487.32,
        costTrend: 8.3,  // % increase from previous period
        vmCost: 8245.65,
        storageCost: 2354.32,
        networkCost: 1245.67,
        otherCost: 641.68,
        dailyCosts: dailyCosts,
        costByService: [
          { service: "Virtual Machines", cost: 8245.65 },
          { service: "Storage", cost: 2354.32 },
          { service: "Networking", cost: 1245.67 },
          { service: "Other", cost: 641.68 }
        ]
      },
      totalSavings: 3254.67,
      vmRecommendations: [
        {
          resourceName: "vm-prod-app01",
          resourceType: "Virtual Machine",
          currentSize: "Standard_D4s_v3",
          recommendedSize: "Standard_D2s_v3",
          currentMonthlyCost: 245.30,
          potentialSavings: 122.65,
          reason: "Average CPU: 5.2%, Memory: 28.3% - Underutilized"
        },
        {
          resourceName: "vm-prod-db01",
          resourceType: "Virtual Machine",
          currentSize: "Standard_E8s_v3",
          recommendedSize: "Standard_E4s_v3",
          currentMonthlyCost: 520.45,
          potentialSavings: 260.22,
          reason: "Average CPU: 12.4%, Memory: 45.2% - Underutilized"
        },
        {
          resourceName: "premium-disk-01",
          resourceType: "Managed Disk",
          currentTier: "Premium SSD",
          recommendedTier: "Standard SSD",
          currentMonthlyCost: 97.82,
          potentialSavings: 68.47,
          reason: "Low IOPS utilization: 4.2% - Overprovisioned"
        }
      ]
    };
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // For development, use the mock data function
        // In production, this would be replaced with an actual API call
        // const response = await fetch('/api/analyze-azure');
        // if (!response.ok) throw new Error('Failed to fetch data');
        // const data = await response.json();
        
        // Using mock data for now
        const data = generateMockData();
        
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);  // Empty dependency array means this runs once on mount

  const handleApplyFilters = () => {
    setLoading(true);
    // Here you would fetch data based on the filters
    // For now, just simulate loading and use our mock data
    setTimeout(() => {
      setDashboardData(generateMockData());
      setLoading(false);
    }, 1000);
  };

  if (loading && !dashboardData) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading dashboard data...</Typography>
      </Container>
    );
  }
  
  if (error && !dashboardData) {
    return (
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, bgcolor: '#ffebee' }}>
          <Typography variant="h5" color="error">Error loading data</Typography>
          <Typography variant="body1">{error}</Typography>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        SAVEGURU Azure Cost Dashboard
      </Typography>
      
      <FilterControls 
        filters={filters} 
        setFilters={setFilters} 
        onApplyFilters={handleApplyFilters} 
      />
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <CostSummaryCard 
            title="Total Azure Spend"
            amount={dashboardData?.costSummary?.totalCost}
            trend={dashboardData?.costSummary?.costTrend}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CostSummaryCard 
            title="Potential Savings"
            amount={dashboardData?.totalSavings}
            trend={null}
            isSavings={true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CostSummaryCard 
            title="Resources to Optimize"
            count={dashboardData?.vmRecommendations?.length}
            subtitle="Across your Azure subscription"
          />
        </Grid>
        
        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Cost Trend (30 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData?.costSummary?.dailyCosts || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cost" stroke="#0078d4" name="Azure Cost" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Cost Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData?.costSummary?.costByService || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#0078d4" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Recommendations Table */}
        <Grid item xs={12}>
          <RecommendationsTable recommendations={dashboardData?.vmRecommendations || []} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;