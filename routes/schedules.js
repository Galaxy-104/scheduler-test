const express = require('express');
const router = express.Router();

router.use(express.json());

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

// 전체 데이터 조회
router.get('/', (req, res) => {
    const db = [...map];

    if (db.length > 0) {
        res.status(200).json(db);
    } else {
        res.status(404).json({ message : "데이터가 존재하지 않습니다." })
    }

})

// 개별 데이터 조회 
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const schedule = map.get(id);

    if (schedule == undefined) {
        res.status(404).json({ message : "존재하지 않는 데이터입니다." })
    } else {
        res.status(200).json(schedule);
    }
})

// 데이터 등록하기
router.post('/', (req, res) => {
    const db = [...map];
    const id = db.length? db.reverse()[0][0] + 1 : 1;

    const data = req.body;

    if (data.title) {
        map.set(id, data);
        res.status(201).json({ message : "일정이 등록되었습니다." })
    } else {
        res.status(400).json({ message : "제목을 입력해주세요." }) 
    }

})

// 데이터 삭제하기
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const schedule = map.get(id);

    if (schedule) {
        map.delete(id);
        res.status(200).json({ message : `${schedule.title}이 삭제되었습니다.` })
    }  else {
        res.status(404).json({ message : "해당 데이터가 존재하지 않습니다." })
    }
})

module.exports = router;