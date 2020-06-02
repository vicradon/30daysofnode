const showdown = require("showdown");
const fs = require("fs");
const { BadRequest } = require("../utils/error");

const convert = (req, res, next) => {
  try {
    const { string } = req.body;

    if (!string) {
      throw new BadRequest("html string wasn't provided");
    }
    const converter = new showdown.Converter();
    const md = converter.makeHtml(string);

    res.status(201).json({ message: "successfully converted html to md", md });
  } catch (error) {
    next(error);
  }
};

const uploadAndConvert = (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new BadRequest({ message: "No files were uploaded." });
    }
    const { htmlFile } = req.files;

    if (htmlFile.mimetype !== "text/markdown") {
      throw new BadRequest("file is not a html file");
    }

    if (htmlFile.truncated) {
      throw new BadRequest({ message: "File is above 10mb" });
    }

    const getName = () => {
      const reversed = htmlFile.name.split("").reverse().join("");
      const unReversedWithoutMd = reversed
        .slice(3, reversed.length)
        .split("")
        .reverse()
        .join("");
      return `${unReversedWithoutMd}.html`;
    };

    const converter = new showdown.Converter();
    const md = converter.makeHtml(htmlFile.data.toString());

    fs.writeFile(`./src/html_files/${getName()}`, md, (error) => {
      if (error) throw new Error("An error occured");
      res.status(200).download(`./src/html_files/${getName()}`);

      setTimeout(() => {
        fs.unlink(`./src/html_files/${getName()}`, (error) => {
          if (error) throw new Error("An error occured");
        });
      }, 1000);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { convert, uploadAndConvert };
