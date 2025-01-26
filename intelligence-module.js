// Intelligence Module Data
// Update FDA metrics to use separate scales
function normalizeMetric(value, maxValue) {
    return (value / maxValue) * 100;
}

const marketData = {
    companies: ['Sonova/Phonak', 'WS Audiology', 'GN Resound', 'Starkey'],
    
    salesData: {
        'Sonova/Phonak': {
            totalSales: 38722437.51,
            totalUnits: 88228,
            marketShare: 50.13,
            averageCost: 438.89
        },
        'WS Audiology': {
            totalSales: 5330292.09,
            totalUnits: 13323,
            marketShare: 6.90,
            averageCost: 400.08
        },
        'GN Resound': {
            totalSales: 7784005.99,
            totalUnits: 18859,
            marketShare: 10.08,
            averageCost: 412.75
        },
        'Starkey': {
            totalSales: 11204120.92,
            totalUnits: 29345,
            marketShare: 14.51,
            averageCost: 381.81
        }
    },

    fdaData: {
        'Sonova/Phonak': {
            udiDevices: 10990,
            k510Clearances: 112,
            activeRegistrations: 19,
            adverseEvents: 64
        },
        'WS Audiology': {
            udiDevices: 16804,
            k510Clearances: 58,
            activeRegistrations: 108,
            adverseEvents: 9595
        },
        'GN Resound': {
            udiDevices: 18001,
            k510Clearances: 162,
            activeRegistrations: 168,
            adverseEvents: 4632
        },
        'Starkey': {
            udiDevices: 4168,
            k510Clearances: 80,
            activeRegistrations: 19,
            adverseEvents: 16
        }
    },

    patentData: {
        'Sonova/Phonak': {
            totalPatents: 1649,
            recentApplications: 46
        },
        'WS Audiology': {
            totalPatents: 4791,
            recentApplications: 329
        },
        'GN Resound': {
            totalPatents: 1514,
            recentApplications: 8
        },
        'Starkey': {
            totalPatents: 1595,
            recentApplications: 169
        }
    }
};
// Store chart instances to destroy before redrawing
const chartInstances = {};

document.addEventListener('DOMContentLoaded', () => {
    renderAllCharts();
    renderMarketOverview();
    renderCompetitiveMap();
});

function renderAllCharts() {
    renderQuickStats();
    renderMarketShareChart();
    renderPatentsChart();
    renderFDAMetricsChart();
    renderFinancialRadar();
    // renderKeyMetrics();
    renderCompetitiveMap();
    renderCompetitiveAnalysis();
}

function getDatasetColor(index, alpha = 1) {
    const isDark = document.documentElement.classList.contains('dark');
    const colors = isDark ? [
        `rgba(255, 107, 53, ${alpha})`,   // Marcomm Orange
        `rgba(255, 139, 95, ${alpha})`,   // Marcomm Light Orange
        `rgba(229, 90, 36, ${alpha})`,    // Marcomm Dark Orange
        `rgba(209, 213, 219, ${alpha})`   // Light Gray
    ] : [
        `rgba(255, 107, 53, ${alpha})`,   // Marcomm Orange
        `rgba(51, 51, 51, ${alpha})`,     // Marcomm Dark
        `rgba(255, 139, 95, ${alpha})`,   // Marcomm Light Orange
        `rgba(156, 163, 175, ${alpha})`   // Gray
    ];
    return colors[index % colors.length];
}

function getChartTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        textColor: isDark ? '#D1D5DB' : '#333333',
        gridColor: isDark ? 'rgba(209, 213, 219, 0.1)' : 'rgba(51, 51, 51, 0.1)',
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        tooltipBackground: isDark ? '#374151' : '#FFFFFF'
    };
}



