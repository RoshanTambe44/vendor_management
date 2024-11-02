import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        lowercase: true
    },
    type:{
        type : String
    },
    criticality:{
        type : String
    },
    status : {
       type : String
    },
    email : {
        type: String,
    },
    serviceProvided:{
        type:String,

    }
},{timestamps:true})


 const vendor = mongoose.models.vendors || mongoose.model("vendors", vendorSchema);


 export default vendor;
