import Cart from "./cart.model.js";

const findCartByUserId = async (userId) => Cart.findOne({ userId });

const upsertCartByUserId = async (userId, data) =>
  Cart.findOneAndUpdate({ userId }, data, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  });

const saveCart = async (cart) => cart.save();

const deleteCartItemsByUserId = async (userId) =>
  Cart.findOneAndUpdate({ userId }, { $set: { items: [] } }, { new: true, runValidators: true });

export { findCartByUserId, upsertCartByUserId, saveCart, deleteCartItemsByUserId };
