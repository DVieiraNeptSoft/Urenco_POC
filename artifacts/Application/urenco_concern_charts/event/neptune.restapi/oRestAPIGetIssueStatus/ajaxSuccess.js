issuesTab = modeloTableIssues.getData();
issueStatusTab = modeloTableIssueStatus.getData();

pieChartData = {
    raised: 0,
    assessed: 0,
    bauinitial: 0,
    projectinitial: 0,
    bauassigned: 0,
    projectassigned: 0,
};

for (let i = 0; i < issuesTab.length; i++) {
    switch (issuesTab[i].issueStatusID) {
        case 1:
            pieChartData.raised++;
            break;

        case 2:
            pieChartData.assessed++;
            break;

        case 3:
            pieChartData.bauinitial++;
            break;

        case 4:
            pieChartData.projectinitial++;
            break;

        case 5:
            pieChartData.bauassigned++;
            break;

        case 6:
            pieChartData.projectassigned++;
            break;

        // default:
        //     //Default catches all cases not specified above
        //     console.log("No special dietary preferences specified");
        //     break;
    }
}

// pieChart();
createPieChart();