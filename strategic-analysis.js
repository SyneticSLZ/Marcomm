// strategic-analysis.js

// import * as XLSX from 'xlsx';

// Utility Functions
// Enhanced utility functions for more precise calculations
const formatNumber = (num) => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3, // Increased precision
    minimumFractionDigits: 3
}).format(num);

const formatPercentage = (num) => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'percent'
}).format(num / 100);

const formatCurrency = (num) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
}).format(num);

// Chart Colors
const chartColors = {
    light: [
        { main: 'rgba(59, 130, 246, 0.8)', light: 'rgba(147, 197, 253, 0.8)' },
        { main: 'rgba(16, 185, 129, 0.8)', light: 'rgba(110, 231, 183, 0.8)' },
        { main: 'rgba(139, 92, 246, 0.8)', light: 'rgba(167, 139, 250, 0.8)' },
        { main: 'rgba(245, 158, 11, 0.8)', light: 'rgba(252, 211, 77, 0.8)' },
        { main: 'rgba(239, 68, 68, 0.8)', light: 'rgba(252, 165, 165, 0.8)' }
    ],
    dark: [
        { main: 'rgba(96, 165, 250, 0.8)', light: 'rgba(191, 219, 254, 0.8)' },
        { main: 'rgba(52, 211, 153, 0.8)', light: 'rgba(167, 243, 208, 0.8)' },
        { main: 'rgba(167, 139, 250, 0.8)', light: 'rgba(196, 181, 253, 0.8)' },
        { main: 'rgba(251, 191, 36, 0.8)', light: 'rgba(253, 230, 138, 0.8)' },
        { main: 'rgba(248, 113, 113, 0.8)', light: 'rgba(254, 202, 202, 0.8)' }
    ]
};

// const getChartColors = (index) => chartColors[index % chartColors.length];


function getChartColors(index) {
    const isDark = document.documentElement.classList.contains('dark');
    const colors = isDark ? chartColors.dark : chartColors.light;
    return colors[index % colors.length];
}

// Data Processing Functions
const calculateMarketShare = (data) => {
    const totalSales = Object.values(data).reduce((sum, val) => sum + (val || 0), 0);
    const shares = {};
    
    for (const [brand, sales] of Object.entries(data)) {
        if (sales && totalSales) {
            shares[brand] = Number(((sales / totalSales) * 100).toFixed(1));
        }
    }
    
    return shares;
};

// Enhanced market share calculation with more precision
const calculatePreciseMarketShare = (data) => {
    const totalSales = Object.values(data).reduce((sum, val) => sum + (val || 0), 0);
    const shares = {};
    
    for (const [brand, sales] of Object.entries(data)) {
        if (sales && totalSales) {
            // Calculate to 4 decimal places for more precision
            shares[brand] = Number((sales / totalSales * 100).toFixed(4));
        }
    }
    
    return shares;
};

// Create pie chart for market share
function createMarketSharePieChart(canvas, data, title) {
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    const brands = Object.keys(data.current);
    const ctx = canvas.getContext('2d');
    
    const pieColors = [
        'rgba(59, 130, 246, 0.8)',  // Blue
        'rgba(16, 185, 129, 0.8)',  // Green
        'rgba(139, 92, 246, 0.8)',  // Purple
        'rgba(245, 158, 11, 0.8)',  // Amber
        'rgba(239, 68, 68, 0.8)'    // Red
    ];

    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: brands,
            datasets: [{
                data: brands.map(brand => data.current[brand] || 0),
                backgroundColor: brands.map((_, i) => pieColors[i % pieColors.length]),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${formatPercentage(context.raw)}`;
                        }
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20
                    }
                }
            }
        }
    });
}

// Create precision bar chart for small differences
function createPrecisionBarChart(canvas, data, title) {
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    const brands = Object.keys(data.current);
    const ctx = canvas.getContext('2d');
    
    // Calculate the minimum and maximum values to set appropriate scale
    const allValues = [
        ...brands.map(brand => data.current[brand] || 0),
        ...brands.map(brand => data.previous[brand] || 0)
    ];
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1; // 10% padding

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: brands,
            datasets: [
                {
                    label: 'Current Month',
                    data: brands.map(brand => data.current[brand] || 0),
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Previous Month',
                    data: brands.map(brand => data.previous[brand] || 0),
                    backgroundColor: 'rgba(147, 197, 253, 0.8)',
                    borderColor: 'rgba(147, 197, 253, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${formatPercentage(context.raw)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: Math.max(0, min - padding),
                    max: max + padding,
                    ticks: {
                        callback: value => formatPercentage(value)
                    },
                    title: {
                        display: true,
                        text: 'Market Share'
                    }
                }
            }
        }
    });
}

// Create trend line chart for tracking changes
function createTrendLineChart(canvas, data, title) {
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    const brands = Object.keys(data.current);
    const ctx = canvas.getContext('2d');

    // Calculate change for each brand
    const changes = brands.map(brand => ({
        brand,
        change: ((data.current[brand] || 0) - (data.previous[brand] || 0)).toFixed(4)
    }));

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: brands,
            datasets: [{
                label: 'Market Share Change',
                data: changes.map(c => c.change),
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const change = context.raw;
                            const sign = change >= 0 ? '+' : '';
                            return `Change: ${sign}${formatPercentage(change)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: value => `${value > 0 ? '+' : ''}${formatPercentage(value)}`
                    },
                    title: {
                        display: true,
                        text: 'Change in Market Share'
                    }
                }
            }
        }
    });
}
const processSheetData = (data) => {
    const currentMonth = {};
    const previousMonth = {};

    // Process data rows
    data.forEach(row => {
        const headerProp = Object.keys(row)[0];
        const brand = row[headerProp];

        if (brand && 
            typeof brand === 'string' && 
            !brand.toLowerCase().includes('sales') && 
            !brand.toLowerCase().includes('total') && 
            !brand.toLowerCase().includes('avg')) {
            
            const current = parseFloat(row['_1']) || 0;
            const previous = parseFloat(row['']) || 0;

            if (current > 0) currentMonth[brand] = current;
            if (previous > 0) previousMonth[brand] = previous;
        }
    });

    return {
        current: calculateMarketShare(currentMonth),
        previous: calculateMarketShare(previousMonth),
        rawData: {
            current: currentMonth,
            previous: previousMonth
        }
    };
};

