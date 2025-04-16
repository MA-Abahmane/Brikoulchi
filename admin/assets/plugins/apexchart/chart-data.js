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
    if($('#chart-view').length > 0 ){
    	      
        var options = {
            series: [{
            name: 'series1',
            data: [11, 32, 45, 32, 34, 52, 41],
            colors: [' #4169E1' ]
            
          }, {
            name: 'series2',
            colors: [' #4169E1'],
            data: [31, 40, 28, 51, 42, 109, 100]
          }],
            chart: {
            height: 350,
            type: 'area',
          },
          fill: {
            colors: [' #4169E1', '#4169E1'],
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: "horizontal",
              shadeIntensity: 0.1,
              gradientToColors: undefined, 
              inverseColors: true,
              opacityFrom: 0.5,
              opacityTo: 0.5,
              stops: [0, 50, 100],
              colorStops: []
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 1,
            curve: 'smooth',
            dashArray: [0, 8, 5],
            opacityFrom: 0.5,
            opacityTo: 0.5,
            colors: [' #4169E1'],
          },
          xaxis: {
            type: 'month',
            categories: ["jan", "feb", "march", "april", "may", "june", "july"]
          },
          tooltip: {
           
          },
          };
  
          var chart = new ApexCharts(document.querySelector("#chart-view"), options);
          chart.render();
        
        
    }

    // Bar chart
	
    if ($('#bar').length > 0) {
      var optionsBar = {
        chart: {
          type: 'bar',
          height: 350,
          width: '100%',
          stacked: false,
          toolbar: {
            show: false
          },
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '30%',
          },
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        series: [{
          color: '#000',
          data: [420, 532, 516, 575, 519, 517, 454, 392, 262, 383, 446, 551],
        }],
        labels: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            style: {
              colors: '#777'
            }
          }
        },
        title: {
          text: '',
          align: 'left',
          style: {
            fontSize: '18px'
          }
        }
    
      }
      
      var chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
      chartBar.render();
    }

    // Refund chart
	
	if ($('#refund').length > 0) {
    var optionsBar = {
      chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        stacked: false,
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: '55%',
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ['transparent']
      },
      series: [{
        color: '#333333',
        data: [120, 132, 116, 175, 119, 117, 154, 192, 162, 183, 146, 151],
      }, {
        color: '#4C40ED',
        data: [336, 612, 344, 647, 345, 563, 256, 344, 323, 300, 455, 456],
      }],
      labels: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
      xaxis: {
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: '#777'
          }
        }
      },
      title: {
        text: '',
        align: 'left',
        style: {
          fontSize: '18px'
        }
      }
  
    }
    
    var chartBar = new ApexCharts(document.querySelector('#refund'), optionsBar);
    chartBar.render();
    }

    // Line chart
	
	if ($('#apexcharts-area').length > 0) {
    var options = {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      series: [{
        name: "Registered User",
        color: '#333333',
        data: [45, 60, 75, 51, 42, 42, 30]
      }],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      }
    }
    var chart = new ApexCharts(
      document.querySelector("#apexcharts-area"),
      options
    );
    chart.render();
    }

    // Column chart
    if($('#chart-booking').length > 0 ){
      
      var columnCtx = document.getElementById("chart-booking"),
    	columnConfig = {
    		colors: ['#4169E1'],
    		series: [
    			{
    			name: "Received",
    			type: "column",
    			data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50]
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
    if($('#chart-income').length > 0 ){
    	   
        var options = {
            series: [{
            name: 'PRODUCT A',
            data: dataSet[0]
          }, {
            name: 'PRODUCT B',
            data: dataSet[1]
          }, {
            name: 'PRODUCT C',
            data: dataSet[2]
          }],
            chart: {
            type: 'area',
            stacked: false,
            height: 350,
            
            zoom: {
              enabled: false
            },
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
          },
          fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
              },
          },
          yaxis: {
            labels: {
                style: {
                    colors: '#8e8da4',
                },
                offsetX: 0,
                formatter: function(val) {
                  return (val / 1000000).toFixed(2);
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            }
          },
          xaxis: {
            type: 'datetime',
            tickAmount: 8,
            min: new Date("01/01/2014").getTime(),
            max: new Date("01/20/2014").getTime(),
            labels: {
                rotate: -15,
                rotateAlways: true,
                formatter: function(val, timestamp) {
                  return moment(new Date(timestamp)).format("DD MMM YYYY")
              }
            }
          },
          title: {
            text: 'Irregular Data in Time Series',
            align: 'left',
            offsetX: 14
          },
          tooltip: {
            shared: true
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetX: -10
          }
          };
  
          var chart = new ApexCharts(document.querySelector("#chart"), options);
          chart.render();
    }
    if($('#chart-bar').length > 0 ){
    	   
      var options = {
        series: [10, 45 , 45],
        chart: {
        width: 200,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C'],
      color:['#1BA345','#0081FF' , ' #FEC001' ],
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

      var chart = new ApexCharts(document.querySelector("#chart-bar"), options);
      chart.render();
    
    }

    
});