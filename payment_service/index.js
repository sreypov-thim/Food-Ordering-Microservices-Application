const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.json());

// Task 5.3 API
app.post('/paymentprocess', (req, res) => {
    const { amount, status } = req.body;
    // Simulates Success unless status is explicitly passed as 'failure'
    if (status === 'failure') {
        return res.json({ status: "Failure", message: "Payment failed" });
    }
    res.json({ status: "Success", message: "Payment processed successfully", amount });
});

app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));