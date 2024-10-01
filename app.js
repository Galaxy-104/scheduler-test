const express = require('express');
const app = express();

// 포트 번호 변경 3002 -> 3004
app.listen(3004);

const scheduleRouter = require('./routes/schedules');

app.use("/schedules", scheduleRouter);