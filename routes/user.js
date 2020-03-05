const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();
// 팔로우 기능
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });    // 팔로우할 사용자를 데이터베이스에서 조회
        await user.addFollowing(parseInt(req.params.id, 10));   // 현재 로그인한 사용자와의 관계를 지정
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;