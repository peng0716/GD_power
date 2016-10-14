

/*地图*/
var allMap = echarts.init(document.getElementById('guangdongMap'));
var optionRecover = {
    backgroundColor:'#fff',
    title:{   //标题组件
        show:true,
        text:'电费GIS数据分析',
        link:'http://ecp.sgcc.com.cn/',
        left:10,
        top:10,
        textStyle:{
            fontWeight:'bolder',
            fontFamily:'微软雅黑',
        },
    },
    tooltip:{
        trigger:'item',
        /*formatter:'{a}<br />{b}：{c}' + '(万)',*/
        formatter:function(params){
            if($('#arrears').hasClass('allButtonA_Hover')){
                return '欠费金额' + '<br />' + params.name + '：' + params.value + '（万）';
            }else{
                return '回收金额' + '<br />' + params.name + '：' + params.value + '（万）';
            }
        }
    },
    toolbox:{    //工具栏组件
        show:true,
        feature:{
            /*dataView: {readOnly: false},
            restore: {},*/
            saveAsImage: {}
        },
        top:10,
        right:10,
    },
    visualMap: {
        min: 0,
        max: 60000,
        left: 10,
        bottom:10,
        selectedMode:'single',
        text: ['高','低'],
    },
    series : [
        {
            name: '回收金额',
            type: 'map',
            mapType: '广东',
            mapValueCalculation:'min',
            zoom:1.1,
            selectedMode:'single',
            data:recoverData,
            itemStyle: {
                emphasis: {
                    areaColor: '#1A7597',
                }
            },
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: true,
                    textStyle:{
                        color:'#fff'
                    },
                }
            },
        },
    ],
}
allMap.setOption(optionRecover);

/*饼图*/
var allPie = echarts.init(document.getElementById('allPie'));
var optionPie = {
    backgroundColor:'#fff',
    title:{   //标题组件
        show:true,
        text:'电费占比分析',
        left:10,
        top:10,
        textStyle:{
            fontWeight:'bolder',
            fontFamily:'微软雅黑',
        },
    },
    tooltip: {
        trigger: 'item',
        formatter:function(params){
            if($('#arrears').hasClass('allButtonA_Hover')){
                return '欠费金额' + '<br />' + params.name + '：' + params.value + '（' + params.percent + '%）';
            }else{
                return '回收金额' + '<br />' + params.name + '：' + params.value + '（' + params.percent + '%）';
            }
        }
    },
    legend: {
        right:10,
        bottom:20,
        height:'60%',
        orient:'vertical',
        data:sequence(recoverData)[3],
    },
    toolbox:{    //工具栏组件
        show:true,
        feature:{
            saveAsImage: {}
        },
        top:10,
        right:10,
    },
    series: [
        {
            name:'回收金额',
            type:'pie',
            radius : '65%',
            center: ['40%', '50%'],
            data:sequence(recoverData)[3]
        }
    ]
}
allPie.setOption(optionPie);

/*柱形图*/
var columnarBar = echarts.init(document.getElementById('columnarBar'));
var optionBar = {
    backgroundColor:'#fff',
    title:{   //标题组件
        show:true,
        text:'电费数据分析',
        left:10,
        top:10,
        textStyle:{
            fontWeight:'bolder',
            fontFamily:'微软雅黑',
        },
    },
    tooltip : {
        trigger: 'axis',
        formatter:function(params) {
            if ($('#arrears').hasClass('allButtonA_Hover')) {
                return '欠费金额' + '<br />' + params[0].name + '：' + params[0].value + '(万)';
            } else {
                return '回收金额' + '<br />' + params[0].name + '：' + params[0].value + '（万）';
            }
        },
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    toolbox:{    //工具栏组件
        show:true,
        feature:{
            saveAsImage: {}
        },
        top:10,
        right:10,
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            splitLine: {show: false},
            data :sequence(recoverData)[4],
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'回收金额',
            type:'bar',
            itemStyle:{
                normal:{
                    color:'#EA912F',
                },
            },
            data:sequence(recoverData)[5],
        }
    ]
}
columnarBar.setOption(optionBar);

/*图例联动*/
allPie.group = 'group1',
columnarBar.group = 'group1',
    echarts.connect('group1');

