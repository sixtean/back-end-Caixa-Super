import { Router } from "express";
import { userRegister } from "../controllers/userRegister.controler";
import { verificarCodigo } from "../controllers/userVerify.controler";
import { loginUsuario } from "../controllers/userLogin.controler";


const router = Router();

router.post('/register', userRegister)
router.post('/verify-code', verificarCodigo);
router.post('/login', loginUsuario);

export default router;