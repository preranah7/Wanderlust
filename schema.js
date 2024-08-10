const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().trim().required(),
        description : Joi.string().trim().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("",null),
        location : Joi.string().trim().required(),
        country : Joi.string().trim().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required().trim()
    }).required()
});