import User from "../models/user.model.js"
import brcyptjs from "bcryptjs"
import generateTokenandSetCookie from "../utils/generateToken.js"

export const signup = async(req, res)=>{
    try {
        const {fullName, username, password, gender} = req.body

        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({
                error: "Username already exists"
            })
        }

        // Hash password
        const salt = await brcyptjs.genSalt(10)
        const hashedPassword = await brcyptjs.hash(password, salt)


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic

        })

        if(newUser){
        // Generate JWT Token Here
        generateTokenandSetCookie(newUser._id, res)

        await newUser.save()

        res.status(201).json({
            message: "User created successfully",
            newUser
        })}
        else{
            res.status(400).json({
                error: "User not created"
            })
        }




    } catch (error) {
        console.log("Error in SignUp", error.message)
        res.status(500).json({
            error: "Internal server error"})

        
    }
}



export const login = async(req, res)=>{
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await brcyptjs.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenandSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			user
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}



export const logout = async(req, res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}