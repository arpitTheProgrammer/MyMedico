const docUser = require('../modals/docUser')
const patUser = require('../modals/patUser')
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'arpit@2005'

const HandledocSignup = async(req, res) => {
    const varificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    try{
        const {docFullName, hospitalName, email, password} = req.body;
        const newUser = await docUser.create({
            docFullName,
            hospitalName,
            email,
            password,
            varificationCode
        })
        console.log(newUser)
        return res.json({message: "SUCCESS"})
    } catch(err){
        return res.json({message: "FAILED TO REGISTER"})
    }
}

const HandledocLogin = async(req, res) => {
    try{
        const {email, password, docFullName, hospitalName, isLoggedin} = req.body;
        const user = await docUser.findOne({
            email
        })
        if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
        } 
        user.isLoggedin = true;
        await user.save();
        const token = jwt.sign({id: user._id, email: user.email, docFullName: user.docFullName, hospitalName: user.hospitalName, docPhoneNumber: user.docPhoneNumber, docLocation: user.docLocation, specialization: user.specialization, docBiography: user.docBiography}, SECRET_KEY, {expiresIn: '1h'})
        return res.status(200).json({message: "SUCCESSFULLY LOGGEDIN", token,
      user: {
        id: user._id,
        email: user.email,
        docFullName: user.docFullName,
        hospitalName: user.hospitalName,
        docPhoneNumber: user.docPhoneNumber,
        docLocation: user.docLocation,
        specialization: user.specialization,
        docBiography: user.docBiography
      }})
    } catch(err){
        return res.json({message: "Error to find user", err})
    }
}

const HandlePatSignup = async(req, res) => {
    const {fullName, phoneNumber} = req.body;
    try{
        const newUser = await patUser.create({
            fullName,
            phoneNumber
        })
        console.log(newUser);
        return res.status(201).json({message: "PATIENT REGISTER SUCCESSFULLY"})   
    } catch(err){
        return res.status(400).json({message: "UNABLE TO SAVE PATIENT DETAIL"})
    }
}

const HandlePatLogin = async(req, res) => {
    try {
        const {fullName, phoneNumber} = req.body;
        const user = await patUser.findOne({phoneNumber})
        if(!user){
            return res.status(400).json({message: "THIS NUMBER IS NOT REGISTERED"})
        }
        user.isLoggedin = true;
        await user.save();
        const token = jwt.sign({fullName: user.fullName, id: user._id, phoneNumber: user.phoneNumber}, SECRET_KEY, {expiresIn: '1h'})
        return res.status(200).json({
            message: "PATIENT LOGIN SUCCESSFUL",
            token,
            user: {
                id: user._id,
                fullName: user.patName || user.fullName,
                phoneNumber: user.phoneNumber,
                patLocation: user.patLocation,
                patGender: user.patGender,
                email: user.email
            }
        });
    } catch(err){
        return res.status(400).json({message: "UNABLE TO LOGIN PATIENT"})
    }
}

const HandleUpdatePatUser = async (req, res) => {
    try{
        const{fullName, phoneNumber, patLocation, patGender, isLoggedin, email } = req.body;
        const user = await patUser.findOne({phoneNumber})
        if(!user){
            return res.status(400).json({message: "User Not Found"})
        }
    if (fullName) user.fullName = fullName;
    if (patLocation) user.patLocation = patLocation;
    if (patGender) user.patGender = patGender;
    if (email) user.email = email;
    if (typeof isLoggedin !== "undefined") user.isLoggedin = isLoggedin;
        await user.save();
        return res.status(200).json({message: "USER UPDATED"})
    } catch(err) {
        return res.status(400).json({message: "Unable to Update User", err})
    }
}
const HandleLogout = async(req, res) => {
    try{
        const {email} = req.body;
        const user = await docUser.findOne({email})
        if(!user){
            res.status(400).json({message: "USER NOT FOUND"})
        } else {
            user.isLoggedin = false;
            await user.save();
            return res.status(200).json({message: "LOGOUT SUCCESSFULL"})
        }
    } catch(err){
        console.log("SOMETHNG WENT WRONG!", err);
    }
}

const HandlePatLogout = async(req, res) => {
    try{
        const {phoneNumber} = req.body;
        const user = await patUser.findOne({phoneNumber})
        if(!user){
            return res.status(400).json({message: "USER NOT EXISTS"})
        }
        user.isLoggedin = false;
        await user.save();
        return res.status(200).json({message: "LOGOUT SUCCESSFULLY"})
    } catch(err){
        console.log("SOMETHING WENT WRONG", err);
    }
}
const HandleUpdate = async(req, res) => {
    try{
        const{email, specialization, docLocation, docPhoneNumber, docBiography} = req.body;
        const user = await docUser.findOne({
            email
        })
        if(!user) {
            return res.status(400).json({message: "USER NOT EXIST"})
        }
        user.specialization = specialization
        user.docLocation = docLocation
        user.docPhoneNumber = docPhoneNumber 
        user.docBiography = docBiography
        await user.save();
        return res.status(200).json({user})
    } catch(err){
        return res.status(400).json({message: "UNABLE TO UPDATE USER", err})
    }
}
module.exports = {
    HandledocSignup,
    HandledocLogin,
    HandlePatSignup,
    HandlePatLogin,
    HandleLogout,
    HandleUpdate,
    HandlePatLogout,
    HandleUpdatePatUser
}