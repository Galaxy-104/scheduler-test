const express = require('express');
const app = express();

app.use(express.json());

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

// 데이터 등록하기
app.post('/schedules', (req, res) => {
    const db = [...map];
    const id = db.length? db.reverse()[0][0] + 1 : 1;

    const data = req.body;

    if (data.title) {
        map.set(id, data);
        res.json({ message : "일정이 등록되었습니다." })
    } else {
        res.json({ message : "제목을 입력해주세요." }) 
    }

})

// 포트 번호 변경 3002 -> 3004
app.listen(3004);