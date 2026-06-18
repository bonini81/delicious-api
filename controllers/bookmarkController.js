const Bookmark = require('../models/Bookmark');

exports.getAll = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const { url, title, description, tags, category } = req.body;
    if (!url || !title)
      return res.status(400).json({ message: 'URL and title required' });

    const bookmark = await Bookmark.create({ user: req.user.id, url, title, description, tags, category });
    res.status(201).json(bookmark);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });
    res.json(bookmark);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });
    res.json({ message: 'Bookmark deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
