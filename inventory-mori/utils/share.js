const product = require("../models/product");
const user = require("../models/user");

const updateProductWhenAddConsume = async (consume) => {
  if (user.findById(consume.userid) != null) {
    consume.productsUsed.forEach(async (element) => {
      const productid = element.productid;
      const foundproduct = await product.findById(productid);

      if (foundproduct) {
        const newQTY = foundproduct.QTY - element.amount;
        await foundproduct.updateOne({ QTY: newQTY });

        return true;
      } else {
        //throw Error("not valid product ID");
        console.log("not valid product ID for PUT/consume/");
        return false;
      }
    });
  } else {
    //throw Error("not valid User ID");
    console.log("not valid User ID PUT/consume/");
    return false;
  }
};

const updateProductWhenDeleteUse = async (consume) => {
  const productUsed = consume.productsUsed;

  productUsed.forEach(async (element) => {
    const foundProduct = await product.findById(element.productid);
    const newQTY = foundProduct.QTY + element.amount;

    await foundProduct.updateOne({ QTY: newQTY });
  });
};

module.exports = { updateProductWhenAddConsume, updateProductWhenDeleteUse };
