import React, { useEffect } from 'react';




const PyramidChart = () => {
  useEffect(() => {
    window.Highcharts.chart('container', {
      chart: {
        type: 'pyramid',
      },
      title: {
        text: 'Piramialni prikaz grupa indikatora',
        align: 'center',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            align: 'left',
            verticalAlign: 'middle',
            format: '<b>{point.name}</b>',
            softConnector: true,
          },
          states: {
            hover: {
              enabled: true,
            },
          },
          cursor: 'pointer',

          point: {
            events: {
              click: function () {
                alert(
                  'Category: ' + this.category + ', value: ' + this.y + this.z,
                );
              },
            },
          },
          center: ['40%', '50%'],
          width: '60%',
        },
      },
      legend: {
        enabled: true,
      },
      tooltip: {
        formatter: function () {
          // The first returned item is the header, subsequent items are the
          // points
          return this.series.data.map(function (point) {
            return point.z + '</br>';
          });
        },
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<small>{point.key}:</small><table>',
        pointFormat:
          '<tr><td style="color: red"><b>{point.z}</b> </td>',
        footerFormat: '</table>',
      },

      series: [
        {
          name: 'Piramialni prikaz grupa indikatora',
          tooltiInfo: 'aaaaaaa',
          data: [
            {
              name: 'Final outcomes',

              y: 2,
              z: 'deaths per 100.000 inhabitants',
            },
            {
              name: 'Intermediate outcomes',
              y: 2,
              z:
                'safety performance indicators<br/>2nd safety performance indicators',
            },
            {
              name: 'Policy performance indicators',
              y: 2,
              z: 'safety measures and programmes',
            },
            {
              name: 'Background performance indicators',
              y: 2,
              z: 'structure and culture',
            },
          ],
        },
      ],
    });
  }, []);

  return <div id="container"></div>;
};



export default PyramidChart;
