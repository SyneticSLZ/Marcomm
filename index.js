// Demo data generation utilities
const demoData = {
    companies: [
        { id: 1, name: '3M', industry: 'Manufacturing' },
        { id: 2, name: 'Medtronic', industry: 'Healthcare' },
        { id: 3, name: 'Cargill', industry: 'Agriculture' },
        { id: 4, name: 'NAPSA', industry: 'Technology' },
        { id: 5, name: 'Pentair', industry: 'Manufacturing' }
    ],
    
    generateTimeSeriesData(points = 12) {
        return Array.from({ length: points }, (_, i) => ({
            date: new Date(2024, i, 1).toISOString().split('T')[0],
            value: Math.floor(Math.random() * 100) + 50
        }));
    },

    generatePatentData() {
        return this.companies.map(company => ({
            company: company.name,
            patents: Math.floor(Math.random() * 1000),
            growthRate: (Math.random() * 30 - 15).toFixed(1)
        }));
    },

    generateNewsUpdates() {
        const updates = [
            '3M announces new sustainable manufacturing initiative',
            'Medtronic receives FDA approval for new device',
            'Cargill expands agricultural technology investments',
            'NAPSA launches innovative software solution',
            'Pentair reports strong quarterly earnings'
        ];
        return updates.map(update => ({
            text: update,
            timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
            sentiment: Math.random() > 0.7 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative'
        }));
    },

    generateFinancialMetrics() {
        return this.companies.map(company => ({
            name: company.name,
            revenue: Math.floor(Math.random() * 10000) + 5000,
            growth: (Math.random() * 20 - 5).toFixed(1),
            marketShare: (Math.random() * 30 + 5).toFixed(1)
        }));
    }
};

// Application state
const state = {
    loading: true,
    charts: {},
    data: {
        marketIntelligence: null,
        patentAnalytics: null,
        newsSentiment: null,
        financialMetrics: null,
        competitorUpdates: null
    }
};

// UI Components
const components = {
    loadingOverlay: {
        show() {
            document.getElementById('loading-overlay').classList.remove('hidden');
        },
        hide() {
            document.getElementById('loading-overlay').classList.add('hidden');
        }
    },

    quickStats: {
        render(data) {
            const container = document.getElementById('quick-stats');
            const stats = [
                { label: 'Companies Tracked', value: data.companies.length, icon: 'building' },
                { label: 'Patent Applications', value: '1,247', icon: 'file-alt' },
                { label: 'Market Share', value: '23.5%', icon: 'chart-pie' },
                { label: 'Competitor Updates', value: '12 New', icon: 'bell' }
            ];

            container.innerHTML = stats.map(stat => `
                <div class="bg-white rounded-lg shadow p-6 fade-in">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                            <i class="fas fa-${stat.icon} fa-lg"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-600">${stat.label}</p>
                            <p class="text-2xl font-semibold text-gray-900">${stat.value}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    },

    marketIntelligence: {
        render(data) {
            if (state.charts.marketChart) {
                state.charts.marketChart.destroy();
            }

            const ctx = document.getElementById('market-chart').getContext('2d');
            state.charts.marketChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(d => d.date),
                    datasets: [{
                        label: 'Market Trend',
                        data: data.map(d => d.value),
                        borderColor: 'rgb(59, 130, 246)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Market Intelligence Trends'
                        }
                    }
                }
            });
        }
    },

    competitorUpdates: {
        render(updates) {
            const container = document.getElementById('competitor-updates');
            container.innerHTML = updates.map(update => `
                <div class="mb-4 p-4 border-l-4 ${this.getSentimentColor(update.sentiment)} bg-gray-50 fade-in">
                    <p class="text-sm text-gray-900">${update.text}</p>
                    <p class="text-xs text-gray-600 mt-1">
                        ${new Date(update.timestamp).toLocaleDateString()}
                    </p>
                </div>
            `).join('');
        },
        getSentimentColor(sentiment) {
            const colors = {
                positive: 'border-green-500',
                neutral: 'border-gray-500',
                negative: 'border-red-500'
            };
            return colors[sentiment] || colors.neutral;
        }
    },

    patentAnalytics: {
        render(data) {
            const ctx = document.getElementById('patent-chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(d => d.company),
                    datasets: [{
                        label: 'Patent Applications',
                        data: data.map(d => d.patents),
                        backgroundColor: 'rgba(59, 130, 246, 0.5)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }
    },

    sentimentAnalysis: {
        render(updates) {
            const sentiments = updates.reduce((acc, update) => {
                acc[update.sentiment] = (acc[update.sentiment] || 0) + 1;
                return acc;
            }, {});

            const ctx = document.getElementById('sentiment-chart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(sentiments),
                    datasets: [{
                        data: Object.values(sentiments),
                        backgroundColor: [
                            'rgba(34, 197, 94, 0.5)',
                            'rgba(107, 114, 128, 0.5)',
                            'rgba(239, 68, 68, 0.5)'
                        ]
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    },

    financialMetrics: {
        render(data) {
            const ctx = document.getElementById('financial-chart').getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: data.map(d => d.name),
                    datasets: [{
                        label: 'Market Share %',
                        data: data.map(d => d.marketShare),
                        borderColor: 'rgba(59, 130, 246, 1)',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 40
                        }
                    }
                }
            });
        }
    }
};

// API Simulation
const api = {
    async fetchData() {
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
            marketIntelligence: demoData.generateTimeSeriesData(24),
            patentAnalytics: demoData.generatePatentData(),
            competitorUpdates: demoData.generateNewsUpdates(),
            financialMetrics: demoData.generateFinancialMetrics()
        };
    }
};

// Application Logic
const app = {
    async init() {
        components.loadingOverlay.show();
        
        try {
            // Fetch initial data
            const data = await api.fetchData();
            
            // Update state
            state.data = data;
            state.loading = false;
            
            // Render components
            this.render();
            
            // Setup real-time updates
            this.setupUpdates();
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            // Show error state
        } finally {
            components.loadingOverlay.hide();
        }
    },
    
    render() {
        components.quickStats.render(demoData);
        components.marketIntelligence.render(state.data.marketIntelligence);
        components.competitorUpdates.render(state.data.competitorUpdates);
        components.patentAnalytics.render(state.data.patentAnalytics);
        components.sentimentAnalysis.render(state.data.competitorUpdates);
        components.financialMetrics.render(state.data.financialMetrics);
    },
    
    setupUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(async () => {
            try {
                const newData = await api.fetchData();
                state.data = newData;
                this.render();
            } catch (error) {
                console.error('Failed to fetch updates:', error);
            }
        }, 30000);
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => app.init());