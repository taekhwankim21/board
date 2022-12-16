const express = require("express");

const Board = require("../schemas/boardSc");
const Cart = require("../schemas/cart");
const router = express.Router();

router.get("/carts", async (req, res) => {
  const carts = await Cart.find();
  const boardIds = carts.map((cart) => {
    return cart.boardId;
  })

  const Board = await Board.find({ boardId: boardId });
  // Goods에 해당하는 모든 정보를 가지고 올건데,
  // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회하라.

  const results = carts.map((cart) => {
		return {
			"quantity": cart.quantity,
			"Board": Board.find((item) => item.boardId === cart.boardId)
		};
  });

  res.json({
    "carts": results,
  });
});

module.exports = router;