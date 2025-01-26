// Import company data
import gnData from './data/Gn/finance.js';
import sonovaData from './data/Sonova/finance.js';
import wsData from './data/Ws/finance.js';
import DemantData from './data/Demant/finance.js'

// Map company data
const companyData = {
    'Gn': gnData,
    'Sonova': sonovaData,
    'Ws': wsData,
    'Demant': DemantData
};

// Utility functions
const formatCurrency = (value, unit = 'M') => {
    if (typeof value !== 'number' || isNaN(value)) return '-';
    if (unit === 'B') {
        return `${(value / 1000).toFixed(1)}B`;
    }
    return `${value.toFixed(1)}M`;
};

const formatPercentage = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '-';
    return `${value.toFixed(1)}%`;
};

const formatNumber = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '-';
    return value.toLocaleString();
};

// Helper function to safely get nested object values
const getValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

// Create metric card with dark mode support
const createMetricCard = (title, value, change = null, tooltip = '', additionalInfo = null) => {
    const changeClass = !change ? '' : change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
    const changeIcon = !change ? '' : change >= 0 ? '↑' : '↓';
    
    return `
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">${title}</h4>
                ${tooltip ? `<span class="text-xs text-gray-400 dark:text-gray-500 cursor-help" title="${tooltip}">ⓘ</span>` : ''}
            </div>
            <p class="text-xl font-semibold text-gray-900 dark:text-white">${value}</p>
            ${change !== null ? `
                <p class="${changeClass} text-sm">
                    ${changeIcon} ${formatPercentage(Math.abs(change))} YoY
                </p>
            ` : ''}
            ${additionalInfo ? `
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${additionalInfo}</p>
            ` : ''}
        </div>
    `;
};

// Chart configuration
const chartConfig = {
    colors: {
        primary: ['#60A5FA', '#34D399', '#A78BFA', '#F87171', '#FBBF24', '#8B5CF6'],
        background: {
            light: '#ffffff',
            dark: '#1f2937'
        },
        text: {
            light: '#374151',
            dark: '#E5E7EB'
        },
        grid: {
            light: '#E5E7EB',
            dark: '#374151'
        }
    }
};

// Create chart with dark mode support
function createChart(ctx, type, data, options = {}) {
    const isDark = document.documentElement.classList.contains('dark');
    
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: isDark ? chartConfig.colors.background.dark : chartConfig.colors.background.light,
                titleColor: isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light,
                bodyColor: isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light,
                borderColor: isDark ? chartConfig.colors.grid.dark : chartConfig.colors.grid.light,
                borderWidth: 1
            }
        },
        scales: {
            y: {
                grid: {
                    color: isDark ? chartConfig.colors.grid.dark : chartConfig.colors.grid.light
                },
                ticks: {
                    color: isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light
                }
            },
            x: {
                grid: {
                    color: isDark ? chartConfig.colors.grid.dark : chartConfig.colors.grid.light
                },
                ticks: {
                    color: isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light
                }
            }
        }
    };

    return new Chart(ctx, {
        type,
        data,
        options: {
            ...defaultOptions,
            ...options
        }
    });
}

// Data rendering functions
function renderCompanyHeader(data, companyName) {
    const getCompanyDisplayName = () => {
        switch(companyName) {
            case 'sonova':
                return 'Sonova Group';
            case 'gn':
                return 'GN Store Nord A/S';
            case 'ws-audiology':
                return 'WS Audiology A/S';
            default:
                return companyName;
        }
    };

    const getReportingPeriod = () => {
        if (companyName === 'sonova') {
            return data.current_period.period;
        } else if (companyName === 'gn') {
            return `${data.period.quarter} ${data.period.year}`;
        } else {
            return data.fiscal_year;
        }
    };

    document.getElementById('company-name').textContent = getCompanyDisplayName();
    document.getElementById('company-period').textContent = getReportingPeriod();
    document.getElementById('last-updated').textContent = `Last Updated: ${new Date().toLocaleString()}`;
}

function renderKPIMetrics(data, companyName) {
    const container = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4');
    container.innerHTML = '';

    const metrics = [];

    if (companyName === 'sonova') {
        metrics.push(
            {
                title: 'Revenue',
                value: formatCurrency(data.current_period.key_financials.revenue.total),
                change: data.current_period.key_financials.revenue.growth.local_currency,
                tooltip: 'Total revenue in local currency'
            },
            {
                title: 'EBITA',
                value: formatCurrency(data.current_period.key_financials.ebita.adjusted),
                change: null,
                tooltip: 'Adjusted earnings before interest, taxes, and amortization'
            },
            {
                title: 'Margin',
                value: formatPercentage(data.current_period.key_financials.ebita.margin_adjusted),
                tooltip: 'Adjusted EBITA margin'
            },
            {
                title: 'Equity Ratio',
                value: formatPercentage(data.current_period.balance_sheet.equity_ratio),
                tooltip: 'Total equity as percentage of total assets'
            }
        );
    } else if (companyName === 'gn') {
        metrics.push(
            {
                title: 'Revenue',
                value: formatCurrency(data.financial_highlights.revenue.total),
                change: data.financial_highlights.revenue.organic_growth,
                tooltip: 'Total revenue with organic growth'
            },
            {
                title: 'EBITA',
                value: formatCurrency(data.financial_highlights.profitability.ebita.value),
                change: data.financial_highlights.profitability.ebita.yoy_growth,
                tooltip: 'Earnings before interest, taxes, and amortization'
            },
            {
                title: 'Gross Margin',
                value: formatPercentage(data.financial_highlights.profitability.gross_profit.margin),
                change: data.financial_highlights.profitability.gross_profit.yoy_margin_change,
                tooltip: 'Gross profit as percentage of revenue'
            },
            {
                title: 'Operating Margin',
                value: formatPercentage(data.financial_highlights.profitability.ebita.margin),
                change: data.financial_highlights.profitability.ebita.yoy_margin_change,
                tooltip: 'EBITA as percentage of revenue'
            }
        );
    } else if (companyName === 'ws-audiology') {
        metrics.push(
            {
                title: 'Revenue',
                value: formatCurrency(data.key_financials.revenue.total),
                change: data.key_financials.revenue.organic_growth,
                tooltip: 'Total revenue with organic growth'
            },
            {
                title: 'EBITDA',
                value: formatCurrency(data.key_financials.profitability.EBITDA.before_special_items),
                tooltip: 'Earnings before interest, taxes, depreciation, and amortization'
            },
            {
                title: 'Gross Margin',
                value: formatPercentage(data.key_financials.profitability.gross_margin),
                tooltip: 'Gross profit as percentage of revenue'
            },
            {
                title: 'Market Share',
                value: formatPercentage(getValue(data, 'market_data.addressable_market.current_penetration')),
                tooltip: 'Current market penetration'
            }
        );
    }

    metrics.forEach(metric => {
        container.innerHTML += createMetricCard(
            metric.title,
            metric.value,
            metric.change,
            metric.tooltip,
            metric.additionalInfo
        );
    });
}

function renderFinancialMetrics(data, companyName) {
    const container = document.getElementById('financial-metrics');
    container.innerHTML = '';

    const metrics = [];

    if (companyName === 'sonova') {
        const hearingInstruments = data.current_period.key_financials.segments.hearing_instruments;
        const cochlearImplants = data.current_period.key_financials.segments.cochlear_implants;

        metrics.push(
            {
                title: 'Hearing Instruments',
                value: formatCurrency(hearingInstruments.revenue),
                change: hearingInstruments.organic_growth,
                tooltip: 'Revenue from hearing instruments segment',
                additionalInfo: `Margin: ${formatPercentage(hearingInstruments.margin)}`
            },
            {
                title: 'Cochlear Implants',
                value: formatCurrency(cochlearImplants.revenue),
                change: cochlearImplants.organic_growth,
                tooltip: 'Revenue from cochlear implants segment',
                additionalInfo: `Margin: ${formatPercentage(cochlearImplants.margin)}`
            },
            {
                title: 'Net Debt',
                value: formatCurrency(data.current_period.balance_sheet.net_debt),
                tooltip: 'Total debt minus cash and equivalents'
            }
        );
    } else if (companyName === 'gn') {
        const divisions = data.financial_highlights.revenue.by_division;
        
        Object.entries(divisions).forEach(([division, metrics]) => {
            metrics.push({
                title: division.charAt(0).toUpperCase() + division.slice(1),
                value: formatCurrency(metrics.revenue),
                change: metrics.organic_growth,
                tooltip: `Revenue and growth for ${division} division`,
                additionalInfo: `YoY Growth: ${formatPercentage(metrics.yoy_growth)}`
            });
        });

        metrics.push({
            title: 'Free Cash Flow',
            value: formatCurrency(data.financial_highlights.cash_flow.free_cash_flow.excl_ma),
            tooltip: 'Free cash flow excluding M&A',
            additionalInfo: `Cash conversion: ${formatPercentage(data.financial_highlights.cash_flow.cash_conversion)}`
        });
    } else if (companyName === 'ws-audiology') {
        const regions = data.key_financials.revenue.by_region;
        
        Object.entries(regions).forEach(([region, metrics]) => {
            metrics.push({
                title: `${region} Revenue`,
                value: formatCurrency(metrics.revenue),
                change: metrics.growth,
                tooltip: `Revenue and growth for ${region}`,
                additionalInfo: `Market Share: ${formatPercentage(metrics.share)}`
            });
        });
    }

    metrics.forEach(metric => {
        container.innerHTML += createMetricCard(
            metric.title,
            metric.value,
            metric.change,
            metric.tooltip,
            metric.additionalInfo
        );
    });
}

