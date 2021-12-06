const express = require('express');
const router = express.Router();
const { create, list, listAllBlogsCategoriesTags, read, remove, update, photo, listRelated, listSearch, listByUser } = require('../controllers/submission');
var multer  = require('multer')
var upload = multer({ dest: '../../frontend/upload/' })
const { requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBlog } = require('../controllers/auth');

router.post('/submission', requireSignin, adminMiddleware, create);
router.get('/submissions', list);
router.post('/submissions-categories-tags', listAllBlogsCategoriesTags);
router.get('/submission/:slug', read);
router.delete('/submission/:slug', requireSignin, adminMiddleware, remove);
router.put('/submission/:slug', requireSignin, adminMiddleware, update);
router.get('/submission/photo/:slug', photo);
router.post('/submissions/related', listRelated);
router.get('/submissions/search', listSearch);

// auth user submission crud
router.post('/user/submission', requireSignin, authMiddleware, create);
router.get('/:username/submissions', listByUser);
router.delete('/user/submission/:slug', requireSignin, authMiddleware, canUpdateDeleteBlog, remove);
router.put('/user/submission/:slug', requireSignin, authMiddleware, canUpdateDeleteBlog, update);

module.exports = router;