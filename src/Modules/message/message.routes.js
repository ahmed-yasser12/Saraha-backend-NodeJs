import { Router } from "express";
import { asyncHandling } from "../../utils/errorhandling.js";
import * as msgCr from './message.controller.js'
import { isAuth } from "../../middelwares/auth.js";

const router=Router();
router.post('/sendMsg',asyncHandling(msgCr.sendMessage))
router.get('/getMsg', isAuth() ,asyncHandling(msgCr.getMessage))
router.delete('/deleteMsg/:msgId', isAuth() ,asyncHandling(msgCr.deleteMessage))
export default router