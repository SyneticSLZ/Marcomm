// Enhanced competitor analysis data with detailed metrics
const analysisData = {
    competitor: {
        id: 1,
        name: '3M',
        industry: 'Manufacturing',
        overview: {
            marketCap: 112500000000,
            revenue: 35200000000,
            marketShare: 15.3,
            rdSpend: 2100000000,
            patents: 542,
            brandValue: 12400000000
        },
        marketAnalysis: {
            shareByRegion: {
                'North America': 45,
                'Europe': 30,
                'Asia Pacific': 15,
                'Rest of World': 10
            },
            shareByProduct: {
                'Healthcare': 35,
                'Industrial': 25,
                'Consumer': 20,
                'Transportation': 12,
                'Other': 8
            },
            competitors: [
                { name: '3M', share: 15.3, growth: 12.4 },
                { name: 'Competitor A', share: 12.8, growth: 8.7 },
                { name: 'Competitor B', share: 10.5, growth: 15.2 }
            ]
        },
        customerSegments: {
            'Enterprise': 45,
            'SMB': 30,
            'Government': 15,
            'Consumer': 10
        },
        productPortfolio: {
            categories: [
                {
                    name: 'Healthcare',
                    revenue: 12320000000,
                    growth: 15.2,
                    marketShare: 85
                },
                {
                    name: 'Industrial',
                    revenue: 8800000000,
                    growth: 8.7,
                    marketShare: 72
                }
            ]
        },
        swotAnalysis: {
            strengths: [
                'Strong R&D capabilities',
                'Global distribution network',
                'Brand recognition'
            ],
            weaknesses: [
                'High production costs',
                'Product development cycle'
            ],
            opportunities: [
                'Emerging markets expansion',
                'Digital transformation'
            ]
        }
    }
};

// Chart configurations
const chartConfigs = {
    marketShare: {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                data: Object.values(analysisData.competitor.customerSegments),
                backgroundColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    },

    productPortfolio: {
        type: 'bar',
        data: {
            labels: analysisData.competitor.productPortfolio.categories.map(c => c.name),
            datasets: [
                {
                    label: 'Revenue ($B)',
                    data: analysisData.competitor.productPortfolio.categories.map(c => c.revenue / 1e9),
                    backgroundColor: 'rgb(59, 130, 246)'
                },
                {
                    label: 'Growth (%)',
                    data: analysisData.competitor.productPortfolio.categories.map(c => c.growth),
                    backgroundColor: 'rgb(16, 185, 129)'
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
                    beginAtZero: true
                }
            }
        }
    }
};