function renderCompetitiveAnalysis() {
    const container = document.getElementById('competitive-insights');
    
    const insights = [
        {
            title: 'Market Leadership',
            insight: `Sonova/Phonak dominates with 50.13% market share and $38.7B in sales, maintaining premium positioning with average unit cost of $438.89. The top 3 players control 81.3% of market value.`,
            type: 'critical',
            icon: 'crown'
        },
        {
            title: 'Innovation Dynamics',
            insight: `WS Audiology leads R&D with ${wsData.operational_metrics.research_development.as_percent_of_sales}% investment ratio and 4,791 patents. Recent patent activity shows focus on AI/ML integration and miniaturization.`,
            type: 'strength',
            icon: 'lightbulb'
        },
        {
            title: 'Regulatory Landscape',
            insight: `GN Resound leads in FDA clearances (162), while Starkey shows best safety profile with only 16 adverse events. Industry transitioning to more stringent quality controls.`,
            type: 'warning',
            icon: 'shield-check'
        },
        {
            title: 'Growth Opportunities',
            insight: `Emerging markets show 15% YoY growth potential. OTC hearing aid regulations opening new market segments. Direct-to-consumer channels expanding rapidly.`,
            type: 'opportunity',
            icon: 'chart-line'
        }
    ];

container.innerHTML = insights.map(insight => `
                <div class="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center">
                    <div class="p-2 rounded-full bg-gray-50 dark:bg-gray-700">
                        <i class="fas fa-${insight.icon} text-marcomm-orange"></i>
                    </div>
                    <h4 class="ml-3 text-lg font-light text-marcomm-dark dark:text-white">${insight.title}</h4>
                </div>
                <span class="px-2 py-1 text-sm rounded-full bg-gray-50 dark:bg-gray-700 text-marcomm-dark dark:text-white">
                    ${insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                </span>
            </div>
            <p class="text-gray-600 dark:text-gray-300">${insight.insight}</p>
        </div>
    `).join('');
}

function getInsightTypeColor(type) {
    const colors = {
        critical: 'border-blue-500',
        strength: 'border-green-500',
        warning: 'border-yellow-500',
        opportunity: 'border-purple-500'
    };
    return colors[type] || 'border-gray-500';
}

function getInsightIconBg(type) {
    const colors = {
        critical: 'bg-blue-100 dark:bg-blue-900/50',
        strength: 'bg-green-100 dark:bg-green-900/50',
        warning: 'bg-yellow-100 dark:bg-yellow-900/50',
        opportunity: 'bg-purple-100 dark:bg-purple-900/50'
    };
    return colors[type] || 'bg-gray-100 dark:bg-gray-900/50';
}

function getInsightIconColor(type) {
    const colors = {
        critical: 'text-blue-600 dark:text-blue-400',
        strength: 'text-green-600 dark:text-green-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
        opportunity: 'text-purple-600 dark:text-purple-400'
    };
    return colors[type] || 'text-gray-600 dark:text-gray-400';
}

