import Product from '../models/ProductModel.js';



const CreateProduct = async (newProduct) => {
    const { name, image, type, price, countInStock, rating, description,discount,selled } = newProduct;

    const checkProduct = await Product.findOne({ name });
    if (checkProduct) {
        return {
            status: "error",
            code: 400,
            message: "Sản phẩm đã tồn tại!"
        };
    }

    const createdProduct = await Product.create({
        name, image, type, price, countInStock, rating, description,discount,selled
    });

    return {
        status: "success",
        code: 201,
        data: createdProduct
    };
};
const updateProduct = async (id, data) => {
    try {    
        const allowedFields = ['name', 'image', 'type', 'price', 'countInStock', 'rating', 'description','discount' , 'selled'];
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => allowedFields.includes(key) && value !== undefined)
        );
        const updatedProduct = await Product.findByIdAndUpdate(id, { $set: filteredData }, { new: true });
        if (!updatedProduct) {
            return {
                status: "error",
                code: 404,
                message: "Không tìm thấy sản phẩm!",
            };
        }
        return {
            status: "success",
            code: 200,
            message: "Cập nhật sản phẩm thành công!",
            data: updatedProduct,
        };

    } 
    catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        return {
            status: "error",
            code: 500,
            message: "Đã xảy ra lỗi khi cập nhật sản phẩm: " + error.message,
        };
    }
};
const getProductDetail = async (id) => {
    try {
        const product = await Product.findById(id, ); 
        return product;
    } catch (error) {
        console.error("Error in getUserById Service:", error);
        throw error;
    }
};
const deleteProduct = async(id)=>{
    try{
        const product = await Product.findById(id);
        if (!product) {
            return {
                status: "error",
                message: "Không tìm thấy san pham để xoá!",
            };
        } 
        await product.deleteOne();

        return {
           
            status: "OK",
            message: "Xoá san pham thành công!",
        };  
    }catch{
        throw e;
    }
};
const deleteProductmany = async (ids) => {
    try {
        const result = await Product.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return {
                status: "error",
                message: "Không tìm thấy sản phẩm nào để xoá!",
            };
        }

        return {
            status: "OK",
            message: `Đã xoá ${result.deletedCount} sản phẩm thành công!`,
        };
    } catch (e) {
        throw e;
    }
};

const getAllProduct = async () => {
    try {
        const product = await Product.find({}, "-password"); 
        
        return {
            status: "success",
            code: 200,
            message: "in ra tat ca san pham!",
            data: product,
        };
    } catch (error) {
        console.error("Error in getAllProduct Service:", error);
        throw error; 
    }
};
const getPaginatedProducts = async ({ page, limit, sortParam, search ,type  } ) => {
    try {
let filter = {};
     if (search) {
       filter.name = { $regex: search, $options: 'i' };
      }
      if (type) {
      filter.type = type; 
    }


  let sortOption = {};
  if (sortParam) {
    const [field, order] = sortParam.split(',');
    if (field && order) {
      sortOption[field] = order === 'desc' ? -1 : 1;
    }
  } 
  const totalProduct = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(page * limit)
    .limit(limit);

        return {
            status: "success",
            code: 200,
            message: "",
            data: products,
            toul : totalProduct,
            pageCurrent : Number(page + 1) ,
            totalPage : Math.ceil( totalProduct / limit),


        };
    } catch (error) {
        console.error("Error in getAllProduct Service:", error);
        throw error; 
    }
};
export const getProductTypes = async (req, res) => {
  try {
    const types = await Product.distinct("type"); 
   return  types ;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
    CreateProduct,
    updateProduct,
    getProductDetail,
    deleteProduct,
    getAllProduct,
    getPaginatedProducts,
    deleteProductmany,
    getProductTypes,
    
};
