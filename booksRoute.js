const express = require('express');
const router = express.Router();
const { addBook,getBookById,deleteBook } = require('../controllers/bookController');
const verifyroles = require('../middlewares/verifyRoles')
const {ROLES} = require('../config/roles')

router.post('/addBook',verifyroles(ROLES.Admin,ROLES.Editor), addBook);
router.route('/book/:id')
    .get('/book/:id',verifyroles(ROLES.Admin,ROLES.Editor,ROLES.User), getBookById)
    .delete('/book/:id',verifyroles(ROLES.Admin,ROLES.Editor,ROLES.User),deleteBook);

module.exports = router;
