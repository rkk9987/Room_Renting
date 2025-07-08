const userRouter = require("express").Router();
const {
  userRegisterAuthentication,
  userLoginAuthentication,
  getUserAuthenticate,
  verifyRole,
} = require("../middlewares/user.middleware");
const {
  userDelete,
  userLogin,
  userRegister,
  userProfile,
  getAdmin,
  getUser,
  userPatch,
  leaveRoom,
} = require("../controllers/user.controller");

userRouter.post("/login", userLoginAuthentication, userLogin);
userRouter.post("/register", userRegisterAuthentication, userRegister);
userRouter.get("/profile/:id", getUserAuthenticate, userProfile);
userRouter.delete("/delete/:id", getUserAuthenticate, userDelete);
userRouter.patch("/patch/:id", getUserAuthenticate, userPatch);
userRouter.patch("/patch/leaveRoom/:id", getUserAuthenticate, leaveRoom);
userRouter.post("/admin", getUserAuthenticate, verifyRole("admin"), getAdmin);
userRouter.get(
  "/rooms",
  getUserAuthenticate,
  verifyRole("admin", "manager"),
  getUser
);

module.exports = userRouter;
