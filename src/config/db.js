import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER || 'popcorn_seat',
    process.env.DB_PASSWORD || 'admin123',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: console.log,  // Enable logging to debug queries
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');
        await sequelize.sync({ alter: true });
        console.log('✅ Database synchronized');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('📌 Connection Details:', {
            dbName: process.env.DB_NAME,
            dbUser: process.env.DB_USER,
            dbHost: process.env.DB_HOST,
            dbPort: process.env.DB_PORT,
        });
        process.exit(1);
    }
};

export { sequelize, connectDB };




// import { Sequelize } from 'sequelize';


// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     port: process.env.DB_PORT,
//     logging: false, // Disable logging queries
// });

// const testConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('✅ Database connected successfully');
//     } catch (error) {
//         console.error('❌ Unable to connect to the database:', error);
//     }
// };

// // testConnection();

// export default sequelize;
