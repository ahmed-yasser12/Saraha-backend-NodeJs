import { Router } from "express";
import * as uc from './users.controller.js'
import { asyncHandling } from "../../utils/errorhandling.js";
import { isAuth } from "../../middelwares/auth.js";
import {  validationCoreFunc } from "../../middelwares/validation.js";
import { signIn, signUp } from "./users.validationSchema.js";
import { allowedExtensions, multerFunc } from "../../services/multerlocally.js";
const router=Router(); 
router.post('/signUp', validationCoreFunc(signUp) ,asyncHandling(uc.signUp))
router.post('/signIn', validationCoreFunc(signIn),asyncHandling(uc.signIn))
router.get('/confirmEmail/:token', asyncHandling(uc.confirmEmail))
router.put('/updateProfile', isAuth() ,asyncHandling(uc.updateProfile))
router.get('/getUserProfile', asyncHandling(uc.getUserProfile))
router.post('/filePic',isAuth(),multerFunc(allowedExtensions.images ,'/user/profile').single('profileJ'), asyncHandling(uc.profilePicture))
router.post('/coverPic',isAuth(),multerFunc(allowedExtensions.images ,'/user/cover').array('profileJ'), asyncHandling(uc.CoverPictures))

export default router
