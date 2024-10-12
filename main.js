import express from "express";
import fs from "fs";
import * as fabric from "fabric/node"; // v6
import { registerFont } from "canvas";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;

const canvas = new fabric.StaticCanvas(null, { width: 600, height: 600 });

const fabricJSON = {
  version: "4.6.0",
  objects: [
    {
      id: "myText",
      fontSize: 24,
      fontWeight: "normal",
      fontFamily: "Qwitcher Grypen",
      fontStyle: "normal",
      lineHeight: 1.16,
      text: "Hello, World!",
      charSpacing: 0,
      textAlign: "left",
      styles: [],
      pathStartOffset: 0,
      pathSide: "left",
      pathAlign: "baseline",
      underline: false,
      overline: false,
      linethrough: false,
      textBackgroundColor: "",
      direction: "ltr",
      type: "IText",
      version: "6.4.0",
      originX: "left",
      originY: "top",
      left: 124,
      top: 46,
      width: 138.2109,
      height: 27.12,
      fill: "#2BEBC8",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 2.0288,
      scaleY: 1.5114,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      skewX: 0,
      skewY: 0,
    },
    {
      id: "myText",
      fontSize: 24,
      fontWeight: "normal",
      fontFamily: "Oswald",
      fontStyle: "normal",
      lineHeight: 1.16,
      text: "Hello, World!",
      charSpacing: 0,
      textAlign: "left",
      styles: [],
      pathStartOffset: 0,
      pathSide: "left",
      pathAlign: "baseline",
      underline: false,
      overline: false,
      linethrough: false,
      textBackgroundColor: "",
      direction: "ltr",
      type: "IText",
      version: "6.4.0",
      originX: "left",
      originY: "top",
      left: 135.4375,
      top: 121,
      width: 132.444,
      height: 27.12,
      fill: "#2BEBC8",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 2.0833,
      scaleY: 1.7603,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      skewX: 0,
      skewY: 0,
    },
    {
      id: "myText",
      fontSize: 24,
      fontWeight: "normal",
      fontFamily: "Protest Strike",
      fontStyle: "normal",
      lineHeight: 1.16,
      text: "Hello, World!",
      charSpacing: 0,
      textAlign: "left",
      styles: [],
      pathStartOffset: 0,
      pathSide: "left",
      pathAlign: "baseline",
      underline: false,
      overline: false,
      linethrough: false,
      textBackgroundColor: "",
      direction: "ltr",
      type: "IText",
      version: "6.4.0",
      originX: "left",
      originY: "top",
      left: 118.4375,
      top: 235.5,
      width: 312,
      height: 27.12,
      fill: "#2BEBC8",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1.1885,
      scaleY: 1.7781,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      skewX: 0,
      skewY: 0,
    },
  ],
};

// const scaleOrgText = (height, width, text) => {
//   let fontSize = 40; // Initial font size

//   // Create a temporary IText to measure text dimensions
//   let tempText = new fabric.IText(text, { fontSize });
//   let textDimensions = tempText.getBoundingRect();
//   console.log("====================================");
//   console.log(height, width, text);
//   console.log("====================================");
//   console.log("====================================");
//   console.log(textDimensions, text);
//   console.log("====================================");
//   // Adjust fontSize to fit the specified width
//   while (textDimensions.width > width && fontSize > 1) {
//     fontSize -= 1; // Decrease font size
//     tempText.set({ fontSize });
//     textDimensions = tempText.getBoundingRect(); // Update dimensions after changing font size
//   }

//   let scaleY = height / textDimensions.height;

//   return {
//     fontSize,
//     scaleY,
//   };
// };
// const modifyFabricJson = () => {
//   //modify fabric json i-text fontsize and scaley
//   return fabricJSON.objects.map((obj) => {
//     if (obj.type === "i-text") {
//       const { width, height, text } = obj;
//       const { fontSize, scaleY } = scaleOrgText(height, width, text);
//       // Update the object with the new font size and scaleY
//       obj.fontSize = fontSize;
//       obj.scaleY = scaleY;
//     }
//     return obj;
//   });
// };

const loadCanvasJson = async () => {
  try {
    if (!canvas) return;

    await canvas.loadFromJSON(fabricJSON);
    canvas.backgroundColor = "white";
    canvas.renderAll();
    canvas.createPNGStream().pipe(fs.createWriteStream("./output.png"));
  } catch (error) {
    console.error("Error loading shapes from json:", error);
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("/", (req, res) => {
  res.send("Hello Worlds!");
});
app.get("/design", (req, res) => {
  loadCanvasJson()
    .then(() => {
      const filePath = path.join(__dirname, "output.png");
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: "File not found" });
      }
    })
    .catch((error) => {
      console.error("Error generating design:", error);
      res.status(500).send("Failed to generate design.");
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
