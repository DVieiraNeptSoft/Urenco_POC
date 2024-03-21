var issuesTab;
var issueStatusTab;
var pieChartData = {};
var csvData;

// function pieChart() {
// issuesTab = modeloTableIssues.getData();
// issueStatusTab = modeloTableIssueStatus.getData();

// pieChartData = {
//     raised: 0,
//     assessed: 0,
//     bauinitial: 0,
//     projectinitial: 0,
//     bauassigned: 0,
//     projectassigned: 0,
// };

// for (let i = 0; i < issuesTab.length; i++) {
//     switch (issuesTab[i].issueStatusID) {
//         case 1:
//             pieChartData.raised++;
//             break;

//         case 2:
//             pieChartData.assessed++;
//             break;

//         case 3:
//             pieChartData.bauinitial++;
//             break;

//         case 4:
//             pieChartData.projectinitial++;
//             break;

//         case 5:
//             pieChartData.bauassigned++;
//             break;

//         case 6:
//             pieChartData.projectassigned++;
//             break;

//         // default:
//         //     //Default catches all cases not specified above
//         //     console.log("No special dietary preferences specified");
//         //     break;
//     }
// }

// console.log(pieChartData);

// csvData = '"Column 1";"Column 2"\n"Raised";18\n"Assessed";3\n"Bau Initial";2\n"Project Initial";4\n"Bau Assigned";5\n"Project Assigned";2';

// csvData =
//     "Concern Status" +
//     ";" +
//     "Created Concerns" +
//     "\n" +
//     "Raised" +
//     ";" +
//     pieChartData.raised +
//     "\n" +
//     "Assessed" +
//     ";" +
//     pieChartData.assessed +
//     "\n" +
//     "Bau Initial" +
//     ";" +
//     pieChartData.bauinitial +
//     "\n" +
//     "Project Initial" +
//     ";" +
//     pieChartData.projectinitial +
//     "\n" +
//     "Bau Assigned" +
//     ";" +
//     pieChartData.bauassigned +
//     "\n" +
//     "Project Assigned" +
//     ";" +
//     pieChartData.projectassigned;

// console.log(csvData)

// debugger

// createPieChart();
// }

