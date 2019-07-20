const express = require('express')
const router = express.Router()
const path = require('path')
const adminController = require('../controllers/admin')


router.get('/add-product',adminController.getAddProducts);

router.get('/edit-product/:productId', adminController.getEditProducts);

router.post('/add-product',adminController.postAddProducts);
router.post('/edit-product', adminController.postEditProducts);
router.post('/delete-product',adminController.postDeleteProducts);

router.get('/products', adminController.listProducts);

module.exports = router