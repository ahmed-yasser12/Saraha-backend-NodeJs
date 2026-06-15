// error handling 

export const asyncHandling = (api) => {
    return (req, res, next) => {
        api(req, res, next).catch((err) => {
            res.json({ message: "fail request !",error: err.message ,stack: err.stack })
        })
    }
}