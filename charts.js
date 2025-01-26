function createCharts(group, container) {
    const chartWrapper = document.createElement('div');
    chartWrapper.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8';
    
    const months = Object.keys(group.monthly_data || {});
    const recentMonth = months[months.length - 1];
    const monthlyData = group.monthly_data[recentMonth];
  
    // Sales Distribution (Doughnut)
    const salesCanvas = createChartContainer(chartWrapper, 'Sales Distribution');
    new Chart(salesCanvas, {
      type: 'doughnut',
      data: {
        labels: Object.keys(monthlyData.sales),
        datasets: [{
          data: Object.values(monthlyData.sales),
          backgroundColor: getColorPalette(Object.keys(monthlyData.sales).length)
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'rgb(156, 163, 175)' }
          },
          title: {
            display: true,
            text: 'Sales Distribution',
            color: 'rgb(156, 163, 175)',
            font: { size: 16, weight: 'bold' }
          }
        }
      }
    });
  
    // Units Sold (Horizontal Bar)
    const unitsCanvas = createChartContainer(chartWrapper, 'Units by Company');
    const unitsSortedData = sortDataForBarChart(monthlyData.units_sold);
    new Chart(unitsCanvas, {
      type: 'bar',
      data: {
        labels: unitsSortedData.labels,
        datasets: [{
          data: unitsSortedData.values,
          backgroundColor: getColorPalette(unitsSortedData.labels.length),
          barThickness: 30
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Units Sold by Company',
            color: 'rgb(156, 163, 175)',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: 'rgb(156, 163, 175)' }
          },
          y: {
            grid: { display: false },
            ticks: { color: 'rgb(156, 163, 175)' }
          }
        }
      }
    });
  
    // Market Share (Custom Vertical Bar)
    const shareCanvas = createChartContainer(chartWrapper, 'Market Share');
    const shareSortedData = sortDataForBarChart(monthlyData.sales_percentage);
    new Chart(shareCanvas, {
      type: 'bar',
      data: {
        labels: shareSortedData.labels,
        datasets: [{
          data: shareSortedData.values,
          backgroundColor: getColorPalette(shareSortedData.labels.length),
          barThickness: 40
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Market Share (%)',
            color: 'rgb(156, 163, 175)',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(156, 163, 175, 0.1)' },
            ticks: {
              color: 'rgb(156, 163, 175)',
              callback: value => `${value}%`
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: 'rgb(156, 163, 175)' }
          }
        }
      }
    });
  
    // Average Cost (Line)
    const costCanvas = createChartContainer(chartWrapper, 'Average Cost Trends');
    const companies = Object.keys(monthlyData.average_cost);
    new Chart(costCanvas, {
      type: 'line',
      data: {
        labels: months,
        datasets: companies.map((company, index) => ({
          label: company,
          data: months.map(month => group.monthly_data[month].average_cost[company]),
          borderColor: getColorPalette(companies.length)[index],
          tension: 0.4,
          pointRadius: 6
        }))
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'rgb(156, 163, 175)' }
          },
          title: {
            display: true,
            text: 'Average Cost Trends',
            color: 'rgb(156, 163, 175)',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(156, 163, 175, 0.1)' },
            ticks: {
              color: 'rgb(156, 163, 175)',
              callback: value => `$${value}`
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: 'rgb(156, 163, 175)' }
          }
        }
      }
    });
  
    container.appendChild(chartWrapper);
  }
  
  function createChartContainer(parent, title) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm';
    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    parent.appendChild(wrapper);
    return canvas;
  }
  
  function sortDataForBarChart(data) {
    const entries = Object.entries(data);
    entries.sort(([,a], [,b]) => b - a);
    return {
      labels: entries.map(([label]) => label),
      values: entries.map(([,value]) => value)
    };
  }
  
  function getColorPalette(count) {
    const colors = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#6366f1',
      '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'
    ];
    return colors.slice(0, count);
  }
  
  export { createCharts };