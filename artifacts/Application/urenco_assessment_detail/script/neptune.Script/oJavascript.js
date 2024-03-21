if (sap.n) {
    sap.n.Shell.attachBeforeDisplay(function (startParams) {
        console.log(startParams);

        var options = {
            parameters: {
                where: JSON.stringify({ issueID: startParams.data.issueID }), // Optional
                // "sort": "" // Optional
            },
        };

        apioRestAPIGetIssue(options);
    });
}
