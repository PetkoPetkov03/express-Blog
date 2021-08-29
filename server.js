require('dotenv').config();
const express = require('express');
const app = express();
const articleRouter = require('./routes/routes');
const mongoose = require('mongoose');
const Article  = require('./models/articleSchema');
const methodOverride = require('method-override');


mongoose.connect(process.env.MONGO_URI);

app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));
app.use('/articles/' ,articleRouter);
app.set('view engine', "ejs");



app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('./articles/index', { articles: articles });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));