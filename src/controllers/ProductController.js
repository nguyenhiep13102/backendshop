

import Product from '../services/ProductServices.js'


const createProduct = async (req, res) => {

      try {
    const { name, image, type, price, countInStock, rating, description } = req.body;

    if (!name || !image || !type || !price || !countInStock || !rating) {
        return res.status(400).json({
            status: "error",
             code: 400,
            message: "Vui lòng nhập đầy đủ thông tin sản phẩm!",
        });
    }

    
        const response = await Product.CreateProduct(req.body);
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
        const {id} = req.params;
        if (!id){
             return res.status(400).json({
            status: "error",
             code: 400,
            message: "khong co id san pham",
        });
        }
       const result = await Product.updateProduct(id ,req.body);
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
    const limit = parseInt(req.query.limit) || 10;
    const sortParam = req.query.sort || '';
    const search = req.query.search || '';
      const  result  = await  Product.getPaginatedProducts(
        {
           page,
           limit,
           sortParam,
           search, 
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
 
export default {
    createProduct,
    updateProduct,
  getProductDetail,
  deleteProduct,
  getAllProduct,
  getPaginatedProducts,
};
