// dashboard.js
class CompetitorDashboard {
    constructor() {
        this.clientsDatabase = {
            "3M": {
                industry: "Manufacturing",
                subIndustries: ["Industrial", "Healthcare", "Consumer"],
                competitors: ["Honeywell", "DuPont", "GE"],
                keywords: ["manufacturing", "industrial", "adhesives", "PPE"]
            },
            "Medtronic": {
                industry: "Healthcare",
                subIndustries: ["Medical Devices", "Healthcare Technology"],
                competitors: ["Boston Scientific", "Abbott", "Johnson & Johnson"],
                keywords: ["medical device", "healthcare", "medical technology"]
            },
            "Cargill": {
                industry: "Agriculture",
                subIndustries: ["Food Processing", "Agricultural Trading"],
                competitors: ["ADM", "Bunge", "Louis Dreyfus"],
                keywords: ["agriculture", "food processing", "commodities"]
            },
            "Voya Financial": {
                industry: "Financial Services",
                subIndustries: ["Insurance", "Investment Management"],
                competitors: ["Principal Financial", "Prudential", "MetLife"],
                keywords: ["financial services", "insurance", "investment"]
            },
            "Pearson": {
                industry: "Education",
                subIndustries: ["Educational Publishing", "EdTech"],
                competitors: ["McGraw Hill", "Houghton Mifflin", "Cengage"],
                keywords: ["education", "publishing", "learning"]
            }
        };
        
        this.charts = {};
        this.currentCompany = null;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.populateCompanySelector();
        this.initializeCharts();
        
        // Check URL parameters for company
        const urlParams = new URLSearchParams(window.location.search);
        const companyParam = urlParams.get('company');
        if (companyParam && this.clientsDatabase[companyParam]) {
            document.getElementById('companySelector').value = companyParam;
            await this.loadCompanyData(companyParam);
        }
    }

