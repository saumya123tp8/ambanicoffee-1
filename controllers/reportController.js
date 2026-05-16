import reportModel from "../models/reportModel.js";

export const getAllReportController = async (req, res) => {
  try {
    const reports = await reportModel
      .find({})
      .populate({
        path: "OrderId",
        select: "_id buyer status totalAmount",
      })
      .sort({ createdAt: -1 });
      console.log("reports"+reports);
    res.json({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in getting report",
      error,
    });
  }
};

export const registerReportController = async (req, res) => {
  try {
    const { OrderId, Category, Note } = req.body;

    if (!OrderId) {
      return res.status(400).send({ message: "OrderId is required" });
    }

    const report = await reportModel.create({
      OrderId,
      Category: Category || "Other",
      Note: Note || "",
    });
    console.log("reports"+report);
    res.status(201).send({
      success: true,
      message: "Report registered successfully",
      report,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in report registration",
      error,
    });
  }
};

export const getOrderReportController = async (req, res) => {
  try {
    const { oid } = req.params;

    const reports = await reportModel
      .find({ OrderId: oid }) // ✅ correct
      .populate({
        path: "OrderId",
        select: "_id buyer status totalAmount",
      })
      .sort({ createdAt: -1 });
    console.log("reports"+reports);
    res.json({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in getting report",
      error,
    });
  }
};






export const reportStatusController = async (req, res) => {
  try {
    const { oid } = req.params;
    const { status } = req.body;
   

    const allowedStatus = ["Pending", "Under-Review", "Solved"];

if (!allowedStatus.includes(status)) {
  return res.status(400).send({
    success: false,
    message: "Invalid status",
  });
}


    const report = await reportModel.findByIdAndUpdate(
      oid,
      { Status: status }, // ✅ match schema
      { new: true }
    );
    console.log("reports"+report);

    res.json({
      success: true,
      report,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in updating report",
      error,
    });
  }
};