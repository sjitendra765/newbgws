var PDFDocument = require('pdfkit');
var fs = require('fs');
doc = new PDFDocument;

doc.pipe(fs.createWriteStream('output.pdf'))

// Embed a font, set the font size, and render some text
const heading = "Gurkha Welfare Scheme"
const account = "Account Holder : huhsuhuhuh"
const bank_name = "Bank Name: Nepal Nepal";
const account_num = "Account Number : 09868868778";
const amount_withdraw = "Amount Wothdrawn : 98789";
const amt_remain = "Reamining Amount: 98979";
const approved_by = "Approved By: jiduedheudhue"
  doc.y = 300
  doc.text(heading,50,50).fontSize(8).moveDown()  
  doc.text(account,50,60)
  doc.text(bank_name,50,70)
  doc.text(account_num,50,80)
  doc.text(amount_withdraw,50,90)
  doc.text(amt_remain,50,100)
  doc.text(approved_by,50,110)
  doc.end()