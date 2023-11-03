import express from "express";
const PORT = 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`server starter at port ${PORT}`);
});

app.get("/groceries", (req, res) => {
  res.send([
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
  ]);
});
