const chart = (yearArr, dataArr) => {
    Highcharts.setOptions({
        colors: ['#058DC7', '#50B432','orange', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });

    Highcharts.chart('container', {
        chart: {
            type: 'column', 
            height: (16 / 16 * 100) + '%' // 16:16 ratio
        },
        title: {
            text: 'Result',
            align: 'left',
            style: {"color" : "blue", "font-size" : "1.7rem"}
            
        },
        xAxis: {
            categories: yearArr,
            // categories: ['1', '2', '3', '4', '5'],
            title: {
                text: 'Years'
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Savings'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            },
            reversedStacks: false
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            // floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                var tooltip = '<table><caption style="text-align: left">After ' + this.x + ' Year/s:</caption><tbody>';
                //loop each point in this.points
                this.points.forEach(point => {
                    tooltip += '<tr><th style="color: ' + point.series.color + '">' + point.series.name + ': </th>'
                        + '<td style="text-align: right">$' + point.y + '</td></tr>'
                });
                tooltip += '<tr><th>Total: </th>'
                    + '<td style="text-align: right"><b>$' + +this.points[0].total + '</b></td></tr></tbody></table>';

                return tooltip;
            },
            useHTML: true,
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: dataArr
        // series: [{
        //     name: 'Initial Principal',
        //     data: [5, 3, 4, 7, 2]
        // }, {
        //     name: 'Regular Deposits',
        //     data: [2, 2, 3, 2, 1]
        // }, {
        //     name: 'Additional Investment',
        //     data: [3, 4, 4, 2, 5]
        // }, {
        //     name: 'Total Interest',
        //     data: [3, 4, 4, 2, 5]
        // },
        // ]
    });
}