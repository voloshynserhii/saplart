const Document = require("../../models/Document.model");

module.exports = async (req, res, next) => {
  const { userId, isPublished, filters, sortBy } = req.query;

  if (!userId && !!isPublished) {
    res.status(404);
  }
  const currentPage = req.query.page || 1;
  const perPage = 12;

  const query = userId ? { creator: userId } : { isPublished: true };

  try {
    const sorting = {}
    if(sortBy === 'asc' || sortBy === 'desc') {
      sorting.publishedAt = sortBy === 'asc' ? 1 : -1
    }
    if(sortBy === 'last' || sortBy === 'oldest') {
      sorting.updatedAt = sortBy === 'oldest' ? 1 : -1
    }
    if(sortBy === 'rating') {
      sorting.totalRating = -1
    }
    if(sortBy === 'popular') {
      sorting.inFavorites = -1
    }
    
    const totalItems = await Document.find(query).countDocuments();
    const docs = await Document.find(query)
      .select({
        _id: 1,
        title: 1,
        description: 1,
        tags: 1,
        path: 1,
        history: 1,
        isPublished: 1,
        publishedAt: 1,
        updatedAt: 1,
        inFavorites: 1,
        creator: 1,
        rating: 1,
        rateCount: 1,
        totalRating: 1
      })
      .sort(sorting)
      .populate("history")
      .populate("creator")
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({
      docs,
      totalItems,
    });
  } catch (e) {
    return res.status(500).json("Couldn't fetch documents");
  }
};
