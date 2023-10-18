const { Review, User } = require("../../../shared/database/models");
const BaseRepository = require("../../../shared/BaseRepository");
const { col } = require("sequelize");

class ReviewRepository extends BaseRepository {
  #review;

  constructor() {
    super();
    this.#review = Review;
  }

  createReview = ({ userId, movieId, rating, comment }) => {
    return this.#review.create({
      userId,
      movieId,
      rating,
      comment,
    });
  };

  getMovieReviews = ({ movieId, page, perPage }) => {
    const offset = (page - 1) * perPage;
    return this.#review.findAll({
      attributes: [
        "id",
        "userId",
        "movieId",
        "rating",
        "comment",
        [col("User.email"), "userEmail"],
      ],
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
      where: {
        movieId,
      },
      limit: perPage,
      offset: offset,
    });
  };
}

module.exports = ReviewRepository;