// Update the processExcelData function to use fetch instead of window.fs.readFile
const processExcelData = async () => {
    try {
        const response = await fetch('./data/vetData.xlsx');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
            cellStyles: true,
            cellFormulas: true,
            cellDates: true,
            cellNF: true,
            sheetStubs: true
        });

        // Rest of your processExcelData function remains the same...
        const sheetCategories = {
            'Hearing Aids': {
                'ITE': ['Group 1 ITE', 'Group 1 Cat 2 ITE -Rechargeable'],
                'BTE': ['Group 2 BTE', 'Group 2 Cat 2 BTE -Rechargeable'],
                'RIC': ['Group 3 RIC', 'Group 3- RIC - R']
            },
            'Accessories': {
                'Wireless': ['Group 4 Wireless'],
                'Remotes': ['Group 6 Remotes'],
                'CROS': ['Group 7 - CROS Non-R', 'Group 7 CROS- R'],
                'CI': ['Group 8 CI Comp']
            }
        };

        const marketData = {
            categories: {},
            overall: {
                current: {},
                previous: {}
            }
        };

        // Process each category group
        for (const [mainCategory, categories] of Object.entries(sheetCategories)) {
            marketData.categories[mainCategory] = {};
            
            // Process each subcategory
            for (const [subCategory, sheetNames] of Object.entries(categories)) {
                marketData.categories[mainCategory][subCategory] = {
                    aggregate: {
                        current: {},
                        previous: {}
                    },
                    details: {}
                };

                // Process each sheet in the subcategory
                for (const sheetName of sheetNames) {
                    const sheet = workbook.Sheets[sheetName];
                    if (!sheet) continue;

                    const data = XLSX.utils.sheet_to_json(sheet);
                    const processedData = processSheetData(data);
                    
                    // Store detailed data
                    marketData.categories[mainCategory][subCategory].details[sheetName] = processedData;
                    
                    // Aggregate to subcategory level
                    Object.entries(processedData.current).forEach(([brand, share]) => {
                        if (!marketData.categories[mainCategory][subCategory].aggregate.current[brand]) {
                            marketData.categories[mainCategory][subCategory].aggregate.current[brand] = 0;
                        }
                        marketData.categories[mainCategory][subCategory].aggregate.current[brand] += share;
                    });

                    Object.entries(processedData.previous).forEach(([brand, share]) => {
                        if (!marketData.categories[mainCategory][subCategory].aggregate.previous[brand]) {
                            marketData.categories[mainCategory][subCategory].aggregate.previous[brand] = 0;
                        }
                        marketData.categories[mainCategory][subCategory].aggregate.previous[brand] += share;
                    });

                    // Aggregate to overall totals
                    Object.entries(processedData.current).forEach(([brand, share]) => {
                        if (!marketData.overall.current[brand]) marketData.overall.current[brand] = [];
                        marketData.overall.current[brand].push(share);
                    });

                    Object.entries(processedData.previous).forEach(([brand, share]) => {
                        if (!marketData.overall.previous[brand]) marketData.overall.previous[brand] = [];
                        marketData.overall.previous[brand].push(share);
                    });
                }
            }
        }

        return marketData;
    } catch (error) {
        console.error("Error processing Excel file:", error);
        throw new Error(`Failed to process Excel file: ${error.message}`);
    }
};


