// Mock Data
const startupData = {
    startups: [
        {
            id: 1,
            name: 'TechVision AI',
            industry: 'AI/ML',
            fundingStage: 'Series B',
            totalFunding: 45000000,
            lastRound: {
                amount: 25000000,
                date: '2024-01-15',
                investors: ['VC Fund A', 'Tech Ventures']
            },
            founded: '2020',
            employees: 120,
            location: 'San Francisco, CA',
            growth: 156.3,
            keyMetrics: {
                revenue: 12000000,
                customers: 250,
                growthRate: 180,
                burnRate: 800000
            },
            technology: {
                stack: ['Python', 'TensorFlow', 'AWS'],
                patents: 8,
                techScore: 85
            },
            marketFit: {
                tam: 5000000000,
                competitiveAdvantage: 'High',
                marketScore: 92
            },
            team: {
                founders: [
                    { name: 'John Smith', role: 'CEO', background: 'Ex-Google AI' },
                    { name: 'Sarah Chen', role: 'CTO', background: 'Stanford PhD' }
                ],
                keyHires: 3,
                openPositions: 8
            },
            performance: {
                mqr: [2.1, 2.8, 3.5, 4.2], // Million quarterly revenue
                userGrowth: [1000, 1500, 2200, 3100],
                retention: 85
            }
        },
        {
            id: 2,
            name: 'HealthTech Solutions',
            industry: 'Healthcare',
            fundingStage: 'Series A',
            totalFunding: 12000000,
            lastRound: {
                amount: 8000000,
                date: '2024-01-10',
                investors: ['Health Ventures', 'MedTech Fund']
            },
            founded: '2021',
            employees: 45,
            location: 'Boston, MA',
            growth: 98.7,
            keyMetrics: {
                revenue: 3000000,
                customers: 120,
                growthRate: 150,
                burnRate: 400000
            },
            technology: {
                stack: ['React Native', 'Node.js', 'GCP'],
                patents: 3,
                techScore: 78
            },
            marketFit: {
                tam: 2000000000,
                competitiveAdvantage: 'Medium',
                marketScore: 85
            },
            team: {
                founders: [
                    { name: 'Emily Johnson', role: 'CEO', background: 'Ex-McKinsey' },
                    { name: 'Dr. Michael Zhang', role: 'CTO', background: 'MIT Medical' }
                ],
                keyHires: 2,
                openPositions: 5
            },
            performance: {
                mqr: [0.5, 0.8, 1.2, 1.8],
                userGrowth: [200, 450, 800, 1200],
                retention: 78
            }
        }
        // Add more startups as needed...
    ]
};

// Application State
const state = {
    startups: [...startupData.startups],
    filters: {
        industry: '',
        stage: '',
        funding: '',
        founded: '',
        region: '',
        sort: 'funding'
    },
    charts: {}
};

