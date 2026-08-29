const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3002;

app.use(express.json());

// Task 5.2 APIs
app.get('/vieworder', (req, res) => {
    res.json({ message: "View order called successfully" });
});

app.delete('/cancelorder', (req, res) => {
    res.json({ message: "Order cancelled successfully" });
});

// Flow: Order -> Payment -> Order -> Notification -> User
app.post('/addorder', async (req, res) => {
    const { item, amount, paymentStatus } = req.body;
    try {
        // 1. Call Payment Service
        const paymentResponse = await axios.post('http://localhost:3003/paymentprocess', {
            amount,
            status: paymentStatus
        });

        const isSuccess = paymentResponse.data.status === "Success";

        // 2. Call Notification Service based on payment status
        const notificationResponse = await axios.post('http://localhost:3004/sendnotification', {
            orderStatus: isSuccess ? "Confirmed" : "Failed",
            message: isSuccess ? "Your order was placed successfully!" : "Order failed due to payment issue."
        });

        // 3. Return final combined response
        res.json({
            orderMessage: isSuccess ? "Order created successfully" : "Order placement failed",
            paymentDetails: paymentResponse.data,
            notificationDetails: notificationResponse.data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));