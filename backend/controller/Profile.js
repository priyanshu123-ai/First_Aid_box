import { Profile } from "../model/Profile.model.js";

export const ProfileDetail = async (req, res) => {
  try {
    const {FullName,DateOfBirth,email,phone,
      bloodGroup,
      Height,
      Weight,
      OrganDonor,
      Allergies,
      CurrentMedications,
      MedicalConditions,
      InsuranceProvider,
      PolicyNumber,
      contactDetails,
    } = req.body;

    if (!FullName || !DateOfBirth || !email || !phone || !bloodGroup) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProfile = await Profile.create({
      FullName,
      DateOfBirth,
      email,
      phone,
      bloodGroup,
      Height,
      Weight,
      OrganDonor,
      Allergies,
      CurrentMedications,
      MedicalConditions,
      InsuranceProvider,
      PolicyNumber,
      contactDetails,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: newProfile,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error while creating profile",
      error: error.message,
    });
  }
};


export const profileDetailById = async(req,res)=>{
   try {
     const {id} = req.params;

    const UserDetail = await Profile.findById(id);

    if(!UserDetail){
        return res.status(401).json({
            success:false,
            message:"User Detail not found",
            
        })
    }

    return res.status(200).json({
        success:true,
        message:"User Data Get",
        UserDetail
    })
    
   } catch (error) {
     console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error while Get profile",
      error: error.message,
    });
    
   }
}
