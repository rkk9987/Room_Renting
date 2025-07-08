const roomRouter = require("express").Router();
const {
  getUserAuthenticate,
  verifyRole,
} = require("../middlewares/user.middleware");
const { roomAuthentication } = require("../middlewares/room.middleware");

const {
  getRoom,
  postRoom,
  patchRoom,
  delRoom,
  patchRoomOwner,
} = require("../controllers/room.controller");

roomRouter.get(
  "/",

  getRoom
);
roomRouter.post(
  "/",
  getUserAuthenticate,
  verifyRole("admin", "manager"),
  roomAuthentication,
  postRoom
);
roomRouter.patch(
  "/:id",
  getUserAuthenticate,
  verifyRole("admin", "manager"),

  patchRoom
);
roomRouter.patch("/logged/:id", getUserAuthenticate, patchRoomOwner);
roomRouter.delete(
  "/:id",
  getUserAuthenticate,
  verifyRole("admin", "manager"),
  delRoom
);

module.exports = roomRouter;
