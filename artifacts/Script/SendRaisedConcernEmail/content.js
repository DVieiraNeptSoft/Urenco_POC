// log.info("REQ BODY: ");
// log.info(req.body)

await sendEmail(req.body.email, null, null, req.body.email, 'DF755607-64CA-ED11-A8E0-000D3ADA944E', { issueID: req.body.issueID, reportedBy: req.body.reportedBy, issueDescription: req.body.issueDescription });

log.info("Email should be sent");

complete();