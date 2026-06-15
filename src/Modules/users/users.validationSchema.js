import Joi from "joi";

export const signUp = {
    body: Joi.object({
        username: Joi.string().min(3).max(20).messages({ 'any.required': "username is required", "string.min": "UuserName is at least 3 " }),
        password: Joi.string().min(6).pattern(/^[A-za-z0-9]{4,}$/),
        email: Joi.string().email(),
        gender: Joi.string().valid("male", "female")
    }).options({ presence: 'required' })
}

export const signIn = {
    body: Joi.object({
        password: Joi.string().min(6).pattern(/^[A-za-z0-9]{4,}$/),
        email: Joi.string().email(),
    }).options({ presence: 'required' })
}