// // Excel Data Processing
// const processExcelData = async () => {
//     try {
//         const response = await window.fs.readFile('./data/vetData.xlsx');
//         const workbook = XLSX.read(response, {
//             cellStyles: true,
//             cellFormulas: true,
//             cellDates: true,
//             cellNF: true,
//             sheetStubs: true
//         });

//         const sheetCategories = {
//             'Hearing Aids': {
//                 'ITE': ['Group 1 ITE', 'Group 1 Cat 2 ITE -Rechargeable'],
//                 'BTE': ['Group 2 BTE', 'Group 2 Cat 2 BTE -Rechargeable'],
//                 'RIC': ['Group 3 RIC', 'Group 3- RIC - R']
//             },
//             'Accessories': {
//                 'Wireless': ['Group 4 Wireless'],
//                 'Remotes': ['Group 6 Remotes'],
//                 'CROS': ['Group 7 - CROS Non-R', 'Group 7 CROS- R'],
//                 'CI': ['Group 8 CI Comp']
//             }
//         };

//         const marketData = {
//             categories: {},
//             overall: {
//                 current: {},
//                 previous: {}
//             }
//         };

//         // Process each category group
//         for (const [mainCategory, categories] of Object.entries(sheetCategories)) {
//             marketData.categories[mainCategory] = {};
            
//             // Process each subcategory
//             for (const [subCategory, sheetNames] of Object.entries(categories)) {
//                 marketData.categories[mainCategory][subCategory] = {
//                     aggregate: {
//                         current: {},
//                         previous: {}
//                     },
//                     details: {}
//                 };

//                 // Process each sheet in the subcategory
//                 for (const sheetName of sheetNames) {
//                     const sheet = workbook.Sheets[sheetName];
//                     if (!sheet) continue;

//                     const data = XLSX.utils.sheet_to_json(sheet);
//                     const processedData = processSheetData(data);
                    
//                     // Store detailed data
//                     marketData.categories[mainCategory][subCategory].details[sheetName] = processedData;
                    
//                     // Aggregate to subcategory level
//                     Object.entries(processedData.current).forEach(([brand, share]) => {
//                         if (!marketData.categories[mainCategory][subCategory].aggregate.current[brand]) {
//                             marketData.categories[mainCategory][subCategory].aggregate.current[brand] = 0;
//                         }
//                         marketData.categories[mainCategory][subCategory].aggregate.current[brand] += share;
//                     });

//                     Object.entries(processedData.previous).forEach(([brand, share]) => {
//                         if (!marketData.categories[mainCategory][subCategory].aggregate.previous[brand]) {
//                             marketData.categories[mainCategory][subCategory].aggregate.previous[brand] = 0;
//                         }
//                         marketData.categories[mainCategory][subCategory].aggregate.previous[brand] += share;
//                     });

//                     // Aggregate to overall totals
//                     Object.entries(processedData.current).forEach(([brand, share]) => {
//                         if (!marketData.overall.current[brand]) marketData.overall.current[brand] = [];
//                         marketData.overall.current[brand].push(share);
//                     });

//                     Object.entries(processedData.previous).forEach(([brand, share]) => {
//                         if (!marketData.overall.previous[brand]) marketData.overall.previous[brand] = [];
//                         marketData.overall.previous[brand].push(share);
//                     });
//                 }
//             }
//         }

//         return marketData;
//     } catch (error) {
//         console.error("Error processing Excel file:", error);
//         return null;
//     }
// };

// UI Component Creation

