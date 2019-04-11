const express = require('express');
const router = express.Router();
require('dotenv').config()
const axios = require('axios')
const Redis = require('ioredis');
const redis = new Redis(6379, process.env.REDIS_IP)

router.post('/', async (req, res, next) => {
  const numberTrys = 10
  const lat = req.body.lat
  const lng = req.body.lng
  const keyRedis = `${lat}/${lng}`
  const cache = await redis.get(keyRedis)
  if (cache){
    let data = JSON.parse(cache)
    data.cached = true
    return res.status(200).json(data)
  }

  if (!lat || !lng){
    return res.status(200).json({success: false,err: "need latitude and longitude"})
  }
  const url = `https://api.darksky.net/forecast/24abe8e8ef0ab12799cf248fd370df58/${lat},${lng}/?lang=es`
  let result = {}
  let countTrys = 0

  // solucion rapida para el reintento en caso de fallo,
  // se prodria implementar interceptor de axios para una solucion mas elaborada
  for(let i = 0; i< numberTrys; i++) {
    result = await axios.get(url)  
    if (result.status == 200){
      break;
    }
    countTrys++
  }
  
  if (countTrys == numberTrys){
    return res.status(400).json({ success: false, countTrys });  
  }

  const response = { success: true, countTrys, result: result.data, cached: false }
  redis.set(keyRedis, JSON.stringify(response));  
  return res.status(200).json(response);
});


module.exports = router;
