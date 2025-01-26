// Report Generation Module
const reportModule = {
    templates: {
        competitiveAnalysis: {
            name: 'Competitive Analysis',
            sections: [
                { id: 'executive-summary', name: 'Executive Summary', default: true },
                { id: 'market-position', name: 'Market Position Analysis', default: true },
                { id: 'competitor-profiles', name: 'Competitor Profiles', default: true },
                { id: 'swot-analysis', name: 'SWOT Analysis', default: true },
                { id: 'technology-comparison', name: 'Technology Comparison', default: true },
                { id: 'financial-metrics', name: 'Financial Metrics', default: false },
                { id: 'recommendations', name: 'Strategic Recommendations', default: true }
            ]
        },
        marketIntelligence: {
            name: 'Market Intelligence',
            sections: [
                { id: 'market-overview', name: 'Market Overview', default: true },
                { id: 'trend-analysis', name: 'Trend Analysis', default: true },
                { id: 'growth-opportunities', name: 'Growth Opportunities', default: true },
                { id: 'market-risks', name: 'Market Risks', default: false },
                { id: 'regulatory-landscape', name: 'Regulatory Landscape', default: false }
            ]
        },
        technologyAssessment: {
            name: 'Technology Assessment',
            sections: [
                { id: 'tech-landscape', name: 'Technology Landscape', default: true },
                { id: 'innovation-analysis', name: 'Innovation Analysis', default: true },
                { id: 'patent-analysis', name: 'Patent Analysis', default: true },
                { id: 'rd-investment', name: 'R&D Investment Analysis', default: false },
                { id: 'tech-adoption', name: 'Technology Adoption Trends', default: true }
            ]
        }
    },

    // Current report state
    currentState: {
        template: null,
        format: 'pdf',
        sections: new Set(),
        options: {
            executiveSummary: true,
            visualizations: true,
            rawData: false,
            aiInsights: true
        }
    },

    init() {
        this.setupTemplateSelector();
        this.setupContentSections();
        this.setupEventListeners();
        this.updatePreview();
    },

    setupTemplateSelector() {
        const templateSelect = document.querySelector('select:first-of-type');
        templateSelect.innerHTML = Object.entries(this.templates).map(([key, template]) => `
            <option value="${key}">${template.name}</option>
        `).join('');
        
        // Set initial template
        this.currentState.template = Object.keys(this.templates)[0];
    },

    setupContentSections() {
        const container = document.getElementById('content-sections');
        const template = this.templates[this.currentState.template];
        
        container.innerHTML = template.sections.map(section => `
            <div class="flex items-center justify-between py-2">
                <label class="text-sm font-medium text-gray-700">${section.name}</label>
                <input type="checkbox" 
                       class="h-4 w-4 text-blue-600 rounded border-gray-300"
                       data-section="${section.id}"
                       ${section.default ? 'checked' : ''}>
            </div>
        `).join('');
        
        // Initialize sections state
        this.currentState.sections = new Set(
            template.sections
                .filter(s => s.default)
                .map(s => s.id)
        );
    },

    setupEventListeners() {
        // Template change
        document.querySelector('select:first-of-type').addEventListener('change', (e) => {
            this.currentState.template = e.target.value;
            this.setupContentSections();
            this.updatePreview();
        });

        // Format change
        document.querySelector('select:last-of-type').addEventListener('change', (e) => {
            this.currentState.format = e.target.value.toLowerCase().split(' ')[0];
            this.updatePreview();
        });

        // Section toggles
        document.getElementById('content-sections').addEventListener('change', (e) => {
            if (e.target.matches('input[type="checkbox"]')) {
                const sectionId = e.target.dataset.section;
                if (e.target.checked) {
                    this.currentState.sections.add(sectionId);
                } else {
                    this.currentState.sections.delete(sectionId);
                }
                this.updatePreview();
            }
        });

        // Option toggles
        document.querySelectorAll('.bg-white:last-of-type input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const option = e.target.previousElementSibling.textContent.toLowerCase().replace(/ /g, '');
                this.currentState.options[option] = e.target.checked;
                this.updatePreview();
            });
        });

        // Preview button
        document.getElementById('preview-report').addEventListener('click', () => {
            this.generatePreview();
        });

        // Generate button
        document.getElementById('generate-report').addEventListener('click', () => {
            this.generateReport();
        });
    },

    updatePreview() {
        const preview = document.getElementById('report-preview');
        const template = this.templates[this.currentState.template];
        
        preview.innerHTML = `
            <div class="space-y-4">
                <div class="border-b pb-4">
                    <h2 class="text-2xl font-bold text-gray-900">${template.name}</h2>
                    ${this.currentState.options.executiveSummary ? `
                        <p class="mt-2 text-gray-600">Executive Summary will be generated based on selected sections.</p>
                    ` : ''}
                </div>
                
                <div class="space-y-2">
                    ${Array.from(this.currentState.sections).map(sectionId => {
                        const section = template.sections.find(s => s.id === sectionId);
                        return `
                            <div class="p-2 border rounded">
                                <h3 class="font-medium">${section.name}</h3>
                                <p class="text-sm text-gray-600">Content will be generated based on latest data</p>
                                ${this.currentState.options.visualizations ? `
                                    <div class="mt-2 p-2 bg-gray-50 rounded">
                                        <p class="text-xs text-gray-500">Visualizations will be included</p>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                
                ${this.currentState.options.aiInsights ? `
                    <div class="mt-4 p-4 bg-blue-50 rounded">
                        <h4 class="font-medium text-blue-900">AI Insights</h4>
                        <p class="text-sm text-blue-700">AI-powered analysis and recommendations will be included</p>
                    </div>
                ` : ''}
            </div>
        `;
    },

    generatePreview() {
        // Show loading state
        const preview = document.getElementById('report-preview');
        preview.innerHTML = `
            <div class="flex items-center justify-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        `;
        
        // Simulate preview generation
        setTimeout(() => {
            this.updatePreview();
        }, 1500);
    },

    async generateReport() {
        // Show loading state
        const generateBtn = document.getElementById('generate-report');
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin mr-2"></i>Generating...
        `;
        generateBtn.disabled = true;
        
        try {
            // Simulate report generation
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            generateBtn.innerHTML = `
                <i class="fas fa-check mr-2"></i>Generated!
            `;
            generateBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            generateBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = '#'; // In real implementation, this would be the report URL
            downloadLink.download = `report-${Date.now()}.${this.currentState.format}`;
            downloadLink.click();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                generateBtn.innerHTML = originalText;
                generateBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                generateBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                generateBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error generating report:', error);
            
            // Show error state
            generateBtn.innerHTML = `
                <i class="fas fa-exclamation-circle mr-2"></i>Error
            `;
            generateBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            generateBtn.classList.add('bg-red-500', 'hover:bg-red-600');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                generateBtn.innerHTML = originalText;
                generateBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
                generateBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                generateBtn.disabled = false;
            }, 3000);
        }
    },

    // Report content generation methods
    generateContent: {
        executiveSummary(data) {
            return `
                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">Executive Summary</h2>
                    <p class="text-gray-700 leading-relaxed">
                        Analysis of ${data.companies.length} companies in the ${data.industry} sector reveals 
                        significant market developments and competitive dynamics. Key findings include market share 
                        shifts, emerging technology trends, and strategic opportunities.
                    </p>
                </div>
            `;
        },

        marketPosition(data) {
            return `
                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">Market Position Analysis</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-white rounded-lg shadow p-4">
                            <h3 class="text-lg font-semibold mb-2">Market Share Distribution</h3>
                            <div class="h-64" id="market-share-chart"></div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4">
                            <h3 class="text-lg font-semibold mb-2">Competitive Position</h3>
                            <div class="h-64" id="competitive-position-chart"></div>
                        </div>
                    </div>
                </div>
            `;
        },

        competitorProfiles(data) {
            return `
                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">Competitor Profiles</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${data.companies.map(company => `
                            <div class="bg-white rounded-lg shadow p-4">
                                <h3 class="text-lg font-semibold mb-2">${company.name}</h3>
                                <div class="space-y-2">
                                    <p><span class="font-medium">Industry:</span> ${company.industry}</p>
                                    <p><span class="font-medium">Market Share:</span> ${company.marketShare}%</p>
                                    <p><span class="font-medium">Growth Rate:</span> ${company.growth}%</p>
                                    <p><span class="font-medium">Key Strengths:</span> ${company.strengths}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        technologyComparison(data) {
            return `
                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">Technology Comparison</h2>
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="h-96" id="technology-radar-chart"></div>
                    </div>
                </div>
            `;
        },

        aiInsights(data) {
            return `
                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-4">AI-Powered Insights</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${data.insights.map(insight => `
                            <div class="bg-white rounded-lg shadow p-4 border-l-4 ${this.getInsightBorderColor(insight.type)}">
                                <h3 class="text-lg font-semibold mb-2">${insight.title}</h3>
                                <p class="text-gray-700">${insight.description}</p>
                                <div class="mt-2 flex items-center">
                                    <span class="text-sm text-gray-500">Confidence:</span>
                                    <span class="ml-2 px-2 py-1 text-sm rounded-full ${this.getConfidenceBadgeColor(insight.confidence)}">
                                        ${insight.confidence}%
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        getInsightBorderColor(type) {
            const colors = {
                opportunity: 'border-green-500',
                threat: 'border-red-500',
                neutral: 'border-blue-500'
            };
            return colors[type] || colors.neutral;
        },

        getConfidenceBadgeColor(confidence) {
            if (confidence >= 90) return 'bg-green-100 text-green-800';
            if (confidence >= 70) return 'bg-blue-100 text-blue-800';
            return 'bg-yellow-100 text-yellow-800';
        }
    }
};

// Initialize report module
document.addEventListener('DOMContentLoaded', () => reportModule.init());