    setupEventListeners() {
        // Company selector
        document.getElementById('companySelector').addEventListener('change', (e) => {
            this.loadCompanyData(e.target.value);
            this.updateUrlParameter('company', e.target.value);
        });

        // Refresh button
        document.getElementById('refreshData').addEventListener('click', () => {
            this.refreshData();
        });

        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                this.switchTab(button.dataset.tab);
            });
        });
    }

    populateCompanySelector() {
        const selector = document.getElementById('companySelector');
        Object.keys(this.clientsDatabase).forEach(company => {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            selector.appendChild(option);
        });
    }

    async loadCompanyData(company) {
        this.showLoading();
        this.currentCompany = company;
        const companyData = this.clientsDatabase[company];

        try {
            const [overview, patents, fda, news, seo] = await Promise.all([
                this.fetchCompanyOverview(company),
                this.fetchPatentData(company),
                this.fetchFDAData(company),
                this.fetchNewsData(company),
                this.fetchSEOData(company)
            ]);

            this.updateDashboard({
                overview,
                patents,
                fda,
                news,
                seo
            });

            // Update last refreshed time
            document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
        } catch (error) {
            console.error('Error loading company data:', error);
            this.showError('Failed to load company data');
        } finally {
            this.hideLoading();
        }
    }

    async refreshData() {
        if (this.currentCompany) {
            await this.loadCompanyData(this.currentCompany);
            // Fetch Twitter data only on manual refresh
            const twitterData = await this.fetchTwitterData(this.currentCompany);
            this.updateSocialMetrics(twitterData);
        }
    }

    // API Calls
    async fetchCompanyOverview(company) {
        const response = await fetch(`https://intelbackend.onrender.com/company/${symbol}/overview`);
        return response.json();
    }

    async fetchPatentData(company) {
        const response = await fetch(`https://intelbackend.onrender.com/api/patents/${company}`);
        return response.json();
    }

    async fetchFDAData(company) {
        const response = await fetch(`https://intelbackend.onrender.com/api/fda/${company}`);
        return response.json();
    }

    async fetchNewsData(company) {
        const response = await fetch(`https://intelbackend.onrender.com/company/${company}/news/latest`);
        return response.json();
    }

    async fetchSEOData(company) {
        const response = await fetch(`https://intelbackend.onrender.com/api/seo/${company}`);
        return response.json();
    }

    async fetchTwitterData(company) {
        const response = await fetch(`https://intelbackend.onrender.com/api/twitter/${company}`);
        return response.json();
    }

    // UI Updates
    updateDashboard(data) {
        this.updateOverviewSection(data.overview);
        this.updatePatentsSection(data.patents);
        this.updateFDASection(data.fda);
        this.updateNewsSection(data.news);
        this.updateSEOSection(data.seo);
        this.updateCharts();
    }

    updateOverviewSection(data) {
        // Update company header
        document.getElementById('companyName').textContent = this.currentCompany;
        document.getElementById('companyIndustry').textContent = 
            this.clientsDatabase[this.currentCompany].industry;

        // Update metrics
        if (data.yahoo) {
            const financials = data.yahoo.financialData;
            document.getElementById('marketCap').textContent = 
                this.formatCurrency(financials.marketCap);
            // Add more metric updates
        }
    }

    updatePatentsSection(data) {
        const container = document.getElementById('recentPatentsContainer');
        container.innerHTML = data.map(patent => `
            <div class="border-b border-gray-200 pb-4">
                <div class="flex justify-between items-start">
                    <h4 class="text-lg font-medium">${patent.patent_title}</h4>
                    <span class="text-sm text-gray-500">${new Date(patent.patent_date).toLocaleDateString()}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">Patent #${patent.patent_number}</p>
            </div>
        `).join('');
    }

    // Chart Initialization and Updates
    initializeCharts() {
        // Initialize each chart
        this.initMarketTrendsChart();
        this.initPatentStatsChart();
        // Add more chart initializations
    }

    initMarketTrendsChart() {
        const ctx = document.getElementById('marketTrendsChart');
        this.charts.marketTrends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Stock Price',
                    data: [],
                    borderColor: '#2563eb'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }

    initPatentStatsChart() {
        const ctx = document.getElementById('patentStatsChart');
        this.charts.patentStats = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Patents by Category',
                    data: [],
                    backgroundColor: '#93c5fd'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }

    updateCharts(data) {
        if (data.marketTrends) {
            this.charts.marketTrends.data.labels = data.marketTrends.dates;
            this.charts.marketTrends.data.datasets[0].data = data.marketTrends.values;
            this.charts.marketTrends.update();
        }

        if (data.patentStats) {
            this.charts.patentStats.data.labels = data.patentStats.categories;
            this.charts.patentStats.data.datasets[0].data = data.patentStats.counts;
            this.charts.patentStats.update();
        }
    }

    updateFDASection(data) {
        const container = document.getElementById('fdaFilings');
        if (!data.results) return;

        container.innerHTML = data.results.map(filing => `
            <div class="border-b border-gray-200 pb-4">
                <div class="flex justify-between items-start">
                    <h4 class="text-lg font-medium">${filing.application_number}</h4>
                    <span class="text-sm text-gray-500">${new Date(filing.submissions[0]?.submission_status_date).toLocaleDateString()}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">${filing.submissions[0]?.submission_type || 'N/A'}</p>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    filing.submissions[0]?.submission_status === 'AP' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }">
                    ${filing.submissions[0]?.submission_status || 'Pending'}
                </span>
            </div>
        `).join('');
    }

    updateSEOSection(data) {
        const metrics = document.getElementById('seoMetrics');
        if (!data.tasks) return;

        const seoData = data.tasks[0]?.result[0];
        metrics.innerHTML = `
            <div class="grid grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow">
                    <h4 class="text-sm text-gray-500">Domain Rating</h4>
                    <p class="text-2xl font-semibold">${seoData?.domain_rating || 'N/A'}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <h4 class="text-sm text-gray-500">Organic Keywords</h4>
                    <p class="text-2xl font-semibold">${this.formatNumber(seoData?.organic_keywords || 0)}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <h4 class="text-sm text-gray-500">Traffic Value</h4>
                    <p class="text-2xl font-semibold">$${this.formatNumber(seoData?.traffic_value || 0)}</p>
                </div>
            </div>
        `;
    }

    updateNewsSection(data) {
        const container = document.getElementById('newsContainer');
        if (!data.articles) return;

        container.innerHTML = data.articles.map(article => `
            <div class="border-b border-gray-200 pb-4">
                <div class="flex justify-between items-start">
                    <h4 class="text-lg font-medium">${article.title}</h4>
                    <span class="text-sm text-gray-500">${new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">${article.description}</p>
                <div class="mt-2">
                    <a href="${article.url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">Read more →</a>
                </div>
            </div>
        `).join('');
    }

    updateSocialMetrics(data) {
        const container = document.getElementById('socialMetrics');
        if (!data.metrics) return;

        container.innerHTML = `
            <div class="grid grid-cols-4 gap-4">
                <div class="bg-white p-4 rounded-lg shadow">
                    <h4 class="text-sm text-gray-500">Followers</h4>
                    <p class="text-2xl font-semibold">${this.formatNumber(data.metrics.public_metrics.followers_count)}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <h4 class="text-sm text-gray-500">Following</h4>
                    <p class="text-2xl font-semibold">${this.formatNumber(data.metrics.public_metrics.following_count)}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <h4 class="text-sm text-gray-500">Tweets</h4>
                    <p class="text-2xl font-semibold">${this.formatNumber(data.metrics.public_metrics.tweet_count)}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <h4 class="text-sm text-gray-500">Listed</h4>
                    <p class="text-2xl font-semibold">${this.formatNumber(data.metrics.public_metrics.listed_count)}</p>
                </div>
            </div>
        `;
    }

    // Utility Methods
    formatCurrency(value) {
        if (!value) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(value);
    }

    formatNumber(value) {
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(value);
    }

    showLoading() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    showError(message) {
        // Implement error notification
        console.error(message);
    }

    updateUrlParameter(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    }

    switchTab(tabId) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Show selected tab content
        document.getElementById(tabId).classList.remove('hidden');

        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            if (button.dataset.tab === tabId) {
                button.classList.add('border-blue-500', 'text-blue-600');
                button.classList.remove('text-gray-600');
            } else {
                button.classList.remove('border-blue-500', 'text-blue-600');
                button.classList.add('text-gray-600');
            }
        });

        // Refresh charts in visible tab
        this.refreshVisibleCharts(tabId);
    }

    refreshVisibleCharts(tabId) {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.canvas.closest(`#${tabId}`)) {
                chart.update();
            }
        });
    }
    initFinancialCharts() {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        this.charts.revenue = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Revenue',
                    data: [],
                    borderColor: '#2563eb'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });

        // Margin Chart
        const marginCtx = document.getElementById('marginChart');
        this.charts.margins = new Chart(marginCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Gross Margin',
                        data: [],
                        borderColor: '#2563eb'
                    },
                    {
                        label: 'Operating Margin',
                        data: [],
                        borderColor: '#7c3aed'
                    },
                    {
                        label: 'Net Margin',
                        data: [],
                        borderColor: '#059669'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });

        this.initializeFinancialMetrics();
    }

    async updateFinancialData(data) {
        if (!data) return;

        // Update metrics
        document.getElementById('revenueTTM').textContent = this.formatCurrency(data.revenue);
        document.getElementById('operatingMargin').textContent = `${data.operatingMargin}%`;
        document.getElementById('freeCashFlow').textContent = this.formatCurrency(data.freeCashFlow);
        document.getElementById('returnOnCapital').textContent = `${data.returnOnCapital}%`;

        // Update charts
        if (data.revenueHistory) {
            this.charts.revenue.data.labels = data.revenueHistory.map(d => d.period);
            this.charts.revenue.data.datasets[0].data = data.revenueHistory.map(d => d.value);
            this.charts.revenue.update();
        }

        if (data.marginHistory) {
            this.charts.margins.data.labels = data.marginHistory.map(d => d.period);
            this.charts.margins.data.datasets[0].data = data.marginHistory.map(d => d.grossMargin);
            this.charts.margins.data.datasets[1].data = data.marginHistory.map(d => d.operatingMargin);
            this.charts.margins.data.datasets[2].data = data.marginHistory.map(d => d.netMargin);
            this.charts.margins.update();
        }

        this.updateSECFilings(data.secFilings);
        this.updateFinancialMetrics(data.metrics);
        this.updateBalanceSheet(data.balanceSheet);
    }

    updateSECFilings(filings) {
        const tbody = document.getElementById('secTableBody');
        if (!filings || !tbody) return;

        tbody.innerHTML = filings.map(filing => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${filing.form}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${filing.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(filing.filedDate).toLocaleDateString()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${filing.period}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="${filing.url}" target="_blank" class="text-blue-600 hover:text-blue-900">View</a>
                </td>
            </tr>
        `).join('');
    }

    updateFinancialMetrics(metrics) {
        if (!metrics) return;
        
        const elements = {
            'revenueGrowthMetric': `${metrics.revenueGrowth}%`,
            'grossMarginMetric': `${metrics.grossMargin}%`,
            'operatingMarginMetric': `${metrics.operatingMargin}%`,
            'netMarginMetric': `${metrics.netMargin}%`,
            'epsGrowthMetric': `${metrics.epsGrowth}%`
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    updateBalanceSheet(data) {
        if (!data) return;

        const elements = {
            'cashMetric': this.formatCurrency(data.cash),
            'debtMetric': this.formatCurrency(data.debt),
            'assetsMetric': this.formatCurrency(data.assets),
            'liabilitiesMetric': this.formatCurrency(data.liabilities),
            'equityMetric': this.formatCurrency(data.equity)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    async fetchFinancialData(company) {
        try {
            const responses = await Promise.all([
                fetch(`/api/company/${company}/financials`),
                fetch(`/api/company/${company}/sec-filings`),
                fetch(`/api/company/${company}/balance-sheet`)
            ]);

            const [financials, secFilings, balanceSheet] = await Promise.all(
                responses.map(r => r.json())
            );

            return {
                ...financials,
                secFilings: secFilings,
                balanceSheet: balanceSheet
            };
        } catch (error) {
            console.error('Error fetching financial data:', error);
            return null;
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new CompetitorDashboard();
});