function createPieChart() {
    csvData =
        "Concern Status" +
        ";" +
        "Created Concerns" +
        "\n" +
        "Raised" +
        ";" +
        pieChartData.raised +
        "\n" +
        "Assessed" +
        ";" +
        pieChartData.assessed +
        "\n" +
        "Bau Initial" +
        ";" +
        pieChartData.bauinitial +
        "\n" +
        "Project Initial" +
        ";" +
        pieChartData.projectinitial +
        "\n" +
        "Bau Assigned" +
        ";" +
        pieChartData.bauassigned +
        "\n" +
        "Project Assigned" +
        ";" +
        pieChartData.projectassigned;

    var files = [
            "https://code.highcharts.com/stock/highstock.js",
            "https://code.highcharts.com/highcharts-more.js",
            "https://code.highcharts.com/highcharts-3d.js",
            "https://code.highcharts.com/modules/data.js",
            "https://code.highcharts.com/modules/exporting.js",
            "https://code.highcharts.com/modules/funnel.js",
            "https://code.highcharts.com/modules/annotations.js",
            "https://code.highcharts.com/modules/accessibility.js",
            "https://code.highcharts.com/modules/solid-gauge.js",
        ],
        loaded = 0;
    if (typeof window["HighchartsEditor"] === "undefined") {
        window.HighchartsEditor = { ondone: [cl], hasWrapped: false, hasLoaded: false };
        include(files[0]);
    } else {
        if (window.HighchartsEditor.hasLoaded) {
            cl();
        } else {
            window.HighchartsEditor.ondone.push(cl);
        }
    }
    function isScriptAlreadyIncluded(src) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].hasAttribute("src")) {
                if (
                    (scripts[i].getAttribute("src") || "").indexOf(src) >= 0 ||
                    (scripts[i].getAttribute("src") ===
                        "http://code.highcharts.com/highcharts.js" &&
                        src === "https://code.highcharts.com/stock/highstock.js")
                ) {
                    return true;
                }
            }
        }
        return false;
    }
    function check() {
        if (loaded === files.length) {
            for (var i = 0; i < window.HighchartsEditor.ondone.length; i++) {
                try {
                    window.HighchartsEditor.ondone[i]();
                } catch (e) {
                    console.error(e);
                }
            }
            window.HighchartsEditor.hasLoaded = true;
        }
    }
    function include(script) {
        function next() {
            ++loaded;
            if (loaded < files.length) {
                include(files[loaded]);
            }
            check();
        }
        if (isScriptAlreadyIncluded(script)) {
            return next();
        }
        var sc = document.createElement("script");
        sc.src = script;
        sc.type = "text/javascript";
        sc.onload = function () {
            next();
        };
        document.head.appendChild(sc);
    }
    function each(a, fn) {
        if (typeof a.forEach !== "undefined") {
            a.forEach(fn);
        } else {
            for (var i = 0; i < a.length; i++) {
                if (fn) {
                    fn(a[i]);
                }
            }
        }
    }
    var inc = {},
        incl = [];
    each(document.querySelectorAll("script"), function (t) {
        inc[t.src.substr(0, t.src.indexOf("?"))] = 1;
    });
    function cl() {
        if (typeof window["Highcharts"] !== "undefined") {
            var options = {
                title: { text: "View All Concern Status" },
                subtitle: { text: "A chart detailing all status of the created Concerns" },
                exporting: {},
                chart: {
                    type: "pie",
                    options3d: { enabled: true, alpha: 45, beta: 0 },
                    polar: false,
                    backgroundColor: "#ffffff",
                    borderColor: "#fafafa",
                    borderRadius: 0,
                    borderWidth: 0,
                    colorCount: 10,
                    defaultSeriesType: "line",
                    inverted: false,
                },
                plotOptions: {
                    pie: { allowPointSelect: true, depth: 35, cursor: "pointer", innerSize: "60%" },
                    series: { dataLabels: { enabled: true }, animation: false },
                },
                series: [{ name: "Column 2", turboThreshold: 0 }],
                data: {
                    csv:
                        // '"Column 1";"Column 2"\n"Raised";18\n"Assessed";3\n"Bau Initial";2\n"Project Initial";4\n"Bau Assigned";5\n"Project Assigned";2',
                        csvData,
                    googleSpreadsheetKey: false,
                    googleSpreadsheetWorksheet: false,
                },
                yAxis: [{ title: {} }],
                pane: { background: [] },
                responsive: { rules: [] },
            };
            /*
// Sample of extending options:
Highcharts.merge(true, options, {
    chart: {
        backgroundColor: "#bada55"
    },
    plotOptions: {
        series: {
            cursor: "pointer",
            events: {
                click: function(event) {
                    alert(this.name + " clicked\n" +
                          "Alt: " + event.altKey + "\n" +
                          "Control: " + event.ctrlKey + "\n" +
                          "Shift: " + event.shiftKey + "\n");
                }
            }
        }
    }
});
*/ new Highcharts.Chart(
                // "highcharts-c2d49680-62b7-4e30-beba-2073fe973453",
                "highchart-container",
                options
            );
        }
    }
}