function renderOperatingMetrics(data, companyName) {
    const container = document.getElementById('operating-metrics');
    container.innerHTML = '';

    const metrics = [];

    if (companyName === 'ws-audiology') {
        metrics.push(
            {
                title: 'Employees',
                value: formatNumber(data.operational_metrics.employees.total),
                tooltip: 'Total number of employees',
                additionalInfo: `R&D Staff: ${formatNumber(data.operational_metrics.employees.by_function.RnD)}`
            },
            {
                title: 'R&D Investment',
                value: formatCurrency(data.operational_metrics.research_development.total_spend),
                tooltip: 'Research and development expenditure',
                additionalInfo: `${formatPercentage(data.operational_metrics.research_development.as_percent_of_sales)} of revenue`
            },
            {
                title: 'Production Sites',
                value: formatNumber(data.operational_metrics.infrastructure.production_sites),
                tooltip: 'Number of production facilities',
                additionalInfo: `R&D Hubs: ${formatNumber(data.operational_metrics.infrastructure.RnD_hubs.total)}`
            },
            {
                title: 'Employee Turnover',
                value: data.operational_metrics.employees.turnover.total,
                tooltip: 'Total employee turnover rate',
                additionalInfo: `Voluntary: ${data.operational_metrics.employees.turnover.voluntary}`
            }
        );
    } else if (companyName === 'gn') {
        metrics.push(
            {
                title: 'Employees',
                value: formatNumber(data.operational_metrics.employees.total),
                change: null,
                tooltip: 'Total number of employees',
                additionalInfo: `YoY Change: ${data.operational_metrics.employees.yoy_change}`
            },
            {
                title: 'R&D Costs',
                value: formatCurrency(data.operational_metrics.development_costs.total),
                tooltip: 'Development costs',
                additionalInfo: `Capitalized: ${formatCurrency(data.operational_metrics.development_costs.capitalized)}`
            },
            {
                title: 'R&D Intensity',
                value: formatPercentage(data.operational_metrics.development_costs.rd_intensity),
                tooltip: 'R&D spending as percentage of revenue'
            }
        );
    } else if (companyName === 'sonova') {
        metrics.push(
            {
                title: 'Employees',
                value: formatNumber(data.company_structure.additional_info.employees),
                tooltip: 'Total number of employees'
            },
            {
                title: 'Countries',
                value: data.company_structure.additional_info.countries_presence,
                tooltip: 'Global presence'
            },
            {
                title: 'R&D Expense',
                value: formatCurrency(data.prior_year.costs.research_and_development),
                tooltip: 'Research and development costs'
            }
        );
    }

    metrics.forEach(metric => {
        container.innerHTML += createMetricCard(
            metric.title,
            metric.value,
            metric.change,
            metric.tooltip,
            metric.additionalInfo
        );
    });
}

function renderBalanceSheet(data, companyName) {
    const container = document.getElementById('balance-sheet-metrics');
    container.innerHTML = '';

    const metrics = [];

    if (companyName === 'sonova') {
        metrics.push(
            {
                title: 'Total Assets',
                value: formatCurrency(data.current_period.balance_sheet.total_assets),
                tooltip: 'Total company assets'
            },
            {
                title: 'Equity',
                value: formatCurrency(data.current_period.balance_sheet.equity),
                tooltip: 'Total shareholders equity',
                additionalInfo: `Ratio: ${formatPercentage(data.current_period.balance_sheet.equity_ratio)}`
            },
            {
                title: 'Net Debt',
                value: formatCurrency(data.current_period.balance_sheet.net_debt),
                tooltip: 'Total debt minus cash and equivalents'
            }
        );
    } else if (companyName === 'ws-audiology') {
        metrics.push(
            {
                title: 'Total Assets',
                value: formatCurrency(data.key_financials.balance_sheet.total_assets),
                tooltip: 'Total company assets'
            },
            {
                title: 'Equity',
                value: formatCurrency(data.key_financials.balance_sheet.equity),
                tooltip: 'Total shareholders equity'
            },
            {
                title: 'Goodwill',
                value: formatCurrency(data.key_financials.balance_sheet.goodwill),
                tooltip: 'Recorded goodwill'
            },
            {
                title: 'Net Working Capital',
                value: formatCurrency(data.key_financials.balance_sheet.net_working_capital),
                tooltip: 'Current assets minus current liabilities'
            }
        );
    } else if (companyName === 'gn') {
        metrics.push(
            {
                title: 'Total Assets',
                value: formatCurrency(data.financial_highlights.balance_sheet.total_assets),
                tooltip: 'Total company assets'
            },
            {
                title: 'Equity',
                value: formatCurrency(data.financial_highlights.balance_sheet.equity),
                tooltip: 'Total shareholders equity',
                additionalInfo: `Ratio: ${formatPercentage(data.financial_highlights.balance_sheet.equity_ratio)}`
            },
            {
                title: 'Net Interest Bearing Debt',
                value: formatCurrency(data.financial_highlights.balance_sheet.net_interest_bearing_debt),
                tooltip: 'Net interest-bearing debt',
                additionalInfo: `Leverage ratio: ${data.financial_highlights.balance_sheet.leverage_ratio.adjusted}`
            }
        );
    }

    metrics.forEach(metric => {
        container.innerHTML += createMetricCard(
            metric.title,
            metric.value,
            metric.change,
            metric.tooltip,
            metric.additionalInfo
        );
    });
}

function renderCharts(data, companyName) {
    renderRevenueProfitChart(data, companyName);
    renderSegmentChart(data, companyName);
    renderRegionalChart(data, companyName);
}

function renderRevenueProfitChart(data, companyName) {
    const ctx = document.getElementById('revenue-profit-chart');
    if (!ctx) return;

    let chartData;
    
    if (companyName === 'sonova') {
        chartData = {
            labels: ['Revenue', 'EBITA', 'Gross Profit'],
            datasets: [{
                label: 'Financial Metrics',
                data: [
                    data.current_period.key_financials.revenue.total,
                    data.current_period.key_financials.ebita.adjusted,
                    data.prior_year.key_financials.gross_profit
                ],
                backgroundColor: [
                    chartConfig.colors.primary[0],
                    chartConfig.colors.primary[1],
                    chartConfig.colors.primary[2]
                ]
            }]
        };
    } else if (companyName === 'ws-audiology') {
        chartData = {
            labels: ['Revenue', 'EBITDA', 'Gross Profit'],
            datasets: [{
                label: 'Financial Metrics',
                data: [
                    data.key_financials.revenue.total,
                    data.key_financials.profitability.EBITDA.before_special_items,
                    data.key_financials.profitability.gross_profit
                ],
                backgroundColor: [
                    chartConfig.colors.primary[0],
                    chartConfig.colors.primary[1],
                    chartConfig.colors.primary[2]
                ]
            }]
        };
    } else if (companyName === 'gn') {
        chartData = {
            labels: ['Revenue', 'EBITA', 'Gross Profit'],
            datasets: [{
                label: 'Financial Metrics',
                data: [
                    data.financial_highlights.revenue.total,
                    data.financial_highlights.profitability.ebita.value,
                    data.financial_highlights.profitability.gross_profit.value
                ],
                backgroundColor: [
                    chartConfig.colors.primary[0],
                    chartConfig.colors.primary[1],
                    chartConfig.colors.primary[2]
                ]
            }]
        };
    }

    createChart(ctx, 'bar', chartData, {
        plugins: {
            title: {
                display: true,
                text: 'Revenue & Profitability'
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${formatCurrency(context.raw)}`
                }
            }
        }
    });
}

function renderSegmentChart(data, companyName) {
    const ctx = document.getElementById('segment-chart');
    if (!ctx) return;

    let chartData;

    if (companyName === 'sonova') {
        const segments = data.current_period.key_financials.segments;
        chartData = {
            labels: ['Hearing Instruments', 'Cochlear Implants'],
            datasets: [{
                data: [
                    segments.hearing_instruments.revenue,
                    segments.cochlear_implants.revenue
                ],
                backgroundColor: [
                    chartConfig.colors.primary[0],
                    chartConfig.colors.primary[1]
                ]
            }]
        };
    } else if (companyName === 'gn') {
        const divisions = data.financial_highlights.revenue.by_division;
        chartData = {
            labels: Object.keys(divisions).map(key => key.replace('_', ' ').toUpperCase()),
            datasets: [{
                data: Object.values(divisions).map(div => div.revenue),
                backgroundColor: chartConfig.colors.primary.slice(0, Object.keys(divisions).length)
            }]
        };
    } else if (companyName === 'ws-audiology') {
        const regions = data.key_financials.revenue.by_region;
        chartData = {
            labels: Object.keys(regions),
            datasets: [{
                data: Object.values(regions).map(region => region.revenue),
                backgroundColor: chartConfig.colors.primary.slice(0, Object.keys(regions).length)
            }]
        };
    }

    createChart(ctx, 'doughnut', chartData, {
        plugins: {
            title: {
                display: true,
                text: 'Revenue by Segment'
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${formatCurrency(context.raw)}`
                }
            }
        }
    });
}

