const entity = await entities.urenco_issues.createQueryBuilder("issues").select("MAX(issues.issueID)", "issueID").getRawOne();

// console.log(entity.issueID);

var newID = entity.issueID + 1;

result = newID;

console.log(result);

complete();