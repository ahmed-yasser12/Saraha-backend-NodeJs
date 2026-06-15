

let reqMethods=['body','query','params','file','files','header'];

export const validationCoreFunc=(schema)=>{
    return (req,res,next)=>{
        const validationError=[]
        for (const key of reqMethods) {
            if(schema[key]){
                const valiationResult=schema[key].validate(req[key],{abortEarly:false})
                if(valiationResult.error){
                    validationError.push(valiationResult.error.details)
                }
            }
        }
        if(validationError.length){
            return res.status(500).json({message:"validation Error",errors:validationError})
        }
         next();
    }
}
