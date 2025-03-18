import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const CreateUser = async (userData) => {
    try {
        const { name, email, password, phone, isAdmin } = userData;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            isAdmin: isAdmin || false,
        });

        const savedUser = await newUser.save();

        return {
            status: "success",
            message: "Tạo tài khoản thành công!",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                phone: savedUser.phone,
                isAdmin: savedUser.isAdmin,
            },
        };
    } catch (e) {      
        throw e;
    }
};
const LoginUser = async(email,password)=>{
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return {
                status: 'error',
                message: 'Email không tồn tại!',
            };
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                status: 'error',
                message: 'Mật khẩu không đúng!',
            };
        }
         const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            'your_secret_key', 
            { expiresIn: '1d' }
        );
         return {
            status: 'success',
            message: 'Đăng nhập thành công!',
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
            },
        }

    }catch{

    }
}

export default {
    CreateUser,
    LoginUser,
};
