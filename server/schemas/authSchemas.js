const {z} = require("zod");

const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(10),
    username : z.string().min(2)
})

const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(10),
})

module.exports = {signupSchema,loginSchema};