const express = require('express')
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()



mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// app.use(express.urlencoded({extended: false})) // we can access all different parameters from form inside of the article route


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt : 'desc'
    });
    res.render('articles/index', {test: 'test variable', articles: articles})
})

app.use('/articles', articleRouter)

app.listen(80)

