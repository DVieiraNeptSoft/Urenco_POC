// Custom Init - Happens only once when mounting the component
sap.ui.getCore().attachInit(function (startParams) {
    oApp.toDetail(oPageEmpty);
    oApp.toMaster(oPage);

    if (sap.ui.Device.system.phone) {
        oPageDetail.setShowNavButton(true);
    } else {
        oPageDetail.setShowNavButton(false);
    }
});