// UI Components
const components = {
    startupCard: {
        render(startup) {
            return `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">${startup.name}</h3>
                                <p class="text-sm text-gray-600">${startup.industry}</p>
                            </div>
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                ${startup.fundingStage}
                            </span>
                        </div>
                        
                        <div class="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Total Funding</p>
                                <p class="text-lg font-semibold">${(startup.totalFunding / 1e6).toFixed(1)}M</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Team Size</p>
                                <p class="text-lg font-semibold">${startup.employees}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Growth Rate</p>
                                <p class="text-lg font-semibold text-green-600">+${startup.growth}%</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Founded</p>
                                <p class="text-lg font-semibold">${startup.founded}</p>
                            </div>
                        </div>

                        <div class="mt-4">
                            <canvas id="growth-chart-${startup.id}" class="w-full h-24"></canvas>
                        </div>

                        <div class="mt-4 flex justify-between items-center">
                            <div class="flex space-x-2">
                                <button onclick="app.viewStartup(${startup.id})" class="text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-external-link-alt mr-1"></i>View
                                </button>
                                <button onclick="app.trackStartup(${startup.id})" class="text-green-600 hover:text-green-800">
                                    <i class="fas fa-star mr-1"></i>Track
                                </button>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="app.editStartup(${startup.id})" class="text-gray-600 hover:text-gray-800">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="app.deleteStartup(${startup.id})" class="text-red-600 hover:text-red-800">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderGrowthChart(startup, containerId) {
            const ctx = document.getElementById(containerId).getContext('2d');
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: 'Revenue Growth',
                        data: startup.performance.mqr,
                        borderColor: 'rgb(59, 130, 246)',
                        tension: 0.4
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
                            display: false
                        },
                        y: {
                            display: false
                        }
                    }
                }
            });
        }
    }
};

// Application Logic
const app = {
    init() {
        this.setupEventListeners();
        this.render();
        this.updateStats();
    },

    setupEventListeners() {
        // Filter changes
        document.querySelectorAll('select[id$="-filter"]').forEach(select => {
            select.addEventListener('change', (e) => {
                state.filters[e.target.id.replace('-filter', '')] = e.target.value;
                this.render();
            });
        });

        // Search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Add startup button
        document.getElementById('add-startup-btn').addEventListener('click', () => {
            this.showModal();
        });

        // Add startup form
        document.getElementById('add-startup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddStartup(e.target);
        });
    },

    render() {
        const grid = document.getElementById('startups-grid');
        const filteredStartups = this.getFilteredStartups();
        
        grid.innerHTML = filteredStartups.map(startup => 
            components.startupCard.render(startup)
        ).join('');

        // Initialize growth charts
        filteredStartups.forEach(startup => {
            components.startupCard.renderGrowthChart(startup, `growth-chart-${startup.id}`);
        });
    },

    getFilteredStartups() {
        return state.startups.filter(startup => {
            let matches = true;

            if (state.filters.industry && startup.industry !== state.filters.industry) {
                matches = false;
            }

            if (state.filters.stage && startup.fundingStage !== state.filters.stage) {
                matches = false;
            }

            if (state.filters.funding) {
                const [min, max] = this.getFundingRange(state.filters.funding);
                if (startup.totalFunding < min || (max && startup.totalFunding > max)) {
                    matches = false;
                }
            }

            if (state.filters.founded && startup.founded !== state.filters.founded) {
                matches = false;
            }

            return matches;
        }).sort((a, b) => {
            switch (state.filters.sort) {
                case 'funding':
                    return b.totalFunding - a.totalFunding;
                case 'growth':
                    return b.growth - a.growth;
                case 'employees':
                    return b.employees - a.employees;
                case 'founded':
                    return b.founded.localeCompare(a.founded);
                default:
                    return 0;
            }
        });
    },

    getFundingRange(range) {
        const ranges = {
            '0-1M': [0, 1000000],
            '1M-10M': [1000000, 10000000],
            '10M-50M': [10000000, 50000000],
            '50M+': [50000000, null]
        };
        return ranges[range] || [0, null];
    },

    handleSearch(searchTerm) {
        if (!searchTerm) {
            this.render();
            return;
        }

        const searchRegex = new RegExp(searchTerm, 'i');
        state.startups = startupData.startups.filter(startup =>
            searchRegex.test(startup.name) ||
            searchRegex.test(startup.industry)
        );
        this.render();
    },

    updateStats() {
        // Update overview statistics
        document.getElementById('total-startups').textContent = state.startups.length;
        
        const totalInvestment = state.startups.reduce((sum, s) => sum + s.totalFunding, 0);
        document.getElementById('total-investment').textContent = 
            `${(totalInvestment / 1e9).toFixed(1)}B`;
        
        const avgValuation = totalInvestment / state.startups.length;
        document.getElementById('avg-valuation').textContent = 
            `${(avgValuation / 1e6).toFixed(1)}M`;
        
        // You can add more stats as needed
    },

    viewStartup(id) {
        window.location.href = `startup-analysis.html?id=${id}`;
    },

    trackStartup(id) {
        console.log('Tracking startup:', id);
        // Implement tracking functionality
    },

    editStartup(id) {
        console.log('Editing startup:', id);
        // Implement edit functionality
    },

    deleteStartup(id) {
        if (confirm('Are you sure you want to delete this startup?')) {
            state.startups = state.startups.filter(s => s.id !== id);
            this.render();
            this.updateStats();
        }
    },

    showModal() {
        document.getElementById('add-startup-modal').classList.remove('hidden');
    },

    hideModal() {
        document.getElementById('add-startup-modal').classList.add('hidden');
    },

    handleAddStartup(form) {
        const formData = new FormData(form);
        const newStartup = {
            id: Date.now(),
            name: formData.get('name'),
            industry: formData.get('industry'),
            fundingStage: formData.get('stage'),
            totalFunding: parseInt(formData.get('funding')),
            employees: parseInt(formData.get('employees')),
            founded: '2024',
            growth: Math.random() * 100,
            performance: {
                mqr: [0, 0, 0, 0],
                userGrowth: [0, 0, 0, 0],
                retention: 0
            }
        };

        state.startups.push(newStartup);
        this.hideModal();
        this.render();
        this.updateStats();
        form.reset();
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => app.init());