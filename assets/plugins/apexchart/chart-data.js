'use strict';

$(document).ready(function() {

	function generateData(baseval, count, yrange) {
		var i = 0;
		var series = [];
		while (i < count) {
			var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
			var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
			var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

			series.push([x, y, z]);
			baseval += 86400000;
			i++;
		}
		return series;
	}


	// Column chart
    if($('#sales_chart').length > 0 ){
    	var columnCtx = document.getElementById("sales_chart"),
    	columnConfig = {
    		colors: ['#7638ff', '#fda600'],
    		series: [
    			{
    			name: "Received",
    			type: "column",
    			data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50]
    			},
    			{
    			name: "Pending",
    			type: "column",
    			data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 80]
    			}
    		],
    		chart: {
    			type: 'bar',
    			fontFamily: 'Poppins, sans-serif',
    			height: 350,
    			toolbar: {
    				show: false
    			}
    		},
    		plotOptions: {
    			bar: {
    				horizontal: false,
    				columnWidth: '60%',
    				endingShape: 'rounded'
    			},
    		},
    		dataLabels: {
    			enabled: false
    		},
    		stroke: {
    			show: true,
    			width: 2,
    			colors: ['transparent']
    		},
    		xaxis: {
    			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    		},
    		yaxis: {
    			title: {
    				text: '$ (thousands)'
    			}
    		},
    		fill: {
    			opacity: 1
    		},
    		tooltip: {
    			y: {
    				formatter: function (val) {
    					return "$ " + val + " thousands"
    				}
    			}
    		}
    	};
    	var columnChart = new ApexCharts(columnCtx, columnConfig);
    	columnChart.render();
    }

	//Pie Chart
    if($('#invoice_chart').length > 0 ){
    	var pieCtx = document.getElementById("invoice_chart"),
    	pieConfig = {
    		colors: ['#7638ff', '#ff737b', '#fda600', '#1ec1b0'],
    		series: [55, 40, 20, 10],
    		chart: {
    			fontFamily: 'Poppins, sans-serif',
    			height: 350,
    			type: 'donut',
    		},
    		labels: ['Paid', 'Unpaid', 'Overdue', 'Draft'],
    		legend: {show: false},
    		responsive: [{
    			breakpoint: 480,
    			options: {
    				chart: {
    					width: 200
    				},
    				legend: {
    					position: 'bottom'
    				}
    			}
    		}]
    	};
    	var pieChart = new ApexCharts(pieCtx, pieConfig);
    	pieChart.render();
	}
	
	// Simple Line
    if($('#s-line').length > 0 ){
    var sline = {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      // colors: ['#4361ee'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f1f2f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    }

    var chart = new ApexCharts(
      document.querySelector("#s-line"),
      sline
    );

    chart.render();
    }


// Simple Line Area
 if($('#s-line-area').length > 0 ){
var sLineArea = {
    chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        }
    },
    // colors: ['#4361ee', '#888ea8'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }],

    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00"],                
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    }
}

var chart = new ApexCharts(
    document.querySelector("#s-line-area"),
    sLineArea
);

chart.render();
}

// Simple Column
if($('#s-col').length > 0 ){
var sCol = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'  
        },
    },
    // colors: ['#888ea8', '#4361ee'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }],
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
        title: {
            text: '$ (thousands)'
        }
    },
    fill: {
        opacity: 1

    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "$ " + val + " thousands"
            }
        }
    }
}

var chart = new ApexCharts(
    document.querySelector("#s-col"),
    sCol
);

chart.render();
}


// Simple Column Stacked
if($('#s-col-stacked').length > 0 ){
var sColStacked = {
    chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        }
    },
    // colors: ['#4361ee', '#888ea8', '#e3e4eb', '#d3d3d3'],
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    plotOptions: {
        bar: {
            horizontal: false,
        },
    },
    series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
    },{
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
    },{
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
    },{
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
    }],
    xaxis: {
        type: 'datetime',
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
    },
    legend: {
        position: 'right',
        offsetY: 40
    },
    fill: {
        opacity: 1
    },
}

var chart = new ApexCharts(
    document.querySelector("#s-col-stacked"),
    sColStacked
);

chart.render();
}

// Simple Bar
if($('#s-bar').length > 0 ){
var sBar = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        }
    },
    // colors: ['#4361ee'],
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
    }
}

var chart = new ApexCharts(
    document.querySelector("#s-bar"),
    sBar
);

chart.render();
}

