{/* <p class="text-xl font-bold">${tech.gitMetrics.repositories}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Contributors</p>
                                <p class="text-xl font-bold">${tech.gitMetrics.contributors}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Total Commits</p>
                                <p class="text-xl font-bold">${tech.gitMetrics.commits.toLocaleString()}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">GitHub Stars</p>
                                <p class="text-xl font-bold">${tech.gitMetrics.stars}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Key Features -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Key Features</h3>
                        <div class="grid grid-cols-2 gap-4">
                            ${tech.keyFeatures.map(feature => `
                                <div class="bg-white p-3 rounded-lg">
                                    <i class="fas fa-check text-green-500 mr-2"></i>
                                    <span class="text-sm">${feature}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    },

    market: {
        render() {
            const startup = startupAnalysisData.getCurrentStartup();
            const market = startup.market;

            return `
                <div class="space-y-6">
                    <!-- Market Size -->
                    <div class="grid grid-cols-2 gap-6">
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Market Opportunity</h3>
                            <canvas id="market-size-chart" class="w-full h-64"></canvas>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Competitive Landscape</h3>
                            <canvas id="competition-chart" class="w-full h-64"></canvas>
                        </div>
                    </div>

                    <!-- Market Trends -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Market Trends</h3>
                        <div class="grid grid-cols-2 gap-6">
                            ${market.keyTrends.map(trend => `
                                <div class="bg-white p-4 rounded-lg">
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="font-medium">${trend.name}</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            ${trend.impact} Impact
                                        </span>
                                    </div>
                                    <div class="mt-2">
                                        <div class="text-sm text-gray-600 mb-1">Relevance Score</div>
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${trend.relevance}%"></div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        initCharts() {
            const startup = startupAnalysisData.getCurrentStartup();
            const market = startup.market;

            // Market Size Chart
            new Chart(document.getElementById('market-size-chart'), {
                type: 'bar',
                data: {
                    labels: ['TAM', 'SAM', 'SOM'],
                    datasets: [{
                        data: [
                            market.tam / 1e9,
                            market.sam / 1e9,
                            market.som / 1e9
                        ],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.7)',
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(245, 158, 11, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Billion                         linkedin: 'sarah-chen',
                        education: 'Stanford PhD AI/ML'
                    }
                ],
                keyHires: [
                    {
                        name: 'Michael Brown',
                        role: 'VP Engineering',
                        background: 'Ex-Microsoft',
                        date: '2022-06'
                    },
                    {
                        name: 'Lisa Wong',
                        role: 'VP Sales',
                        background: 'Ex-Salesforce',
                        date: '2023-01'
                    }
                ],
                openPositions: 8,
                departmentGrowth: {
                    engineering: 45,
                    sales: 25,
                    product: 15,
                    operations: 10
                }
            }
        }
    }
};

// Tab Implementations
const tabImplementations = {
    overview: {
        render() {
            const startup = startupAnalysisData.getCurrentStartup();
            
            return `
                <div class="space-y-6">
                    <!-- Growth Metrics -->
                    <div class="grid grid-cols-2 gap-6">
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Revenue Growth</h3>
                            <canvas id="revenue-growth-chart" class="w-full h-64"></canvas>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Customer Growth</h3>
                            <canvas id="customer-growth-chart" class="w-full h-64"></canvas>
                        </div>
                    </div>

                    <!-- Key Metrics -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Key Metrics</h3>
                        <div class="grid grid-cols-4 gap-6">
                            <div>
                                <p class="text-sm text-gray-600">CAC</p>
                                <p class="text-xl font-bold">${(startup.keyMetrics.cac / 1000).toFixed(1)}k</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">LTV</p>
                                <p class="text-xl font-bold">${(startup.keyMetrics.ltv / 1000).toFixed(1)}k</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Burn Rate</p>
                                <p class="text-xl font-bold">${(startup.keyMetrics.burnRate / 1000).toFixed(1)}k/mo</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Runway</p>
                                <p class="text-xl font-bold">${startup.keyMetrics.runway} months</p>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Summary -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Summary</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-medium mb-2">Strengths</h4>
                                <ul class="space-y-2">
                                    <li class="flex items-center text-sm">
                                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                        Strong revenue growth (${startup.growth}% YoY)
                                    </li>
                                    <li class="flex items-center text-sm">
                                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                        Solid tech stack and patent portfolio
                                    </li>
                                    <li class="flex items-center text-sm">
                                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                        Experienced founding team
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-medium mb-2">Focus Areas</h4>
                                <ul class="space-y-2">
                                    <li class="flex items-center text-sm">
                                        <i class="fas fa-arrow-right text-blue-500 mr-2"></i>
                                        Optimize CAC/LTV ratio
                                    </li>
                                    <li class="flex items-center text-sm">
                                        <i class="fas fa-arrow-right text-blue-500 mr-2"></i>
                                        Expand enterprise customer base
                                    </li>
                                    <li class="flex items-center text-sm">
                                        <i class="fas fa-arrow-right text-blue-500 mr-2"></i>
                                        Scale engineering team
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        initCharts() {
            const startup = startupAnalysisData.getCurrentStartup();
            
            // Revenue Growth Chart
            new Chart(document.getElementById('revenue-growth-chart'), {
                type: 'line',
                data: {
                    labels: startup.performance.quarterlyMetrics.map(q => q.quarter),
                    datasets: [{
                        label: 'Revenue',
                        data: startup.performance.quarterlyMetrics.map(q => q.revenue / 1000000),
                        borderColor: 'rgb(59, 130, 246)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Revenue (Millions $)'
                            }
                        }
                    }
                }
            });

            // Customer Growth Chart
            new Chart(document.getElementById('customer-growth-chart'), {
                type: 'line',
                data: {
                    labels: startup.performance.quarterlyMetrics.map(q => q.quarter),
                    datasets: [{
                        label: 'Customers',
                        data: startup.performance.quarterlyMetrics.map(q => q.customers),
                        borderColor: 'rgb(16, 185, 129)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Customers'
                            }
                        }
                    }
                }
            });
        }
    },

    performance: {
        render() {
            const startup = startupAnalysisData.getCurrentStartup();
            const metrics = startup.performance.quarterlyMetrics;

            return `
                <div class="space-y-6">
                    <!-- Financial Performance -->
                    <div class="grid grid-cols-2 gap-6">
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Revenue vs Costs</h3>
                            <canvas id="revenue-costs-chart" class="w-full h-64"></canvas>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Unit Economics</h3>
                            <canvas id="unit-economics-chart" class="w-full h-64"></canvas>
                        </div>
                    </div>

                    <!-- Metrics Table -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Quarterly Performance</h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarter</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costs</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${metrics.map((q, i) => {
                                        const growth = i > 0 ? ((q.revenue - metrics[i-1].revenue) / metrics[i-1].revenue * 100).toFixed(1) : '-';
                                        return `
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${q.quarter}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(q.revenue / 1000000).toFixed(1)}M</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${q.customers}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(q.costs / 1000000).toFixed(1)}M</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm ${growth === '-' ? 'text-gray-500' : 'text-green-600'}">
                                                    ${growth === '-' ? '-' : `+${growth}%`}
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        },

        initCharts() {
            const startup = startupAnalysisData.getCurrentStartup();
            const metrics = startup.performance.quarterlyMetrics;

            // Revenue vs Costs Chart
            new Chart(document.getElementById('revenue-costs-chart'), {
                type: 'bar',
                data: {
                    labels: metrics.map(q => q.quarter),
                    datasets: [
                        {
                            label: 'Revenue',
                            data: metrics.map(q => q.revenue / 1000000),
                            backgroundColor: 'rgba(59, 130, 246, 0.7)'
                        },
                        {
                            label: 'Costs',
                            data: metrics.map(q => q.costs / 1000000),
                            backgroundColor: 'rgba(239, 68, 68, 0.7)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Millions // Mock Startup Data with detailed metrics */}