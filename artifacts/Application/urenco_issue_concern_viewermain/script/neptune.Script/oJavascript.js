var openedFromOtherApp;

// Custom Init - Happens only once when mounting the component
sap.ui.getCore().attachInit(function (startParams) {
    //Inject devexpress scripts
    // var slickScript = document.createElement("script");
    // slickScript.type = "text/javascript";
    // slickScript.src = "https://cdn3.devexpress.com/jslib/22.2.6/js/dx.all.js";
    // document.getElementsByTagName("head")[0].appendChild(slickScript);

    oApp.toDetail(oPageEmpty);
    oApp.toMaster(oPage);

    if (sap.ui.Device.system.phone) {
        oPageDetail.setShowNavButton(true);
        oCarousel.setWidth("80%");
    } else {
        oPageDetail.setShowNavButton(false);
        oCarousel.setWidth("550px");
    }

    openedFromOtherApp = "";

    if (startParams !== "") {
        openedFromOtherApp = "X";
        oSearchField.setValue(startParams);
        oSearchField.fireLiveChange();
    }

    oApp.setBusy(true);
});

// if (sap.n) {
//     sap.n.Shell.attachBeforeDisplay(function (startParams) {
//         oSearchField.setValue(startParams);
//         oSearchField.fireLiveChange();
//     });
// }
