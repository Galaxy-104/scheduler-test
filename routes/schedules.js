const express = require('express');
const router = express.Router();

router.use(express.json());

const conn = require('../mariadb');

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

// 데이터 수정하기
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, date, time, place, categoty, description } = req.body;
    const values = [ name, date, time, place, categoty, description, id ];

    if (name && date) {
        conn.query(
            'UPDATE `schedules` SET name = ?, date = ?, time = ?, place = ?, category = ?, description = ? WHERE id = ?', values,
            function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).end();
                }

                res.status(201).json({
                    message : "일정 수정 완료"
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

    conn.query(
        'DELETE FROM `schedules` WHERE id = ?', id,
        function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).end();
            }

            res.status(201).json({
                message : "일정 삭제 완료"
            })  
        }
    )

})

module.exports = router;