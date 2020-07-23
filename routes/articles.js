const express = require('express')
const router = express.Router()


router.get('/',(req, res)=>{
  res.send('I am inside of articles')
})

module.exports = router