function createChartContainer(title, data) {
    const container = document.createElement('div');
    container.className = 'mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200';
    
    // Chart header
    const header = document.createElement('h3');
    header.className = 'text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-200';
    header.textContent = title;
    
    // Chart wrapper
    const chartWrapper = document.createElement('div');
    chartWrapper.className = 'relative h-96';
    
    const canvas = document.createElement('canvas');
    canvas.id = `chart-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    
    // Data table
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'mt-4 overflow-x-auto';
    
    const table = document.createElement('table');
    table.className = 'min-w-full text-sm';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.className = 'bg-gray-50 dark:bg-gray-700 transition-colors duration-200';
    thead.innerHTML = `
    <tr>
        <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Brand</th>
        <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Current Sales ($)</th>
        <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Current Share (%)</th>
        <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Previous Sales ($)</th>
        <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Previous Share (%)</th>
        <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Change (%)</th>
    </tr>
`;

    // Create table body
    const tbody = document.createElement('tbody');
    tbody.className = 'divide-y divide-gray-200 dark:divide-gray-600';

    if (data && data.rawData) {
        const currentTotal = Object.values(data.rawData.current).reduce((sum, val) => sum + (val || 0), 0);
        const previousTotal = Object.values(data.rawData.previous).reduce((sum, val) => sum + (val || 0), 0);

        // Get all unique brands
        const brands = new Set([
            ...Object.keys(data.rawData.current),
            ...Object.keys(data.rawData.previous)
        ]);

        brands.forEach(brand => {
            const currentSales = data.rawData.current[brand] || 0;
            const previousSales = data.rawData.previous[brand] || 0;
            const currentShare = currentTotal ? (currentSales / currentTotal * 100) : 0;
            const previousShare = previousTotal ? (previousSales / previousTotal * 100) : 0;
            const shareChange = currentShare - previousShare;

            tbody.innerHTML += `
                <tr class="border-t dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td class="px-4 py-2 font-medium text-gray-900 dark:text-white">${brand}</td>
                    <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatCurrency(currentSales)}</td>
                    <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatNumber(currentShare)}%</td>
                    <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatCurrency(previousSales)}</td>
                    <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatNumber(previousShare)}%</td>
                    <td class="px-4 py-2 text-right ${shareChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                        ${shareChange > 0 ? '+' : ''}${formatNumber(shareChange)}%
                    </td>
                </tr>
            `;
        });

        // Add totals row
        tbody.innerHTML += `
            <tr class="border-t dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-medium transition-colors duration-200">
                <td class="px-4 py-2 text-gray-900 dark:text-white">Total</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatCurrency(currentTotal)}</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">100%</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatCurrency(previousTotal)}</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">100%</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">-</td>
            </tr>
        `;
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    
    // Assemble container
    chartWrapper.appendChild(canvas);
    container.appendChild(header);
    container.appendChild(chartWrapper);
    container.appendChild(tableWrapper);
    
    return container;
}


function createEnhancedChartContainer(title, data) {
    const container = document.createElement('div');
    container.className = 'mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200';
    
    // Main header - Updated to always white in dark mode
    const header = document.createElement('h3');
    header.className = 'text-xl font-bold mb-6 text-gray-800 dark:text-white transition-colors duration-200';
    header.textContent = title;
    
    // Chart grid remains the same
    const chartGrid = document.createElement('div');
    chartGrid.className = 'grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6';
    
    // Updated chart wrappers
    const pieWrapper = document.createElement('div');
    pieWrapper.className = 'relative h-96 bg-white dark:bg-gray-800 rounded-lg transition-colors duration-200';
    const pieCanvas = document.createElement('canvas');
    pieCanvas.id = `pie-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    pieWrapper.appendChild(pieCanvas);
    
    const barWrapper = document.createElement('div');
    barWrapper.className = 'relative h-96 bg-white dark:bg-gray-800 rounded-lg transition-colors duration-200';
    const barCanvas = document.createElement('canvas');
    barCanvas.id = `bar-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    barWrapper.appendChild(barCanvas);
    
    const trendWrapper = document.createElement('div');
    trendWrapper.className = 'relative h-96 bg-white dark:bg-gray-800 rounded-lg transition-colors duration-200';
    const trendCanvas = document.createElement('canvas');
    trendCanvas.id = `trend-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    trendWrapper.appendChild(trendCanvas);
    
    // Data table
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'mt-6 overflow-x-auto';
    
    const table = document.createElement('table');
    table.className = 'min-w-full text-sm';
    
    // Enhanced table header
    const thead = document.createElement('thead');
    thead.className = 'bg-gray-50 dark:bg-gray-700 transition-colors duration-200';
    thead.innerHTML = `
        <tr>
            <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Brand</th>
            <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Current Sales ($)</th>
            <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Current Share (%)</th>
            <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Previous Sales ($)</th>
            <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Previous Share (%)</th>
            <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Absolute Change (%)</th>
            <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">Relative Change (%)</th>
            <th class="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-300">YoY Growth</th>
        </tr>
    `;

    // Enhanced table body
    const tbody = document.createElement('tbody');
    tbody.className = 'divide-y divide-gray-200 dark:divide-gray-600';
    
    if (data && data.rawData) {
        const currentTotal = Object.values(data.rawData.current).reduce((sum, val) => sum + (val || 0), 0);
        const previousTotal = Object.values(data.rawData.previous).reduce((sum, val) => sum + (val || 0), 0);

        const brands = new Set([
            ...Object.keys(data.rawData.current),
            ...Object.keys(data.rawData.previous)
        ]);

        brands.forEach(brand => {
            const currentSales = data.rawData.current[brand] || 0;
            const previousSales = data.rawData.previous[brand] || 0;
            const currentShare = currentTotal ? (currentSales / currentTotal * 100) : 0;
            const previousShare = previousTotal ? (previousSales / previousTotal * 100) : 0;
            const absoluteChange = currentShare - previousShare;
            const relativeChange = previousShare ? ((currentShare - previousShare) / previousShare * 100) : 0;
            const yoyGrowth = previousSales ? ((currentSales - previousSales) / previousSales * 100) : 0;

            tbody.innerHTML += `
                <tr class="border-t dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td class="px-4 py-2 font-medium text-gray-900 dark:text-white">${brand}</td>
                    <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatCurrency(currentSales)}</td>
                    <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatNumber(currentShare)}%</td>
                    <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatCurrency(previousSales)}</td>
                    <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatNumber(previousShare)}%</td>
                    <td class="px-4 py-2 text-right ${absoluteChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                        ${absoluteChange > 0 ? '+' : ''}${formatNumber(absoluteChange)}%
                    </td>
                    <td class="px-4 py-2 text-right ${relativeChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                        ${relativeChange > 0 ? '+' : ''}${formatNumber(relativeChange)}%
                    </td>
                    <td class="px-4 py-2 text-right ${yoyGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                        ${yoyGrowth > 0 ? '+' : ''}${formatNumber(yoyGrowth)}%
                    </td>
                </tr>
            `;
        });

        // Enhanced totals row
        tbody.innerHTML += `
            <tr class="border-t dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-medium transition-colors duration-200">
                <td class="px-4 py-2 text-gray-900 dark:text-white">Total</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatCurrency(currentTotal)}</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">100.000%</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatCurrency(previousTotal)}</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">100.000%</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">-</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">${formatNumber(((currentTotal - previousTotal) / previousTotal * 100) || 0)}%</td>
                <td class="px-4 py-2 text-right text-gray-900 dark:text-white">-</td>
            </tr>
        `;
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    
    chartGrid.appendChild(pieWrapper);
    chartGrid.appendChild(barWrapper);
    chartGrid.appendChild(trendWrapper);
    
    container.appendChild(header);
    container.appendChild(chartGrid);
    container.appendChild(tableWrapper);
    
    // Create charts with dark mode awareness
    createMarketSharePieChart(pieCanvas, data, `${title} - Market Share Distribution`);
    createPrecisionBarChart(barCanvas, data, `${title} - Market Share Comparison`);
    createTrendLineChart(trendCanvas, data, `${title} - Market Share Trends`);
    
    const analysisSection = document.createElement('div');
    analysisSection.className = 'mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200';
    
    const metrics = calculateKeyMetrics(data);
    
    analysisSection.innerHTML = `
        <h4 class="font-bold text-lg mb-3 text-gray-900 dark:text-white">Key Insights</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200">
                <h5 class="font-semibold text-sm text-gray-600 dark:text-white">Market Concentration</h5>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${metrics.concentration.toFixed(2)}%</p>
                <p class="text-xs text-gray-500 dark:text-gray-300">Top 3 brands market share</p>
            </div>
            <div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200">
                <h5 class="font-semibold text-sm text-gray-600 dark:text-white">Market Leader</h5>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${metrics.leader.brand}</p>
                <p class="text-xs text-gray-500 dark:text-gray-300">${metrics.leader.share.toFixed(2)}% market share</p>
            </div>
            <div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200">
                <h5 class="font-semibold text-sm text-gray-600 dark:text-white">Fastest Growing</h5>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${metrics.fastestGrowing.brand}</p>
                <p class="text-xs text-gray-500 dark:text-gray-300">+${metrics.fastestGrowing.growth.toFixed(2)}% growth</p>
            </div>
        </div>
        <div class="mt-4 text-sm">
            <h5 class="font-semibold mb-2 text-gray-900 dark:text-white">Competitive Analysis</h5>
            <ul class="space-y-1 text-gray-600 dark:text-white">
                ${generateCompetitiveInsights(data).map(insight => 
                    `<li class="flex items-start">
                        <span class="inline-block w-2 h-2 mt-1.5 mr-2 rounded-full bg-blue-500 dark:bg-blue-300"></span>
                        ${insight}
                    </li>`
                ).join('')}
            </ul>
        </div>
    `;
    container.appendChild(analysisSection);
    
    return container;
}

