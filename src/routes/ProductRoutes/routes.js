import express from 'express';

import GetAllProducts  from '../../controllers/ProductControllers/GetAllProducts_Controller/GetAllProducts_Controller.js';
import GetOneProduct from '../../controllers/ProductControllers/GetOneProduct_Controller/GetOneProduct_Controller.js';
import CreateProduct  from '../../controllers/ProductControllers/CreateProduct_Controller/CreateProduct_Controller.js';
import UpdateProduct  from '../../controllers/ProductControllers/UpdateProduct_Controller/UpdateProduct_Controller.js';
import DeleteProduct  from '../../controllers/ProductControllers/DeleteProduct_Controller/DeleteProduct_Controller.js';

import ProductValidator from '../../middlewares/ValidationMiddlewares/ProductValidation.js';
import IsValidObjectId_Middleware from '../../middlewares/ValidationMiddlewares/IsValidObjectId.js';
import AuthenticatedOnly_Middleware from '../../middlewares/SignIn_Middleware/AuthenticatedOnly_Middleware/AuthenticatedOnly_Middleware.js';
import AdjustPrice from '../../controllers/ProductControllers/AdjustPrice_Controller/AdjustPrice_Controller.js';
import UploadProductImage_Controller from '../../controllers/UploadController/UploadController.js';
import { DeleteProductImages_Controller } from '../../controllers/UploadController/UploadController.js';
import uploadMiddleware from '../../utils/uploader/uploader.js';

const router = express.Router();

router.get("/all", GetAllProducts);
router.get("/:id", IsValidObjectId_Middleware ,GetOneProduct);
router.post("/add", AuthenticatedOnly_Middleware , ProductValidator, CreateProduct);
router.post("/adjust-price/:id", AuthenticatedOnly_Middleware, IsValidObjectId_Middleware, AdjustPrice);
router.patch("/update/:id", AuthenticatedOnly_Middleware , ProductValidator, IsValidObjectId_Middleware , UpdateProduct);
router.delete("/delete/:id", AuthenticatedOnly_Middleware , IsValidObjectId_Middleware, DeleteProduct);
router.post("/upload-image", AuthenticatedOnly_Middleware, uploadMiddleware, UploadProductImage_Controller);
router.delete("/delete-images", AuthenticatedOnly_Middleware, DeleteProductImages_Controller);

export default router;