/*柱形图动画*/
var allLine = echarts.init(document.getElementById('allLine'));
var dataMap = {};
function dataFormatter(obj) {
    var temp;
    var pList = traversal(arrearsData)[0];
    for (var month = 1; month <= 12; month++) {
        var max = 0;
        var sum = 0;
        temp = obj[month];
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[month][i] = {
                name : pList[i],
                value : temp[i]
            }
        }
        obj[month + 'max'] = Math.floor(max / 100) * 100;   //最大值
        obj[month + 'sum'] = sum.toFixed(2);  //每月的总数
    }
    return obj;
}

dataMap.dataQF = dataFormatter({
    1:traversal(recoverData1)[1],
    2:traversal(recoverData2)[1],
    3:traversal(recoverData3)[1],
    4:traversal(recoverData4)[1],
    5:traversal(recoverData5)[1],
    6:traversal(recoverData6)[1],
    7:traversal(recoverData7)[1],
    8:traversal(recoverData8)[1],
    9:traversal(recoverData9)[1],
    10:traversal(recoverData10)[1],
    11:traversal(recoverData11)[1],
    12:traversal(recoverData12)[1],
});

dataMap.dataHS = dataFormatter({
    1:traversal(arrearsData1)[1],
    2:traversal(arrearsData2)[1],
    3:traversal(arrearsData3)[1],
    4:traversal(arrearsData4)[1],
    5:traversal(arrearsData5)[1],
    6:traversal(arrearsData6)[1],
    7:traversal(arrearsData7)[1],
    8:traversal(arrearsData8)[1],
    9:traversal(arrearsData9)[1],
    10:traversal(arrearsData10)[1],
    11:traversal(arrearsData11)[1],
    12:traversal(arrearsData12)[1],
});

var optionLine = {
    baseOption: {
        backgroundColor:'#fff',
        timeline: {   //播放器设置
            axisType: 'category',
            autoPlay: true,
            playInterval: 2000,
            data: [
                '1','2','3',
                {
                    value: '4',
                    tooltip: {
                        formatter: '{b}'
                    },
                    symbol: 'diamond',
                    symbolSize: 16
                },
                '5','6','7',
                {
                    value: '8',
                    tooltip: {
                        formatter: function (params) {
                            return params.name;
                        }
                    },
                    symbol: 'diamond',
                    symbolSize: 18
                },
                '9','10','11','12',
            ],
        },
        title: {
            subtext: '虚拟数据'
        },
        tooltip: {},
        legend: {
            x: 'right',
            data: ['欠费', '回收'],
            /*selected: {
                'GDP': false, '金融': false, '房地产': false,'第三产业':false,
            }*/
        },
        calculable : true,
        grid: {
            top: 80,
            bottom: 100
        },
        xAxis: [
            {
                'type':'category',
                'axisLabel':{'interval':0},
                'data':traversal(arrearsData)[0],
                splitLine: {show: false}
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '万元',
                max: 15000
            }
        ],
        series: [
            {
                name: '欠费',
                type: 'bar',
                tooltip:{
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                }
            },
            {
                name: '回收',
                type: 'line',
                symbolSize:6,
                smooth:true,
                itemStyle: {
                    normal: {
                        color: 'rgb(78,143,255)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1,
                            color: 'rgb(211,84,81)'
                        }, {
                            offset: 0,
                            color: 'rgb(36,117,255)'
                        }])
                    }
                },
            },
            {
                color:['#D53A35','#639CFF'],
                name: '比例',
                type: 'pie',
                center: ['75%', '25%'],
                radius: '20%',
                tooltip : {
                    formatter:'{a}<br />{b}：{c}({d}%)',
                },
            }
        ]
    },
    options: [
        {
            title: {text: '一月电费数据'},
            series: [
                {data: dataMap.dataQF['1']},
                {data: dataMap.dataHS['1']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['1sum']},
                    {name: '回收', value: dataMap.dataHS['1sum']},
                ]}
            ]
        },
        {
            title : {text: '二月电费数据'},
            series: [
                {data: dataMap.dataQF['2']},
                {data: dataMap.dataHS['2']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['2sum']},
                    {name: '回收', value: dataMap.dataHS['2sum']},
                ]}
            ]
        },
        {
            title : {text: '三月电费数据'},
            series: [
                {data: dataMap.dataQF['3']},
                {data: dataMap.dataHS['3']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['3sum']},
                    {name: '回收', value: dataMap.dataHS['3sum']},
                ]}
            ]
        },
        {
            title : {text: '四月电费数据'},
            series : [
                {data: dataMap.dataQF['4']},
                {data: dataMap.dataHS['4']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['4sum']},
                    {name: '回收', value: dataMap.dataHS['4sum']},
                ]}
            ]
        },
        {
            title : {text: '五月电费数据'},
            series : [
                {data: dataMap.dataQF['5']},
                {data: dataMap.dataHS['5']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['5sum']},
                    {name: '回收', value: dataMap.dataHS['5sum']},
                ]}
            ]
        },
        {
            title : {text: '六月电费数据'},
            series : [
                {data: dataMap.dataQF['6']},
                {data: dataMap.dataHS['6']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['6sum']},
                    {name: '回收', value: dataMap.dataHS['6sum']},
                ]}
            ]
        },
        {
            title : {text: '七月电费数据'},
            series : [
                {data: dataMap.dataQF['7']},
                {data: dataMap.dataHS['7']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['7sum']},
                    {name: '回收', value: dataMap.dataHS['7sum']},
                ]}
            ]
        },
        {
            title : {text: '八月电费数据'},
            series : [
                {data: dataMap.dataQF['8']},
                {data: dataMap.dataHS['8']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['8sum']},
                    {name: '回收', value: dataMap.dataHS['8sum']},
                ]}
            ]
        },
        {
            title : {text: '九月电费数据'},
            series : [
                {data: dataMap.dataQF['9']},
                {data: dataMap.dataHS['9']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['9sum']},
                    {name: '回收', value: dataMap.dataHS['9sum']},
                ]}
            ]
        },
        {
            title : {text: '十月电费数据'},
            series : [
                {data: dataMap.dataQF['10']},
                {data: dataMap.dataHS['10']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['10sum']},
                    {name: '回收', value: dataMap.dataHS['10sum']},
                ]}
            ]
        },
        {
            title : {text: '十一月电费数据'},
            series : [
                {data: dataMap.dataQF['11']},
                {data: dataMap.dataHS['11']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['11sum']},
                    {name: '回收', value: dataMap.dataHS['11sum']},
                ]}
            ]
        },
        {
            title : {text: '十二月电费数据'},
            series : [
                {data: dataMap.dataQF['12']},
                {data: dataMap.dataHS['12']},
                {data: [
                    {name: '欠费', value: dataMap.dataQF['12sum']},
                    {name: '回收', value: dataMap.dataHS['12sum']},
                ]}
            ]
        }
    ]
};
allLine.setOption(optionLine);

