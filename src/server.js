import app from './app.js';   // ✅ Correct relative path
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';  // ✅ Correct named import

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();  // ✅ Connect to DB before starting the server

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();