function createColumnMultiColorChart() {
    csvData =
        "Concern Status" +
        ";" +
        "Created Concerns" +
        "\n" +
        "Raised" +
        ";" +
        pieChartData.raised +
        "\n" +
        "Assessed" +
        ";" +
        pieChartData.assessed +
        "\n" +
        "Bau Initial" +
        ";" +
        pieChartData.bauinitial +
        "\n" +
        "Project Initial" +
        ";" +
        pieChartData.projectinitial +
        "\n" +
        "Bau Assigned" +
        ";" +
        pieChartData.bauassigned +
        "\n" +
        "Project Assigned" +
        ";" +
        pieChartData.projectassigned;

    var files = [
            "https://code.highcharts.com/stock/highstock.js",
            "https://code.highcharts.com/highcharts-more.js",
            "https://code.highcharts.com/highcharts-3d.js",
            "https://code.highcharts.com/modules/data.js",
            "https://code.highcharts.com/modules/exporting.js",
            "https://code.highcharts.com/modules/funnel.js",
            "https://code.highcharts.com/modules/annotations.js",
            "https://code.highcharts.com/modules/accessibility.js",
            "https://code.highcharts.com/modules/solid-gauge.js",
        ],
        loaded = 0;
    if (typeof window["HighchartsEditor"] === "undefined") {
        window.HighchartsEditor = { ondone: [cl], hasWrapped: false, hasLoaded: false };
        include(files[0]);
    } else {
        if (window.HighchartsEditor.hasLoaded) {
            cl();
        } else {
            window.HighchartsEditor.ondone.push(cl);
        }
    }
    function isScriptAlreadyIncluded(src) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].hasAttribute("src")) {
                if (
                    (scripts[i].getAttribute("src") || "").indexOf(src) >= 0 ||
                    (scripts[i].getAttribute("src") ===
                        "http://code.highcharts.com/highcharts.js" &&
                        src === "https://code.highcharts.com/stock/highstock.js")
                ) {
                    return true;
                }
            }
        }
        return false;
    }
    function check() {
        if (loaded === files.length) {
            for (var i = 0; i < window.HighchartsEditor.ondone.length; i++) {
                try {
                    window.HighchartsEditor.ondone[i]();
                } catch (e) {
                    console.error(e);
                }
            }
            window.HighchartsEditor.hasLoaded = true;
        }
    }
    function include(script) {
        function next() {
            ++loaded;
            if (loaded < files.length) {
                include(files[loaded]);
            }
            check();
        }
        if (isScriptAlreadyIncluded(script)) {
            return next();
        }
        var sc = document.createElement("script");
        sc.src = script;
        sc.type = "text/javascript";
        sc.onload = function () {
            next();
        };
        document.head.appendChild(sc);
    }
    function each(a, fn) {
        if (typeof a.forEach !== "undefined") {
            a.forEach(fn);
        } else {
            for (var i = 0; i < a.length; i++) {
                if (fn) {
                    fn(a[i]);
                }
            }
        }
    }
    var inc = {},
        incl = [];
    each(document.querySelectorAll("script"), function (t) {
        inc[t.src.substr(0, t.src.indexOf("?"))] = 1;
    });
    function cl() {
        if (typeof window["Highcharts"] !== "undefined") {
            var options = {
                title: { text: "View All Concern Status" },
                subtitle: { text: "A chart detailing all status of the created Concerns" },
                exporting: {},
                chart: { type: "column", polar: false, width: null, height: null },
                plotOptions: { series: { colorByPoint: true, animation: false, dataLabels: {} } },
                series: [{ name: "Column 2", turboThreshold: 0, marker: {} }],
                data: {
                    csv: csvData,
                    googleSpreadsheetKey: false,
                    googleSpreadsheetWorksheet: false,
                },
                legend: {},
                xAxis: [{ title: {}, labels: {} }],
                yAxis: [{ title: {}, labels: {} }],
            };
            /*
// Sample of extending options:
Highcharts.merge(true, options, {
    chart: {
        backgroundColor: "#bada55"
    },
    plotOptions: {
        series: {
            cursor: "pointer",
            events: {
                click: function(event) {
                    alert(this.name + " clicked\n" +
                          "Alt: " + event.altKey + "\n" +
                          "Control: " + event.ctrlKey + "\n" +
                          "Shift: " + event.shiftKey + "\n");
                }
            }
        }
    }
});
*/ new Highcharts.Chart(
                "highchart-container",
                options
            );
        }
    }
}
