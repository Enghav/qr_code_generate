import inquirer from "inquirer";
import qr from 'qr-image'
import fs from 'fs'

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Choose the output format:',
      name: 'format',
      choices: ['Text', 'Qr-code']
    },
    {
      message: "Drop URL here",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    const outputFormat = answers.format;

    if (outputFormat === '.txt') {
      fs.writeFile('Link.txt', url, (err) => {
        if (err) throw err;

        console.log('Text file has been saved!');
      });
    } else if (outputFormat === '.png') {
      const qr_png = qr.image(url);
      qr_png.pipe(fs.createWriteStream("qr_png.png"));

      console.log('PNG file has been saved!');
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
