const express = require('express');
const router = express.Router();

router.use(express.json());

const conn = require('../mariadb');

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

    conn.query(
        'SELECT * FROM `schedules`',
        function (err, results, fields) {
            
            res.status(200).json(results);
        }
    )

})

// 개별 데이터 조회 
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    conn.query(
        'SELECT * FROM `schedules` WHERE id = ?', id,
        function (err, results, fields) {
            
            if (results.length) {
                res.status(200).json(results);
            } else {
                res.status(404).end();
            }

        }
    )
})

// 데이터 등록하기
router.post('/', (req, res) => {

    const { name, date, time, place, categoty, description } = req.body;
    const values = [ name, date, time, place, categoty, description ];

    if (name && date) {
        conn.query(
            'INSERT INTO `schedules` (name, date, time, place, category, description) VALUES (?, ?, ?, ?, ?, ?)', values,
            function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).end();
                }

                res.status(201).json({
                    message : "일정 등록 완료"
                })  
            }
        )
    } else {
        res.status(400).json({ message : "내용을 입력해주세요." }) 
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