// Enhanced competitor analysis data with detailed metrics
import UserenderProductvPortfolio from './portfolio-visualization.js';
import renderFDADashboard from './fda.js';
import { renderStrategicAnalysis } from './vadata.js';

// import { renderFDAIntelligence, initDashboard } from './portfolio-visualization.js';
import { renderPatentAnalysis } from './patent-dashboard.js';
import { VetrenderStrategicInitiatives } from './strategic-analysis.js';
import {  initializeFinancialDashboard } from './company-detail.js';
// import {initializeMarketDashboard} from './Va.js';

const analysisData = {
    competitor: {
        id: 1,
        name: '3M',
        industry: 'Manufacturing',
        cik: '0000066740',
        overview: {
            marketCap: 112500000000,
            revenue: 35200000000,
            marketShare: 15.3,
            rdSpend: 2100000000,
            patents: 542,
            brandValue: 12400000000,
            marketCapYTD: 112500000000,
            revenueYoY: 35200000000,
            marketShareYoY: 15.3,
            rdSpendYoY: 2100000000,
            patentsChange: 542,
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
                },
                        financialMetrics: {
            keyMetrics: {
                revenueGrowth: { value: 12.4, trend: 'up' },
                grossMargin: { value: 45.8, trend: 'up' },
                operatingMargin: { value: 22.5, trend: 'up' },
                netMargin: { value: 18.2, trend: 'up' },
                epsGrowth: { value: 15.6, trend: 'up' }
            },
            balanceSheet: {
                cashEquivalents: { value: 5200000000, trend: 'up' },
                totalDebt: { value: 12500000000, trend: 'down' },
                totalAssets: { value: 45800000000, trend: 'up' },
                totalLiabilities: { value: 25300000000, trend: 'down' },
                shareholdersEquity: { value: 20500000000, trend: 'up' }
            },
            historicalData: {
                revenue: [
                    { quarter: '2023 Q1', value: 8200000000 },
                    { quarter: '2023 Q2', value: 8500000000 },
                    { quarter: '2023 Q3', value: 8800000000 },
                    { quarter: '2023 Q4', value: 9100000000 }
                ],
                margins: [
                    { quarter: '2023 Q1', gross: 44.5, operating: 21.8, net: 17.5 },
                    { quarter: '2023 Q2', gross: 45.2, operating: 22.1, net: 17.8 },
                    { quarter: '2023 Q3', gross: 45.8, operating: 22.5, net: 18.1 },
                    { quarter: '2023 Q4', gross: 46.2, operating: 22.8, net: 18.4 }
                ]
            }
        },
        fdaActivity: {
            activeApplications: 24,
            approvedProducts: 156,
            recentSubmissions: 8,
            submissions: [
                {
                    id: 'FDA-2024-001',
                    product: 'Medical Device A',
                    type: 'Class II',
                    status: 'Pending',
                    lastUpdated: '2024-03-15'
                },
                {
                    id: 'FDA-2024-002',
                    product: 'Medical Device B',
                    type: 'Class III',
                    status: 'Approved',
                    lastUpdated: '2024-03-10'
                }
                // Add more FDA submissions as needed
            ]
        },
        strategicInitiatives: {
            overview: {
                totalInitiatives: 12,
                completedInitiatives: 5,
                ongoingInitiatives: 7,
                upcomingInitiatives: 3
            },
            projects: [
                {
                    name: 'Digital Transformation',
                    status: 'In Progress',
                    completion: 65,
                    priority: 'High',
                    startDate: '2024-01',
                    endDate: '2024-12'
                },
                {
                    name: 'Market Expansion - APAC',
                    status: 'Planning',
                    completion: 25,
                    priority: 'Medium',
                    startDate: '2024-03',
                    endDate: '2025-03'
                }
                // Add more projects as needed
            ],
            objectives: {
                revenue: { target: 40000000000, current: 35200000000 },
                marketShare: { target: 18, current: 15.3 },
                efficiency: { target: 25, current: 22.5 }
            }
        }
    },
    competitor: {
        id: 2,
        name: 'Medtronic',
        industry: 'Healthcare',
        cik : "0000064670",
        overview: {
            marketCap: 112500000000,
            revenue: 35200000000,
            marketShare: 15.3,
            rdSpend: 2100000000,
            patents: 542,
            brandValue: 12400000000,
            marketCapYTD: 112500000000,
            revenueYoY: 35200000000,
            marketShareYoY: 15.3,
            rdSpendYoY: 2100000000,
            patentsChange: 542,
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
                },
                        financialMetrics: {
            keyMetrics: {
                revenueGrowth: { value: 12.4, trend: 'up' },
                grossMargin: { value: 45.8, trend: 'up' },
                operatingMargin: { value: 22.5, trend: 'up' },
                netMargin: { value: 18.2, trend: 'up' },
                epsGrowth: { value: 15.6, trend: 'up' }
            },
            balanceSheet: {
                cashEquivalents: { value: 5200000000, trend: 'up' },
                totalDebt: { value: 12500000000, trend: 'down' },
                totalAssets: { value: 45800000000, trend: 'up' },
                totalLiabilities: { value: 25300000000, trend: 'down' },
                shareholdersEquity: { value: 20500000000, trend: 'up' }
            },
            historicalData: {
                revenue: [
                    { quarter: '2023 Q1', value: 8200000000 },
                    { quarter: '2023 Q2', value: 8500000000 },
                    { quarter: '2023 Q3', value: 8800000000 },
                    { quarter: '2023 Q4', value: 9100000000 }
                ],
                margins: [
                    { quarter: '2023 Q1', gross: 44.5, operating: 21.8, net: 17.5 },
                    { quarter: '2023 Q2', gross: 45.2, operating: 22.1, net: 17.8 },
                    { quarter: '2023 Q3', gross: 45.8, operating: 22.5, net: 18.1 },
                    { quarter: '2023 Q4', gross: 46.2, operating: 22.8, net: 18.4 }
                ]
            }
        },
        fdaActivity: {
            activeApplications: 24,
            approvedProducts: 156,
            recentSubmissions: 8,
            submissions: [
                {
                    id: 'FDA-2024-001',
                    product: 'Medical Device A',
                    type: 'Class II',
                    status: 'Pending',
                    lastUpdated: '2024-03-15'
                },
                {
                    id: 'FDA-2024-002',
                    product: 'Medical Device B',
                    type: 'Class III',
                    status: 'Approved',
                    lastUpdated: '2024-03-10'
                }
                // Add more FDA submissions as needed
            ]
        },
        strategicInitiatives: {
            overview: {
                totalInitiatives: 12,
                completedInitiatives: 5,
                ongoingInitiatives: 7,
                upcomingInitiatives: 3
            },
            projects: [
                {
                    name: 'Digital Transformation',
                    status: 'In Progress',
                    completion: 65,
                    priority: 'High',
                    startDate: '2024-01',
                    endDate: '2024-12'
                },
                {
                    name: 'Market Expansion - APAC',
                    status: 'Planning',
                    completion: 25,
                    priority: 'Medium',
                    startDate: '2024-03',
                    endDate: '2025-03'
                }
                // Add more projects as needed
            ],
            objectives: {
                revenue: { target: 40000000000, current: 35200000000 },
                marketShare: { target: 18, current: 15.3 },
                efficiency: { target: 25, current: 22.5 }
            }
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

    geographicDistribution: {
        type: 'pie',
        data: {
            labels: Object.keys(analysisData.competitor.marketAnalysis.shareByRegion),
            datasets: [{
                data: Object.values(analysisData.competitor.marketAnalysis.shareByRegion),
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
                    position: 'bottom'
                }
            }
        }
    },

    customerSegments: {
        type: 'doughnut',
        data: {
            labels: Object.keys(analysisData.competitor.customerSegments),
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
                    position: 'left'
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


// Function to get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to get company data by ID
function getCompanyData() {
    const companyId = new URLSearchParams(window.location.search).get('id');
    const id = parseInt(companyId);
    
    if (!id) {
        throw new Error('Invalid or missing company ID');
    }

    // const companyMap = {
    //     1: { name: '3M', cik: '0000066740', industry:'Global manufacturing and technology company' },
    //     2: { name: 'Medtronic Inc', cik: '0000064670', industry: 'Healthcare' }
    // };
    const companyMap = {
        1: { 
            name: 'Sonova', 
            cik: '0000066740', 
            industry: 'Hearing Aids'
        },
        2: { 
            name: 'Gn', 
            cik: '0000854341', 
            industry: 'Hearing Aids'
        },
        3: { 
            name: 'Ws', 
            cik: '0000020569', 
            industry: 'Hearing Aids'
        },
        4: { 
            name: 'Demant', 
            cik: '0001535929', 
            industry: 'Hearing Aids'
        },
        5: { 
            name: 'Starkey', 
            cik: '0000313119', 
            industry: 'Hearing Aids'
        }
    };

    const company = companyMap[id];
    
    if (!company) {
        throw new Error(`No company found with ID: ${id}`);
    }

    return company;
}

// Example usage:
// try {
//     const companyData = getCompanyData();
//     console.log('Company Data:', companyData.cik, companyData.name);
// } catch (error) {
//     console.error('Error:', error.message);
// }



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

        // // Export button
        // document.querySelector('button:has(.fa-file-export)').addEventListener('click', () => {
        //     this.exportAnalysis();
        // });

        // // Edit button
        // document.querySelector('button:has(.fa-edit)').addEventListener('click', () => {
        //     this.editCompetitor();
        // });
    },

    renderCharts() {

        // Product Portfolio
        // this.charts.productPortfolio = new Chart(
        //     document.getElementById('product-portfolio-chart'),
        //     chartConfigs.productPortfolio
        // );
    },

    setupTabNavigation() {
        const tabContents = {
            'Market Analysis': this.renderMarketAnalysis.bind(this),
            'FDA Product Portfolio': this.renderProductPortfolio.bind(this),
            'Technology & Patents': this.renderTechnologyAnalysis.bind(this),
            'Digital Presence': this.renderDigitalPresence.bind(this),
            'VA Intelligence': this.renderStrategicInitiatives.bind(this),
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
            // this.updateOverview(analysisData.competitor);
            this.updateCharts(analysisData.competitor);
        } catch (error) {
            console.error('Error loading competitor data:', error);
        }
    },

    //  updateOverview(competitor) {
    //     document.querySelector('[data-stat="marketCap"]').textContent = 
    //         `$${(competitor.overview.marketCap / 1e9).toFixed(1)}B`;
    //     document.querySelector('[data-stat="marketCapYTD"]').textContent = 
    //         `${competitor.overview.marketCapYTD}% YTD`;
    
    //     document.querySelector('[data-stat="revenue"]').textContent = 
    //         `$${(competitor.overview.revenue / 1e9).toFixed(1)}B`;
    //     document.querySelector('[data-stat="revenueYoY"]').textContent = 
    //         `${competitor.overview.revenueYoY}% YoY`;
    
    //     document.querySelector('[data-stat="marketShare"]').textContent = 
    //         `${competitor.overview.marketShare}%`;
    //     document.querySelector('[data-stat="marketShareYoY"]').textContent = 
    //         `${competitor.overview.marketShareYoY}% YoY`;
    
    //     document.querySelector('[data-stat="rndSpend"]').textContent = 
    //         `$${(competitor.overview.rdSpend / 1e9).toFixed(1)}B`;
    //     document.querySelector('[data-stat="rndSpendYoY"]').textContent = 
    //         `${competitor.overview.rdSpendYoY}% YoY`;
    
    //     document.querySelector('[data-stat="patents"]').textContent = 
    //         `${competitor.overview.patents}`;
    //     document.querySelector('[data-stat="patentsChange"]').textContent = 
    //         `+${competitor.overview.patentsChange} This Year`;
    
    //     // document.querySelector('[data-stat="brandValue"]').textContent = 
    //     //     `$${(competitor.overview.brandValue / 1e9).toFixed(1)}B`;
    //     // document.querySelector('[data-stat="brandValueYoY"]').textContent = 
    //     //     `${competitor.overview.brandValueYoY}% YoY`;
    // },
    

    updateCharts(competitor) {
        // Update market share chart
        // this.charts.marketShare.data.datasets[0].data = competitor.marketAnalysis.competitors
        //     .map(c => c.share);
        // this.charts.marketShare.update();

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


// Additional mock data for other tabs
const mockData = {
    productPortfolio: {
        stats: {
            activeApplications: 45,
            approvedProducts: 182,
            recentSubmissions: 12
        },
        fdaFilings: [
            {
                applicationNumber: 'NDA-123456',
                product: 'Medical Device A',
                type: 'New Application',
                status: 'Under Review',
                lastUpdated: '2024-03-15'
            },
            {
                applicationNumber: 'NDA-123457',
                product: 'Healthcare Solution B',
                type: 'Supplemental',
                status: 'Approved',
                lastUpdated: '2024-03-10'
            },
            {
                applicationNumber: 'NDA-123458',
                product: 'Treatment C',
                type: 'New Application',
                status: 'Complete Response',
                lastUpdated: '2024-03-05'
            }
        ],
        submissionTypes: {
            'New Applications': 40,
            'Supplements': 35,
            'Generic': 15,
            'Other': 10
        },
        timeline: [
            { month: 'Jan', submissions: 8, approvals: 6 },
            { month: 'Feb', submissions: 12, approvals: 8 },
            { month: 'Mar', submissions: 10, approvals: 7 },
            { month: 'Apr', submissions: 15, approvals: 9 }
        ]
    },
    strategicInitiatives: {
        twitter: {
            followers: {
                current: 1250000,
                growth: 3.5,
                historical: [
                    { date: '2024-01', count: 1150000 },
                    { date: '2024-02', count: 1200000 },
                    { date: '2024-03', count: 1250000 }
                ]
            },
            engagement: {
                rate: 3.2,
                growth: 0.8,
                historical: [
                    { date: '2024-01', rate: 2.8 },
                    { date: '2024-02', rate: 3.0 },
                    { date: '2024-03', rate: 3.2 }
                ]
            },
            mentions: {
                count: 4500,
                growth: 12.5,
                historical: [
                    { date: '2024-01', count: 3800 },
                    { date: '2024-02', count: 4200 },
                    { date: '2024-03', count: 4500 }
                ]
            },
            sentiment: {
                score: 7.8,
                status: 'Positive',
                trend: 0.5,
            recentTweets: [
                {
                    content: 'Excited to announce our latest innovation in sustainable manufacturing! #Innovation #Sustainability',
                    engagement: 2800,
                    sentiment: 'positive',
                    date: '2024-03-15'
                },
                {
                    content: 'Join us at the Global Tech Summit next week! #TechInnovation',
                    engagement: 1500,
                    sentiment: 'neutral',
                    date: '2024-03-12'
                }
            ]
        },
    },
        seo: {
            domainAuthority: {
                score: 85,
                change: 2,
                historical: [
                    { date: '2024-01', score: 82 },
                    { date: '2024-02', score: 83 },
                    { date: '2024-03', score: 85 }
                ]
            },
            organicKeywords: {
                count: 15800,
                growth: 15.5,
                historical: [
                    { date: '2024-01', count: 13500 },
                    { date: '2024-02', count: 14800 },
                    { date: '2024-03', count: 15800 }
                ]
            },
            backlinks: {
                count: 1250000,
                growth: 8.2,
                historical: [
                    { date: '2024-01', count: 1150000 },
                    { date: '2024-02', count: 1200000 },
                    { date: '2024-03', count: 1250000 }
                ]
            },
            topKeywords: [
                { keyword: 'industrial solutions', position: 1, volume: 12500 },
                { keyword: 'manufacturing technology', position: 3, volume: 8200 },
                { keyword: 'healthcare innovations', position: 2, volume: 6500 }
            ],
            visibility: [
                { month: 'Jan', score: 82 },
                { month: 'Feb', score: 84 },
                { month: 'Mar', score: 85 },
                { month: 'Apr', score: 87 }
            ]
        }
    },
    technologyPatents: {
        stats: {
            totalPatents: 1250,
            pendingApplications: 85,
            expiringPatents: 42
        },
        categories: {
            'Manufacturing Process': 35,
            'Healthcare Technology': 25,
            'Industrial Solutions': 20,
            'Consumer Products': 15,
            'Other': 5
        },
        trends: [
            { month: 'Jan', filings: 28 },
            { month: 'Feb', filings: 32 },
            { month: 'Mar', filings: 45 },
            { month: 'Apr', filings: 38 }
        ],
        recentPatents: [
            {
                number: 'US10123456',
                title: 'Advanced Manufacturing Process',
                date: '2024-03-15',
                status: 'Granted',
                type: 'Utility'
            },
            {
                number: 'US10123457',
                title: 'Healthcare Device Innovation',
                date: '2024-03-10',
                status: 'Pending',
                type: 'Utility'
            },
            // Add more patent entries as needed
        ]
    },
    financialAnalysis: {
        keyMetrics: {
            revenueGrowth: 12.4,
            grossMargin: 45.8,
            operatingMargin: 22.5,
            netMargin: 18.2,
            epsGrowth: 15.4
        },
        balanceSheet: {
            cashEquivalents: 5200000000,
            totalDebt: 12500000000,
            totalAssets: 45800000000,
            totalLiabilities: 25600000000,
            shareholdersEquity: 20200000000
        },
        metrics: {
            revenueTTM: 35200000000,
            operatingMargin: 22.5,
            freeCashFlow: 4200000000,
            returnOnCapital: 18.4
        },
        trends: {
            revenue: [
                { quarter: 'Q1', value: 8200000000 },
                { quarter: 'Q2', value: 8800000000 },
                { quarter: 'Q3', value: 9100000000 },
                { quarter: 'Q4', value: 9100000000 }
            ],
            margins: [
                { quarter: 'Q1', gross: 45.2, operating: 22.1 },
                { quarter: 'Q2', gross: 45.8, operating: 22.5 },
                { quarter: 'Q3', gross: 46.1, operating: 22.8 },
                { quarter: 'Q4', gross: 46.5, operating: 23.1 }
            ]
        },
        secFilings: [
            {
                form: '10-K',
                description: 'Annual Report',
                date: '2024-02-15',
                period: 'FY 2023'
            },
            {
                form: '10-Q',
                description: 'Quarterly Report',
                date: '2024-01-25',
                period: 'Q4 2023'
            }
        ]
    }
};

// Extend the app object with additional methods
Object.assign(app, {

    formatNumber(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number.toString();
    },

    async renderTechnologyAnalysis() {
        const companyData = await getCompanyData();
        const companyName = companyData.name
        
        renderPatentAnalysis(companyName);
        // const data = mockData.technologyPatents;
        
        // // Update stats
        // document.getElementById('totalPatents').textContent = data.stats.totalPatents;
        // document.getElementById('pendingPatents').textContent = data.stats.pendingApplications;
        // document.getElementById('expiringPatents').textContent = data.stats.expiringPatents;

        // // Create/update patent categories chart
        // const patentCategoriesCtx = document.getElementById('patentCategoriesChart');
        // if (patentCategoriesCtx) {
        //     new Chart(patentCategoriesCtx, {
        //         type: 'doughnut',
        //         data: {
        //             labels: Object.keys(data.categories),
        //             datasets: [{
        //                 data: Object.values(data.categories),
        //                 backgroundColor: [
        //                     '#4299E1',
        //                     '#48BB78',
        //                     '#ECC94B',
        //                     '#F56565',
        //                     '#A0AEC0'
        //                 ]
        //             }]
        //         },
        //         options: {
        //             responsive: true,
        //             plugins: {
        //                 legend: {
        //                     position: 'right'
        //                 }
        //             }
        //         }
        //     });
        // }

        // // Create/update patent trends chart
        // const patentTrendsCtx = document.getElementById('patentTrendsChart');
        // if (patentTrendsCtx) {
        //     new Chart(patentTrendsCtx, {
        //         type: 'line',
        //         data: {
        //             labels: data.trends.map(t => t.month),
        //             datasets: [{
        //                 label: 'Patent Filings',
        //                 data: data.trends.map(t => t.filings),
        //                 borderColor: '#4299E1',
        //                 tension: 0.4
        //             }]
        //         },
        //         options: {
        //             responsive: true,
        //             scales: {
        //                 y: {
        //                     beginAtZero: true
        //                 }
        //             }
        //         }
        //     });
        // }

        // // Update recent patents table
        // const tableBody = document.getElementById('patentTableBody');
        // if (tableBody) {
        //     tableBody.innerHTML = data.recentPatents.map(patent => `
        //         <tr>
        //             <td class="px-6 py-4 whitespace-nowrap">${patent.number}</td>
        //             <td class="px-6 py-4">${patent.title}</td>
        //             <td class="px-6 py-4">${patent.date}</td>
        //             <td class="px-6 py-4">${patent.status}</td>
        //             <td class="px-6 py-4">${patent.type}</td>
        //         </tr>
        //     `).join('');
        // }
    },

    async renderProductPortfolio() {
        const companyData = await getCompanyData();
        const companyName = companyData.name
        

// Call when you want to render/update the dashboard
// renderFDAIntelligence(companyName)
        // UserenderProductPortfolio(companyName);
        renderFDADashboard(companyName);
    },
    async renderStrategicInitiatives() {
        renderStrategicAnalysis();
        // const dashboard = await initializeMarketDashboard('strategic-initiatives-content');
        // VetrenderStrategicInitiatives()
    },
    
    // renderStrategicInitiatives() {
        
    //     const data = mockData.strategicInitiatives;
    // console.log(data.twitter.sentiment.recentTweets)
    //     // Twitter Stats
    //     document.getElementById('twitterFollowers').textContent = 
    //         (data.twitter.followers.current);
    //     document.getElementById('followerGrowth').textContent = 
    //         `+${data.twitter.followers.growth}%`;
        
    //     document.getElementById('engagementRate').textContent = 
    //         data.twitter.engagement.rate + '%';
    //     document.getElementById('engagementTrend').textContent = 
    //         data.twitter.engagement.growth + '%';
        
    //     document.getElementById('monthlyMentions').textContent = 
    //         (data.twitter.mentions.count);
    //     document.getElementById('mentionsTrend').textContent = 
    //         data.twitter.mentions.growth + '%';
        
    //     document.getElementById('sentimentScore').textContent = 
    //         data.twitter.sentiment.score.toFixed(1);
    //     document.getElementById('sentimentTrend').textContent = 
    //         data.twitter.sentiment.status;
    
    //     // SEO Stats
    //     document.getElementById('domainAuthority').textContent = 
    //         data.seo.domainAuthority.score;
    //     document.getElementById('authorityTrend').textContent = 
    //          data.seo.domainAuthority.change + 'pts';
        
    //     document.getElementById('organicKeywords').textContent = 
    //         (data.seo.organicKeywords.count);
    //     document.getElementById('keywordsTrend').textContent = 
    //         (data.seo.organicKeywords.growth) + '%';
        
    //     document.getElementById('totalBacklinks').textContent = 
    //         (data.seo.backlinks.count);
    //     document.getElementById('backlinksTrend').textContent = 
    //         (data.seo.backlinks.growth) + '%';
    
    //     // Update Recent Tweets
    //     const tweetsContainer = document.getElementById('recentTweets');
    //     if (tweetsContainer && data.twitter.sentiment.recentTweets) {
    //         tweetsContainer.innerHTML = data.twitter.sentiment.recentTweets.map(tweet => `
    //             <div class="p-4">
    //                 <p class="text-sm">${tweet.content}</p>
    //                 <div class="mt-2 flex justify-between text-sm text-gray-500">
    //                     <span>Engagement: ${(tweet.engagement)}</span>
    //                     <span>Sentiment: ${tweet.sentiment}</span>
    //                     <span>${tweet.date}</span>
    //                 </div>
    //             </div>
    //         `).join('');
    //     }
    
    //     // Update Keywords Table
    //     const keywordsTableBody = document.getElementById('keywordsTableBody');
    //     if (keywordsTableBody && data.seo.topKeywords) {
    //         keywordsTableBody.innerHTML = data.seo.topKeywords.map(keyword => `
    //             <tr>
    //                 <td class="px-6 py-4">${keyword.keyword}</td>
    //                 <td class="px-6 py-4 text-center">${keyword.position}</td>
    //                 <td class="px-6 py-4 text-right">${(keyword.volume)}</td>
    //             </tr>
    //         `).join('');
    //     }
    
    //     // Create/update visibility trend chart
    //     const visibilityCtx = document.getElementById('visibilityTrendChart');
    //     if (visibilityCtx && data.seo.visibility) {
    //         new Chart(visibilityCtx, {
    //             type: 'line',
    //             data: {
    //                 labels: data.seo.visibility.map(item => item.month),
    //                 datasets: [{
    //                     label: 'Visibility Score',
    //                     data: data.seo.visibility.map(item => item.score),
    //                     borderColor: '#4299E1',
    //                     tension: 0.4
    //                 }]
    //             },
    //             options: {
    //                 responsive: true,
    //                 scales: {
    //                     y: {
    //                         beginAtZero: false
    //                     }
    //                 }
    //             }
    //         });
    //     }
    // },

    updateWebsiteMetrics(data) {
        
        const datamd = mockData.strategicInitiatives;
    console.log(data.twitter.sentiment.recentTweets)
        // Twitter Stats
        document.getElementById('twitterFollowers').textContent = 
            (datamd.twitter.followers.current);
        document.getElementById('followerGrowth').textContent = 
            `+${datamd.twitter.followers.growth}%`;
        
        document.getElementById('engagementRate').textContent = 
            datamd.twitter.engagement.rate + '%';
        document.getElementById('engagementTrend').textContent = 
            datamd.twitter.engagement.growth + '%';
        
        document.getElementById('monthlyMentions').textContent = 
            (datamd.twitter.mentions.count);
        document.getElementById('mentionsTrend').textContent = 
            datamd.twitter.mentions.growth + '%';
        
        document.getElementById('sentimentScore').textContent = 
            datamd.twitter.sentiment.score.toFixed(1);
        document.getElementById('sentimentTrend').textContent = 
            datamd.twitter.sentiment.status;
    
        // SEO Stats
        document.getElementById('domainAuthority').textContent = 
            datamd.seo.domainAuthority.score;
        document.getElementById('authorityTrend').textContent = 
             datamd.seo.domainAuthority.change + 'pts';
        
        document.getElementById('organicKeywords').textContent = 
            (datamd.seo.organicKeywords.count);
        document.getElementById('keywordsTrend').textContent = 
            (datamd.seo.organicKeywords.growth) + '%';
        
        document.getElementById('totalBacklinks').textContent = 
            (datamd.seo.backlinks.count);
        document.getElementById('backlinksTrend').textContent = 
            (datamd.seo.backlinks.growth) + '%';
    
        // Update Recent Tweets
        const tweetsContainer = document.getElementById('recentTweets');
        if (tweetsContainer && datamd.twitter.sentiment.recentTweets) {
            tweetsContainer.innerHTML = datamd.twitter.sentiment.recentTweets.map(tweet => `
                <div class="p-4">
                    <p class="text-sm">${tweet.content}</p>
                    <div class="mt-2 flex justify-between text-sm text-gray-500">
                        <span>Engagement: ${(tweet.engagement)}</span>
                        <span>Sentiment: ${tweet.sentiment}</span>
                        <span>${tweet.date}</span>
                    </div>
                </div>
            `).join('');
        }
    
        // Update Keywords Table
        const keywordsTableBodyc = document.getElementById('keywordsTableBody');
        if (keywordsTableBodyc && datamd.seo.topKeywords) {
            keywordsTableBodyc.innerHTML = datamd.seo.topKeywords.map(keyword => `
                <tr>
                    <td class="px-6 py-4">${keyword.keyword}</td>
                    <td class="px-6 py-4 text-center">${keyword.position}</td>
                    <td class="px-6 py-4 text-right">${(keyword.volume)}</td>
                </tr>
            `).join('');
        }
    
        // Create/update visibility trend chart
        const visibilityCtxc = document.getElementById('visibilityTrendChart');
        if (visibilityCtxc && datamd.seo.visibility) {
            new Chart(visibilityCtxc, {
                type: 'line',
                data: {
                    labels: datamd.seo.visibility.map(item => item.month),
                    datasets: [{
                        label: 'Visibility Score',
                        data: datamd.seo.visibility.map(item => item.score),
                        borderColor: '#4299E1',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }
        // Update website metrics
        document.getElementById('unique-visitors').textContent = 
            (data.seo.organicKeywords.count);
        document.getElementById('visitors-trend').textContent = 
            `+${data.seo.organicKeywords.growth}%`;

        document.getElementById('page-views').textContent = 
           (data.seo.backlinks.count);
        document.getElementById('views-trend').textContent = 
            `+${data.seo.backlinks.growth}%`;

        document.getElementById('session-duration').textContent = 
            '3:45'; // Add actual data if available

        document.getElementById('bounce-rate').textContent = 
            '45.2%'; // Add actual data if available
        
        // Update SEO performance section
        document.getElementById('seo-domain-authority').textContent = 
            data.seo.domainAuthority.score;
        document.getElementById('seo-backlinks').textContent = 
            this.formatNumber(data.seo.backlinks.count);
        document.getElementById('seo-load-time').textContent = 
            '0.8s'; // Add actual data if available

        // Create visibility trend chart
        const visibilityCtx = document.getElementById('visibilityTrendChart');
        if (visibilityCtx) {
            new Chart(visibilityCtx, {
                type: 'line',
                data: {
                    labels: seoData.domainAuthority.historical.map(h => h.date),
                    datasets: [
                        {
                            label: 'Domain Authority',
                            data: seoData.domainAuthority.historical.map(h => h.score),
                            borderColor: '#4299E1',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            })
            
        };

        // Update keywords table
        const keywordsTableBody = document.getElementById('keywordsTableBody');
        if (keywordsTableBody) {
            keywordsTableBody.innerHTML = seoData.topKeywords.map(keyword => `
                <tr>
                    <td class="px-6 py-4">${keyword.keyword}</td>
                    <td class="px-6 py-4 text-center">${keyword.position}</td>
                    <td class="px-6 py-4 text-right">${(keyword.volume)}</td>
                </tr>
            `).join('');
        }
    },

    // renderStrategicInitiatives() {
    //     const data = mockData.strategicInitiatives;

    //     // Update Twitter metrics
    //     document.getElementById('twitterFollowers').textContent = this.formatNumber(data.twitter.followers);
    //     document.getElementById('engagementRate').textContent = `${data.twitter.engagement}%`;
    //     document.getElementById('monthlyMentions').textContent = this.formatNumber(data.twitter.mentions);
    //     document.getElementById('sentimentScore').textContent = data.twitter.sentiment;

    //     // Update SEO metrics
    //     document.getElementById('domainAuthority').textContent = data.seo.domainAuthority;
    //     document.getElementById('organicKeywords').textContent = this.formatNumber(data.seo.organicKeywords);
    //     document.getElementById('totalBacklinks').textContent = this.formatNumber(data.seo.backlinks);

    //     // Create/update visibility trend chart
    //     const visibilityTrendCtx = document.getElementById('visibilityTrendChart');
    //     if (visibilityTrendCtx) {
    //         new Chart(visibilityTrendCtx, {
    //             type: 'line',
    //             data: {
    //                 labels: data.seo.visibility.map(v => v.month),
    //                 datasets: [{
    //                     label: 'Visibility Score',
    //                     data: data.seo.visibility.map(v => v.score),
    //                     borderColor: '#4299E1',
    //                     tension: 0.4
    //                 }]
    //             },
    //             options: {
    //                 responsive: true,
    //                 scales: {
    //                     y: {
    //                         beginAtZero: false
    //                     }
    //                 }
    //             }
    //         });
    //     }

    //     // Update recent tweets
    //     const tweetsContainer = document.getElementById('recentTweets');
    //     if (tweetsContainer) {
    //         tweetsContainer.innerHTML = data.twitter.recentTweets.map(tweet => `
    //             <div class="p-4">
    //                 <p class="text-sm">${tweet.content}</p>
    //                 <div class="mt-2 flex justify-between text-sm text-gray-500">
    //                     <span>Engagement: ${this.formatNumber(tweet.engagement)}</span>
    //                     <span>Sentiment: ${tweet.sentiment}</span>
    //                     <span>${tweet.date}</span>
    //                 </div>
    //             </div>
    //         `).join('');
    //     }

    //     // Update keywords table
    //     const keywordsTableBody = document.getElementById('keywordsTableBody');
    //     if (keywordsTableBody) {
    //         keywordsTableBody.innerHTML = data.seo.topKeywords.map(keyword => `
    //             <tr>
    //                 <td class="px-6 py-4">${keyword.keyword}</td>
    //                 <td class="px-6 py-4">${keyword.position}</td>
    //                 <td class="px-6 py-4">${this.formatNumber(keyword.volume)}</td>
    //             </tr>
    //         `).join('');
    //     }
    // },

    async renderFinancialAnalysis() {
        initializeCompanyDashboard()

//         const formatCurrency = (value) => `$${(value / 1e9).toFixed(1)}B`;
//         const formatPercentage = (value) => `${(value * 100).toFixed(1)}%`;
    
//         // Mock data for testing - replace with actual API call in production
//         const companyData = await getCompanyData();
//         const companycik = companyData.cik
//         console.log(companycik)
// const metrics = await (getCompetitorMetrics(companycik))
// console.log(metrics)

// const data = metrics.metrics

//         // const data = {
//         //     revenue: 265595000000,
//         //     marketCap: {
//         //         marketCap: 3678586685280,
//         //         sharesOutstanding: 15115823000,
//         //         stockPrice: 243.36,
//         //         lastUpdated: '2025-01-04T11:27:28.077Z'
//         //     },
//         //     rdExpense: 31370000000,
//         //     operatingMetrics: {
//         //         operatingIncome: 123216000000,
//         //         operatingMargin: 0.4639243961670965,
//         //         grossProfit: 180683000000,
//         //     },
//         //     financialHealth: {
//         //         currentAssets: 152987000000,
//         //         currentLiabilities: 176392000000,
//         //         totalDebt: 97341000000,
//         //         cashAndEquivalents: 29943000000,
//         //         freeCashFlow: 108807000000
//         //     }
//         // };
    
//         // Update top metric cards
//         document.getElementById('revenueTTM').textContent = formatCurrency(data.revenue);
//         document.getElementById('revenueGrowth').textContent = 
//             `Operating Income: ${formatCurrency(data.operatingMetrics.operatingIncome)}`;
    
//         document.getElementById('marketCap').textContent = formatCurrency(data.marketCap.marketCap);
//         document.getElementById('stockPrice').textContent = `Stock Price: $${data.marketCap.stockPrice}`;
    
//         document.getElementById('operatingMargin').textContent = 
//             formatPercentage(data.operatingMetrics.operatingMargin);
//         document.getElementById('grossProfit').textContent = 
//             `Gross Profit: ${formatCurrency(data.operatingMetrics.grossProfit)}`;
    
//         document.getElementById('rdExpense').textContent = formatCurrency(data.rdExpense);
//         document.getElementById('fcf').textContent = 
//             `Free Cash Flow: ${formatCurrency(data.financialHealth.freeCashFlow)}`;
    
//         // Update financial metrics tables
//         document.getElementById('operatingIncomeMetric').textContent = 
//             formatCurrency(data.operatingMetrics.operatingIncome);
//         document.getElementById('grossProfitMetric').textContent = 
//             formatCurrency(data.operatingMetrics.grossProfit);
//         document.getElementById('operatingMarginMetric').textContent = 
//             formatPercentage(data.operatingMetrics.operatingMargin);
//         document.getElementById('sharesOutstandingMetric').textContent = 
//             (data.marketCap.sharesOutstanding / 1e6).toFixed(1) + 'M';
//         document.getElementById('rdExpenseMetric').textContent = 
//             formatCurrency(data.rdExpense);
    
//         // Update balance sheet metrics
//         document.getElementById('currentAssetsMetric').textContent = 
//             formatCurrency(data.financialHealth.currentAssets);
//         document.getElementById('currentLiabilitiesMetric').textContent = 
//             formatCurrency(data.financialHealth.currentLiabilities);
//         document.getElementById('totalDebtMetric').textContent = 
//             formatCurrency(data.financialHealth.totalDebt);
//         document.getElementById('cashEquivalentsMetric').textContent = 
//             formatCurrency(data.financialHealth.cashAndEquivalents);
//         document.getElementById('freeCashFlowMetric').textContent = 
//             formatCurrency(data.financialHealth.freeCashFlow);
    
//         // Create/update operating metrics chart
//         const operatingCtx = document.getElementById('operatingMetricsChart');
//         if (operatingCtx) {
//             if (this.charts.operatingMetrics) {
//                 this.charts.operatingMetrics.destroy();
//             }
    
//             this.charts.operatingMetrics = new Chart(operatingCtx, {
//                 type: 'bar',
//                 data: {
//                     labels: ['Revenue', 'Operating Income', 'Gross Profit', 'R&D Expense'],
//                     datasets: [{
//                         label: 'Operating Metrics (Billions USD)',
//                         data: [
//                             data.revenue / 1e9,
//                             data.operatingMetrics.operatingIncome / 1e9,
//                             data.operatingMetrics.grossProfit / 1e9,
//                             data.rdExpense / 1e9
//                         ],
//                         backgroundColor: ['#60A5FA', '#34D399', '#A78BFA', '#F87171']
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     scales: {
//                         y: {
//                             beginAtZero: true,
//                             ticks: {
//                                 callback: function(value) {
//                                     return '$' + value + 'B';
//                                 }
//                             }
//                         }
//                     },
//                     plugins: {
//                         legend: {
//                             position: 'top'
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(context) {
//                                     return context.dataset.label + ': $' + context.parsed.y.toFixed(1) + 'B';
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         }
    
//         // Create/update financial health chart
//         const healthCtx = document.getElementById('financialHealthChart');
//         if (healthCtx) {
//             if (this.charts.financialHealth) {
//                 this.charts.financialHealth.destroy();
//             }
    
//             this.charts.financialHealth = new Chart(healthCtx, {
//                 type: 'bar',
//                 data: {
//                     labels: ['Current Assets', 'Current Liabilities', 'Total Debt', 'Cash', 'Free Cash Flow'],
//                     datasets: [{
//                         label: 'Financial Health (Billions USD)',
//                         data: [
//                             data.financialHealth.currentAssets / 1e9,
//                             data.financialHealth.currentLiabilities / 1e9,
//                             data.financialHealth.totalDebt / 1e9,
//                             data.financialHealth.cashAndEquivalents / 1e9,
//                             data.financialHealth.freeCashFlow / 1e9
//                         ],
//                         backgroundColor: [
//                             '#60A5FA', // Blue for assets
//                             '#F87171', // Red for liabilities
//                             '#F87171', // Red for debt
//                             '#34D399', // Green for cash
//                             '#34D399'  // Green for FCF
//                         ]
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     scales: {
//                         y: {
//                             beginAtZero: true,
//                             ticks: {
//                                 callback: function(value) {
//                                     return '$' + value + 'B';
//                                 }
//                             }
//                         }
//                     },
//                     plugins: {
//                         legend: {
//                             position: 'top'
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(context) {
//                                     return context.dataset.label + ': $' + context.parsed.y.toFixed(1) + 'B';
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         }
    }
});

async function getCompetitorMetrics(cik) {
    try {
        const response = await fetch(`https://intelbackend.onrender.com/api/competitor/${cik}`);
        const data = await response.json();
        
        if (response.ok) {
            console.log(data)
            return data
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error:', error);

    }
}
async function initializeCompanyDashboard() {
    try {
        // Get company data
        const companyData = await getCompanyData();
        const companyName = companyData.name; // Convert to lowercase for consistency

        // Get the container and remove hidden class
        const container = document.getElementById('financial-analysis-content');
        if (container) {
            container.classList.remove('hidden');
        }

        // Initialize the dashboard
        // initializeFinancialDashboard(companyName);
        initializeFinancialDashboard(companyName);

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
// Additional event listeners for the new tabs
document.addEventListener('DOMContentLoaded', async () => {
    // initDashboard()
    const companyData = getCompanyData();

    const companyName = companyData.name
    const companycik = companyData.cik
    console.log('Company Data:', companycik, companyName);
    document.getElementById('title').textContent = companyName
    document.getElementById('industry').textContent = companyData.industry

//     // Example frontend call
// const response = await fetch('https://intelbackend.onrender.com/api/fda', {
//     const response = await fetch('https://intelbackend.onrender.com/api/fda', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           companyName: "3M"  // Will match "International Business Machines Corporation"
//         })
//     })
// console.log(response.json())


    // Add click handlers for digital presence section tabs
    document.querySelectorAll('[data-section]').forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-section');
            
            // Hide all sections
            ['overview', 'social', 'website', 'paid', 'content'].forEach(s => {
                const element = document.getElementById(`digital-${s}-section`);
                if (element) {
                    element.classList.add('hidden');
                }
            });
            
            // Show selected section
            const selectedSection = document.getElementById(`digital-${section}-section`);
            if (selectedSection) {
                selectedSection.classList.remove('hidden');
            }

            // Update active button styles
            document.querySelectorAll('[data-section]').forEach(btn => {
                btn.classList.remove('border-b-2', 'border-blue-500', 'text-blue-600');
                btn.classList.add('text-gray-600');
            });
            e.target.classList.add('border-b-2', 'border-blue-500', 'text-blue-600');
            e.target.classList.remove('text-gray-600');
        });
    });
    // Set up filter handlers for patent table
    const patentTypeFilter = document.getElementById('patentTypeFilter');
    if (patentTypeFilter) {
        patentTypeFilter.addEventListener('change', (e) => {
            // Implement filtering logic
            console.log('Filtering patents by:', e.target.value);
        });
    }

    // Set up filter handlers for SEC filings table
    const filingTypeFilter = document.getElementById('filingTypeFilter');
    if (filingTypeFilter) {
        filingTypeFilter.addEventListener('change', (e) => {
            // Implement filtering logic
            console.log('Filtering SEC filings by:', e.target.value);
        });
    }
});
// Initialize application
document.addEventListener('DOMContentLoaded', () => app.init());
