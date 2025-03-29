const item = require('../models/item');
const Item = require('../models/item');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items });
    console.log('Items fetched:', items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send('Error fetching items');
  }
};

exports.addItem = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.redirect('/');
    await new Item({ name }).save();
    res.redirect('/');
    console.log('Item added:', name);
  } catch (err) {
    console.error('Error adding item', err);
    res.status(500).send('Error adding item');
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedItem = await Item.findByIdAndDelete(id);
    res.redirect('/');
    console.log('Item deleted:', deletedItem);
  } catch (err) {
    res.status(500).send('Error deleting item');
  }
}
exports.updateItem = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!name) return res.redirect('/');

    const updatedItem = await Item.findByIdAndUpdate(id, { name }, { new: true });
    console.log('Item updated:', updatedItem);
    res.redirect('/');
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).send('Error updating item');
  }
};
