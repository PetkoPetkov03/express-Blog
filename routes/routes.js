const express = require('express');
const router = express.Router();
const Article = require('../models/articleSchema');




router.get('/new', (req, res) => {
    const articles = Article.find({});
    res.render('./articles/new', {articles: articles});
});

router.get(`/:slug`, async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    if (article == null) res.redirect('/');
    res.render('./articles/article', { articles: article});
})


router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect(''));

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect(''));

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;

        try{
            article = await article.save();
        
        }catch (e){
            if (e) {
                res.send('Hello');
            }
        }
        res.redirect(`/${path}`);
    }
}

module.exports = [
    router,
];