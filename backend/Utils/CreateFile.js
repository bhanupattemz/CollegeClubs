const puppeteer = require('puppeteer');
const ExcelJS = require('exceljs');

module.exports.createPDF = async (htmlContent) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const contentHeight = await page.evaluate(() => {
        return document.body.scrollHeight;
    });

    const contentWidth = await page.evaluate(() => {
        return document.body.scrollWidth;
    });

    const pdfBuffer = await page.pdf({
        width: `${contentWidth}px`,
        height: `${contentHeight}px`,
        printBackground: true,
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
    });

    await browser.close();

    return pdfBuffer;
}



module.exports.convertObjectToExcel = async (data, heading) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Records');
    worksheet.columns = heading;
    data.forEach(item => {
        worksheet.addRow(item);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;
}