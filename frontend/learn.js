var backPack = {
  color: { 2323: "black", 2434: "silver" },
  size: { 34: "do", 43: "dodo", 35: "dododo" },
};

Object.keys(backPack).map((key, index) => {
  Object.keys(backPack.color).map((value) => {
    console.log(value);
  });
});
