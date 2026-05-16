import express from 'express';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {registerReportController, getOrderReportController, getAllReportController, reportStatusController} from '../controllers/reportController.js';
const router=express.Router()

///routes
router.post('/report-order',requireSignIn,registerReportController)

///GET SINgle product
router.get('/get-all-report/',requireSignIn,isAdmin,getAllReportController);

router.post('/report-order-status/:oid',requireSignIn,isAdmin, reportStatusController);

router.get('/get-order-report/:oid', requireSignIn, getOrderReportController);

export default router;