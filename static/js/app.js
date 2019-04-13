//add your code for the two graphs
// data
c3.chart.internal.fn.selectPath = function (target, d) {
    var rubid = Number(d.id.substring(d.id.length - 1));
    if (rubid == d.index) {
        var brightness = 0;
    } else {
        var brightness = 1.75;
    }
    var $$ = this;
    $$.config.data_onselected.call($$, d, target.node());
    target.transition().duration(100)
        .style("fill", function () { return $$.d3.rgb($$.color(d)).brighter(brightness); });
  };
  

  d3.json("/csv", function(error, Joined_Data) {
    
    // Log an error if one exists
    if (error) return console.warn(error);
  
    // Print the Data
    console.log(['Drought'].concat(Joined_Data.map(row => row['Drought'])));
    console.log(Joined_Data);
    
  
    var chart = c3.generate({
      bindto: "#chart",
      data: {
          x: 'year',
          columns: [
              ['year'].concat(Joined_Data.map(row => row['Year'])),
              ['Avg_Temp_F'].concat(Joined_Data.map(row => row['Temp'])),
              ['Drought'].concat(Joined_Data.map(row => row['Drought'])),
              ['Flood'].concat(Joined_Data.map(row => row['Flood'])),
              ['Fire'].concat(Joined_Data.map(row => row['Fire'])),
              ['Hurricane'].concat(Joined_Data.map(row => row['Hurricane'])),
              ['Tornado'].concat(Joined_Data.map(row => row['Tornado']))
          ],
          //rows: [
          //    ['inrub0', 'inrub1', 'inrub2', 'outrub0', 'outrub1', 'outrub2'],
          //    [500, 150, 50, 0, -30, -20],
          //    [30, 200, 25, -150, 0, -30],
          //    [20, 30, 150, -50, -25, 0]
          //],
          type: 'bar',
          types:{
            Avg_Temp_F: 'line',
        },
          //groups: [
          //    ['inrub0', 'inrub1', 'inrub2', 'outrub0', 'outrub1', 'outrub2']
          //],
          groups: [
              ['Avg_Temp_F', 'Drought', 'Flood', 'Fire', 'Hurricane', 'Tornado']
          ],
          axes: {
            Avg_Temp_F: 'y2'
          },
          names: {
            Avg_Temp_F: 'Avg_Temp_F',
            Drought: 'Drought',
            Flood: 'Flood',
            Fire: 'Fire',
            Hurricane: 'Hurricane',
            Tornado: 'Tornado'
          },
          selection: {
              enabled: true,
          },
          onclick: function (d, element) {
              console.log(d);
              console.log(element);
              var refid = (d.id.substring(0, 1) == "o" ? "inrub" : "outrub");
              refid = refid + d.index;
              var refindex = Number(d.id.substring(d.id.length - 1));
              chart.select([d.id], [d.index], true);
              chart.select([refid], [refindex], false);
          }
      },
      axis: {
          x: {
              type: 'category',
              tick: {
                rotate: 75,
                multiline: false
            },
              height: 50,
              label: {
                text: "Year",
                position: 'outer-center'}
          },
          y : {
            show:true,
            max: 1400,
            padding: {top:0, bottom:0},
            label:{
              text: "Number of Disaster Declarations",
              position: 'outer-center'
            }
          },
          y2: {
            show: true,
            label: {
              text: "Avg U.S. Temperature F",
              position: 'outer-center'}            
        }
      },
      legend: {
        position: 'inset'
      },
      color: {
          pattern: ['#17202a', '#f5b041', '#85c1e9', '#f4d03f', '#ec7063', '#ccd1d1']
      },
      grid: {
          y: {
            lines: [{value:0}]
          }
      }
    });
  
    });


    
