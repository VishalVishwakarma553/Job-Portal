import Company from "../models/company.model.js";
import cloudinary from "../lib/cloudinary.js"
import getDataUri from "../utils/datauri.js"
//Create the company
export const createCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    const userId = req.id;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
      });
    }
    const company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company with this name already exist",
      });
    }
    const newCompany = new Company({ name: companyName, userId });
    await newCompany.save();
    return res.status(200).json({
      message: "Company created successfully",
      newCompany,
    });
  } catch (error) {
    console.log("Error in creating company", error);
  }
};
//get allcompany that the logined user created
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({ message: "No any company is created" });
    }
    return res.status(200).json({ companies });
  } catch (error) {
    console.log("Error in getting company", error);
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company does not exist with this id",
      });
    }
    return res.status(200).json({ company });
  } catch (error) {
    console.log(error);
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const companyId = req.params.id;
    const file = req.file
    //cloudinary setup remaining -->Completed
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    
    const company = await Company.findByIdAndUpdate(
      companyId,
      { name, description, website, location, logo: cloudResponse.secure_url },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
    return res
      .status(200)
      .json({ message: "Company information updated successfully", company });
  } catch (error) {
    console.log("Error in update Compnay controller", error);
  }
};
