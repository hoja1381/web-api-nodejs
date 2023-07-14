const product = require("../models/product");
const user = require("../models/user");

const updateProductWhenAddConsume = async (consume, updatedProduct) => {
  if (user.findById(consume.userid) != null) {
    consume.productsUsed.forEach(async (element) => {
      const productid = element.productid;
      const foundproduct = await product.findById(productid);

      if (foundproduct) {
        let newQTY;
        if (element.purchase) {
          newQTY = +foundproduct.QTY + +element.amount;
        } else {
          newQTY = +foundproduct.QTY - +element.amount;
        }

        await foundproduct.updateOne({ QTY: newQTY });
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
  return true;
};

const updateProductWhenDeleteUse = async (consume) => {
  const productUsed = consume.productsUsed;

  productUsed.forEach(async (element) => {
    let newQTY;
    const foundProduct = await product.findById(element.productid);
    if (element.purchase) {
      newQTY = +foundProduct.QTY - +element.amount;
    } else {
      newQTY = +foundProduct.QTY + +element.amount;
    }
    await foundProduct.updateOne({ QTY: newQTY });
  });
};

module.exports = { updateProductWhenAddConsume, updateProductWhenDeleteUse };
