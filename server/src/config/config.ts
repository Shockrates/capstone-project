import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const MONGO_DB = {
    USER: 'sokratis-MERN',
    PASSWORD: 'st1234',
    DB: "project"

}

const config = {
    server: SERVER,
    mongo: MONGO_DB
};

export default config;
