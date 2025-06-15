

import Product from '../services/ProductServices.js'


const createProduct = async (req, res) => {

      try {
    const { name, image, type, price, countInStock, rating, description,discount ,selled} = req.body;
     console.log( name,image, type, price, countInStock, rating, description);


   if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Vui lòng chọn ảnh sản phẩm!",
      });  
    }
    if (!name  || !type || !price || !countInStock || !rating) {
        return res.status(400).json({
            status: "error",
             code: 400,
            message: "Vui lòng nhập đầy đủ thông tin sản phẩm!",
        });
    }
     let productImage =`/api/v1/Product/${req.file.filename}`; 

    

     const newProduct = {
      name,
      image: productImage,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
    };


    
        const response = await Product.CreateProduct(newProduct);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            status: "error",
            message: "Lỗi server: " + e.message,
        });
    }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Không có ID sản phẩm',
      });
    } 
    const updateData = { ...req.body };    
    if (req.file) {
      updateData.image = `/api/v1/Product/${req.file.filename}`; 
    }   
    const result = await Product.updateProduct(id, updateData);

    if (result.status === 'error') {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const getProductDetail = async (req, res) => {
    try {
        const  id  = req.params.id; 
        

        if (!id) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        const result = await Product.getProductDetail(id);
        return res.status(200).json(result);

      
    } catch (error) {
        console.error("Error in getUserDetail Controller:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
       const { id } = req.params;
       

        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Thiếu ID người dùng!',
            });
        }
        const result = await Product.deleteProduct(id);
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
const deleteProductmany = async (req, res) => {
    try {
       
       const {ids}   = req.body;
       console.log("IDs nhận được:", ids);

        if (!ids) {
            return res.status(400).json({
                status: 'error',
                message: 'Thiếu mảng ID người dùng!',
            });
        }
        const result = await Product.deleteProductmany(ids);
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
 const getAllProduct = async (req, res) => {
    try {
        const product= await Product.getAllProduct();
        return res.status(200).json({
            status: "success",
            results: product.length,
            data: product,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
 const getPaginatedProducts = async (req, res) => {
    try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const sortParam = req.query.sort || '';
    const search = req.query.search || '';
    const type = req.query.type || '';
      const  result  = await  Product.getPaginatedProducts(
        {
           page,
           limit,
           sortParam,
           search, 
           type
        }
      );


       // const product= await Product.getPaginatedProducts(Number(limit)|| 8,Number(page)||0);
          return res.status(200).json({
      status: "success",
      results: result.data.length,
      pageCurrent: result.pageCurrent,
      totalPage: result.totalPage,
      total: result.toul,
      data: result.data,
    });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
const getAlltype = async (req, res) => {
    try {
    
      const  result  = await  Product.getProductTypes();
    return res.status(200).json({
      status: "success",
      results: result.length,
      data: result,
    });
    } catch (error) {
        console.error('Lỗi lấy types:', error);
        console.log('lôi o day a')
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
 
export default {
    createProduct,
    updateProduct,
  getProductDetail,
  deleteProduct,
  getAllProduct,
  getPaginatedProducts,
  deleteProductmany,
  getAlltype,
};