// Helper function to calculate key metrics
function calculateKeyMetrics(data) {
    const currentShares = data.current;
    const previousShares = data.previous;
    
    // Calculate market concentration (top 3 brands)
    const sortedShares = Object.entries(currentShares)
        .sort(([,a], [,b]) => b - a);
    const concentration = sortedShares
        .slice(0, 3)
        .reduce((sum, [,share]) => sum + share, 0);
    
    // Identify market leader
    const leader = sortedShares[0];
    
    // Calculate growth rates
    const growthRates = Object.entries(currentShares).map(([brand, share]) => ({
        brand,
        growth: share - (previousShares[brand] || 0)
    })).sort((a, b) => b.growth - a.growth);
    
    return {
        concentration,
        leader: {
            brand: leader[0],
            share: leader[1]
        },
        fastestGrowing: growthRates[0]
    };
}

// Helper function to generate competitive insights
function generateCompetitiveInsights(data) {
    const insights = [];
    const currentShares = data.current;
    const previousShares = data.previous;
    
    // Market share gaps
    const sortedBrands = Object.entries(currentShares)
        .sort(([,a], [,b]) => b - a);
    
    // Calculate market share gaps
    for (let i = 0; i < sortedBrands.length - 1; i++) {
        const gap = sortedBrands[i][1] - sortedBrands[i + 1][1];
        if (gap > 0.5) { // Only show significant gaps
            insights.push(
                `${sortedBrands[i][0]} leads ${sortedBrands[i + 1][0]} by ${gap.toFixed(2)} percentage points`
            );
        }
    }
    
    // Growth patterns
    Object.entries(currentShares).forEach(([brand, share]) => {
        const prevShare = previousShares[brand] || 0;
        const growth = share - prevShare;
        if (Math.abs(growth) > 1) { // Significant change threshold
            insights.push(
                `${brand} has ${growth > 0 ? 'gained' : 'lost'} ${Math.abs(growth).toFixed(2)} points of market share`
            );
        }
    });
    
    return insights;
}


