import User from "../models/UserModel.js";
import UserServices from "../services/UserServices.js";

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



export default {
    createUser,
    loginUser,
};
