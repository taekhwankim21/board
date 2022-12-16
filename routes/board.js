// express에서 제공되는 Router 함수를 사용해 Router를 생성합니다.
const express = require('express');
const board = require('../schemas/boardSc');
const router = express.Router();

// const goods = [
//   {
//     goodsId: 4,
//     name: "상품 4",
//     thumbnailUrl:
//       "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
//     category: "drink",
//     price: 0.1,
//   },
// ];

// 상품 목록 조회 API
// ({"goods":goods}) > ({goods}) 만 써도됨
router.get("/board", async (req,res) => {
  res.status(200).json({"board":board})
});

// 상품 상세 조회 API
router.get("/board/:boardId", async (req,res) => {
  const {boardId} = req.params;
  const [detail] = board.filter((board) =>  Number(boardId) === board.boardId);
  res.status(200).json({detail});
})

router.post("/write", async(req,res) => {
  const {title, name, contents, passWord} = req.body;
  const boardId = await board.find({boardId});
  if (boardId.length){
    return res.status(400).json({
      success:false,
      errorMessage:"이미 장바구니에 존재합니다"
    })
  }

  await Cart.create({title, name, contents, passWord});

  res.json({result: "success"});
})

router.put("/board/:boardId/cart", async(req,res) => {
  const {boardId} = req.params;
  const {board} =req.body;

  const existsCarts = await Cart.find({boardId});
  if(existsCarts.length){
    await Cart.updateOne(
      {boardId: boardId},
      {$set: {board:board}}
    )
  }
  res.status(200).json({success:true});
})

router.delete("/board/:boardId", async(req,res) => {
  const {boardId} = req.params;

  const existsCarts = await Cart.find({boardId});
  if(existsCarts.length){
    await Cart.deleteOne({boardId});
  }

  res.json({result:"success"});
})

const board = require("../schemas/boardSc.js");
router.post("/board/", async (req,res) => {
  const {boardId, title, name, passWord, contents, day} = req.body;

  const board = await board.find({boardId});

  if (board.length) {
    return res.status(400).json({ 
      success: false, 
      errorMessage: "이미 있는 boardID입니다." 
    });
  }

  const createdBoard = await board.create({boardId, title, name, passWord, contents, day});

  res.json({ board: createdBoard });
});

// 작성한 Router를 app.js에서 사용하기 위해 하단에 내보내주는 코드를 추가합니다.
module.exports = router;