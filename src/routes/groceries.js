import { Router } from "express";

const router = Router();

const groceriesList = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 1,
  },
  {
    item: "pop-tarts",
    quantity: 3,
  },
];

router.get("/", (req, res) => {
  res.cookie("visited", true, {
    maxAge: 10000,
  });
  res.send(groceriesList);
});

router.get("/:item", (req, res) => {
  const { item } = req.params;
  console.log(req.params);
  const groceryItem = groceriesList.find((g) => g.item === item);
  res.status(200).send(groceryItem);
});

router.post("/", (req, res) => {
  console.log(req.body);
  groceriesList.push(req.body);
  res.sendStatus(201);
});

router.get("/shopping/carts", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("you have no cart session");
  } else {
    res.send(cart);
  }
});

router.post("/shopping/carts/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  console.log(cartItem);
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.status(200).send(req.session /*req.sessionID*/);
});
export default router;
