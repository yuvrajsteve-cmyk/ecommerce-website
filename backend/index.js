const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const dotenv = require('dotenv')
const dns = require('dns')
const https = require('https')
const newsletterRouter = require('./routes/newsletter')

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

dotenv.config()

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'mera_gupt_password_2026'

app.use(express.json())
app.use('/subscribe', newsletterRouter)
app.use(cors())

const Product = mongoose.model('Product', {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
})

const Users = mongoose.model('Users', {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
})

mongoose.connect(MONGO_URI)
  .then(() => {
    importData()
  })
  .catch((err) => {
    return err
  })

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })
app.use('/images', express.static('upload/images'))

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    res.status(401).send({ errors: 'Please authenticate using valid token' })
  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom')
      req.user = data.user
      next()
    } catch {
      res.status(401).send({ errors: 'Please authenticate using a valid token' })
    }
  }
}


const verifyAdmin = (req, res, next) => {
  const adminToken = req.header('admin-token')

  if (!adminToken || adminToken !== ADMIN_SECRET_KEY) {
    return res.status(403).json({ success: false, errors: 'Access Denied' })
  }
  next()
}

app.get('/', (req, res) => {
  res.send('Express Server is Running')
})

app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email })
  if (check) {
    return res.status(400).json({ success: false, errors: 'Existing user found with same email address' })
  }
  let cart = {}
  for (let i = 0; i < 300; i++) {
    cart[i] = 0
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })
  await user.save()
  const data = { user: { id: user.id } }
  const token = jwt.sign(data, 'secret_ecom')
  res.json({ success: true, token })
})

app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email })
  if (user) {
    const passCompare = req.body.password === user.password
    if (passCompare) {
      const data = { user: { id: user.id } }
      const token = jwt.sign(data, 'secret_ecom')
      res.json({ success: true, token })
    } else {
      res.json({ success: false, errors: 'Wrong Password' })
    }
  } else {
    res.json({ success: false, errors: 'Wrong Email Id' })
  }
})

app.post('/addtocart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id })
  userData.cartData[req.body.itemId] += 1
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
  res.send('Item Added to Cart Successfully')
})

app.post('/removefromcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id })
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
  res.send('Item Removed from Cart Successfully')
})

app.post('/getcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id })
  res.json(userData.cartData)
})

app.post('/upload', verifyAdmin, upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `https://${req.get('host')}/images/${req.file.filename}`
  })
})

app.post('/addproduct', verifyAdmin, async (req, res) => {
  let products = await Product.find({})
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  })
  await product.save()
  res.json({ success: true, name: req.body.name })
})

app.get('/allproducts', async (req, res) => {
  let products = await Product.find({})
  res.send(products)
})

app.post('/removeproduct', verifyAdmin, async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id })
  res.json({ success: true, name: req.body.name })
})

const importData = async () => {
  try {
    const count = await Product.countDocuments()
    if (count === 0) {
      const all_product_to_import = [
        { id: 1, name: 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', category: 'women', image: 'https://onrender.com', new_price: 50.0, old_price: 80.5 },
        { id: 2, name: 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', category: 'women', image: 'https://onrender.com', new_price: 85.0, old_price: 120.5 },
        { id: 3, name: 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', category: 'women', image: 'https://onrender.com', new_price: 60.0, old_price: 100.5 },
        { id: 4, name: 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', category: 'women', image: 'https://onrender.com', new_price: 100.0, old_price: 150.0 },
        { id: 5, name: 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', category: 'women', image: 'https://onrender.com', new_price: 85.0, old_price: 120.5 },
        { id: 6, name: 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', category: 'women', image: 'https://onrender.com', new_price: 85.0, old_price: 120.5 },
        { id: 7, name: 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', category: 'women', image: 'https://onrender.com', new_price: 85.0, old_price: 120.5 },
        { id: 8, name: 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', category: 'women', image: 'https://onrender.com', new_price: 85.0, old_price: 120.5 }
      ]
      await Product.insertMany(all_product_to_import)
    }
  } catch (error) {
    return error
  }
}

app.listen(PORT, () => {
  setInterval(() => {
    https.get('https://onrender.com', (res) => {
      return res.statusCode
    }).on('error', (e) => {
      return e.message
    })
  }, 600000)
})
