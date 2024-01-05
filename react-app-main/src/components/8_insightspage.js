import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; 
import React, { useState, useEffect } from 'react';
import '../css/8_insightspage.css';
import Footer from '../common/footer';

const ElementInsightsPage = () => {
  
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Line Chart Dataset',
        data: [],
        fill: false,
        borderColor: 'orange',
        tension: 0.1,
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Pie Chart Dataset',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Bar Chart Dataset',
        data: [],
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Crime count',
            data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 45, 67],
            fill: false,
            borderColor: 'orange',
            tension: 0.1,
          },
        ],
      };
      setLineChartData(lineData);

      const pieData = {
        labels: ['Liquor - Underage', 'Stalking', 'Domestic Violence', 'Theft'],
        datasets: [
          {
            label: 'Pie Chart Dataset',
            data: [30, 20, 15, 35],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      setPieChartData(pieData);

      const barData = {
        labels: ['0-4 hrs', '4-8 hrs', '8-12 hrs', '12-16 hrs', '16-20 hrs', '20-24 hrs'],
        datasets: [
          {
            label: 'Bar Chart Dataset',
            data: [15, 25, 20, 30, 35, 18],
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
            borderWidth: 1,
          },
        ],
      };
      setBarChartData(barData);
    };

    // Call the function to fetch data
    fetchChartData();
  }, []);

  return (
    <div>
    <div className="container">
      <div className="row1">
        <div className="chart-container crime-count">
          <div className='chart-heading'>
            <h1>Crime Count By Months</h1>
          </div>
          <div className="chart">
            <Line data={lineChartData} />
          </div>
        </div>
      </div>

      <div className="row2">

          <div className="chart-container crime-break-up">
              <div className='chart-heading'>
                  <h1>Crime Breakup</h1>
              </div>
              <div className="chart ">
                  <Pie data={pieChartData} />
              </div>
          </div>

          <div className="chart-container crime-by-time">
              <div className='chart-heading'>
                <h1>Crime by Time of the Day</h1>
              </div>
              <div className="chart">
                <Bar data={barChartData} />
              </div>  
          </div>
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ElementInsightsPage;