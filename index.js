const pdf = require('phantom-html2pdf');
const convertHTMLToPDF = require('pdf-puppeteer');
const fs = require('fs');
var config = require('./config');
const { exec } = require('child_process');

if (
    !config.targetFolder ||
    !config.openApiFile ||
    !config.pdfFileName ||
    !config.htmlFileName
) {
    console.error('Error during configuration file (config.js) loading ');
    return;
}

//Converting html api doc to PDF
const pdfConversionCallBack = () => {
    const callback = function (pdf) {
        fs.writeFileSync(config.pdfFileName, pdf, 'binary');
        console.log('Conversion process completed');
    };

    const html = fs.readFileSync(config.htmlFileName, 'utf-8');
    convertHTMLToPDF(
        html,
        callback,
        config.styleConfiguration,
        config.styleFileConfiguration
    );
};

//Start conversion to inline html
const htmlInlineConversion = () => {
    exec(
        `html-inline -i ./${config.targetFolder}/index.html -o ${config.htmlFileName}`,
        (err, stdout, stderr) => {
            if (err) {
                console.error("Node couldn't execute the command \n", stderr);
                return;
            } else {
                pdfConversionCallBack();
            }
        }
    );
};

console.log('Start conversion');
require('bootprint')
    .load(require('bootprint-openapi'))
    .merge(config.mergeConfiguration)
    .build(config.openApiFile, config.targetFolder)
    .generate()
    .done(htmlInlineConversion);
fs.appendFileSync(
    `./${config.targetFolder}/${config.cssFileName}`,
    "\n div[id*='operation']{page-break-inside: avoid; age-break-after: always;} \n div{-webkit-print-color-adjust: exact;}"
);
