const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('emails.csv')
    .pipe(csv())
    .on('data', (row) => {
        const subject = row.subject.toLowerCase();
        const body = row.body.toLowerCase();

        if (subject.includes("leave") || body.includes("leave")) {
            results.push({
                id: parseInt(row.id),
                sender: row.sender,
                type: "leave_request"
            });
        }
    })
    .on('end', () => {

        fs.writeFileSync('leave_request.json', JSON.stringify(results, null, 2), 'utf-8');
        console.log("✅ Lọc xong! Kết quả lưu tại leave_request.json");
    });
