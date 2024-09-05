const express = require('express');
const app = express();

const map = new Map([
    [1, {
        title : "오리엔테이션",
        date : "2024-08-05",
        time : "09:00",
        place : "online",
        categoty : "lecture"
    }],
    [2, {
        title : "온라인 특강",
        date : "2024-08-27",
        time : "19:00",
        place : "online",
        categoty : "lecture"
    }],
    [3, {
        title : "팀 미팅",
        date : "2024-08-30",
        time : "20:00",
        place : "online",
        categoty : "project"
    }],
]);

// 개별 데이터 조회
app.get('/schedules/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const schedule = map.get(id);

    if (schedule == undefined) {
        res.json({ message : "존재하지 않는 데이터입니다." })
    } else {
        res.json(schedule);
    }
})

app.listen(3002);