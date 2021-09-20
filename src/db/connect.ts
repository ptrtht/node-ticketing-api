import mongoose from 'mongoose';
import log from '../logger';
import config from "config"

function connect() {
    const dbURI = config.get("dbURI") as string;

    return mongoose
        .connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            log.info("Database Connected")
        })
        .catch((e) => {
            log.error("db error", e);
            process.exit(1)
        })
}

export default connect;