import User from "../models/UserModel.js";
import UserServices from "../services/UserServices.js";
import { refreshTokenService } from "../utils/token.js";

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, isAdmin } = req.body;

        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: "error",
                message: "Tất cả các trường đều là bắt buộc!",
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Email không hợp lệ!",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                status: "error",
                message: "Mật khẩu xác nhận không khớp!",
            });
        }

        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "Email đã được sử dụng!",
            });
        }
        // Gửi dữ liệu sang service để tạo user
        const result = await UserServices.CreateUser({
            name,
            email,
            password,
            phone,
            isAdmin
        });    
        return res.status(201).json(result);
    } catch (e) {
        return res.status(500).json({
            status: "error",
            message: "Lỗi server: " + e.message,
        });
    }
};
const loginUser = async(req,res) =>{
   try{
    const {email , password} = req.body;
    if(!email|| !password){
        return res.status(400).json({
                status: 'error',
                message: 'Email và mật khẩu là bắt buộc!',
            });
    }
     const result = await UserServices.LoginUser(email, password);
        if (result.status === 'error') {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
   } catch(e){
    return res.status(500).json({
            status: 'error',
            message: 'Lỗi server: ' + e.message,
        });
    }

   }
const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
       const result = await UserServices.updateUser(id ,req.body);
       if (result.status === "error") {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);     
    } catch (e) {
        return res.status(500).json({
            status: "error",
            message: "Lỗi server: " + e.message,
        });
    }
};
 const deleteUser = async (req, res) => {
    try {
       const { id } = req.params;
       console.log(id);

        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Thiếu ID người dùng!',
            });
        }

        const result = await UserServices.deleteUser(id);

        if (result.status === "error") {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);    
    } catch (e) {
        return res.status(500).json({
            status: "error",
            message: "Lỗi server: " + e.message,
        });
    }
};

 const getAllUsers = async (req, res) => {
    try {
        const users= await UserServices.getAllUser();
        return res.status(200).json({
            status: "success",
            results: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
const getUserDetail = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await UserServices.getUserById(id);

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        return res.status(200).json({ status: "success", data: user });
    } catch (error) {
        console.error("Error in getUserDetail Controller:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

export const refreshToken = async (req, res) => {
    try {
       const refreshToken = req.headers.authorization?.split(" ")[1];


        if (!refreshToken) {
            return res.status(401).json({
                 status: "error", 
                 message: "No refresh token provided" });
        }

        const response  = await refreshTokenService(refreshToken);
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({ status: "error", message: "Refresh token expired or invalid" });
    }
};


export default {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserDetail,
   refreshToken,

};
