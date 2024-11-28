"use client";
import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockOrders = [
    {
      _id: "ORD001",
      paymentIntent: { method: "Credit Card", amount: 150.0 },
      orderStatus: "Delivered",
      createdAt: "2023-09-15T10:00:00Z",
    },
    {
      _id: "ORD002",
      paymentIntent: { method: "PayPal", amount: 85.5 },
      orderStatus: "Processing",
      createdAt: "2023-09-18T12:30:00Z",
    },
    {
      _id: "ORD003",
      paymentIntent: { method: "Stripe", amount: 200.0 },
      orderStatus: "Shipped",
      createdAt: "2023-09-20T14:45:00Z",
    },
    {
      _id: "ORD004",
      paymentIntent: { method: "Credit Card", amount: 120.0 },
      orderStatus: "Cancelled",
      createdAt: "2023-09-22T09:15:00Z",
    },
    {
      _id: "ORD005",
      paymentIntent: { method: "PayPal", amount: 95.0 },
      orderStatus: "Delivered",
      createdAt: "2023-09-25T16:00:00Z",
    },
  ];

  const mockMonthlyData = [
    { month: "Jan", orders: 40, revenue: 8000 },
    { month: "Feb", orders: 55, revenue: 11000 },
    { month: "Mar", orders: 65, revenue: 13000 },
    { month: "Apr", orders: 70, revenue: 14000 },
    { month: "May", orders: 75, revenue: 15000 },
    { month: "Jun", orders: 80, revenue: 16000 },
    { month: "Jul", orders: 85, revenue: 17000 },
    { month: "Aug", orders: 90, revenue: 18000 },
    { month: "Sep", orders: 95, revenue: 19000 },
    { month: "Oct", orders: 100, revenue: 20000 },
    { month: "Nov", orders: 105, revenue: 21000 },
  ];

  const predictedOrders = 115;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavigationBar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Seller Analytics
        </Typography>

        <Grid container spacing={4}>
          {/* Monthly Order Frequency */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#f5f5f5" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Order Frequency
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockMonthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Monthly Revenue */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#f5f5f5" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Revenue
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockMonthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1976d2"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Prediction */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Prediction
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                  <Typography variant="h2" color="primary">
                    {predictedOrders}
                  </Typography>
                  <Typography variant="subtitle1">
                    Predicted Orders for Next Month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#fff3e0" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Orders
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockOrders.slice(0, 5).map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>{order.paymentIntent.method}</TableCell>
                          <TableCell>
                            ₹{order.paymentIntent.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>{order.orderStatus}</TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AnalyticsPage;
