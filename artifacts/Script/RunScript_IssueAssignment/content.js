//only get issues with status ID 3 or 4 -> BAU Initial / Project Initial

var entityIssues = await entities.urenco_issues.createQueryBuilder("issues")
    // .where("issues.issueStatusID = :idBAU OR issues.issueStatusID = :idPRJ", { idBAU: 3, idPRJ: 4 })
    .where("issueStatusID IN(:...id)", { id: [3, 4] })
    .getMany();

var entityIssueStatus = await entities.urenco_issuestatus.createQueryBuilder("issuestatus")
    // .where("issues.issueStatusID = :idBAU OR issues.issueStatusID = :idPRJ", { idBAU: 3, idPRJ: 4 })
    .where("issueStatusID IN(:...id)", { id: [3, 4] })
    .getMany();

var res_tab = [];
var struc;
var find_issueStatus;

// var test = entityIssueStatus.find(x => x.issueStatusID === 3);

// console.log(test.issueStatus);

var parseScore,
    scoreColor,
    formatAffected,
    formatVar;

if (entityIssues.length !== 0) {
    for (i = 0; i < entityIssues.length; i++) {
        struc = entityIssues[i]

        find_issueStatus = entityIssueStatus.find(x => x.issueStatusID === entityIssues[i].issueStatusID);

        Object.assign(struc, { issueStatus: find_issueStatus.issueStatus }) //Appends the field to the Object

        parseScore = parseInt(entityIssues[i].issueScore)

        if (parseScore < 50) {
            scoreColor = 'Success'
        } else if (parseScore >= 50 && parseScore <= 69) {
            scoreColor = 'Warning'
        } else {
            scoreColor = 'Error'
        }

        Object.assign(struc, { issueScoreColor: scoreColor }) //Appends color to use in adaptive framework Object Status

        res_tab.push(struc);

        // console.log(find_issueStatus.issueStatus);
    }

    result.data = res_tab
} else {
    result.data = [{}]
}

console.log(result.data);

complete();