// Update the render function to pass data to createChartContainer
function renderMarketShareChart(canvas, data, title) {
    // Existing chart rendering code...
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    const brands = Object.keys(data.current);
    const ctx = canvas.getContext('2d');
    
    const datasets = [
        {
            label: 'Current Month',
            data: brands.map(brand => data.current[brand] || 0),
            backgroundColor: brands.map((_, i) => getChartColors(i).main),
            borderColor: brands.map((_, i) => getChartColors(i).main),
            borderWidth: 1
        },
        {
            label: 'Previous Month',
            data: brands.map(brand => data.previous[brand] || 0),
            backgroundColor: brands.map((_, i) => getChartColors(i).light),
            borderColor: brands.map((_, i) => getChartColors(i).light),
            borderWidth: 1
        }
    ];

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: brands,
            datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Market Share (%)'
                    }
                }
            }
        }
    });
}

const createMarketShareChart = (canvas, data, title) => {
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    const brands = Object.keys(data.current);
    const ctx = canvas.getContext('2d');
    
    const datasets = [
        {
            label: 'Current Month',
            data: brands.map(brand => data.current[brand] || 0),
            backgroundColor: brands.map((_, i) => getChartColors(i).main),
            borderColor: brands.map((_, i) => getChartColors(i).main),
            borderWidth: 1
        },
        {
            label: 'Previous Month',
            data: brands.map(brand => data.previous[brand] || 0),
            backgroundColor: brands.map((_, i) => getChartColors(i).light),
            borderColor: brands.map((_, i) => getChartColors(i).light),
            borderWidth: 1
        }
    ];

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: brands,
            datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Market Share (%)'
                    }
                }
            }
        }
    });
};

