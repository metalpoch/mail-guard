function checkForUpdatedTickets() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const now = new Date();
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000); // 15 minutes ago

  for (let i = 1; i < values.length; i++) { // Skip header row


    const row = values[i];
    const updatedAt = new Date(row[8]); // Column 6 (zero-based index) is "updated_at"

    if (updatedAt >= fifteenMinutesAgo && updatedAt <= now) {

      // set user_id if not set
      const userIdCell = sheet.getRange(i + 1, 3);
      const descCellValue = sheet.getRange(i + 1, 6).getValue();
      const description = JSON.parse(`${descCellValue}`);
      if (userIdCell.isBlank()) {
        sheet.getRange(i + 1, 3).setValue(description.user_id);
      }

      // set ticket id if not set
      const titleCellValue = sheet.getRange(i + 1, 5).getValue();
      const idFromTitlePattern = /\[ticket#(\d+)\]/;
      const match = `${titleCellValue}`.match(idFromTitlePattern);
      const ticketIdCell = sheet.getRange(i + 1, 2);
      if (match && match.length > 1 && ticketIdCell.isBlank()) {
        const ticketNumber = parseInt(match[1]);
        ticketIdCell.setValue(ticketNumber);
      }

      // update status change in supabase db
      const ticket_id = ticketIdCell.getValue();
      const new_status = sheet.getRange(i + 1, 4).getValue();
      if (ticket_id && new_status) {
        // some ngrok tunnel to localhost
        const url = "";
        // const url = "https://mail-guard.vercel.app/account/suppport/ticket"; // prod url
        const formData = { ticket_id: ticket_id, status: new_status };
        UrlFetchApp.fetch(url, {
          'method': 'patch',
          'payload': JSON.stringify(formData),
          'headers': { 'ngrok-skip-browser-warning': true },
          'contentType': 'application/json',
        });
      }
      Logger.log("Performing action for row " + (i + 1));
    }
  }
}