// Application Logic
const app = {
    charts: {},

    async init() {
        this.setupEventListeners();
        this.renderCharts();
        this.setupTabNavigation();
        await this.loadCompetitorData();
    },

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('nav button').forEach(button => {
            button.addEventListener('click', () => this.switchTab(button));
        });

        // Export button
        document.querySelector('button:has(.fa-file-export)').addEventListener('click', () => {
            this.exportAnalysis();
        });

        // Edit button
        document.querySelector('button:has(.fa-edit)').addEventListener('click', () => {
            this.editCompetitor();
        });
    },

    renderCharts() {
        // Market Share Trends
        this.charts.marketShare = new Chart(
            document.getElementById('market-share-chart'),
            chartConfigs.marketShare
        );

        // Geographic Distribution
        this.charts.geographic = new Chart(
            document.getElementById('geographic-distribution-chart'),
            chartConfigs.geographicDistribution
        );

        // Customer Segments
        this.charts.customerSegments = new Chart(
            document.getElementById('customer-segments-chart'),
            chartConfigs.customerSegments
        );

        // Product Portfolio
        this.charts.productPortfolio = new Chart(
            document.getElementById('product-portfolio-chart'),
            chartConfigs.productPortfolio
        );
    },

    setupTabNavigation() {
        const tabContents = {
            'Market Analysis': this.renderMarketAnalysis.bind(this),
            'Product Portfolio': this.renderProductPortfolio.bind(this),
            'Technology & Patents': this.renderTechnologyAnalysis.bind(this),
            'Digital Presence': this.renderDigitalPresence.bind(this),
            'Strategic Initiatives': this.renderStrategicInitiatives.bind(this),
            'Financial Analysis': this.renderFinancialAnalysis.bind(this)
        };

        document.querySelectorAll('nav button').forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.textContent.trim();
                if (tabContents[tabName]) {
                    tabContents[tabName]();
                }
            });
        });
    },

    switchTab(selectedTab) {
        // Remove active state from all tabs
        document.querySelectorAll('nav button').forEach(button => {
            button.classList.remove('border-blue-500', 'text-blue-600');
            button.classList.add('text-gray-500', 'hover:text-gray-700');
        });

        // Set active state on selected tab
        selectedTab.classList.remove('text-gray-500', 'hover:text-gray-700');
        selectedTab.classList.add('border-blue-500', 'text-blue-600');
    },

    async loadCompetitorData() {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.updateOverview(analysisData.competitor);
            this.updateCharts(analysisData.competitor);
        } catch (error) {
            console.error('Error loading competitor data:', error);
        }
    },

    updateOverview(competitor) {
        // Update quick stats
        document.querySelector('[data-stat="marketCap"]').textContent = 
            `${(competitor.overview.marketCap / 1e9).toFixed(1)}B`;
        // Update other stats similarly...
    },

    updateCharts(competitor) {
        // Update market share chart
        this.charts.marketShare.data.datasets[0].data = competitor.marketAnalysis.competitors
            .map(c => c.share);
        this.charts.marketShare.update();

        // Update other charts similarly...
    },

    renderMarketAnalysis() {
        // Implementation for market analysis tab
        console.log('Rendering market analysis...');
    },

    renderProductPortfolio() {
        // Implementation for product portfolio tab
        console.log('Rendering product portfolio...');
    },

    renderTechnologyAnalysis() {
        // Implementation for technology analysis tab
        console.log('Rendering technology analysis...');
    },

    renderDigitalPresence() {
        // Implementation for digital presence tab
        console.log('Rendering digital presence...');
    },

    renderStrategicInitiatives() {
        // Implementation for strategic initiatives tab
        console.log('Rendering strategic initiatives...');
    },

    renderFinancialAnalysis() {
        // Implementation for financial analysis tab
        console.log('Rendering financial analysis...');
    },

    exportAnalysis() {
        // Implementation for exporting analysis
        console.log('Exporting analysis...');
    },

    editCompetitor() {
        // Implementation for editing competitor details
        console.log('Editing competitor...');
    },

    // Additional analysis methods
    analyzeMarketTrends() {
        return {
            trendsAnalysis: {
                marketGrowth: this.calculateMarketGrowth(),
                competitiveDynamics: this.analyzeCompetitiveDynamics(),
                opportunities: this.identifyOpportunities()
            }
        };
    },

    calculateMarketGrowth() {
        // Implementation for calculating market growth
        return {
            overall: 12.4,
            bySegment: {
                'Healthcare': 15.2,
                'Industrial': 8.7
            }
        };
    },

    analyzeCompetitiveDynamics() {
        // Implementation for analyzing competitive dynamics
        return {
            strengthScore: 85,
            threats: ['New entrant in healthcare segment', 'Price pressure in industrial'],
            opportunities: ['Digital transformation', 'Emerging markets']
        };
    },

    identifyOpportunities() {
        // Implementation for identifying opportunities
        return [
            {
                area: 'Geographic Expansion',
                potential: 'High',
                timeframe: 'Medium-term',
                investmentRequired: 'Significant'
            },
            {
                area: 'Product Innovation',
                potential: 'Very High',
                timeframe: 'Long-term',
                investmentRequired: 'High'
            }
        ];
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => app.init());
