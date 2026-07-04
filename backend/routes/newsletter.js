const express = require('express')
const router = express.Router()
const NewsletterUser = require('../models/newsletter')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept')

  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' })
    }

    const exists = await NewsletterUser.findOne({ email })
    if (exists) {
      return res.status(400).json({ success: false, message: 'Already Subscribed! ⚠️' })
    }

    const newUser = new NewsletterUser({ email })
    await newUser.save()

    return res.json({ success: true, message: 'Subscribed successfully! ✅' })
  } catch (err) {
    const logger = console
    logger.error('Newsletter Error:', err.message)
    return res.status(500).json({ success: false, message: 'Server error, try again later' })
  }
})

router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept')
  return res.sendStatus(200)
})

module.exports = router
