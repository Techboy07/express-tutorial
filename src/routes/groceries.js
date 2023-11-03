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

export default router;
