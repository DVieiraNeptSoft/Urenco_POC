oApp.setBusy(false);

// debugger;

if (openedFromOtherApp === "X") {
    // oListIssue.fireItemPress();
    oListIssue.mAggregations.items[0].firePress();
    oIconTabBar.setSelectedKey("tabPictures");
} else {
    oIconTabBar.setSelectedKey("tabDetails");
}
