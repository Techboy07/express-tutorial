import { Router } from "express";

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: "Whole Foods",
    miles: 0.6,
  },
  {
    id: 2,
    store: "Albertons",
    miles: 2.5,
  },
  { id: 3, store: "Trader Joes", miles: 2.8 },
  {
    id: 4,
    store: "Trader Joes",
    miles: 3.5,
  },
  {
    id: 5,
    store: "Albertons",
    miles: 1.8,
  },
];

router.get("/", (req, res) => {
  const { miles } = req.query;
  const parsedMiles = Number(miles);
  if (!isNaN(parsedMiles)) {
    const filteredStores = supermarkets.filter((s) => s.miles <= parsedMiles);
    res.send(filteredStores);
  } else res.send(supermarkets);
});

export default router;