function renderRegionalChart(data, companyName) {
    const ctx = document.getElementById('regional-revenue-chart');
    if (!ctx) return;

    let chartData;

    if (companyName === 'sonova') {
        const regions = data.prior_year.sales_by_region;
        chartData = {
            labels: Object.keys(regions),
            datasets: [{
                data: Object.values(regions).map(region => region.revenue),
                backgroundColor: chartConfig.colors.primary.slice(0, Object.keys(regions).length)
            }]
        };
    } else if (companyName === 'ws-audiology') {
        const regions = data.key_financials.revenue.by_region;
        chartData = {
            labels: Object.keys(regions),
            datasets: [{
                data: Object.values(regions).map(region => region.revenue),
                backgroundColor: chartConfig.colors.primary.slice(0, Object.keys(regions).length)
            }]
        };
    } else if (companyName === 'gn') {
        const geography = data.financial_highlights.revenue.by_geography;
        chartData = {
            labels: Object.keys(geography),
            datasets: [{
                data: Object.values(geography).map(region => region.revenue),
                backgroundColor: chartConfig.colors.primary.slice(0, Object.keys(geography).length)
            }]
        };
    }

    createChart(ctx, 'pie', chartData, {
        plugins: {
            title: {
                display: true,
                text: 'Revenue by Region'
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${formatCurrency(context.raw)}`
                }
            }
        }
    });
}

// // Main initialization function
// function initializeFinancialDashboard(companyName) {
//     try {
//         if (!companyData[companyName]) {
//             throw new Error(`Invalid company name: ${companyName}`);
//         }

//         const data = companyData[companyName];
//         console.log(data)

//         // Clear any existing charts
//         Chart.helpers.each(Chart.instances, (instance) => {
//             instance.destroy();
//         });

//         // Render all components
//         renderCompanyHeader(data, companyName);
//         renderKPIMetrics(data, companyName);
//         renderFinancialMetrics(data, companyName);
//         renderOperatingMetrics(data, companyName);
//         renderBalanceSheet(data, companyName);
//         renderCharts(data, companyName);

//     } catch (error) {
//         console.error('Error initializing dashboard:', error);
//         document.getElementById('company-detail-container').innerHTML = `
//             <div class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 mb-6">
//                 <p class="font-bold">Error</p>
//                 <p>${error.message}</p>
//             </div>
//         `;
//     }
// }

// Handle window resize for charts
window.addEventListener('resize', _.debounce(() => {
    const currentCompany = window.companyName; // Assuming companyName is a global variable
    if (currentCompany) {
        initializeFinancialDashboard(currentCompany);
    }
}, 250));

// Handle dark mode
// Handle dark mode changes
const handleDarkModeChange = () => {
    const isDark = document.documentElement.classList.contains('dark');
    Chart.helpers.each(Chart.instances, (instance) => {
        const options = instance.options;
        
        // Update grid colors
        if (options.scales) {
            Object.values(options.scales).forEach(scale => {
                if (scale.grid) {
                    scale.grid.color = isDark ? chartConfig.colors.grid.dark : chartConfig.colors.grid.light;
                }
                if (scale.ticks) {
                    scale.ticks.color = isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light;
                }
            });
        }

        // Update legend colors
        if (options.plugins && options.plugins.legend) {
            options.plugins.legend.labels.color = isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light;
        }

        // Update tooltip styles
        if (options.plugins && options.plugins.tooltip) {
            options.plugins.tooltip.backgroundColor = isDark ? chartConfig.colors.background.dark : chartConfig.colors.background.light;
            options.plugins.tooltip.titleColor = isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light;
            options.plugins.tooltip.bodyColor = isDark ? chartConfig.colors.text.dark : chartConfig.colors.text.light;
            options.plugins.tooltip.borderColor = isDark ? chartConfig.colors.grid.dark : chartConfig.colors.grid.light;
        }

        instance.update();
    });
};

// Watch for system dark mode changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        document.documentElement.classList.toggle('dark', event.matches);
        handleDarkModeChange();
    });
}

// Utility function to refresh the dashboard
function refreshDashboard() {
    if (window.companyName) {
        initializeFinancialDashboard(window.companyName);
    }
}

// Data refresh handling
let lastRefreshTime = Date.now();
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

function checkRefreshData() {
    const now = Date.now();
    if (now - lastRefreshTime >= REFRESH_INTERVAL) {
        refreshDashboard();
        lastRefreshTime = now;
    }
}

// Set up periodic refresh check
setInterval(checkRefreshData, 60 * 1000); // Check every minute

// Additional utility functions
function downloadDashboardData(companyName) {
    const data = companyData[companyName];
    if (!data) return;

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${companyName}-financial-data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function downloadChartImage(chartId, fileName) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Error handling
function handleError(error, container) {
    console.error('Dashboard Error:', error);
    if (container) {
        container.innerHTML = `
            <div class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 mb-6">
                <p class="font-bold">Error</p>
                <p>${error.message}</p>
                <button onclick="refreshDashboard()" class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Retry
                </button>
            </div>
        `;
    }
}

function generateDashboardHTML(data, companyName) {
    return `
        <div class="container mx-auto px-4 py-8">
            <!-- Company Header -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 id="company-name" class="text-3xl font-bold mb-2">${data.company || companyName}</h1>
                        <p id="company-period" class="text-gray-600 dark:text-gray-400">${data.current_period.period}</p>
                    </div>
                    <div class="text-right">
                        <p id="last-updated" class="text-sm text-gray-600 dark:text-gray-400">Last Updated: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <!-- Key Performance Indicators -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <!-- Revenue Card -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                        <span class="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">TTM</span>
                    </div>
                    <p id="revenue-value" class="mt-2 text-3xl font-semibold">
                        ${formatCurrency(data.current_period.key_financials.revenue.total)}
                    </p>
                    <div id="revenue-growth" class="mt-2 text-sm">
                        <span class="${data.current_period.key_financials.revenue.growth.local_currency >= 0 ? 'text-green-500' : 'text-red-500'}">
                            ${data.current_period.key_financials.revenue.growth.local_currency >= 0 ? '↑' : '↓'} 
                            ${Math.abs(data.current_period.key_financials.revenue.growth.local_currency)}%
                        </span>
                        <span class="text-gray-500 dark:text-gray-400 ml-1">vs prior year</span>
                    </div>
                </div>

                <!-- EBITA Card -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">EBITA</h3>
                    <p class="mt-2 text-3xl font-semibold">
                        ${formatCurrency(data.current_period.key_financials.ebita.adjusted)}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Margin: ${formatPercentage(data.current_period.key_financials.ebita.margin_adjusted)}
                    </p>
                </div>

                <!-- Gross Profit Card -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Gross Profit</h3>
                    <p class="mt-2 text-3xl font-semibold">
                        ${formatCurrency(data.prior_year.key_financials.gross_profit)}
                    </p>
                </div>

                <!-- Balance Sheet Card -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Assets</h3>
                    <p class="mt-2 text-3xl font-semibold">
                        ${formatCurrency(data.current_period.balance_sheet.total_assets)}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Equity Ratio: ${formatPercentage(data.current_period.balance_sheet.equity_ratio)}
                    </p>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Revenue & Profitability</h2>
                    </div>
                    <div class="p-4">
                        <canvas id="revenue-profit-chart" height="300"></canvas>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Segment Performance</h2>
                    </div>
                    <div class="p-4">
                        <canvas id="segment-chart" height="300"></canvas>
                    </div>
                </div>
            </div>

            <!-- Metrics Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <!-- Financial Metrics -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Financial Metrics</h2>
                    </div>
                    <div class="p-4">
                        <div id="financial-metrics" class="space-y-4">
                            ${generateFinancialMetrics(data)}
                        </div>
                    </div>
                </div>

                <!-- Operating Metrics -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Operating Metrics</h2>
                    </div>
                    <div class="p-4">
                        <div id="operating-metrics" class="space-y-4">
                            ${generateOperatingMetrics(data)}
                        </div>
                    </div>
                </div>

                <!-- Market Metrics -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Market Metrics</h2>
                    </div>
                    <div class="p-4">
                        <div id="market-metrics" class="space-y-4">
                            ${generateMarketMetrics(data)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper function to generate financial metrics HTML
function generateFinancialMetrics(data) {
    const metrics = [
        {
            title: 'Operating Margin',
            value: formatPercentage(data.current_period.key_financials.ebita.margin_adjusted),
            tooltip: 'Operating profit as percentage of revenue'
        },
        {
            title: 'Net Debt',
            value: formatCurrency(data.current_period.balance_sheet.net_debt),
            tooltip: 'Total debt minus cash and equivalents'
        }
        // Add more metrics as needed
    ];

    return metrics.map(metric => createMetricCard(metric.title, metric.value, null, metric.tooltip)).join('');
}

// Helper function to generate operating metrics HTML
function generateOperatingMetrics(data) {
    try {
        const metrics = [
            {
                title: 'Employees',
                value: formatNumber(data.company_structure.additional_info.employees),
                tooltip: 'Total number of employees'
            },
            {
                title: 'R&D Expense',
                value: formatCurrency(data.prior_year.costs.research_and_development),
                tooltip: 'Research and development costs'
            }
            // Add more metrics as needed
        ];

        return metrics.map(metric => createMetricCard(metric.title, metric.value, null, metric.tooltip)).join('');
    } catch (error) {
        console.error('Error generating operating metrics:', error);
        return '<div class="text-red-500">Error loading operating metrics</div>';
    }
}

// Helper function to generate market metrics HTML
function generateMarketMetrics(data) {
    try {
        const metrics = [
            {
                title: 'Market Growth',
                value: data.outlook_2024_25.sales_growth_guidance,
                tooltip: 'Expected market growth'
            },
            {
                title: 'EBITA Growth Guidance',
                value: data.outlook_2024_25.adjusted_ebita_growth_guidance,
                tooltip: 'Expected EBITA growth'
            }
            // Add more metrics as needed
        ];

        return metrics.map(metric => createMetricCard(metric.title, metric.value, null, metric.tooltip)).join('');
    } catch (error) {
        console.error('Error generating market metrics:', error);
        return '<div class="text-red-500">Error loading market metrics</div>';
    }
}

async function initializeFinancialDashboard(companyName) {
    try {
        const container = document.getElementById('financial-analysis-content');
        if (!container) {
            throw new Error('Container not found');
        }

        // Normalize company name
        const normalizedName = companyName;
        const data = companyData[normalizedName];

        if (!data) {
            throw new Error(`No data found for company: ${companyName}`);
        }

        console.log('Initializing dashboard for:', companyName);

        // Clear any existing charts
        Chart.helpers.each(Chart.instances, (instance) => {
            instance.destroy();
        });

        // Generate HTML based on company
        let dashboardHTML;
        switch(normalizedName) {
            case 'Sonova':
                dashboardHTML = generateSonovaDashboard(data);
                break;
            case 'Ws':
                dashboardHTML = generateWSADashboard(data);
                break;
            case 'Gn':
                dashboardHTML = generateGNDashboard(data);
                break;
            case 'Demant':
                dashboardHTML = generateDemantDashboard(data);
                break;

            default:
                throw new Error(`Unknown company: ${companyName}`);
        }

        // Inject HTML
        container.innerHTML = dashboardHTML;
        container.classList.remove('hidden');

        // Initialize charts based on company
        switch(normalizedName) {
            case 'Sonova':
                initializeSonovaCharts(data);
                break;
            case 'Ws':
                initializeWSACharts(data);
                break;
            case 'Gn':
                initializeGNCharts(data);
                break;
             case 'Demant':
                    initializeDemantCharts(data)
                    break;
        }

        console.log('Dashboard initialized successfully');

    } catch (error) {
        console.error('Error initializing dashboard:', error);
        const container = document.getElementById('financial-analysis-content');
        if (container) {
            container.innerHTML = `
                <div class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 mb-6">
                    <p class="font-bold">Error Initializing Dashboard</p>
                    <p>${error.message}</p>
                </div>
            `;
            container.classList.remove('hidden');
        }
    }
}

// Company-specific dashboard generators
// function generateSonovaDashboard(data) {
//     return `
//         <div class="container mx-auto px-4 py-8">
//             <!-- Company Header -->
//             <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
//                 <div class="flex justify-between items-start">
//                     <div>
//                         <h1 class="text-3xl font-bold mb-2">Sonova Group</h1>
//                         <p class="text-gray-600 dark:text-gray-400">${data.current_period.period}</p>
//                     </div>
//                     <div class="text-right">
//                         <p class="text-sm text-gray-600 dark:text-gray-400">Last Updated: ${new Date().toLocaleString()}</p>
//                     </div>
//                 </div>
//             </div>

//             <!-- KPIs -->
//             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.key_financials.revenue.total)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Growth: ${formatPercentage(data.current_period.key_financials.revenue.growth.local_currency)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">EBITA (Adjusted)</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.key_financials.ebita.adjusted)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.current_period.key_financials.ebita.margin_adjusted)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Hearing Instruments</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.key_financials.segments.hearing_instruments.revenue)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Growth: ${formatPercentage(data.current_period.key_financials.segments.hearing_instruments.organic_growth)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Cochlear Implants</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.key_financials.segments.cochlear_implants.revenue)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Growth: ${formatPercentage(data.current_period.key_financials.segments.cochlear_implants.organic_growth)}</p>
//                 </div>
//             </div>

//             <!-- Charts -->
//             <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Revenue & Profitability</h2>
//                     </div>
//                     <div class="p-4 h-80">
//                         <canvas id="sonova-financial-metrics"></canvas>
//                     </div>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Segment Revenue</h2>
//                     </div>
//                     <div class="p-4 h-80">
//                         <canvas id="sonova-segment-revenue"></canvas>
//                     </div>
//                 </div>
//             </div>

//             <!-- Additional metrics -->
//             <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Balance Sheet</h2>
//                     </div>
//                     <div class="p-4">
//                         <div class="space-y-4">
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Total Assets</span>
//                                 <span class="font-medium">${formatCurrency(data.current_period.balance_sheet.total_assets)}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Equity</span>
//                                 <span class="font-medium">${formatCurrency(data.current_period.balance_sheet.equity)}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Equity Ratio</span>
//                                 <span class="font-medium">${formatPercentage(data.current_period.balance_sheet.equity_ratio)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Outlook ${data.outlook_2024_25 ? '2024/25' : ''}</h2>
//                     </div>
//                     <div class="p-4">
//                         <div class="space-y-4">
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Sales Growth Guidance</span>
//                                 <span class="font-medium">${data.outlook_2024_25?.sales_growth_guidance || '-'}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">EBITA Growth Guidance</span>
//                                 <span class="font-medium">${data.outlook_2024_25?.adjusted_ebita_growth_guidance || '-'}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// WS Audiology Dashboard Implementation
// function generateWSADashboard(data) {
//     return `
//         <div class="container mx-auto px-4 py-8">
//             <!-- Company Header -->
//             <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
//                 <div class="flex justify-between items-start">
//                     <div>
//                         <h1 class="text-3xl font-bold mb-2">WS Audiology A/S</h1>
//                         <p class="text-gray-600 dark:text-gray-400">Fiscal Year ${data.fiscal_year}</p>
//                     </div>
//                     <div class="text-right">
//                         <p class="text-sm text-gray-600 dark:text-gray-400">Last Updated: ${new Date().toLocaleString()}</p>
//                     </div>
//                 </div>
//             </div>

//             <!-- KPIs -->
//             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.revenue.total)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Growth: ${formatPercentage(data.key_financials.revenue.organic_growth)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">EBITDA</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.profitability.EBITDA.before_special_items)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.key_financials.profitability.EBITDA.margin)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Gross Profit</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.profitability.gross_profit)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.key_financials.profitability.gross_margin)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Free Cash Flow</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.cash_flow.free_cash_flow)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Operating: ${formatCurrency(data.key_financials.cash_flow.operating)}</p>
//                 </div>
//             </div>

//             <!-- Charts -->
//             <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Revenue by Region</h2>
//                     </div>
//                     <div class="p-4 h-80">
//                         <canvas id="wsa-revenue-by-region"></canvas>
//                     </div>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Key Financial Metrics</h2>
//                     </div>
//                     <div class="p-4 h-80">
//                         <canvas id="wsa-financial-metrics"></canvas>
//                     </div>
//                 </div>
//             </div>

//             <!-- Additional Metrics -->
//             <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Operational Metrics</h2>
//                     </div>
//                     <div class="p-4">
//                         <div class="space-y-4">
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Total Employees</span>
//                                 <span class="font-medium">${data.operational_metrics.employees.total}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">R&D Spend</span>
//                                 <span class="font-medium">${formatCurrency(data.operational_metrics.research_development.total_spend)}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">R&D as % of Sales</span>
//                                 <span class="font-medium">${formatPercentage(data.operational_metrics.research_development.as_percent_of_sales)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Balance Sheet Overview</h2>
//                     </div>
//                     <div class="p-4">
//                         <div class="space-y-4">
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Total Assets</span>
//                                 <span class="font-medium">${formatCurrency(data.key_financials.balance_sheet.total_assets)}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Equity</span>
//                                 <span class="font-medium">${formatCurrency(data.key_financials.balance_sheet.equity)}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Net Working Capital</span>
//                                 <span class="font-medium">${formatCurrency(data.key_financials.balance_sheet.net_working_capital)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// // GN Store Nord Dashboard Implementation
// function generateGNDashboard(data) {
//     return `
//         <div class="container mx-auto px-4 py-8">
//             <!-- Company Header -->
//             <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
//                 <div class="flex justify-between items-start">
//                     <div>
//                         <h1 class="text-3xl font-bold mb-2">GN Store Nord A/S</h1>
//                         <p class="text-gray-600 dark:text-gray-400">${data.period.quarter} ${data.period.year}</p>
//                     </div>
//                     <div class="text-right">
//                         <p class="text-sm text-gray-600 dark:text-gray-400">Report Date: ${data.period.report_date}</p>
//                     </div>
//                 </div>
//             </div>

//             <!-- KPIs -->
//             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.revenue.total)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Organic Growth: ${formatPercentage(data.financial_highlights.revenue.organic_growth)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">EBITA</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.profitability.ebita.value)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.financial_highlights.profitability.ebita.margin)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Free Cash Flow</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.cash_flow.free_cash_flow.excl_ma)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Cash Conversion: ${formatPercentage(data.financial_highlights.cash_flow.cash_conversion)}</p>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                     <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Gross Profit</h3>
//                     <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.profitability.gross_profit.value)}</p>
//                     <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.financial_highlights.profitability.gross_profit.margin)}</p>
//                 </div>
//             </div>

//             <!-- Charts -->
//             <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Revenue by Division</h2>
//                     </div>
//                     <div class="p-4 h-80">
//                         <canvas id="gn-revenue-by-division"></canvas>
//                     </div>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Geographic Distribution</h2>
//                     </div>
//                     <div class="p-4 h-80">
//                         <canvas id="gn-geographic-revenue"></canvas>
//                     </div>
//                 </div>
//             </div>

//             <!-- Additional Metrics -->
//             <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Guidance 2024</h2>
//                     </div>
//                     <div class="p-4">
//                         <div class="space-y-4">
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Organic Growth Target</span>
//                                 <span class="font-medium">${data.guidance_2024.organic_growth.range}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">EBITA Margin Target</span>
//                                 <span class="font-medium">${data.guidance_2024.ebita_margin.range}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Free Cash Flow Target</span>
//                                 <span class="font-medium">> ${formatCurrency(1100)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <div class="p-4 border-b border-gray-200 dark:border-gray-700">
//                         <h2 class="text-lg font-medium">Capital Structure</h2>
//                     </div>
//                     <div class="p-4">
//                         <div class="space-y-4">
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Market Cap</span>
//                                 <span class="font-medium">${formatCurrency(data.capital_structure.market_metrics.market_cap)}</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Share Price</span>
//                                 <span class="font-medium">${data.capital_structure.market_metrics.share_price} DKK</span>
//                             </div>
//                             <div class="flex justify-between">
//                                 <span class="text-gray-600 dark:text-gray-400">Foreign Ownership</span>
//                                 <span class="font-medium">${data.capital_structure.market_metrics.foreign_ownership}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// // Chart initialization for WS Audiology
// // Chart initialization for WS Audiology
// function initializeWSACharts(data) {
//     // Revenue by Region chart
//     const regionCtx = document.getElementById('wsa-revenue-by-region');
//     if (regionCtx) {
//         new Chart(regionCtx, {
//             type: 'pie',
//             data: {
//                 labels: ['EMEA', 'Americas', 'APAC'],
//                 datasets: [{
//                     data: [
//                         data.key_financials.revenue.by_region.EMEA.revenue,
//                         data.key_financials.revenue.by_region.Americas.revenue,
//                         data.key_financials.revenue.by_region.APAC.revenue
//                     ],
//                     backgroundColor: [
//                         'rgba(96, 165, 250, 0.8)',
//                         'rgba(52, 211, 153, 0.8)',
//                         'rgba(167, 139, 250, 0.8)'
//                     ]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         position: 'bottom',
//                         labels: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
//                         }
//                     },
//                     tooltip: {
//                         callbacks: {
//                             label: function(context) {
//                                 return `${context.label}: ${formatCurrency(context.raw)} (${data.key_financials.revenue.by_region[context.label].share}%)`;
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//     }

//     // Financial Metrics chart
//     const metricsCtx = document.getElementById('wsa-financial-metrics');
//     if (metricsCtx) {
//         new Chart(metricsCtx, {
//             type: 'bar',
//             data: {
//                 labels: ['Revenue', 'EBITDA', 'Gross Profit', 'Operating Cash Flow'],
//                 datasets: [{
//                     label: 'Financial Metrics',
//                     data: [
//                         data.key_financials.revenue.total,
//                         data.key_financials.profitability.EBITDA.before_special_items,
//                         data.key_financials.profitability.gross_profit,
//                         data.key_financials.cash_flow.operating
//                     ],
//                     backgroundColor: [
//                         'rgba(96, 165, 250, 0.8)',
//                         'rgba(52, 211, 153, 0.8)',
//                         'rgba(167, 139, 250, 0.8)',
//                         'rgba(249, 168, 212, 0.8)'
//                     ]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         display: false
//                     }
//                 },
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         grid: {
//                             color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB'
//                         },
//                         ticks: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151',
//                             callback: function(value) {
//                                 return formatCurrency(value);
//                             }
//                         }
//                     },
//                     x: {
//                         grid: {
//                             display: false
//                         },
//                         ticks: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
//                         }
//                     }
//                 }
//             }
//         });
//     }
// }

// // Chart initialization for GN Store Nord
// function initializeGNCharts(data) {
//     // Revenue by Division chart
//     const divisionCtx = document.getElementById('gn-revenue-by-division');
//     if (divisionCtx) {
//         new Chart(divisionCtx, {
//             type: 'doughnut',
//             data: {
//                 labels: ['Hearing', 'Enterprise', 'Gaming & Consumer'],
//                 datasets: [{
//                     data: [
//                         data.financial_highlights.revenue.by_division.hearing.revenue,
//                         data.financial_highlights.revenue.by_division.enterprise.revenue,
//                         data.financial_highlights.revenue.by_division.gaming_consumer.revenue
//                     ],
//                     backgroundColor: [
//                         'rgba(96, 165, 250, 0.8)',
//                         'rgba(52, 211, 153, 0.8)',
//                         'rgba(167, 139, 250, 0.8)'
//                     ]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         position: 'bottom',
//                         labels: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
//                         }
//                     },
//                     tooltip: {
//                         callbacks: {
//                             label: function(context) {
//                                 const division = context.label.toLowerCase().replace(' & ', '_');
//                                 return `${context.label}: ${formatCurrency(context.raw)} (${formatPercentage(data.financial_highlights.revenue.by_division[division].organic_growth)} org. growth)`;
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//     }

//     // Geographic Revenue Distribution chart
//     const geoCtx = document.getElementById('gn-geographic-revenue');
//     if (geoCtx) {
//         new Chart(geoCtx, {
//             type: 'bar',
//             data: {
//                 labels: ['Europe', 'North America', 'Rest of World'],
//                 datasets: [{
//                     label: 'Revenue',
//                     data: [
//                         data.financial_highlights.revenue.by_geography.europe.revenue,
//                         data.financial_highlights.revenue.by_geography.north_america.revenue,
//                         data.financial_highlights.revenue.by_geography.rest_of_world.revenue
//                     ],
//                     backgroundColor: [
//                         'rgba(96, 165, 250, 0.8)',
//                         'rgba(52, 211, 153, 0.8)',
//                         'rgba(167, 139, 250, 0.8)'
//                     ]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         display: false
//                     }
//                 },
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         grid: {
//                             color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB'
//                         },
//                         ticks: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151',
//                             callback: function(value) {
//                                 return formatCurrency(value);
//                             }
//                         }
//                     },
//                     x: {
//                         grid: {
//                             display: false
//                         },
//                         ticks: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
//                         }
//                     }
//                 }
//             }
//         });
//     }
// }

// // Chart initialization functions for each company
// function initializeSonovaCharts(data) {
//     // Financial metrics chart
//     const financialCtx = document.getElementById('sonova-financial-metrics');
//     if (financialCtx) {
//         new Chart(financialCtx, {
//             type: 'bar',
//             data: {
//                 labels: ['Revenue', 'EBITA', 'Gross Profit'],
//                 datasets: [{
//                     label: 'Current Period (Millions)',
//                     data: [
//                         data.current_period.key_financials.revenue.total,
//                         data.current_period.key_financials.ebita.adjusted,
//                         data.prior_year.key_financials.gross_profit
//                     ],
//                     backgroundColor: [
//                         'rgba(96, 165, 250, 0.8)',
//                         'rgba(52, 211, 153, 0.8)',
//                         'rgba(167, 139, 250, 0.8)'
//                     ]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         display: true,
//                         position: 'top',
//                         labels: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
//                         }
//                     }
//                 },
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         grid: {
//                             color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB'
//                         },
//                         ticks: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
//                         }
//                     },
//                     x: {
//                         grid: {
//                             display: false
//                         },
//                         ticks: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
//                         }
//                     }
//                 }
//             }
//         });
//     }

//     // Segment revenue chart
//     const segmentCtx = document.getElementById('sonova-segment-revenue');
//     if (segmentCtx) {
//         new Chart(segmentCtx, {
//             type: 'doughnut',
//             data: {
//                 labels: ['Hearing Instruments', 'Cochlear Implants'],
//                 datasets: [{
//                     data: [
//                         data.current_period.key_financials.segments.hearing_instruments.revenue,
//                         data.current_period.key_financials.segments.cochlear_implants.revenue
//                     ],
//                     backgroundColor: [
//                         'rgba(96, 165, 250, 0.8)',
//                         'rgba(52, 211, 153, 0.8)'
//                     ]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         position: 'bottom',
//                         labels: {
//                             color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151'
//                         }
//                     }
//                 }
//             }
//         });
//     }
// }


// Sonova Dashboard Implementation
function generateSonovaDashboard(data) {
    return `
        <div class="container mx-auto px-4 py-8 dark:text-white">
            <!-- Company Header -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 class="text-3xl font-bold mb-2">Sonova Group</h1>
                        <p class="text-gray-600 dark:text-gray-400">${data.current_period.period}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Last Updated: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <!-- Primary KPIs -->
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6 dark:text-white">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.key_financials.revenue.total)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">LC Growth: ${formatPercentage(data.current_period.key_financials.revenue.growth.local_currency)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Adj. EBITA</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.key_financials.ebita.adjusted)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.current_period.key_financials.ebita.margin_adjusted)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">HI Revenue</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.key_financials.segments.hearing_instruments.revenue)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Growth: ${formatPercentage(data.current_period.key_financials.segments.hearing_instruments.organic_growth)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">CI Revenue</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.key_financials.segments.cochlear_implants.revenue)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Growth: ${formatPercentage(data.current_period.key_financials.segments.cochlear_implants.organic_growth)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Assets</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.balance_sheet.total_assets)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Equity Ratio: ${formatPercentage(data.current_period.balance_sheet.equity_ratio)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Equity</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.current_period.balance_sheet.equity)}</p>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 dark:text-white">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Segment Revenue Distribution</h2>
                    </div>
                    <div class="p-4 h-80">
                        <canvas id="sonova-segment-revenue"></canvas>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Financial Metrics Trend</h2>
                    </div>
                    <div class="p-4 h-80">
                        <canvas id="sonova-financial-metrics"></canvas>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Growth Metrics</h2>
                    </div>
                    <div class="p-4 h-80">
                        <canvas id="sonova-growth-metrics"></canvas>
                    </div>
                </div>
            </div>

            <!-- Detailed Metrics -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 dark:text-white">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Segment Performance</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 class="font-medium mb-2">Hearing Instruments</h3>
                                    <div class="space-y-2">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Revenue</span>
                                            <span>${formatCurrency(data.current_period.key_financials.segments.hearing_instruments.revenue)}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Organic Growth</span>
                                            <span>${formatPercentage(data.current_period.key_financials.segments.hearing_instruments.organic_growth)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="font-medium mb-2">Cochlear Implants</h3>
                                    <div class="space-y-2">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Revenue</span>
                                            <span>${formatCurrency(data.current_period.key_financials.segments.cochlear_implants.revenue)}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Organic Growth</span>
                                            <span>${formatPercentage(data.current_period.key_financials.segments.cochlear_implants.organic_growth)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Outlook Section -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow dark:text-white">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Outlook ${data.outlook_2024_25 ? '2024/25' : ''}</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Sales Growth Guidance</span>
                                <span class="font-medium">${data.outlook_2024_25?.sales_growth_guidance || '-'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">EBITA Growth Guidance</span>
                                <span class="font-medium">${data.outlook_2024_25?.adjusted_ebita_growth_guidance || '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// WS Audiology Dashboard Implementation with expanded metrics
function generateWSADashboard(data) {
    return `
        <div class="container mx-auto px-4 py-8 dark:text-white">
            <!-- Company Header -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 class="text-3xl font-bold mb-2">WS Audiology A/S</h1>
                        <p class="text-gray-600 dark:text-gray-400">Fiscal Year ${data.fiscal_year}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Last Updated: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <!-- Primary KPIs -->
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6 dark:text-white">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.revenue.total)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Growth: ${formatPercentage(data.key_financials.revenue.organic_growth)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">EBITDA</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.profitability.EBITDA.before_special_items)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.key_financials.profitability.EBITDA.margin)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Gross Profit</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.profitability.gross_profit)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.key_financials.profitability.gross_margin)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Operating Cash Flow</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.cash_flow.operating)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">FCF: ${formatCurrency(data.key_financials.cash_flow.free_cash_flow)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Assets</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.balance_sheet.total_assets)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Net Debt</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.key_financials.debt_structure.net_interest_bearing_debt)}</p>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Revenue by Region</h2>
                    </div>
                    <div class="p-4 h-80">
                        <canvas id="wsa-revenue-by-region"></canvas>
                    </div>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Operational Metrics</h2>
                    </div>
                    <div class="p-4 h-80">
                        <canvas id="wsa-operational-metrics"></canvas>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Sustainability Metrics</h2>
                    </div>
                    <div class="p-4 h-80">
                        <canvas id="wsa-sustainability-metrics"></canvas>
                    </div>
                </div>
            </div>

            <!-- Detailed Metrics -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 dark:text-white">
                <!-- Research & Development -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">R&D Overview</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Total R&D Spend</span>
                                <span class="font-medium">${formatCurrency(data.operational_metrics.research_development.total_spend)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">% of Sales</span>
                                <span class="font-medium">${formatPercentage(data.operational_metrics.research_development.as_percent_of_sales)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Capitalized R&D</span>
                                <span class="font-medium">${formatCurrency(data.operational_metrics.research_development.capitalized)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Annual Launches</span>
                                <span class="font-medium">${data.operational_metrics.research_development.annual_launches}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Market Data -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow dark:text-white">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Market Overview</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Total Hearing Loss Market</span>
                                <span class="font-medium">${data.market_data.addressable_market.total_hearing_loss}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Market Penetration</span>
                                <span class="font-medium">${data.market_data.addressable_market.current_penetration}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Annual Market Size</span>
                                <span class="font-medium">${data.market_data.addressable_market.annual_market_size}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Market Growth Rate</span>
                                <span class="font-medium">${data.market_data.addressable_market.market_growth_rate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Debt Structure -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow dark:text-white">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Debt Structure</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Net Interest Bearing Debt</span>
                                <span class="font-medium">${formatCurrency(data.key_financials.debt_structure.net_interest_bearing_debt)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Available Credit</span>
                                <span class="font-medium">${formatCurrency(data.key_financials.debt_structure.available_credit_facility)}</span>
                            </div>
                            <h3 class="font-medium mt-4 mb-2">Term Loans</h3>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span class="text-gray-600 dark:text-gray-400">EUR Loan</span>
                                    <span class="font-medium">${formatCurrency(data.key_financials.debt_structure.term_loans.EUR.amount)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600 dark:text-gray-400">USD Loan</span>
                                    <span class="font-medium">${formatCurrency(data.key_financials.debt_structure.term_loans.USD.amount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Metrics -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 dark:text-white">
                <!-- Employee Metrics -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Employee Overview</h2>
                    </div>
                    <div class="p-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <h3 class="font-medium mb-2">Headcount</h3>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Total Employees</span>
                                        <span>${data.operational_metrics.employees.total}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">R&D Staff</span>
                                        <span>${data.operational_metrics.employees.by_function.RnD}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="font-medium mb-2">Turnover</h3>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Total Turnover</span>
                                        <span>${data.operational_metrics.employees.turnover.total}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Voluntary</span>
                                        <span>${data.operational_metrics.employees.turnover.voluntary}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sustainability -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow dark:text-white">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Sustainability Metrics</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Scope 1 Emissions</span>
                                <span class="font-medium">${data.sustainability_metrics.emissions.scope1} tCO2e</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Scope 2 (Market-based)</span>
                                <span class="font-medium">${data.sustainability_metrics.emissions.scope2.market_based} tCO2e</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Renewable Electricity</span>
                                <span class="font-medium">${formatPercentage(data.sustainability_metrics.energy.renewable_electricity_share)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Recycling Rate</span>
                                <span class="font-medium">${formatPercentage(data.sustainability_metrics.waste_management.recycling_rate)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function initializeSonovaCharts(data) {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#ffffff' : '#666666';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';

    // Segment Revenue Distribution
    new Chart(document.getElementById('sonova-segment-revenue').getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Hearing Instruments', 'Audiological Care', 'Consumer Hearing', 'Cochlear Implants'],
            datasets: [{
                data: [
                    data.current_period.key_financials.segments.hearing_instruments.subsegments.hearing_instruments_business.revenue,
                    data.current_period.key_financials.segments.hearing_instruments.subsegments.audiological_care.revenue,
                    data.current_period.key_financials.segments.hearing_instruments.subsegments.consumer_hearing.revenue,
                    data.current_period.key_financials.segments.cochlear_implants.revenue
                ],
                backgroundColor: ['#4299E1', '#48BB78', '#F6AD55', '#F56565']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        }
    });

    // Financial Metrics Trend
    new Chart(document.getElementById('sonova-financial-metrics').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['HY 2024/25'],
            datasets: [{
                label: 'Revenue',
                data: [data.current_period.key_financials.revenue.total],
                backgroundColor: '#4299E1'
            }, {
                label: 'EBITA', 
                data: [data.current_period.key_financials.ebita.adjusted],
                backgroundColor: '#48BB78'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                y: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            }
        }
     });

    new Chart(document.getElementById('sonova-growth-metrics').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Revenue Growth LC', 'HI Growth', 'CI Growth'],
            datasets: [{
                label: 'Growth Rate (%)',
                data: [
                    data.current_period.key_financials.revenue.growth.local_currency,
                    data.current_period.key_financials.segments.hearing_instruments.organic_growth,
                    data.current_period.key_financials.segments.cochlear_implants.organic_growth
                ],
                backgroundColor: ['#4299E1', '#48BB78', '#F6AD55']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: { color: gridColor }
                }
            }
        }
    });
}

function initializeWSACharts(data) {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#ffffff' : '#666666';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';

    // Revenue by Region
    new Chart(document.getElementById('wsa-revenue-by-region').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['EMEA', 'Americas', 'APAC'],
            datasets: [{
                data: [
                    data.key_financials.revenue.by_region.EMEA.revenue,
                    data.key_financials.revenue.by_region.Americas.revenue,
                    data.key_financials.revenue.by_region.APAC.revenue
                ],
                backgroundColor: ['#4299E1', '#48BB78', '#F6AD55']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        }
    });

    new Chart(document.getElementById('wsa-operational-metrics').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['R&D Spend', 'R&D Staff', 'Production Sites'],
            datasets: [{
                label: 'Key Operational Metrics',
                data: [
                    data.operational_metrics.research_development.total_spend,
                    data.operational_metrics.employees.by_function.RnD,
                    data.operational_metrics.infrastructure.production_sites
                ],
                backgroundColor: ['#4299E1', '#48BB78', '#F6AD55']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            if (value >= 1000) {
                                return value / 1000 + 'k';
                            }
                            return value;
                        }
                    },
                    grid: { color: gridColor }
                }
            }
        }
    });

    // Sustainability Metrics Chart
    new Chart(document.getElementById('wsa-sustainability-metrics').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Renewable Energy', 'Recycling Rate'],
            datasets: [{
                label: 'Sustainability Metrics (%)',
                data: [
                    data.sustainability_metrics.energy.renewable_electricity_share,
                    data.sustainability_metrics.waste_management.recycling_rate
                ],
                backgroundColor: ['#48BB78', '#4299E1']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: { color: gridColor }
                }
            }
        }
    });
}

function initializeGNCharts(data) {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#ffffff' : '#666666';

    // Revenue Distribution
    new Chart(document.getElementById('gn-revenue-distribution').getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Hearing', 'Enterprise', 'Gaming & Consumer'],
            datasets: [{
                data: [
                    data.financial_highlights.revenue.by_division.hearing.revenue,
                    data.financial_highlights.revenue.by_division.enterprise.revenue,
                    data.financial_highlights.revenue.by_division.gaming_consumer.revenue
                ],
                backgroundColor: ['#4299E1', '#48BB78', '#F6AD55']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        }
    });
}
// GN Dashboard Implementation
function generateGNDashboard(data) {
    return `
        <div class="container mx-auto px-4 py-8 dark:text-white">
            <!-- Company Header -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 class="text-3xl font-bold mb-2">${data.company_info.name}</h1>
                        <p class="text-gray-600 dark:text-gray-400">${data.period.quarter} ${data.period.year}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Report Date: ${data.period.report_date}</p>
                    </div>
                </div>
            </div>

            <!-- Primary KPIs -->
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6 dark:text-white">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.revenue.total)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Organic Growth: ${formatPercentage(data.financial_highlights.revenue.organic_growth)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">EBITA</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.profitability.ebita.value)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.financial_highlights.profitability.ebita.margin)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Free Cash Flow</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.cash_flow.free_cash_flow.excl_ma)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Cash Conversion: ${data.financial_highlights.cash_flow.cash_conversion}%</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Gross Profit</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.profitability.gross_profit.value)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Margin: ${formatPercentage(data.financial_highlights.profitability.gross_profit.margin)}</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Net Debt</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatCurrency(data.financial_highlights.balance_sheet.net_interest_bearing_debt)}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Leverage: ${data.financial_highlights.balance_sheet.leverage_ratio.adjusted}x</p>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Equity Ratio</h3>
                    <p class="mt-2 text-3xl font-semibold">${formatPercentage(data.financial_highlights.balance_sheet.equity_ratio)}</p>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 dark:text-white">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Revenue Distribution</h2>
                    </div>
                    <div class="p-4 h-80">
                        <canvas id="gn-revenue-distribution"></canvas>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Divisional Performance</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            ${Object.entries(data.financial_highlights.revenue.by_division).map(([division, info]) => `
                                <div>
                                    <h3 class="font-medium mb-2">${division.charAt(0).toUpperCase() + division.slice(1)}</h3>
                                    <div class="flex justify-between mb-1">
                                        <span>Revenue</span>
                                        <span>${formatCurrency(info.revenue)}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Organic Growth</span>
                                        <span>${formatPercentage(info.organic_growth)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow dark:text-white">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Geographic Distribution</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            ${Object.entries(data.financial_highlights.revenue.by_geography).map(([region, info]) => `
                                <div class="flex justify-between">
                                    <span>${region.charAt(0).toUpperCase() + region.slice(1)}</span>
                                    <span>${formatCurrency(info.revenue)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Metrics -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 dark:text-white">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">Operational Metrics</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span>Total Employees</span>
                                <span>${data.operational_metrics.employees.total}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>R&D Intensity</span>
                                <span>${formatPercentage(data.operational_metrics.development_costs.rd_intensity)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Development Costs</span>
                                <span>${formatCurrency(data.operational_metrics.development_costs.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-lg shadow dark:text-white">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-lg font-medium">2024 Guidance</h2>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span>Organic Growth</span>
                                <span>${data.guidance_2024.organic_growth.range}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>EBITA Margin</span>
                                <span>${data.guidance_2024.ebita_margin.range}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Free Cash Flow (excl. M&A)</span>
                                <span>>${data.guidance_2024.free_cash_flow_excl_ma.target}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateDemantDashboard(data) {
    return `
        <div class="container mx-auto px-4 py-8 dark:text-white">
            <!-- Company Header -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 class="text-3xl font-bold mb-2">Demant A/S</h1>
                        <p class="text-gray-600 dark:text-gray-400">Fiscal Period ${data.fiscal_period}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Last Updated: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <!-- Key Performance Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${generateMetricCard("Total Revenue", data.key_financials.revenue.total, "M DKK", 
                    `Organic Growth: ${data.key_financials.revenue.organic_growth}%`)}
                ${generateMetricCard("EBIT", data.key_financials.profitability.EBIT.reported, "M DKK", 
                    `Margin: ${data.key_financials.profitability.EBIT.margin}%`)}
                ${generateMetricCard("Net Profit", data.key_financials.profitability.profit_after_tax.total, "M DKK")}
                ${generateMetricCard("Free Cash Flow", data.key_financials.cash_flow.free_cash_flow, "M DKK")}
            </div>

            <!-- Charts Grid -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Revenue by Region</h3>
        <div class="h-[400px]">
            <canvas id="demant-revenue-region"></canvas>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Profitability Metrics</h3>
        <div class="h-[400px]">
            <canvas id="demant-profitability"></canvas>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Revenue Breakdown</h3>
        <div class="h-[400px]">
            <canvas id="demant-revenue-details"></canvas>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Organic Growth Analysis</h3>
        <div class="h-[400px]">
            <canvas id="demant-organic-growth"></canvas>
        </div>
    </div>
    </div>
    <!-- R&D and Financial Analysis -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 col-span-1">
        <h3 class="text-lg font-semibold mb-6">R&D Investment Analysis</h3>
        <div class="h-[350px] w-full">
            <canvas id="demant-rnd-analysis"></canvas>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 col-span-1">
        <h3 class="text-lg font-semibold mb-6">Balance Sheet Composition</h3>
        <div class="h-[350px] w-full">
            <canvas id="demant-balance-sheet"></canvas>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 col-span-1">
        <h3 class="text-lg font-semibold mb-6">Cash Flow Analysis</h3>
        <div class="h-[350px] w-full">
            <canvas id="demant-cash-flow"></canvas>
        </div>
    </div>
</div>


            <!-- Detailed Metrics Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                ${generateDetailCard("Financial Health", [
                    ["Gross Margin", data.key_financials.profitability.gross_margin + "%"],
                    ["EBITDA Margin", data.key_financials.profitability.EBIT.margin + "%"],
                    ["Net Debt", data.key_financials.balance_sheet.net_interest_bearing_debt + "M DKK"],
                    ["Gearing Multiple", data.key_financials.balance_sheet.gearing_multiple]
                ])}
                
                ${generateDetailCard("Operational Metrics", [
                    ["Total Employees", data.operational_metrics.employees.total],
                    ["R&D Costs", data.operational_metrics.rnd.costs + "M DKK"],
                    ["R&D Growth", data.operational_metrics.rnd.growth + "%"],
                    ["R&D % of Revenue", data.operational_metrics.rnd.percent_of_revenue + "%"]
                ])}
                
                ${generateDetailCard("Sustainability", [
                    ["Scope 1&2 Emissions", data.sustainability_metrics.emissions.scope_1_2_market_based + " tCO2e"],
                    ["Renewable Energy", data.sustainability_metrics.renewable_electricity_share + "%"],
                    ["Women in Management", data.sustainability_metrics.diversity.all_managers_gender_ratio.women + "%"],
                    ["Board Diversity", data.sustainability_metrics.diversity.board_gender_ratio.women + "%"]
                ])}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">R&D Overview</h3>
        <div class="space-y-3">
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">R&D Investment</span>
                <span class="font-medium">${data.key_financials.profitability.rd_costs.total.toLocaleString()} M DKK</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">% of Revenue</span>
                <span class="font-medium">${data.key_financials.profitability.rd_costs.percent_of_revenue}%</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Growth Rate</span>
                <span class="font-medium">${data.key_financials.profitability.rd_costs.growth}%</span>
            </div>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Balance Sheet Highlights</h3>
        <div class="space-y-3">
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Total Assets</span>
                <span class="font-medium">${data.key_financials.balance_sheet.total_assets.toLocaleString()} M DKK</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Net Working Capital</span>
                <span class="font-medium">${data.key_financials.balance_sheet.working_capital.toLocaleString()} M DKK</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Net Debt</span>
                <span class="font-medium">${data.key_financials.balance_sheet.net_interest_bearing_debt.toLocaleString()} M DKK</span>
            </div>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Cash Flow Metrics</h3>
        <div class="space-y-3">
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Operating Cash Flow</span>
                <span class="font-medium">${data.key_financials.cash_flow.operating.toLocaleString()} M DKK</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Free Cash Flow</span>
                <span class="font-medium">${data.key_financials.cash_flow.free_cash_flow.toLocaleString()} M DKK</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Net Investments</span>
                <span class="font-medium">${data.key_financials.cash_flow.net_investments.toLocaleString()} M DKK</span>
            </div>
        </div>
    </div>
</div>


            <!-- Segment Details Table -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                <h3 class="text-lg font-semibold mb-4">Segment Analysis</h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr>
                                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Segment</th>
                                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organic Growth</th>
                                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Q2 Revenue</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            ${generateSegmentTableRows(data.key_financials.revenue.by_segment)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function generateMetricCard(title, value, unit = "", subtitle = "") {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">${title}</h3>
            <p class="mt-2 text-3xl font-semibold">${value.toLocaleString()} ${unit}</p>
            ${subtitle ? `<p class="text-sm text-gray-600 dark:text-gray-400">${subtitle}</p>` : ''}
        </div>
    `;
}

function generateDetailCard(title, items) {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">${title}</h3>
            <div class="space-y-3">
                ${items.map(([label, value]) => `
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 dark:text-gray-400">${label}</span>
                        <span class="font-medium">${value}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateSegmentTableRows(segments) {
    return Object.entries(segments).map(([name, data]) => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${name.replace(/_/g, ' ').toUpperCase()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">${data.total.toLocaleString()} M DKK</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">${data.organic_growth}%</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">${data.q2_revenue.toLocaleString()} M DKK</td>
        </tr>
    `).join('');
}

function initializeDemantCharts(data) {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#ffffff' : '#666666';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';

    // Revenue by Region Chart
    new Chart(document.getElementById('demant-revenue-region').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(data.key_financials.revenue.by_region)
                .map(region => region.charAt(0) + region.slice(1).toLowerCase()),
            datasets: [{
                data: Object.values(data.key_financials.revenue.by_region)
                    .map(region => region.revenue),
                backgroundColor: ['#4299E1', '#48BB78', '#F6AD55', '#FC8181', '#B794F4']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: {
                    left: 10,
                    right: 20,
                    top: 10,
                    bottom: 10
                }
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: textColor }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.raw.toLocaleString()} M DKK (${
                            data.key_financials.revenue.by_region[context.label.toUpperCase()].organic_growth
                        }% organic growth)`
                    }
                }
            }
        }
    });


  // R&D Analysis Chart
new Chart(document.getElementById('demant-rnd-analysis').getContext('2d'), {
    type: 'bar',
    data: {
        labels: ['R&D Costs', 'Distribution Costs', 'Admin Expenses'],
        datasets: [{
            label: 'Amount (M DKK)',
            data: [
                data.key_financials.profitability.rd_costs.total,
                data.key_financials.profitability.distribution_costs.total,
                data.key_financials.profitability.administrative_expenses.total
            ],
            backgroundColor: ['#4299E1', '#48BB78', '#F6AD55']
        }, {
            label: 'Growth %',
            data: [
                data.key_financials.profitability.rd_costs.growth,
                data.key_financials.profitability.distribution_costs.growth,
                data.key_financials.profitability.administrative_expenses.growth
            ],
            type: 'line',
            borderColor: '#9F7AEA',
            backgroundColor: '#9F7AEA'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 15
            }
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                ticks: {
                    callback: (value) => value.toLocaleString() + ' M DKK'
                }
            },
            y1: {
                type: 'linear',
                position: 'right',
                ticks: {
                    callback: (value) => value + '%'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    }
});

// Balance Sheet Composition Chart
new Chart(document.getElementById('demant-balance-sheet').getContext('2d'), {
    type: 'doughnut',
    data: {
        labels: [
            'Goodwill',
            'Other Assets',
            'Working Capital',
            'Trade Receivables',
            'Cash'
        ],
        datasets: [{
            data: [
                data.key_financials.balance_sheet.goodwill,
                data.key_financials.balance_sheet.total_assets - 
                    (data.key_financials.balance_sheet.goodwill + 
                     data.key_financials.balance_sheet.working_capital +
                     data.key_financials.balance_sheet.trade_receivables +
                     data.key_financials.balance_sheet.cash),
                data.key_financials.balance_sheet.working_capital,
                data.key_financials.balance_sheet.trade_receivables,
                data.key_financials.balance_sheet.cash
            ],
            backgroundColor: ['#4299E1', '#48BB78', '#F6AD55', '#FC8181', '#9F7AEA']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 15
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw.toLocaleString()} M DKK (${
                        ((context.raw / data.key_financials.balance_sheet.total_assets) * 100).toFixed(1)
                    }%)`
                }
            }
        }
    }
});

// Replace the Cash Flow Analysis Chart with this version
new Chart(document.getElementById('demant-cash-flow').getContext('2d'), {
    type: 'bar',
    data: {
        labels: ['Operating', 'Investing', 'Free Cash Flow', 'Financing', 'Net Change'],
        datasets: [{
            label: 'Cash Flow',
            data: [
                data.key_financials.cash_flow.operating,
                data.key_financials.cash_flow.investing,
                data.key_financials.cash_flow.free_cash_flow,
                data.key_financials.cash_flow.financing,
                data.key_financials.cash_flow.operating + 
                data.key_financials.cash_flow.investing + 
                data.key_financials.cash_flow.financing
            ],
            backgroundColor: (context) => {
                const value = context.dataset.data[context.dataIndex];
                return value >= 0 ? '#48BB78' : '#FC8181';
            }
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 15
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value.toLocaleString() + ' M DKK'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()} M DKK`
                }
            },
            legend: {
                display: false
            }
        }
    }
});

    new Chart(document.getElementById('demant-revenue-details').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Total Revenue', 'External Sales', 'Internal Sales'],
            datasets: [{
                label: 'Revenue (M DKK)',
                data: [
                    data.key_financials.revenue.total,
                    data.key_financials.revenue.by_segment.hearing_aids.external_sales,
                    data.key_financials.revenue.by_segment.hearing_aids.internal_sales
                ],
                backgroundColor: ['#4299E1', '#48BB78', '#F6AD55']
            }]
        },
        options: {
            // responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw.toLocaleString()} M DKK`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => value.toLocaleString() + ' M DKK'
                    }
                }
            }
        }
    });
    
    // Organic Growth Comparison Chart
    new Chart(document.getElementById('demant-organic-growth').getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['Hearing Aids', 'Hearing Care', 'Diagnostics', 'Overall'],
            datasets: [{
                label: 'Organic Growth %',
                data: [
                    data.key_financials.revenue.by_segment.hearing_aids.organic_growth,
                    data.key_financials.revenue.by_segment.hearing_care.organic_growth,
                    data.key_financials.revenue.by_segment.diagnostics.organic_growth,
                    data.key_financials.revenue.organic_growth
                ],
                backgroundColor: 'rgba(66, 153, 225, 0.2)',
                borderColor: '#4299E1',
                pointBackgroundColor: '#4299E1',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#4299E1'
            }, {
                label: 'Q2 Organic Growth %',
                data: [
                    data.key_financials.revenue.by_segment.hearing_aids.q2_organic_growth,
                    data.key_financials.revenue.by_segment.hearing_care.q2_organic_growth,
                    data.key_financials.revenue.by_segment.diagnostics.q2_organic_growth,
                    data.key_financials.revenue.organic_growth
                ],
                backgroundColor: 'rgba(72, 187, 120, 0.2)',
                borderColor: '#48BB78',
                pointBackgroundColor: '#48BB78',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#48BB78'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: {
                    left: 10,
                    right: 20,
                    top: 10,
                    bottom: 10
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: Math.max(
                        ...Object.values(data.key_financials.revenue.by_segment)
                            .map(segment => Math.max(segment.organic_growth, segment.q2_organic_growth || 0))
                    ) + 2,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.raw}%`
                    }
                }
            }
        }
    });

    // Profitability Metrics Chart
    new Chart(document.getElementById('demant-profitability').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Gross Margin', 'EBITDA Margin', 'EBIT Margin'],
            datasets: [{
                label: 'Margin %',
                data: [
                    data.key_financials.profitability.gross_margin,
                    data.key_financials.profitability.EBITDA.margin,
                    data.key_financials.profitability.EBIT.margin
                ],
                backgroundColor: ['#4299E1', '#48BB78', '#F6AD55']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: {
                    left: 10,
                    right: 20,
                    top: 10,
                    bottom: 10
                }
            },
                        scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor,
                        callback: value => value + '%'
                    },
                    grid: { color: gridColor }
                },
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


// I'll continue with the GN implementation and chart initializations in the next section. Would you like me to proceed?

// Utility functions
// function formatCurrency(value) {
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'EUR',
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0
//     }).format(value);
// }

// function formatPercentage(value) {
//     return `${value.toFixed(1)}%`;
// }

// Export functions
export {
    generateWSADashboard,
    generateGNDashboard,
    initializeWSACharts,
    initializeGNCharts
};
// Call it like this:


// Export functions for external use
export {
    initializeFinancialDashboard,
    refreshDashboard,
    downloadDashboardData,
    downloadChartImage,
    formatCurrency,
    formatPercentage,
    formatNumber
};

// Initialize on page load if companyName is available
document.addEventListener('DOMContentLoaded', () => {
    if (window.companyName) {
        initializeFinancialDashboard(window.companyName);
    }
});

// Handle visibility change to refresh data when tab becomes visible
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        checkRefreshData();
    }
});

// Export the main dashboard object
export default {
    initialize: initializeFinancialDashboard,
    refresh: refreshDashboard,
    download: {
        data: downloadDashboardData,
        chart: downloadChartImage
    },
    format: {
        currency: formatCurrency,
        percentage: formatPercentage,
        number: formatNumber
    }
};