function getInsightBadgeColor(type) {
    const colors = {
        critical: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        strength: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        opportunity: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
}

function renderQuickStats() {
    const container = document.getElementById('quick-stats');
    
    // Calculate key metrics
    const totalMarket = marketData.companies.reduce((sum, company) => 
        sum + marketData.salesData[company].totalSales, 0) / 1000000;
    const totalPatents = marketData.companies.reduce((sum, company) => 
        sum + marketData.patentData[company].totalPatents, 0);
    const avgUnitPrice = marketData.companies.reduce((sum, company) => 
        sum + marketData.salesData[company].averageCost, 0) / marketData.companies.length;
    const totalUnits = marketData.companies.reduce((sum, company) => 
        sum + marketData.salesData[company].totalUnits, 0);

    const stats = [
        { 
            label: 'Market Size', 
            value: `$${totalMarket.toFixed(1)}M`,
            trend: '+5.4% YoY',
            icon: 'chart-pie',
            color: 'blue'
        },
        { 
            label: 'Unit Sales', 
            value: totalUnits.toLocaleString(),
            trend: '+3.2% QoQ',
            icon: 'box',
            color: 'green'
        },
        { 
            label: 'Avg. Price', 
            value: `$${avgUnitPrice.toFixed(2)}`,
            trend: '+1.8% YoY',
            icon: 'tag',
            color: 'yellow'
        },
        { 
            label: 'Patents', 
            value: totalPatents.toLocaleString(),
            trend: '+12.5% YoY',
            icon: 'lightbulb',
            color: 'purple'
        }
    ];

    container.innerHTML = stats.map(stat => `
        <div class="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${stat.label}</p>
                    <p class="text-2xl font-light text-marcomm-dark dark:text-white mt-2">${stat.value}</p>
                    <p class="text-sm text-marcomm-orange mt-2">${stat.trend}</p>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-600 rounded-full">
                    <i class="fas fa-${stat.icon} text-xl text-marcomm-orange"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function renderMarketOverview() {
    const container = document.getElementById('market-overview');
    const marketSize = marketData.companies.reduce((sum, company) => 
        sum + marketData.salesData[company].totalSales, 0) / 1000000;
    const totalUnits = marketData.companies.reduce((sum, company) => 
        sum + marketData.salesData[company].totalUnits, 0);
    const avgPrice = marketData.companies.reduce((sum, company) => 
        sum + marketData.salesData[company].averageCost, 0) / marketData.companies.length;
    
    container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Global Market Size</p>
                    <p class="text-3xl font-light text-marcomm-dark dark:text-white mt-2">$${marketSize.toFixed(2)}M</p>
                    <p class="text-sm text-marcomm-orange mt-2">↑ 5.4% YoY</p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-full">
                    <i class="fas fa-globe text-2xl text-marcomm-orange"></i>
                </div>
            </div>
        </div>
                <div class="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Total Units Sold</p>
                    <p class="text-3xl font-light text-marcomm-dark dark:text-white mt-2">${totalUnits.toLocaleString()}</p>
                    <p class="text-sm text-marcomm-orange mt-2">↑ 3.2% QoQ</p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-full">
                    <i class="fas fa-box text-2xl text-marcomm-orange"></i>
                </div>
            </div>
        </div>
                <div class="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Average Unit Price</p>
                    <p class="text-3xl font-light text-marcomm-dark dark:text-white mt-2">$${avgPrice.toFixed(2)}</p>
                    <p class="text-sm text-marcomm-orange mt-2">↑ 1.8% QoQ</p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-full">
                    <i class="fas fa-tag text-2xl text-marcomm-orange"></i>
                </div>
            </div>
        </div>
    </div>
`;
}

function renderCompetitiveMap() {
    const container = document.getElementById('competitive-map');
    
    const marketLeader = marketData.companies.reduce((a, b) => 
        marketData.salesData[a].marketShare > marketData.salesData[b].marketShare ? a : b);
    const innovationLeader = marketData.companies.reduce((a, b) => 
        marketData.patentData[a].totalPatents > marketData.patentData[b].totalPatents ? a : b);
    
    container.innerHTML = `
                <div class="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 class="text-xl font-light text-marcomm-dark dark:text-white mb-4">Market Overview</h3>
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Market Concentration</span>
                    <span class="font-medium text-marcomm-dark dark:text-white">High (HHI: 2,945)</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Market Leader</span>
                    <span class="font-medium text-marcomm-orange">${marketLeader} (${marketData.salesData[marketLeader].marketShare.toFixed(1)}%)</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Innovation Leader</span>
                    <span class="font-medium text-marcomm-orange group relative cursor-pointer">
                        ${innovationLeader}
                        <div class="hidden group-hover:block absolute z-10 -translate-x-1/2 left-1/2 mt-2 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
                            ${marketData.patentData[innovationLeader].totalPatents.toLocaleString()} patents
                        </div>
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Industry Stage</span>
                    <span class="font-medium text-marcomm-dark dark:text-white">Mature/Consolidating</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Growth Rate</span>
                    <span class="font-medium text-marcomm-orange">5.4% YoY</span>
                </div>
            </div>
        </div>
    `;
}

function destroyChart(chartId) {
    if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
    }
}

// function renderMarketShareChart() {
//     destroyChart('market-share');
//     const ctx = document.getElementById('market-share-chart').getContext('2d');
    
//     chartInstances['market-share'] = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: marketData.companies,
//             datasets: [{
//                 data: marketData.companies.map(company => marketData.salesData[company].marketShare),
//                 backgroundColor: marketData.companies.map((_, i) => getDatasetColor(i, 0.8))
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 title: {
//                     display: true,
//                     text: 'Market Share Distribution',
//                     color: getTextColor()
//                 },
//                 legend: {
//                     position: 'bottom',
//                     labels: { color: getTextColor() }
//                 }
//             }
//         }
//     });
// }
function renderMarketShareChart() {
    destroyChart('market-share');
    const ctx = document.getElementById('market-share-chart').getContext('2d');
    const theme = getChartTheme();
    
    chartInstances['market-share'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: marketData.companies,
            datasets: [{
                data: marketData.companies.map(company => marketData.salesData[company].marketShare),
                backgroundColor: marketData.companies.map((_, i) => getDatasetColor(i, 0.8)),
                borderWidth: 2,
                borderColor: theme.backgroundColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: theme.textColor,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: theme.tooltipBackground,
                    titleColor: theme.textColor,
                    bodyColor: theme.textColor,
                    borderColor: theme.gridColor,
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
}

function renderFDAMetricsChart() {
    destroyChart('fda-metrics');
    const ctx = document.getElementById('fda-metrics-chart').getContext('2d');
    
    const datasets = [
        {
            label: 'UDI Devices',
            data: marketData.companies.map(company => marketData.fdaData[company].udiDevices),
            backgroundColor: getDatasetColor(0, 0.7),
            yAxisID: 'y-udi'
        },
        {
            label: '510(k) Clearances',
            data: marketData.companies.map(company => marketData.fdaData[company].k510Clearances),
            backgroundColor: getDatasetColor(1, 0.7),
            yAxisID: 'y-clearances'
        },
        {
            label: 'Adverse Events',
            data: marketData.companies.map(company => marketData.fdaData[company].adverseEvents),
            backgroundColor: getDatasetColor(2, 0.7),
            yAxisID: 'y-adverse'
        }
    ];

    chartInstances['fda-metrics'] = new Chart(ctx, {
        type: 'bar',
        data: { labels: marketData.companies, datasets },
        options: {
            responsive: true,
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: {
                    ticks: { color: getTextColor() },
                    grid: { color: getGridColor() }
                },
                'y-udi': {
                    type: 'linear',
                    position: 'left',
                    title: { 
                        display: true,
                        text: 'UDI Devices',
                        color: getTextColor()
                    },
                    ticks: { color: getTextColor() },
                    grid: { color: getGridColor() }
                },
                'y-clearances': {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: '510(k) Clearances',
                        color: getTextColor()
                    },
                    ticks: { color: getTextColor() },
                    grid: { display: false }
                },
                'y-adverse': {
                    type: 'logarithmic',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Adverse Events (log)',
                        color: getTextColor()
                    },
                    ticks: { color: getTextColor() },
                    grid: { display: false },
                    offset: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'FDA Metrics Analysis',
                    color: getTextColor()
                },
                legend: {
                    position: 'top',
                    labels: { color: getTextColor() }
                }
            }
        }
    });
}

function renderFinancialRadar() {
    destroyChart('financial-radar');
    const ctx = document.getElementById('financial-radar-chart').getContext('2d');
    
    const metrics = {
        'Revenue Growth (%)': {
            'Sonova/Phonak': sonovaData.current_period.key_financials.revenue.growth.local_currency,
            'WS Audiology': wsData.key_financials.revenue.organic_growth,
            'GN Resound': gnData.financial_highlights.revenue.by_division.hearing.organic_growth,
            'Starkey': 5.0
        },
        'EBITA/EBITDA Margin (%)': {
            'Sonova/Phonak': sonovaData.current_period.key_financials.ebita.margin_adjusted,
            'WS Audiology': wsData.key_financials.profitability.EBITDA.margin,
            'GN Resound': gnData.financial_highlights.profitability.ebita.margin,
            'Starkey': 15.0
        },
        // 'Market Share (%)': {
        //     'Sonova/Phonak': marketData.salesData['Sonova/Phonak'].marketShare,
        //     'WS Audiology': marketData.salesData['WS Audiology'].marketShare,
        //     'GN Resound': marketData.salesData['GN Resound'].marketShare,
        //     'Starkey': marketData.salesData['Starkey'].marketShare
        // },
        'R&D Investment (%)': {
            'Sonova/Phonak': (sonovaData.prior_year.costs.research_and_development / sonovaData.prior_year.key_financials.sales) * 100,
            'WS Audiology': wsData.operational_metrics.research_development.as_percent_of_sales,
            'GN Resound': gnData.operational_metrics.development_costs.rd_intensity,
            'Starkey': 6.5
        }
    };

    chartInstances['financial-radar'] = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(metrics),
            datasets: marketData.companies.map((company, index) => ({
                label: company,
                data: Object.keys(metrics).map(metric => metrics[metric][company] || 0),
                borderColor: getDatasetColor(index),
                backgroundColor: getDatasetColor(index, 0.2)
            }))
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: { color: getGridColor() },
                    grid: { color: getGridColor() },
                    pointLabels: { 
                        color: getTextColor(),
                        font: { size: 12 }
                    },
                    ticks: { 
                        color: getTextColor(),
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Financial Performance Analysis',
                    color: getTextColor()
                },
                legend: {
                    labels: { color: getTextColor() }
                }
            }
        }
    });
}

