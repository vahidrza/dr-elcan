require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const pino    = require('pino');
const pinoHttp = require('pino-http');
const mongoose = require('mongoose');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => { logger.error(err, 'MongoDB connection failed'); process.exit(1); });

const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, '..')));

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/gallery',  require('./routes/gallery'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/upload',   require('./routes/upload'));

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
