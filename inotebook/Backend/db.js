const mongooes=require('mongoose');
const mongoURL="mongodb://localhost:27017/iNotebook?readPreference=primary&directConnection=true"

const connectToMongo=()=>{
    mongooes.connect(mongoURL,()=>{
        console.log("connected to mongo successfuly");
    })
}

module.exports=connectToMongo;