const createSummarySection = (marketData) => {
    const container = document.createElement('div');
    container.className = 'mt-8 p-6 bg-white rounded-lg shadow';
    
    // Calculate overall market leader
    const overallShares = {};
    Object.entries(marketData.overall.current).forEach(([brand, shares]) => {
        overallShares[brand] = shares.reduce((sum, share) => sum + share, 0) / shares.length;
    });
    
    const marketLeader = Object.entries(overallShares)
        .reduce((a, b) => b[1] > a[1] ? b : a);

    // Calculate fastest growing brand
    const growthRates = {};
    Object.entries(marketData.overall.current).forEach(([brand, currentShares]) => {
        const previousShares = marketData.overall.previous[brand] || [];
        const growth = currentShares.reduce((sum, share, i) => {
            return sum + (share - (previousShares[i] || 0));
        }, 0) / currentShares.length;
        growthRates[brand] = growth;
    });
    
    const fastestGrowing = Object.entries(growthRates)
        .reduce((a, b) => b[1] > a[1] ? b : a);

    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Market Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-4 bg-blue-50 rounded-lg">
                <h3 class="font-semibold text-blue-800">Overall Market Leader</h3>
                <p class="text-2xl font-bold text-blue-600">${marketLeader[0]}</p>
                <p class="text-sm text-blue-600">${formatNumber(marketLeader[1])}% Average Share</p>
            </div>
            <div class="p-4 bg-green-50 rounded-lg">
                <h3 class="font-semibold text-green-800">Fastest Growing</h3>
                <p class="text-2xl font-bold text-green-600">${fastestGrowing[0]}</p>
                <p class="text-sm text-green-600">${fastestGrowing[1] > 0 ? '+' : ''}${formatNumber(fastestGrowing[1])}% Growth</p>
            </div>
            <div class="p-4 bg-purple-50 rounded-lg">
                <h3 class="font-semibold text-purple-800">Categories Analyzed</h3>
                <p class="text-2xl font-bold text-purple-600">${Object.keys(marketData.categories).length}</p>
                <p class="text-sm text-purple-600">Major Segments</p>
            </div>
            <div class="p-4 bg-orange-50 rounded-lg">
                <h3 class="font-semibold text-orange-800">Market Competition</h3>
                <p class="text-2xl font-bold text-orange-600">${Object.keys(marketData.overall.current).length}</p>
                <p class="text-sm text-orange-600">Active Brands</p>
            </div>
        </div>
    `;
    return container;
};

const createTrendAnalysis = (marketData) => {
    const container = document.createElement('div');
    container.className = 'mt-8 p-6 bg-white rounded-lg shadow';
    
    const trends = [];
    Object.entries(marketData.overall.current).forEach(([brand, currentShares]) => {
        const previousShares = marketData.overall.previous[brand] || [];
        const avgCurrent = currentShares.reduce((sum, share) => sum + share, 0) / currentShares.length;
        const avgPrevious = previousShares.reduce((sum, share) => sum + share, 0) / previousShares.length;
        
        trends.push({
            brand,
            change: avgCurrent - avgPrevious
        });
    });

    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Market Share Trends</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${trends.map(({ brand, change }) => `
                <div class="p-4 ${change >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg">
                    <h3 class="font-semibold ${change >= 0 ? 'text-green-800' : 'text-red-800'}">${brand}</h3>
                    <p class="text-2xl font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${change > 0 ? '+' : ''}${formatNumber(change)}%
                    </p>
                    <p class="text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}">Market Share Change</p>
                </div>
            `).join('')}
        </div>
    `;

    return container;
};
export async function VetrenderStrategicInitiatives() {
    const container = document.getElementById('strategic-initiatives-content');
    if (!container) {
        console.error('Strategic initiatives container not found');
        return;
    }

    // Show loading state
    container.innerHTML = `
        <div class="flex items-center justify-center p-12 transition-colors duration-200">
            <div class="text-xl text-gray-600 dark:text-gray-300">Loading market analysis...</div>
        </div>
    `;

    try {
        const marketData = await processExcelData();
        if (!marketData) {
            throw new Error('No data received from Excel processing');
        }

        // Clear loading state
        container.innerHTML = '';

        // Create overall market summary
        const summarySection = document.createElement('div');
        summarySection.className = 'mb-12 transition-colors duration-200';

        // Calculate overall metrics
        const overallData = {
            current: {},
            previous: {},
            rawData: {
                current: {},
                previous: {}
            }
        };

        // Aggregate all data for overall view
        Object.entries(marketData.categories).forEach(([_, categoryData]) => {
            Object.values(categoryData).forEach(subcategory => {
                Object.entries(subcategory.details).forEach(([_, productData]) => {
                    Object.entries(productData.rawData.current).forEach(([brand, value]) => {
                        overallData.rawData.current[brand] = (overallData.rawData.current[brand] || 0) + value;
                    });
                    Object.entries(productData.rawData.previous).forEach(([brand, value]) => {
                        overallData.rawData.previous[brand] = (overallData.rawData.previous[brand] || 0) + value;
                    });
                });
            });
        });

        // Calculate market shares for overall data
        overallData.current = calculatePreciseMarketShare(overallData.rawData.current);
        overallData.previous = calculatePreciseMarketShare(overallData.rawData.previous);

        // Create and append overall market analysis
        const overallAnalysis = createEnhancedChartContainer('Overall Market Analysis', overallData);
        summarySection.appendChild(overallAnalysis);
        container.appendChild(summarySection);

        // Process each main category
        for (const [mainCategory, categoryData] of Object.entries(marketData.categories)) {
            const categorySection = document.createElement('div');
            categorySection.className = 'mb-16 transition-colors duration-200';

            // Add category header
            const categoryHeader = document.createElement('h2');
            categoryHeader.className = 'text-3xl font-bold mb-8 pb-2 border-b text-gray-800 dark:text-white border-gray-200 dark:border-gray-700 transition-colors duration-200';
            categoryHeader.textContent = mainCategory;
            categorySection.appendChild(categoryHeader);

            // Process each subcategory
            for (const [subCategory, data] of Object.entries(categoryData)) {
                const subCategorySection = document.createElement('div');
                subCategorySection.className = 'mb-12 transition-colors duration-200';

                // Add subcategory header
                const subHeader = document.createElement('h3');
                subHeader.className = 'text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200 transition-colors duration-200';
                subHeader.textContent = subCategory;
                subCategorySection.appendChild(subHeader);

                // Create subcategory aggregate analysis
                const aggregateAnalysis = createEnhancedChartContainer(
                    `${subCategory} - Overall Analysis`,
                    data.aggregate
                );
                subCategorySection.appendChild(aggregateAnalysis);

                // Process individual product types
                for (const [productType, productData] of Object.entries(data.details)) {
                    // Create product type analysis
                    const productAnalysis = createEnhancedChartContainer(
                        productType,
                        productData
                    );
                    subCategorySection.appendChild(productAnalysis);
                }

                categorySection.appendChild(subCategorySection);
            }

            container.appendChild(categorySection);
        }
    } catch (error) {
        console.error('Error rendering strategic initiatives:', error);
        container.innerHTML = `
            <div class="p-6 bg-red-50 dark:bg-red-900/30 rounded-lg transition-colors duration-200">
                <h3 class="text-xl font-bold text-red-800 dark:text-red-200">Error Loading Data</h3>
                <p class="text-red-600 dark:text-red-300">Unable to load market data. Details: ${error.message}</p>
                <p class="text-sm text-red-600 dark:text-red-300 mt-2">Please check that:</p>
                <ul class="list-disc list-inside text-sm text-red-600 dark:text-red-300 mt-1">
                    <li>The data file exists at ./data/vetData.xlsx</li>
                    <li>The file is a valid Excel file</li>
                    <li>You have permission to access the file</li>
                </ul>
            </div>
        `;
    }
}

