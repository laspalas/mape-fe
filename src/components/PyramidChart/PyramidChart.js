import React, { useEffect } from 'react';

let chart;
const PyramidChart = ({ width }) => {
  useEffect(() => {
    chart = window.Highcharts.chart('container', {
      chart: {
        type: 'pyramid',
        height: '800px',
      },
      responsive: true,
      title: {
        text: 'Piramidalni prikaz grupa indikatora',
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
          center: ['50%', '50%'],
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
        pointFormat: '<tr><td style="color: black"><b>{point.z}</b> </td>',
        footerFormat: '</table>',
      },

      series: [
        {
          name: 'Piramialni prikaz grupa indikatora',
          tooltiInfo: 'aaaaaaa',
          data: [
            {
              name: 'Stavovi ucesnika u saobracaju',

              y: 2,
              z: 'Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext 150char',
            },
            {
              name: 'Indikatori bezbednosti saobracaja',
              y: 2,
              z:
                'Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext 150char',
            },
            {
              name: 'Saobracajne nezgode i njihove posledice',
              y: 2,
              z: 'Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext 150char',
            },
            {
              name: 'Troskovi saobracajnih nezgoda',
              y: 2,
              z: 'Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext Long teeext 150char',
            },
          ],
        },
      ],
    });
  }, [width]);

  return <div id="container"></div>;
};

export default PyramidChart;
