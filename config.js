const config = {};

config.openApiFile = 'api.json';
config.targetFolder = 'target';
config.pdfFileName = 'api.pdf';
config.htmlFileName = 'api.html';
config.cssFileName = 'api.css';
config.mergeConfiguration = {};
config.styleConfiguration = {
    margin: {
        top: '40px',
        bottom: '25px',
        right: '25px',
        left: '25px',
    },
};
config.styleFileConfiguration = {
    margin: { top: '30px', bottom: '25px', right: '25px', left: '25px' },
};

module.exports = config;
