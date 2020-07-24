const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const createDomPurify = require('dompurify')            // calling the function for the dom purifier
const { JSDOM } = require('jsdom')                      // this is a way to just get this portion of the jsdom object
const dompurify = createDomPurify(new JSDOM().window)



const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function (next) {
    if(this.title){
        this.slug = slugify(this.title, {
            lower : true,
            strict : true
        })
    }

    if (this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }

    next()
})

// registering that now we have a model table called article
// and schema will be the articleSchema object
module.exports = mongoose.model('Article', articleSchema)