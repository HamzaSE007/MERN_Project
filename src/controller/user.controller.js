import { upload } from '../middlewares/multer.middleware.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinaryUplaod.js'


const userRegister = asyncHandler( async (req,res) => {
    // Get data from frontend

    const { fullName, email, password, username } = req.body

    // check validation -- not empty

    if(
        [fullName,email,password,username].some( (filed) => filed?.trim() === "")
    ){
        throw new ApiError(400, "Please put required fields")
    }

    // Check if user already exist in DB

    const existedUser = await User.findOne(
        {
            $or: [{ username: username },{ email: email }]
        }
    )

    if(existedUser){
        throw new ApiError(409, "User already exists with email or username")
    }

    // check images and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path; 

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is reqired")
    }

    // Upload images and avatar on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    // Create entry in DB

    const user = await User.create(
        {
            fullName,
            email,
            password,
            username: username.toLowerCase(),
            avatar: avatar.url,
            coverImage: coverImage?.url || ""
        }
    )

    // Remove passwor and refresh Token flieds from response

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,"user registered successfully")
    )

})

export { userRegister }