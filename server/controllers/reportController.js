import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateReport = async (req, res) => {
  try {
    const { email, scenario } = req.body;
    if (!email || !scenario) {
      return res.status(400).json({ message: "Email and scenario data required" });
    }


    const outputDir = "D:\\projects\\roi-simulator"; // <-- Change this if needed


    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

 
    const filename = `ROI_Report_${Date.now()}.pdf`;
    const filePath = path.join(outputDir, filename);


    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);


    doc.fontSize(22).fillColor("#0369a1").text("Invoicing ROI Report", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(14).fillColor("#000").text(`Email: ${email}`);
    doc.moveDown();
    doc.text(`Scenario: ${scenario.scenario_name}`);
    doc.moveDown(1.5);


    doc.fontSize(16).fillColor("#0369a1").text("Simulation Summary", { underline: true });
    doc.moveDown(0.5);

    const results = scenario.results || {};
    Object.entries(results).forEach(([key, value]) => {
      doc.fontSize(12).fillColor("#000").text(`${key.replaceAll("_", " ")}: ${value}`);
    });

    doc.moveDown(2);
    doc.fontSize(12).fillColor("#555").text("Thank you for using our ROI Simulator!", { align: "center" });
    doc.end();
    stream.on("finish", () => {
      res.download(filePath, filename, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).json({ message: "Download failed" });
        } else {
          console.log(`✅ Report saved at: ${filePath}`);
        }
      });
    });

  } catch (err) {
    console.error("❌ Report generation error:", err);
    res.status(500).json({ message: "Error generating report" });
  }
};
