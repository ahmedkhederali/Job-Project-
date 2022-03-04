const express=require('express')
const router=express.Router()
const {register,login}=require('../controllers/auth')



router.post("/login",login);
router.post("/register",register)

// ----------------------------way1----------------------------------------
// router.get("/",getAllTask)
// router.post("/",postTask)
// router.get("/:id",getSingleTask)
// router.patch("/:id",updateTask)
// router.delete("/:id",deleteTask)

//------------------------------way2-------------------------------------------------
//router.route('/').get(getAllTask).post(postTask)
//router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask).put(editTask)
module.exports=router