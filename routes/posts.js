const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {
  res.json({
    posts: {
      title: 'first post',
      description: 'Random data you should not access'
    }
  });
  /*res.send(req.user);
  User.findByOne({_id: req.user});*/
});

module.exports = router;