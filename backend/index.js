const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const dns = require('dns')

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json()); 
app.use(cors()); 

// 1. Database Connection
// mongoose.connect(MONGO_URI)
// .then(() => {
//     console.log("MongoDB Connected Successfully...");
//     importData(); 
// })
// .catch((err) => console.log("DB Connection Error: ", err));






// Product Model
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// User Model
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now },
});


// 1. Database Connection sahi tareeke naal
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully...");
    // Sirf connection de baad hi data import ya find karo
    importData(); 
})
.catch((err) => console.log("❌ DB Connection Error: ", err.message));


// 3. Multer Setup
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})
app.use('/images', express.static('upload/images'))

// --- 4. MIDDLEWARE  ---
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
}



app.get("/", (req, res) => {
    res.send("Express Server is Running");
});

// Signup API
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// Login API
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});

// --- CART APIs ---


app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added Item ID:", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Item Added to Cart Successfully")
})

// cart vicho smaann baher kadhan lai
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed Item ID:", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Item Removed from Cart Successfully")
})

// page refresh to baad cart data wapis len lai
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Fetching User Cart Data...");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

// --- PRODUCT APIs ---

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
});

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    res.json({ success: true, name: req.body.name });
});

// 6. Bulk Import Function
const importData = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) { 
            const all_product_to_import = [// Women Category (1-12)
                { id: 1, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_1.png", new_price: 50.0, old_price: 80.5 },
                { id: 2, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_2.png", new_price: 85.0, old_price: 120.5 },
                { id: 3, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_3.png", new_price: 60.0, old_price: 100.5 },
                { id: 4, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_4.png", new_price: 100.0, old_price: 150.0 },
                { id: 5, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_5.png", new_price: 85.0, old_price: 120.5 },
                { id: 6, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_6.png", new_price: 85.0, old_price: 120.5 },
                { id: 7, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_7.png", new_price: 85.0, old_price: 120.5 },
                { id: 8, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_8.png", new_price: 85.0, old_price: 120.5 },
                { id: 9, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_9.png", new_price: 85.0, old_price: 120.5 },
                { id: 10, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_10.png", new_price: 85.0, old_price: 120.5 },
                { id: 11, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_11.png", new_price: 85.0, old_price: 120.5 },
                { id: 12, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "http://localhost:4000/images/product_12.png", new_price: 85.0, old_price: 120.5 },

                // Men Category (13-24)
                { id: 13, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_13.png", new_price: 85.0, old_price: 120.5 },
                { id: 14, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_14.png", new_price: 85.0, old_price: 120.5 },
                { id: 15, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_15.png", new_price: 85.0, old_price: 120.5 },
                { id: 16, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_16.png", new_price: 85.0, old_price: 120.5 },
                { id: 17, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_17.png", new_price: 85.0, old_price: 120.5 },
                { id: 18, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_18.png", new_price: 85.0, old_price: 120.5 },
                { id: 19, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_19.png", new_price: 85.0, old_price: 120.5 },
                { id: 20, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_20.png", new_price: 85.0, old_price: 120.5 },
                { id: 21, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_21.png", new_price: 85.0, old_price: 120.5 },
                { id: 22, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_22.png", new_price: 85.0, old_price: 120.5 },
                { id: 23, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_23.png", new_price: 85.0, old_price: 120.5 },
                { id: 24, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "http://localhost:4000/images/product_24.png", new_price: 85.0, old_price: 120.5 },

                // Kids Category (25-36)
                { id: 25, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_25.png", new_price: 85.0, old_price: 120.5 },
                { id: 26, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_26.png", new_price: 85.0, old_price: 120.5 },
                { id: 27, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_27.png", new_price: 85.0, old_price: 120.5 },
                { id: 28, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_28.png", new_price: 85.0, old_price: 120.5 },
                { id: 29, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_29.png", new_price: 85.0, old_price: 120.5 },
                { id: 30, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_30.png", new_price: 85.0, old_price: 120.5 },
                { id: 31, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_31.png", new_price: 85.0, old_price: 120.5 },
                { id: 32, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_32.png", new_price: 85.0, old_price: 120.5 },
                { id: 33, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_33.png", new_price: 85.0, old_price: 120.5 },
                { id: 34, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_34.png", new_price: 85.0, old_price: 120.5 },
                { id: 35, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_35.png", new_price: 85.0, old_price: 120.5 },
                { id: 36, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kids", image: "http://localhost:4000/images/product_36.png", new_price: 85.0, old_price: 120.5 }]; // ਇੱਥੇ ਡਾਟਾ ਪਾ ਸਕਦੇ ਹੋ
            await Product.insertMany(all_product_to_import);
            console.log(" DATA ADD ");
        }
    } catch (error) {
        console.log("Import Error:", error);
    }
};

// 7. Start Server
app.listen(PORT, (error) => {
    if (!error) console.log("Server running on port " + PORT);
    else console.log("Error: " + error);
});