// Mixed Chart
if($('#mixed-chart').length > 0 ){
var options = {
  chart: {
    height: 350,
    type: 'line',
    toolbar: {
      show: false,
    }
  },
  // colors: ['#4361ee', '#888ea8'],
  series: [{
    name: 'Website Blog',
    type: 'column',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
  }, {
    name: 'Social Media',
    type: 'line',
    data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
  }],
  stroke: {
    width: [0, 4]
  },
  title: {
    text: 'Traffic Sources'
  },
  labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
  xaxis: {
    type: 'datetime'
  },
  yaxis: [{
    title: {
      text: 'Website Blog',
    },

  }, {
    opposite: true,
    title: {
      text: 'Social Media'
    }
  }]

}

var chart = new ApexCharts(
  document.querySelector("#mixed-chart"),
  options
);

chart.render();
}

// Donut Chart

if($('#donut-chart').length > 0 ){
var donutChart = {
    chart: {
        height: 350,
        type: 'donut',
        toolbar: {
          show: false,
        }
    },
    // colors: ['#4361ee', '#888ea8', '#e3e4eb', '#d3d3d3'],
    series: [60,20,20],
    labels:['Paypal','Stripe','Bank Transfer'],
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            },
            labels: {
              show: true,
            },
            series:{
              show:false,
            }
        }
    }]
}

var donut = new ApexCharts(
    document.querySelector("#donut-chart"),
    donutChart
);

donut.render();
}

// Radial Chart
if($('#radial-chart').length > 0 ){
var radialChart = {
    chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: false,
        }
    },
    // colors: ['#4361ee', '#888ea8', '#e3e4eb', '#d3d3d3'],
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: 'Total',
                    formatter: function (w) {
                        return 249
                    }
                }
            }
        }
    },
    series: [44, 55, 67, 83],
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],    
}

var chart = new ApexCharts(
    document.querySelector("#radial-chart"),
    radialChart
);

chart.render();
}

