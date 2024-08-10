const mongoose = require('mongoose')
const connect  = async(url)=>{
    try {
        await mongoose.connect(url).
        then(()=>console.log('db connected')).
        catch((e)=>console.log('db not connected',e))
    } catch (error) {
        console.error({message:"db not connected",
            error
        })
        process.exit(0)
    }
}
module.exports = connect