// Main Render Function
async function renderStrategicInitiatives() {
    const container = document.getElementById('strategic-initiatives-content');
    if (!container) {
        console.error('Strategic initiatives container not found');
        return;
    }

    // Clear existing content and show loading state
    container.innerHTML = `
        <div class="flex items-center justify-center p-12">
            <div class="text-xl text-gray-600">Loading market analysis...</div>
        </div>
    `;

    try {
        // Process Excel data
        const marketData = await processExcelData();
        if (!marketData) {
            container.innerHTML = `
                <div class="p-6 bg-red-50 rounded-lg">
                    <h3 class="text-xl font-bold text-red-800">Error Loading Data</h3>
                    <p class="text-red-600">Unable to process market data. Please check the data file.</p>
                </div>
            `;
            throw new Error('No data received from Excel processing');

            // return;
        }

        // Clear loading state
        container.innerHTML = '';

        // Add summary section
        container.appendChild(createSummarySection(marketData));

        // Add trend analysis
        container.appendChild(createTrendAnalysis(marketData));

        // Create container for category charts
        const chartsContainer = document.createElement('div');
        chartsContainer.className = 'mt-8 space-y-8';

        // Iterate through main categories
        for (const [mainCategory, subcategories] of Object.entries(marketData.categories)) {
            // Add main category header
            const mainHeader = document.createElement('h2');
            mainHeader.className = 'text-3xl font-bold mt-12 mb-6 text-gray-800 border-b pb-2';
            mainHeader.textContent = mainCategory;
            chartsContainer.appendChild(mainHeader);

            // Iterate through subcategories
            for (const [subCategory, data] of Object.entries(subcategories)) {
                // Add subcategory header
                const subHeader = document.createElement('h3');
                subHeader.className = 'text-2xl font-bold mt-8 mb-4 text-gray-700';
                subHeader.textContent = subCategory;
                chartsContainer.appendChild(subHeader);

// For aggregate charts
const aggregateContainer = createChartContainer(`${subCategory} Overview`, data.aggregate);
chartsContainer.appendChild(aggregateContainer);
const aggregateCanvas = aggregateContainer.querySelector('canvas');
createMarketShareChart(aggregateCanvas, data.aggregate, `${subCategory} - Market Share Overview`);

// For individual product type charts
for (const [productType, productData] of Object.entries(data.details)) {
    const chartContainer = createChartContainer(productType, productData);
    chartsContainer.appendChild(chartContainer);
    const canvas = chartContainer.querySelector('canvas');
    createMarketShareChart(canvas, productData, productType);
}
            }
        }

        container.appendChild(chartsContainer);

    } catch (error) {
        console.error('Error rendering strategic initiatives:', error);
        container.innerHTML = `
            <div class="p-6 bg-red-50 rounded-lg">
                <h3 class="text-xl font-bold text-red-800">Error Loading Data</h3>
                <p class="text-red-600">Unable to load market data. Details: ${error.message}</p>
                <p class="text-sm text-red-600 mt-2">Please check that:</p>
                <ul class="list-disc list-inside text-sm text-red-600 mt-1">
                    <li>The data file exists at ./data/vetData</li>
                    <li>The file is a valid Excel file</li>
                    <li>You have permission to access the file</li>
                </ul>
            </div>
        `;
    }
}

// Optional: Export helper functions if needed for testing or reuse
export const helpers = {
    formatNumber,
    formatCurrency,
    calculateMarketShare,
    processSheetData
};