if($('#deals-year').length > 0 ){
    var options = {
      series: [{
        name: "Deals",
        data: [10, 20, 30, 15, 22, 40, 30, 20, 30, 18, 30, 60]
    }],
      chart: {
      height: 273,
      type: 'area',
      zoom: {
        enabled: false
      }
    },
    colors: ['#E41F07'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
          labels: {
            formatter: (val) => {
              return val / 1 + 'K'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
    };

    var chart = new ApexCharts(document.querySelector("#deals-year"), options);
    chart.render();
}

if($('#contact-report').length > 0 ){
    var options = {
      series: [{
        name: "Reports",
        data: [40, 30, 20, 30, 22, 20, 30, 20, 22, 30, 15, 20]
    }],
      chart: {
      height: 273,
      type: 'area',
      zoom: {
        enabled: false
      }
    },
    colors: ['#4A00E5'],
    dataLabels: {
      enabled: false
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
          labels: {
            formatter: (val) => {
              return val / 1 + 'K'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
    };
    var chart = new ApexCharts(document.querySelector("#contact-report"), options);
    chart.render();
}

if($('#leads-report').length > 0 ){
  var options = {
      series: [{
      name: "Reports",
      colors: ['#FFC38F'],
      data: [{
        x: 'Jan',
        y: 400,
      }, {
        x: 'Feb',
        y: 130
      }, {
        x: 'Mar',
        y: 240
      }, {
        x: 'Apr',
        y: 450
      }, {
        x: 'May',
        y: 250
      }, {
        x: 'Jun',
        y: 180
      }, {
        x: 'Jul',
        y: 300
      }, {
        x: 'Aug',
        y: 240
      }, {
        x: 'Sep',
        y: 300
      }, {
        x: 'Oct',
        y: 150
      }, {
        x: 'Nov',
        y: 250
      },
      {
        x: 'Dec',
        y: 500
      }]
    }],
      chart: {
      type: 'bar',
      height: 275,
    },
    plotOptions: {
      bar: {
          borderRadiusApplication: 'around',
          columnWidth: '50%',
      }
    },
    colors: ['#00918E'],
    xaxis: {
      type: 'category',
      group: {
        style: {
          fontSize: '0px',
          fontWeight: 700,
        },
      }
    },
    
    };

    var chart = new ApexCharts(document.querySelector("#leads-report"), options);
    chart.render();
}

if($('#leads-analysis').length > 0 ){
    var options = {
      series: [44, 55, 41, 17],
      chart: {
      type: 'donut',
    },
    colors: ['#0092E4', '#4A00E5' , '#E41F07' , '#FFA201' ],
    labels: ['Campaigns', 'Google', 'Referrals', 'Paid Social'],  
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
        position: 'bottom',
      formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    var chart = new ApexCharts(document.querySelector("#leads-analysis"), options);
    chart.render();
  }
	
if($('#deals-report').length > 0 ){
var sCol = {
    chart: {
        height: 270,
        type: 'bar',
        toolbar: {
          show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'  
        },
    },
    colors: ['#5CB85C', '#FC0027'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [{
        name: 'Won Deals',
        data: [110, 85, 100, 90, 85, 105, 90, 115, 95]
    }, {
        name: 'Lost Deals',
        data: [45, 55, 50, 55, 40, 60, 55, 60, 66]
    }],
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    fill: {
        opacity: 1

    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + " Deals"
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#deals-report"), sCol);
    chart.render();
}

if($('#deals-analysis').length > 0 ){
    var options = {
      series: [44, 55, 41, 17],
      chart: {
      type: 'donut',
    },
    colors: ['#0092E4', '#4A00E5' , '#E41F07' , '#FFA201' ],
    labels: ['Campaigns', 'Google', 'Referrals', 'Paid Social'],  
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    var chart = new ApexCharts(document.querySelector("#deals-analysis"), options);
    chart.render();
  }

if($('#sales_charts').length > 0) {
	var options = {
		series: [{
		name: 'Sales',
		data: [130, 210, 300, 290, 150, 50, 210, 280, 105],
	  }, {
		name: 'Purchase',
		data: [-150, -90, -50, -180, -50, -70, -100, -90, -105]
	  }],
	  colors: ['#28C76F', '#EA5455'],
		chart: {
		type: 'bar',
		height: 320,
		stacked: true,
		
		zoom: {
		  enabled: true
		}
	  },
	  responsive: [{
		breakpoint: 280,
		options: {
		  legend: {
			position: 'bottom',
			offsetY: 0
		  }
		}
	  }],
	  plotOptions: {
		bar: {
		  horizontal: false,
          borderRadius: 4,
        borderRadiusApplication: "end", // "around" / "end" 
        borderRadiusWhenStacked: "all", // "all"/"last"
		  columnWidth: '20%',
		},
	  },
      dataLabels: {
      enabled: false
    },
      // stroke: {
      //     width: 5,
      //     colors: ['#fff']
      //   },
      yaxis: {
          min: -200,
          max: 300,
          tickAmount: 5,
        },
	  xaxis: {
		categories: [' Jan ', 'Feb', 'Mar', 'Apr',
		  'May', 'Jun' , 'Jul' , 'Aug', 'Sep'
		],
	  },
	  legend: {show: false},
	  fill: {
		opacity: 1
	  }
	  };

	  var chart = new ApexCharts(document.querySelector("#sales_charts"), options);
	  chart.render();
	}

    if($('#sales-analysis').length > 0 ){
    var options = {
      series: [{
        name: "Sales Analysis",
        data: [25, 30, 18, 15, 22, 20, 30, 20, 22, 18, 15, 20]
    }],
      chart: {
      height: 273,
      type: 'area',
      zoom: {
        enabled: false
      }
    },
    colors: ['#FF9F43'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: '',
      align: 'left'
    },
    // grid: {
    //   row: {
    //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
    //     opacity: 0.5
    //   },
    // },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
          labels: {
            formatter: (val) => {
              return val / 1 + 'K'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
    };

    var chart = new ApexCharts(document.querySelector("#sales-analysis"), options);
    chart.render();
  }


  if($('#contacts-analysis').length > 0 ){
    var options = {
      series: [44, 55, 41, 17],
      chart: {
      type: 'donut',
    },
    colors: ['#4A00E5', '#FFA201' , '#0092E4' , '#E41F07' ],
    labels: ['Campaigns', 'Google', 'Referrals', 'Paid Social'],  
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
       position: 'bottom',  
      formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    var chart = new ApexCharts(document.querySelector("#contacts-analysis"), options);
    chart.render();
  }

  if($('#project-stage').length > 0 ){
    var options = {
      series: [
      {
        name: "",
        data: [1200, 1000, 800, 600, 400, 200],
      },
    ],
      chart: {
      type: 'bar',
      height: 420,
    },
    
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '100%',
        isFunnel: true,
      },
     
    },
    colors: [
      '#4A00E5',
      '#1ECBE2',
      '#FF9D0A',
      '#00918E',
      '#5CB85C',
      '#FC0027',
    ],
    
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] 
      },
      dropShadow: {
        enabled: true,
      },
     
    },
    xaxis: {
      categories: ['Inpipeline : 1454', 'Follow Up : 1454', 'Schedule service : 1454', 'Conversation : 1454', 'Win : 1454', 'Lost : 1454'],
    },
    legend: {
      show: false,
    },
    };

    var chart = new ApexCharts(document.querySelector("#project-stage"), options);
    chart.render();
  } 
    if($('#last-chart').length > 0 ){
      var options = {
          series: [{
          data: [400, 220, 448,]
      }],
          chart: {
          type: 'bar',
          height: 150
      },
    
      plotOptions: {
          bar: {
          horizontal: true,
          }
      },
      dataLabels: {
          enabled: false
      },
     colors: ['#FC0027'],
      xaxis: {
          categories: ['Conversation', 'Follow Up', 'Inpipeline'
          ],
      }
      };

      var chart = new ApexCharts(document.querySelector("#last-chart"), options);
      chart.render();
  }
  if($('#won-chart').length > 0 ){
    var options = {
        series: [{
        data: [400, 122, 250]
    }],
        chart: {
        type: 'bar',
        height: 150
    },
    plotOptions: {
        bar: {
        horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#5CB85C'],
    xaxis: {
        categories: ['Conversation', 'Follow Up', 'Inpipeline'
        ],
    }
    };

    var chart = new ApexCharts(document.querySelector("#won-chart"), options);
    chart.render();
  }

  
if($('#leadpiechart').length > 0 ){
  var options = {
    series: [44, 55, 13, 43],
    chart: {
    width: 400,
    type: 'pie',
  },
      legend: {
        position: 'bottom'
      },
  labels: ['Inpipeline', 'Follow Up', 'Schedule Service', 'Conversation'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 275
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#leadpiechart"), options);
  chart.render();

}

if($('#deals-chart').length > 0 ){
  var options = {
      series: [{
      name: "sales",
      colors: ['#FFC38F'],
      data: [{
        x: 'Inpipeline',
        y: 400,
        
      }, {
        x: 'Follow Up',
        y: 130
      }, {
        x: 'Schedule',
        y: 248
      }, {
        x: 'Conversation',
        y: 470
      }, {
        x: 'Won',
        y: 470
      },{
        x: 'Lost',
        y: 180
      }]
    }],
      chart: {
      type: 'bar',
      height: 260,
    },
    plotOptions: {
      bar: {
          borderRadiusApplication: 'around',
          columnWidth: '40%',
      }
    },
    colors: ['#00918E'],
    xaxis: {
      type: 'category',
      group: {
        style: {
          fontSize: '7px',
          fontWeight: 700,
        },
      }
    },
    
    };

    var chart = new ApexCharts(document.querySelector("#deals-chart"), options);
    chart.render();
}	

    if($('#leads-won-chart').length > 0 ){
      var options = {
          series: [{
          data: [400, 430, 448,]
      }],
          chart: {
          type: 'bar',
          height: 150
      },
      plotOptions: {
          bar: {
          borderRadius: 10,
          horizontal: true,
          }
      },
      dataLabels: {
          enabled: false
      },
      colors: ['#77D882'],
      xaxis: {
          categories: ['Conversation', 'Follow Up', 'Inpipeline'
          ],
      }
      };

      var chart = new ApexCharts(document.querySelector("#leads-won-chart"), options);
      chart.render();
  }

   if($('#last-chart-2').length > 0 ){
      var options = {
          series: [{
          data: [400, 220, 448,]
      }],
          chart: {
          type: 'bar',
          height: 150
      },
    
      plotOptions: {
          bar: {
          horizontal: true,
          }
      },
      dataLabels: {
          enabled: false
      },
     colors: ['#FC0027'],
      xaxis: {
          categories: ['Conversation', 'Follow Up', 'Inpipeline'
          ],
      }
      };

      var chart = new ApexCharts(document.querySelector("#last-chart-2"), options);
      chart.render();
  }

  // Leads-chart
    if($('#leads-chart').length > 0 ){
      var options = {
          series: [{
          name: "sales",
          colors: ['#BEA4F2'],
          data: [{
            x: 'Inpipeline',
            y: 400,
            
          }, {
            x: 'Follow Up',
            y: 30
          }, {
            x: 'Schedule',
            y: 248
          }, {
            x: 'Conversation',
            y: 470
          }, {
            x: 'Won',
            y: 470
          },{
            x: 'Lost',
            y: 180
          }]
        }],
          chart: {
          type: 'bar',
          height: 250,
        },
        plotOptions: {
          bar: {
            columnWidth: '30%',
              borderRadiusApplication: 'around',
          }
        },
        colors: ['#00918E'],
        
        };
  
        var chart = new ApexCharts(document.querySelector("#leads-chart"), options);
        chart.render();
  } 

  // Company Report by Year

  if($('#company-year').length > 0 ){
    var options = {
      series: [{
        name: "Company",
        data: [15, 20, 17, 40, 22, 40, 30, 15, 55, 30, 20, 25]
    }],
      chart: {
      height: 273,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    colors: ['#FFA201'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
          labels: {
            formatter: (val) => {
              return val / 1 + 'K'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
    };

    var chart = new ApexCharts(document.querySelector("#company-year"), options);
    chart.render();
}

// Project Report by Year

  if($('#project-year').length > 0 ){
    var options = {
      series: [{
        name: "project",
        data: [15, 20, 17, 40, 22, 40, 30, 15, 55, 30, 20, 25]
    }],
      chart: {
      height: 273,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    colors: ['#EA00B7'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
          labels: {
            formatter: (val) => {
              return val / 1 + 'K'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
    };

    var chart = new ApexCharts(document.querySelector("#project-year"), options);
    chart.render();
}

// Project stage Report

if($('#project-type').length > 0 ){
    var options = {
      series: [34, 55, 50, 17],
      chart: {
      type: 'donut',
    },
    colors: ['#4A00E5', '#5CB85C' , '#339DFF' , '#FFA201' ],
    labels: ['Plan', 'Completed', 'Develop', 'Design'],  
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
        position: 'bottom',
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    var chart = new ApexCharts(document.querySelector("#project-type"), options);
    chart.render();
  }

// Task Report by Year

  if($('#task-year').length > 0 ){
    var options = {
      series: [{
        name: "Task",
        data: [10, 38, 18, 47, 13, 32, 15, 40, 18, 50, 30, 15]
    }],
      chart: {
      height: 273,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    colors: ['#3C2371'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'stepline'
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
          labels: {
            formatter: (val) => {
              return val / 1 + 'K'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
    };

    var chart = new ApexCharts(document.querySelector("#task-year"), options);
    chart.render();
}

// Task Type Report

if($('#task-type').length > 0 ){
    var options = {
      series: [34, 55, 50, 17],
      chart: {
      type: 'donut',
    },
    colors: ['#4A00E5', '#0092E4' , '#E41F07' , '#FFA201' ],
    labels: ['Calls', 'Meeting', 'Task', 'Email'],  
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
         position: 'bottom',
      formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    var chart = new ApexCharts(document.querySelector("#task-type"), options);
    chart.render();
  }
  
});

if ($('#daily-chart').length > 0) {
  var options = {
      series: [{
          name: 'Tasks',
          data: [12, 19, 15, 20, 14] // Example data for each day
      }],
      chart: {
          type: 'bar',
          height: 140
      },
      colors: ['#4A00E5'],
      plotOptions: {
          bar: {
               borderRadius: 5,
              // horizontal: false,
          },
      },
      dataLabels: {
          enabled: false
      },
      xaxis: {
          categories: ['M', 'T', 'W', 'T', 'F'],
      },
      // legend: {
      //     // position: 'bottom',
      //     // formatter: function(val, opts) {
      //     //     return val + " - " + opts.w.globals.series[opts.seriesIndex].reduce((a, b) => a + b, 0);
      //     // }
      // },
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 300
              },
              legend: {
                  position: 'bottom'
              },
              plotOptions: {
                  bar: {
                       borderRadius: 3,
                  },
              },
          }
      }]
  };

  var chart = new ApexCharts(document.querySelector("#daily-chart"), options);
  chart.render();
};


//payout 

if ($('#pay-chart').length > 0) {
  var options = {
      series: [60, 20, 20],  
      chart: {
          type: 'donut',
          width: '250px', 
      },
      toolbar: {
        show: false,
      },
      labels: ['Paypal', 'Stripe', 'Bank Transfer'],  
      colors: ['#0DCAF0', '#5625E8', '#282B8B'], 
      plotOptions: {
          pie: {
              donut: {
                  size: '70%',
              }
          }
      },
      dataLabels: {
          enabled: false  
      },
      legend: {
          show: true,
          position: 'right',  
          fontSize: '14px'
      },
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 200
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]
  };

  var chart = new ApexCharts(document.querySelector("#pay-chart"), options);
  chart.render();
};
