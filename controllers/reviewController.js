import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";
export const getAllReviewForProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    const reviews = await reviewModel
      .find({ productId: pid })
      .sort({ createdAt: -1 })
      .populate("userId", "name"); // optional

    res.status(200).send({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting reviews",
      error,
    });
  }
};
export const addReviewForProductController = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId=req?.user?._id;
   console.log("req"+req);
   console.log("req-user"+req.user);
   console.log("req-user-name"+req.user.name);
   console.log("req-user-id"+req.user._id);
   const user = await userModel.findById(req?.user?._id);

  //  console.log("req"+req);
    if (!productId)
      return res.status(400).send({ error: "Product ID required" });

    if (!rating)
      return res.status(400).send({ error: "Please provide rating" });

    if (!comment) return res.status(400).send({ error: "Please add comment" });

    const existingReview = await reviewModel.findOne({
      productId,
      userId: req.user._id,
    });

    if (existingReview) {
      return res.status(400).send({
        error: "You already reviewed this product",
      });
    }
    const review = new reviewModel({
      productId,
      rating,
      comment,
      userId
    });
    console.log("review"+review);

    // save review
    await review.save();


    // get product
const product = await productModel.findById(productId);

// calculate new values
const newTotal = product.totalReviews + 1;

const newAvg =
  (product.averageRating * product.totalReviews + rating) / newTotal;
console.log("before product "+product);
const avgRatingGivenByUser = ((user.avgRating)*(user.totalNumOfGivenRating) +  rating)/(user.totalNumOfGivenRating +1);
// update product
await productModel.findByIdAndUpdate(productId, {
  averageRating: newAvg,
  totalReviews: newTotal,
});

console.log("product "+product);
 res.status(200).send({
      success: true,
      message: "Review added successfully",
      review,
    });

     const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        avgRating : avgRatingGivenByUser,
        totalNumOfGivenRating : user.totalNumOfGivenRating+1
      },
      { new: true }
    );

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding review",
      error,
    });
  }
};
