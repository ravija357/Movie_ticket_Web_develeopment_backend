import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

// Process Payment
export const processPayment = async (req, res) => {
    const { bookingId, amount } = req.body;

    if (!bookingId || !amount) {
        return res.status(400).json({ error: 'Booking ID and amount are required' });
    }

    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const newPayment = await Payment.create({
            booking_id: bookingId,
            amount,
            status: 'paid',
        });

        res.status(201).json({ message: 'Payment processed successfully', payment: newPayment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process payment' });
    }
};
