const express = require('express');

const isAuth = require('../middleware/is-auth');
const Docs = require('../controllers/Docs')
const router = express.Router();

router.get('/docs', Docs.Get);

router.post(
  '/doc',
  // isAuth,
  Docs.Add
);

router.get('/doc/:docId', Docs.GetById);

router.put(
  '/doc/:docId',
  // isAuth,
  Docs.Update
);

router.delete('/doc/:docId', /*isAuth*/ Docs.Delete);

module.exports = router;
