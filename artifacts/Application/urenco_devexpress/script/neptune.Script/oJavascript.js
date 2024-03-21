sap.ui.getCore().attachInit(function (startParams) {
    setTimeout(function () {
        $(() => {
            //FIRST GAUGE

            $("#gauge1").dxCircularGauge({
                scale: {
                    startValue: 0,
                    endValue: 20,
                    tickInterval: 5,
                    label: {
                        useRangeColors: true,
                    },
                },
                rangeContainer: {
                    ranges: [
                        { startValue: 0, endValue: 5 },
                        { startValue: 5, endValue: 15 },
                        { startValue: 15, endValue: 20 },
                    ],
                    width: 10,
                },
                title: {
                    text: "Concerns with no Assessment<br>for more than 3 days",
                    font: { size: 15 },
                },
                export: {
                    enabled: false,
                },
                value: 6,
                valueIndicator: {
                    type: "triangleNeedle",
                    color: "#00abda",
                },
            });

            //SECOND GAUGE

            $("#gauge2").dxCircularGauge({
                scale: {
                    startValue: 0,
                    endValue: 20,
                    tickInterval: 5,
                    label: {
                        useRangeColors: true,
                    },
                },
                rangeContainer: {
                    ranges: [
                        { startValue: 0, endValue: 5 },
                        { startValue: 5, endValue: 15 },
                        { startValue: 15, endValue: 20 },
                    ],
                    width: 10,
                },
                title: {
                    text: "Concerns with no User Assignment<br>for more than 3 days",
                    font: { size: 15 },
                },
                export: {
                    enabled: false,
                },
                value: 3,
                valueIndicator: {
                    type: "triangleNeedle",
                    color: "#00abda",
                },
            });

            //THIRD GAUGE

            $("#gauge3").dxCircularGauge({
                scale: {
                    startValue: 0,
                    endValue: 20,
                    tickInterval: 5,
                    label: {
                        useRangeColors: true,
                    },
                },
                rangeContainer: {
                    ranges: [
                        { startValue: 0, endValue: 5 },
                        { startValue: 5, endValue: 15 },
                        { startValue: 15, endValue: 20 },
                    ],
                    width: 10,
                },
                title: {
                    text: "Concerns without resolution <br>for more than 45 days",
                    font: { size: 15 },
                },
                export: {
                    enabled: false,
                },
                value: 18,
                valueIndicator: {
                    type: "triangleNeedle",
                    color: "#00abda",
                },
            });

            // FIRST GRAPH
            const data = complaintsData.sort((a, b) => a.order - b.order);
            const totalCount = data.reduce((prevValue, item) => prevValue + item.count, 0);
            let cumulativeCount = 0;
            let dataSource = data.map((item) => {
                cumulativeCount += item.count;
                return {
                    complaint: item.complaint,
                    count: item.count,
                    cumulativePercentage: Math.round((cumulativeCount * 100) / totalCount),
                };
            });

            $("#chart").dxChart({
                palette: "Harmony Light",
                dataSource,
                title: "Quality Concerns",
                argumentAxis: {
                    label: {
                        overlappingBehavior: "stagger",
                    },
                },
                tooltip: {
                    enabled: true,
                    shared: true,
                    customizeTooltip(info) {
                        const content = [
                            "<div><div class='tooltip-header'></div>",
                            "<div class='tooltip-body'><div class='series-name'>",
                            "<span class='top-series-name'></span>",
                            ": </div><div class='value-text'>",
                            "<span class='top-series-value'></span>",
                            "</div><div class='series-name'>",
                            "<span class='bottom-series-name'></span>",
                            ": </div><div class='value-text'>",
                            "<span class='bottom-series-value'></span>",
                            "% </div></div></div>",
                        ].join("");

                        const htmlContent = $(content);

                        htmlContent.find(".tooltip-header").text(info.argumentText);
                        htmlContent.find(".top-series-name").text(info.points[0].seriesName);
                        htmlContent.find(".top-series-value").text(info.points[0].valueText);
                        htmlContent.find(".bottom-series-name").text(info.points[1].seriesName);
                        htmlContent.find(".bottom-series-value").text(info.points[1].valueText);

                        return {
                            html: $("<div>").append(htmlContent).html(),
                        };
                    },
                },
                valueAxis: [
                    {
                        name: "frequency",
                        position: "left",
                        tickInterval: 5,
                    },
                    {
                        name: "percentage",
                        position: "right",
                        showZero: true,
                        label: {
                            customizeText(info) {
                                return `${info.valueText}%`;
                            },
                        },
                        constantLines: [
                            {
                                value: 80,
                                color: "#fc3535",
                                dashStyle: "dash",
                                width: 2,
                                label: { visible: false },
                            },
                        ],
                        tickInterval: 20,
                        valueMarginsEnabled: false,
                    },
                ],
                commonSeriesSettings: {
                    argumentField: "complaint",
                },
                export: {
                    enabled: true,
                },
                series: [
                    {
                        type: "bar",
                        valueField: "count",
                        axis: "frequency",
                        name: "Concerns frequency",
                        color: "#fac29a",
                    },
                    {
                        type: "spline",
                        valueField: "cumulativePercentage",
                        axis: "percentage",
                        name: "Cumulative percentage",
                        color: "#6b71c3",
                    },
                ],
                legend: {
                    verticalAlignment: "top",
                    horizontalAlignment: "center",
                },
            });

            // SECOND GRAPH

            dataSource = dataSourceLine;
            $("#chart_line").dxChart({
                palette: "Harmony Light",
                dataSource,
                commonSeriesSettings: {
                    type: "spline",
                    argumentField: "year",
                    label: {
                        format: { style: "currency", currency: "EUR" },
                        // customizeLabel(arg) {
                        //     return "poop";
                        //     return `${arg.valueText} LOL`;
                        // },
                    },
                },
                commonAxisSettings: {
                    grid: {
                        visible: true,
                    },
                },
                margin: {
                    bottom: 20,
                },
                series: [
                    {
                        valueField: "bau",
                        name: "Business As Usual",
                    },
                    {
                        valueField: "prj",
                        name: "Project",
                    },
                ],

                tooltip: {
                    enabled: true,
                    format: {
                        type: "currency",
                        currency: "USD",
                        precision: 2,
                    },
                },
                legend: {
                    verticalAlignment: "top",
                    horizontalAlignment: "center",
                },
                export: {
                    enabled: true,
                },
                argumentAxis: {
                    label: {
                        // format: {
                        //     type: "decimal",
                        // },
                    },
                    allowDecimals: true,
                    axisDivisionFactor: 60,
                },
                title: "Quality Concerns Cost Over Time",
            });
            // .dxChart("instance");
        });
    }, 1000);
});