function renderPatentsChart() {
    destroyChart('patents');
    const ctx = document.getElementById('patents-chart').getContext('2d');
    
    chartInstances['patents'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: marketData.companies,
            datasets: [
                {
                    label: 'Total Patents',
                    data: marketData.companies.map(company => marketData.patentData[company].totalPatents),
                    backgroundColor: getDatasetColor(0, 0.8)
                },
                {
                    label: 'Recent Applications',
                    data: marketData.companies.map(company => marketData.patentData[company].recentApplications),
                    backgroundColor: getDatasetColor(1, 0.8)
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: getTextColor() },
                    grid: { color: getGridColor() }
                },
                x: {
                    ticks: { color: getTextColor() },
                    grid: { color: getGridColor() }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Patent Portfolio Analysis',
                    color: getTextColor()
                },
                legend: {
                    labels: { color: getTextColor() }
                }
            }
        }
    });
}

function getTextColor() {
    return document.documentElement.classList.contains('dark') ? '#fff' : '#1f2937';
}

function getGridColor() {
    return document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
}

function getDatasetColor(index, alpha = 1) {
    const colors = [
        `rgba(59, 130, 246, ${alpha})`,   // blue
        `rgba(16, 185, 129, ${alpha})`,   // green
        `rgba(239, 68, 68, ${alpha})`,    // red
        `rgba(245, 158, 11, ${alpha})`    // yellow
    ];
    return colors[index % colors.length];
}

function toggleDarkMode() {
    // document.documentElement.classList.toggle('dark');
    


    // const savedDarkMode = localStorage.getItem('darkMode');
            
    // // Set initial dark mode based on saved preference or system preference
    // if (savedDarkMode !== null) {
    //     if (savedDarkMode === 'true') {
    //         console.log("off")
    //         localStorage.setItem('darkMode', 'false');
    //     } else {
    //         console.log("on")
    //         localStorage.setItem('darkMode', 'true');
    //     }
    // }
    renderAllCharts();

}