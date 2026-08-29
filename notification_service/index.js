const express = require('express');
const app = express();
const PORT = 3004;

app.use(express.json());

// Task 5.4 API
app.post('/sendnotification', (req, res) => {
    const { orderStatus, message } = req.body;
    res.json({ notificationStatus: "Sent", orderStatus, message });
});

app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));