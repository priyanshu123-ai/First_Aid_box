import mongoose from "mongoose"

const ContactDetailSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    relation:{
        type:String,
        
    }

})


const ProfileSchema = new mongoose.Schema({

    
    FullName:{
        type:String,
        required:true
        
    },

    DateOfBirth:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    Height:{
        type:String
    },
    Weight:{
        type:String
    },
    OrganDonor:{
        type:String
    },
    Allergies:{
        type:String
    },
    CurrentMedications:{
        type:String
    },
    MedicalConditions:{
        type:String
    },
    contactDetails:{
        type:[ContactDetailSchema],
        default:[]
    },
    InsuranceProvider:{
        type:String,
        
    },
    PolicyNumber:{
        type:String,
       
    }
})


export const Profile = mongoose.model("Profile",ProfileSchema)