$(function(){
    /*回收欠费按钮点击*/
    $('.allButtonA').click(function(){
        $('.allButtonA').removeClass('allButtonA_Hover');
        $(this).addClass('allButtonA_Hover');
        if($('#arrears').hasClass('allButtonA_Hover')){    //欠费
            $('#timeRadio').val(0);   //下拉框变成默认
            optionRecover = {
                tooltip:{
                    trigger:'item',
                    formatter:function(params){
                        if($('#arrears').hasClass('allButtonA_Hover')){
                            return '欠费金额' + '<br />' + params.name + '：' + params.value + '（万）';
                        }else{
                            return params.seriesName + '<br />' + params.name + '：' + params.value + '（万）';
                        }
                    }
                },
                visualMap : {
                    max: 10000,
                },
                series : [
                    {
                        name:'欠费金额',
                        data:arrearsData,
                    }
                ]
            }
            console.log(optionRecover.series);
            allMap.setOption(optionRecover);
            optionPie = {
                legend : {
                    data:sequence(arrearsData)[3],
                },
                series : {
                    name:'欠费金额',
                    data:sequence(arrearsData)[3],
                }
            }
            allPie.setOption(optionPie);
            optionBar = {
                xAxis : [
                    {
                        type : 'category',
                        data :sequence(arrearsData)[4],
                    }
                ],
                series : [
                    {
                        name:'欠费金额',
                        type:'bar',
                        data:sequence(arrearsData)[5],
                    }
                ]
            }
            columnarBar.setOption(optionBar);
        }else{
            $('#timeRadio').val(0);
            optionRecover = {
                visualMap : {
                    max: 60000,
                },
                series : {
                    name:'回收金额',
                    data:recoverData,
                }
            }
            allMap.setOption(optionRecover);
            optionPie = {
                legend : {
                    data:sequence(recoverData)[3],
                },
                series : {
                    name:'回收金额',
                    data:sequence(recoverData)[3],
                }
            }
            allPie.setOption(optionPie);
            optionBar = {
                xAxis : [
                    {
                        type : 'category',
                        data :sequence(recoverData)[4],
                    }
                ],
                series : [
                    {
                        name:'欠费金额',
                        type:'bar',
                        data:sequence(recoverData)[5],
                    }
                ]
            }
            columnarBar.setOption(optionBar);
        }
    });
    /*下拉框选择*/
    $('#timeRadio').change(function(){
        if($('#recover').hasClass('allButtonA_Hover')){     //回收
            if($('#timeRadio').val() === '1'){
                optionRecover = {
                    tooltip:{
                        trigger:'item',
                        formatter:'{a}<br />{b}：{c}' + '(万)',
                    },
                    visualMap : {
                        max: 9000,
                    },
                    series : [
                        {
                            name:'欠费金额',
                            data:recoverData1,
                        }
                    ]
                }
                allMap.setOption(optionRecover);
                optionPie = {
                    legend : {
                        data:sequence(recoverData1)[3],
                    },
                    series : {
                        name:'欠费金额',
                        data:sequence(recoverData1)[3],
                    }
                }
                allPie.setOption(optionPie);
                optionBar = {
                    xAxis : [
                        {
                            type : 'category',
                            data :sequence(recoverData1)[4],
                        }
                    ],
                    series : [
                        {
                            name:'欠费金额',
                            type:'bar',
                            data:sequence(recoverData1)[5],
                        }
                    ]
                }
                columnarBar.setOption(optionBar);
            }else if($('#timeRadio').val() === '2'){
                optionRecover = {
                    tooltip:{
                        trigger:'item',
                        formatter:'{a}<br />{b}：{c}' + '(万)',
                    },
                    visualMap : {
                        max: 13000,
                    },
                    series : [
                        {
                            name:'欠费金额',
                            data:recoverData2,
                        }
                    ]
                }
                allMap.setOption(optionRecover);
                optionPie = {
                    legend : {
                        data:sequence(recoverData2)[3],
                    },
                    series : {
                        name:'欠费金额',
                        data:sequence(recoverData2)[3],
                    }
                }
                allPie.setOption(optionPie);
                optionBar = {
                    xAxis : [
                        {
                            type : 'category',
                            data :sequence(recoverData2)[4],
                        }
                    ],
                    series : [
                        {
                            name:'欠费金额',
                            type:'bar',
                            data:sequence(recoverData2)[5],
                        }
                    ]
                }
                columnarBar.setOption(optionBar);
            }else if($('#timeRadio').val() === '3'){
                optionRecover = {
                    tooltip:{
                        trigger:'item',
                        formatter:'{a}<br />{b}：{c}' + '(万)',
                    },
                    visualMap : {
                        max: 14000,
                    },
                    series : [
                        {
                            name:'欠费金额',
                            data:recoverData3,
                        }
                    ]
                }
                allMap.setOption(optionRecover);
                optionPie = {
                    legend : {
                        data:sequence(recoverData3)[3],
                    },
                    series : {
                        name:'欠费金额',
                        data:sequence(recoverData3)[3],
                    }
                }
                allPie.setOption(optionPie);
                optionBar = {
                    xAxis : [
                        {
                            type : 'category',
                            data :sequence(recoverData3)[4],
                        }
                    ],
                    series : [
                        {
                            name:'欠费金额',
                            type:'bar',
                            data:sequence(recoverData3)[5],
                        }
                    ]
                }
                columnarBar.setOption(optionBar);
            }else{
                optionRecover = {
                    visualMap : {
                        max: 60000,
                    },
                    series : {
                        name:'回收金额',
                        data:recoverData,
                    }
                }
                allMap.setOption(optionRecover);
                optionPie = {
                    legend : {
                        data:sequence(recoverData)[3],
                    },
                    series : {
                        name:'回收金额',
                        data:sequence(recoverData)[3],
                    }
                }
                allPie.setOption(optionPie);
                optionBar = {
                    xAxis : [
                        {
                            type : 'category',
                            data :sequence(recoverData)[4],
                        }
                    ],
                    series : [
                        {
                            name:'欠费金额',
                            type:'bar',
                            data:sequence(recoverData)[5],
                        }
                    ]
                }
                columnarBar.setOption(optionBar);
            }
        }else{
            if($('#timeRadio').val() === '1'){
                optionRecover = {
                    tooltip:{
                        trigger:'item',
                        formatter:'{a}<br />{b}：{c}' + '(万)',
                    },
                    visualMap : {
                        max: 2000,
                    },
                    series : [
                        {
                            name:'欠费金额',
                            data:arrearsData1,
                        }
                    ]
                }
                allMap.setOption(optionRecover);
                optionPie = {
                    legend : {
                        data:sequence(arrearsData1)[3],
                    },
                    series : {
                        name:'欠费金额',
                        data:sequence(arrearsData1)[3],
                    }
                }
                allPie.setOption(optionPie);
                optionBar = {
                    xAxis : [
                        {
                            type : 'category',
                            data :sequence(arrearsData1)[4],
                        }
                    ],
                    series : [
                        {
                            name:'欠费金额',
                            type:'bar',
                            data:sequence(arrearsData1)[5],
                        }
                    ]
                }
                columnarBar.setOption(optionBar);
            }else if($('#timeRadio').val() === '2'){
                optionRecover = {
                    tooltip:{
                        trigger:'item',
                        formatter:'{a}<br />{b}：{c}' + '(万)',
                    },
                    visualMap : {
                        max: 2600,
                    },
                    series : [
                        {
                            name:'欠费金额',
                            data:arrearsData2,
                        }
                    ]
                }
                allMap.setOption(optionRecover);
                optionPie = {
                    legend : {
                        data:sequence(arrearsData2)[3],
                    },
                    series : {
                        name:'欠费金额',
                        data:sequence(arrearsData2)[3],
                    }
                }
                allPie.setOption(optionPie);
                optionBar = {
                    xAxis : [
                        {
                            type : 'category',
                            data :sequence(arrearsData2)[4],
                        }
                    ],
                    series : [
                        {
                            name:'欠费金额',
                            type:'bar',
                            data:sequence(arrearsData2)[5],
                        }
                    ]
                }
                columnarBar.setOption(optionBar);
            }else if($('#timeRadio').val() === '3'){
                optionRecover = {
                    tooltip:{
                        trigger:'item',
                        formatter:'{a}<br />{b}：{c}' + '(万)',
                    },
                    visualMap : {
                        max: 3700,
                    },
                    series : [
                        {
                            name:'欠费金额',
                            data:arrearsData3,
                        }
                    ]
                }
                allMap.setOption(optionRecover);
                optionPie = {
                    legend : {
                        data:sequence(arrearsData3)[3],
                    },
                    series : {
                        name:'欠费金额',
                        data:sequence(arrearsData3)[3],
                    }
                }
                allPie.setOption(optionPie);
                optionBar = {
                    xAxis : [
                        {
                            type : 'category',
                            data :sequence(arrearsData3)[4],
                        }
                    ],
                    series : [
                        {
                            name:'欠费金额',
                            type:'bar',
                            data:sequence(arrearsData3)[5],
                        }
                    ]
                }
                columnarBar.setOption(optionBar);
            }else{
                optionRecover = {
                    tooltip:{
                        trigger:'item',
                        formatter:'{a}<br />{b}：{c}' + '(万)',
                    },
                    visualMap : {
                        max: 10000,
                    },
                    series : [
                        {
                            name:'欠费金额',
                            data:arrearsData,
                        }
                    ]
                }
                allMap.setOption(optionRecover);
                optionPie = {
                    legend : {
                        data:sequence(arrearsData)[3],
                    },
                    series : {
                        name:'欠费金额',
                        data:sequence(arrearsData)[3],
                    }
                }
                allPie.setOption(optionPie);
                optionBar = {
                    xAxis : [
                        {
                            type : 'category',
                            data :sequence(arrearsData)[4],
                        }
                    ],
                    series : [
                        {
                            name:'欠费金额',
                            type:'bar',
                            data:sequence(arrearsData)[5],
                        }
                    ]
                }
                columnarBar.setOption(optionBar);
            }
        }
    });
    /*地图点击事件*/
    allMap.on('click',function(params){
        console.log(params);
        if(params.name === '韶关市'){
            if($('#recover').hasClass('allButtonA_Hover')){  //回收
                if($('#timeRadio').val() === '1'){   //月数据
                    optionPie = {
                        legend : {
                            data:sequence(recoverSG1)[0],
                        },
                        series : {
                            data:sequence(recoverSG1)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(recoverSG1)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(recoverSG1)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else if($('#timeRadio').val() === '2'){
                    optionPie = {
                        legend : {
                            data:sequence(recoverSG2)[0],
                        },
                        series : {
                            data:sequence(recoverSG2)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(recoverSG2)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(recoverSG2)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else if($('#timeRadio').val() === '3'){
                    optionPie = {
                        legend : {
                            data:sequence(recoverSG3)[0],
                        },
                        series : {
                            data:sequence(recoverSG3)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(recoverSG3)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(recoverSG3)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else{  //总数据
                    optionPie = {
                        legend : {
                            data:sequence(recoverSG)[0],
                        },
                        series : {
                            data:sequence(recoverSG)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(recoverSG)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(recoverSG)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }
            }else{   //欠费
                if($('#timeRadio').val() === '1'){
                    optionPie = {
                        legend : {
                            data:sequence(arrearsSG1)[0],
                        },
                        series : {
                            data:sequence(arrearsSG1)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(arrearsSG1)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(arrearsSG1)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else if($('#timeRadio').val() === '2'){
                    optionPie = {
                        legend : {
                            data:sequence(arrearsSG2)[0],
                        },
                        series : {
                            data:sequence(arrearsSG2)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(arrearsSG2)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(arrearsSG2)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else if($('#timeRadio').val() === '3'){
                    optionPie = {
                        legend : {
                            data:sequence(arrearsSG3)[0],
                        },
                        series : {
                            data:sequence(arrearsSG3)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(arrearsSG3)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(arrearsSG3)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else{  //总数据
                    optionPie = {
                        legend : {
                            data:sequence(arrearsSG)[0],
                        },
                        series : {
                            data:sequence(arrearsSG)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(arrearsSG)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(arrearsSG)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }
            }
        }else if(params.name === '广州市'){
            if($('#recover').hasClass('allButtonA_Hover')){  //回收
                if($('#timeRadio').val() === '1'){   //月数据
                    optionPie = {
                        legend : {
                            data:sequence(recoverGZ1)[0],
                        },
                        series : {
                            data:sequence(recoverGZ1)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(recoverGZ1)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(recoverGZ1)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else if($('#timeRadio').val() === '2'){
                    optionPie = {
                        legend : {
                            data:sequence(recoverGZ2)[0],
                        },
                        series : {
                            data:sequence(recoverGZ2)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(recoverGZ2)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(recoverGZ2)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else if($('#timeRadio').val() === '3'){
                    optionPie = {
                        legend : {
                            data:sequence(recoverGZ3)[0],
                        },
                        series : {
                            data:sequence(recoverGZ3)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(recoverGZ3)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(recoverGZ3)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else{  //总数据
                    optionPie = {
                        legend : {
                            data:sequence(recoverGZ)[0],
                        },
                        series : {
                            data:sequence(recoverGZ)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(recoverGZ)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(recoverGZ)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }
            }else{   //欠费
                if($('#timeRadio').val() === '1'){
                    optionPie = {
                        legend : {
                            data:sequence(arrearsGZ1)[0],
                        },
                        series : {
                            data:sequence(arrearsGZ1)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(arrearsGZ1)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(arrearsGZ1)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else if($('#timeRadio').val() === '2'){
                    optionPie = {
                        legend : {
                            data:sequence(arrearsGZ2)[0],
                        },
                        series : {
                            data:sequence(arrearsGZ2)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(arrearsGZ2)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(arrearsGZ2)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else if($('#timeRadio').val() === '3'){
                    optionPie = {
                        legend : {
                            data:sequence(arrearsGZ3)[0],
                        },
                        series : {
                            data:sequence(arrearsGZ3)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(arrearsGZ3)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(arrearsGZ3)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }else{  //总数据
                    optionPie = {
                        legend : {
                            data:sequence(arrearsGZ)[0],
                        },
                        series : {
                            data:sequence(arrearsGZ)[0],
                        }
                    }
                    allPie.setOption(optionPie);
                    optionBar = {
                        xAxis : [
                            {
                                data :sequence(arrearsGZ)[1],
                            }
                        ],
                        series : [
                            {
                                data:sequence(arrearsGZ)[2],
                            }
                        ]
                    }
                    columnarBar.setOption(optionBar);
                }
            }
        }
    })

})