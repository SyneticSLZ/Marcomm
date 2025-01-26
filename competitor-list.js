// Mock Data Generator
// const mockComcpetitors = {
//     competitors: [
        
//     ]
// };

// const mockCompetitors = {
//     competitors: [
//         {
//             id: 1,
//             name: 'Sonova',
//             industry: 'Manufacturing',
//             keyMetrics: {
//                 revenue: 35200000000,
//                 marketShare: 15.3,
//                 growth: 12.4,
//                 employees: 95000
//             },
//             marketPosition: {
//                 rank: 1,
//                 type: 'Market Leader',
//                 strength: 'High',
//                 trend: 'up'
//             },
//             recentActivities: [
//                 {
//                     type: 'patent',
//                     title: 'Patent Filed: Fluorochemical Composition',
//                     date: 'December 28, 2024'
//                 },
//                 {
//                     type: 'FDA 510(k) Clearance Received',
//                     title: 'Scotchbond™ Universal Plus Adhesive',
//                     date: 'December 15, 2024'
//                 },
//                 {
//                     type: 'Q3 2024 Form 10-Q Filed',
//                     title: 'Quarterly Report with SEC',
//                     date: 'November 30, 2024'
//                 }
//             ],
//             strategicImpact: {
//                 threat: 'High',
//                 opportunity: 'Medium',
//                 riskLevel: 'Medium',
//                 watchPriority: 'High'
//             }
//         },
//         {
//             id: 2,
//             name: 'GN ReSound',
//             industry: 'Healthcare',
//             keyMetrics: {
//                 revenue: 28900000000,
//                 marketShare: 12.8,
//                 growth: 8.7,
//                 employees: 84000
//             },
//             marketPosition: {
//                 rank: 2,
//                 type: 'Challenger',
//                 strength: 'High',
//                 trend: 'up'
//             },
//             recentActivities: [
//                 {
//                     type: 'acquisition',
//                     title: 'AI Healthcare Startup Acquisition',
//                     date: '2024-01-12'
//                 },
//                 {
//                     type: 'product',
//                     title: 'New Medical Device Launch',
//                     date: '2024-01-08'
//                 }
//             ],
//             strategicImpact: {
//                 threat: 'High',
//                 opportunity: 'High',
//                 riskLevel: 'Medium',
//                 watchPriority: 'High'
//             }
//         },
//         {
//             id: 3,
//             name: 'WS Audiology',
//             industry: 'Agriculture',
//             keyMetrics: {
//                 revenue: 165000000000,
//                 marketShare: 25.4,
//                 growth: 6.2,
//                 employees: 155000
//             },
//             marketPosition: {
//                 rank: 1,
//                 type: 'Market Leader',
//                 strength: 'High',
//                 trend: 'stable'
//             },
//             recentActivities: [
//                 {
//                     type: 'sustainability',
//                     title: 'Carbon Reduction Initiative Launch',
//                     date: 'January 5, 2024'
//                 },
//                 {
//                     type: 'expansion',
//                     title: 'New Processing Facility in Brazil',
//                     date: 'December 20, 2024'
//                 },
//                 {
//                     type: 'partnership',
//                     title: 'Sustainable Agriculture Partnership',
//                     date: 'December 1, 2024'
//                 }
//             ],
//             strategicImpact: {
//                 threat: 'High',
//                 opportunity: 'High',
//                 riskLevel: 'Low',
//                 watchPriority: 'High'
//             }
//         }
//         // ,
//         // {
//         //     id: 4,
//         //     name: 'Oticon',
//         //     industry: 'Financial Services',
//         //     keyMetrics: {
//         //         revenue: 12500000000,
//         //         marketShare: 8.5,
//         //         growth: 5.8,
//         //         employees: 6000
//         //     },
//         //     marketPosition: {
//         //         rank: 3,
//         //         type: 'Challenger',
//         //         strength: 'Medium',
//         //         trend: 'up'
//         //     },
//         //     recentActivities: [
//         //         {
//         //             type: 'acquisition',
//         //             title: 'Wealth Management Portfolio Acquisition',
//         //             date: 'January 8, 2024'
//         //         },
//         //         {
//         //             type: 'product',
//         //             title: 'Launch of ESG Investment Platform',
//         //             date: 'December 12, 2024'
//         //         },
//         //         {
//         //             type: 'partnership',
//         //             title: 'Digital Banking Technology Partnership',
//         //             date: 'November 28, 2024'
//         //         }
//         //     ],
//         //     strategicImpact: {
//         //         threat: 'Medium',
//         //         opportunity: 'High',
//         //         riskLevel: 'Medium',
//         //         watchPriority: 'Medium'
//         //     }
//         // },
//         // {
//         //     id: 5,
//         //     name: 'Starkey',
//         //     industry: 'Education',
//         //     keyMetrics: {
//         //         revenue: 4500000000,
//         //         marketShare: 18.2,
//         //         growth: 4.3,
//         //         employees: 21000
//         //     },
//         //     marketPosition: {
//         //         rank: 1,
//         //         type: 'Market Leader',
//         //         strength: 'High',
//         //         trend: 'stable'
//         //     },
//         //     recentActivities: [
//         //         {
//         //             type: 'product',
//         //             title: 'Launch of AI-Powered Learning Platform',
//         //             date: 'January 15, 2024'
//         //         },
//         //         {
//         //             type: 'partnership',
//         //             title: 'University Partnership Program Expansion',
//         //             date: 'December 18, 2024'
//         //         },
//         //         {
//         //             type: 'acquisition',
//         //             title: 'EdTech Startup Acquisition',
//         //             date: 'December 5, 2024'
//         //         }
//         //     ],
//         //     strategicImpact: {
//         //         threat: 'Medium',
//         //         opportunity: 'High',
//         //         riskLevel: 'Low',
//         //         watchPriority: 'Medium'
//         //     }
//         // }
//         // Add more competitors...
//     ],

//     generateMetricsChart(data) {
//         return {
//             type: 'line',
//             data: {
//                 labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//                 datasets: [{
//                     label: 'Growth',
//                     data: data,
//                     borderColor: 'rgb(59, 130, 246)',
//                     tension: 0.4
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
//                         beginAtZero: true
//                     }
//                 }
//             }
//         };
//     }
// };
const mockCompetitors = {
    competitors: [
        {
            id: 1,
            name: 'Sonova',
            industry: 'Healthcare',
            keyMetrics: {
                revenue: 1833.2,
                marketShare: 50.13,
                recentPatents: 46,
                filings: 11185
            },
            marketPosition: {
                rank: 1,
                type: 'Market Leader',
                strength: 'High',
                trend: 'up'
            },
            recentActivities: [
                {
                    type: 'patent',
                    title: 'AI-Powered Hearing Aid Algorithm',
                    date: 'January 15, 2025'
                },
                {
                    type: 'product',
                    title: 'Launch of Phonak Lumity Pro',
                    date: 'January 8, 2025'
                },
                {
                    type: 'acquisition',
                    title: 'Acquisition of AudioTech Solutions',
                    date: 'December 20, 2024'
                }
            ],
            quickMetrics: {
                roi: 28.4,
                nps: 72,
                marketGrowth: 15.2,
                innovationScore: 8.5
            }
        },
        {
            id: 2,
            name: 'GN ReSound',
            industry: 'Healthcare',
            keyMetrics: {
                revenue: 4164.0,
                marketShare: 10.07,
                recentPatents: 8,
                filings: 22963
            },
            marketPosition: {
                rank: 3,
                type: 'Challenger',
                strength: 'High',
                trend: 'up'
            },
            recentActivities: [
                {
                    type: 'product',
                    title: 'ReSound OMNIA Launch',
                    date: 'January 18, 2025'
                },
                {
                    type: 'partnership',
                    title: 'Google Health Partnership',
                    date: 'January 5, 2025'
                }
            ],
            quickMetrics: {
                roi: 25.6,
                nps: 68,
                marketGrowth: 12.4,
                innovationScore: 8.2
            }
        },
        {
            id: 3,
            name: 'WS Audiology',
            industry: 'Healthcare',
            keyMetrics: {
                revenue: 2637.0,
                marketShare: 6.9,
                recentPatents: 329,
                filings: 26565
            },
            marketPosition: {
                rank: 4,
                type: 'Challenger',
                strength: 'High',
                trend: 'stable'
            },
            recentActivities: [
                {
                    type: 'product',
                    title: 'Signia Silk X Launch',
                    date: 'January 20, 2025'
                },
                {
                    type: 'expansion',
                    title: 'New R&D Center in Singapore',
                    date: 'January 10, 2025'
                },
                {
                    type: 'partnership',
                    title: 'Microsoft AI Partnership',
                    date: 'December 15, 2024'
                }
            ],
            quickMetrics: {
                roi: 22.8,
                nps: 70,
                marketGrowth: 11.6,
                innovationScore: 7.8
            }
        },
        {
            id: 4,
            name: 'Demant',
            industry: 'Healthcare',
            keyMetrics: {
                revenue: 11087, // DKK million, as of Q3 2024
                marketShare: 18.34, // Estimated global market share percentage
                recentPatents: 107, // Number of recent patents filed
                filings: 26565 // Approximate number of regulatory filings
            },
            marketPosition: {
                rank: 2,
                type: 'Challenger',
                strength: 'High',
                trend: 'up'
            },
            recentActivities: [
                {
                    type: 'product',
                    title: 'Oticon Intent Launch',
                    date: 'February 2025'
                },
                {
                    type: 'partnership',
                    title: 'EPOS and Lenovo Strategic Partnership',
                    date: 'November 7, 2024'
                },
                {
                    type: 'sustainability',
                    title: 'Joined Net-Zero Future Network',
                    date: 'December 4, 2024'
                }
            ],
            quickMetrics: {
                roi: 22.5, // Return on Investment percentage
                nps: 70, // Net Promoter Score
                marketGrowth: 10.0, // Market growth percentage
                innovationScore: 8.5 // Innovation score out of 10
            }
        }
        
    ]
};
// State Management
const state = {
    competitors: [...mockCompetitors.competitors],
    filters: {
        industry: '',
        revenue: '',
        marketShare: '',
        growth: '',
        region: '',
        sort: 'name'
    },
    view: 'table' // or 'grid'
};

// UI Components
// const components = {
//     competitorRow: {
//         render(competitor) {
//             return `
//             <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="flex items-center">
//                         <div class="ml-4">
//                             <div class="text-sm font-medium text-gray-900 dark:text-white">${competitor.name}</div>
//                             <div class="text-sm text-gray-500 dark:text-gray-400">${competitor.industry}</div>
//                         </div>
//                     </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="flex items-center">
//                         ${this.renderMarketPosition(competitor.marketPosition)}
//                     </div>
//                 </td>
//                 <td class="px-6 py-4">
//                     <div class="space-y-2">
//                         ${this.renderRecentActivities(competitor.recentActivities)}
//                     </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     ${this.renderQuickMetrics(competitor.keyMetrics)}
//                 </td>
// <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//    <button onclick="app.viewCompetitor(${competitor.id})" 
//        class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 mr-3">
//        <i class="fas fa-eye mr-2"></i>
//        View Data
//    </button>
//    <button style="display: none;" onclick="app.editCompetitor(${competitor.id})"
//        class="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 mr-3">
//        Edit
//    </button>
//    <button style="display: none;" onclick="app.deleteCompetitor(${competitor.id})"
//        class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
//        Delete
//    </button>
// </td>
//             </tr>
//         `;
//         },

//         renderMarketPosition(position) {
//             const colors = {
//                 'Market Leader': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
//                 'Challenger': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
//                 'Follower': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
//             };
//             return `
//                 <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[position.type] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}">
//                     ${position.type}
//                 </span>
//                 <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
//                     Rank #${position.rank}
//                 </span>
//             `;
//         },


//         renderRecentActivities(activities) {
//             const icons = {
//                 patent: 'fa-lightbulb',
//                 executive: 'fa-user-tie',
//                 product: 'fa-box',
//                 acquisition: 'fa-handshake',
//                 partnership: 'fa-hands-helping',
//                 expansion: 'fa-chart-line'
//             };
//             return activities.map(activity => `
//                 <div class="flex items-center text-sm">
//                     <i class="fas ${icons[activity.type] || 'fa-circle'} text-gray-400 dark:text-gray-500 mr-2"></i>
//                     <span class="truncate text-gray-900 dark:text-gray-300">${activity.title}</span>
//                 </div>
//             `).join('');
//         },

//         renderQuickMetrics(metrics) {
//             return `
//                 <div class="grid grid-cols-2 gap-2">
//                     <div class="flex items-center">
//                         <span class="text-sm text-blue-600 dark:text-blue-400">
//                             <i class="fas fa-chart-line mr-1"></i>
//                             Revenue: ${metrics.revenue}M
//                         </span>
//                     </div>
//                     <div class="flex items-center">
//                         <span class="text-sm text-green-600 dark:text-green-400">
//                             <i class="fas fa-users mr-1"></i>
//                             Recent Patents: ${metrics.recentPatents}
                            
//                         </span>
//                     </div>
//                     <div class="flex items-center">
//                         <span class="text-sm text-purple-600 dark:text-purple-400">
//                             <i class="fas fa-chart-bar mr-1"></i>
//                             MarketShare: ${metrics.marketShare}%
//                         </span>
//                     </div>
//                     <div class="flex items-center">
//                         <span class="text-sm text-yellow-600 dark:text-yellow-400">
//                             <i class="fas fa-lightbulb mr-1"></i>
//                             FDA Filings: ${metrics.filings}
//                         </span>
//                     </div>
//                 </div>
//             `;
//         }
//     },

//     //     renderStrategicImpact(impact) {
//     //         const threatColor = impact.threat === 'High' 
//     //             ? 'text-red-600 dark:text-red-400' 
//     //             : 'text-yellow-600 dark:text-yellow-400';
//     //         const opportunityColor = impact.opportunity === 'High' 
//     //             ? 'text-green-600 dark:text-green-400' 
//     //             : 'text-blue-600 dark:text-blue-400';
    
//     //         return `
//     //             <div class="space-y-1">
//     //                 <div class="flex items-center">
//     //                     <span class="text-sm ${threatColor} transition-colors duration-200">
//     //                         <i class="fas fa-exclamation-triangle mr-1"></i>
//     //                         ${impact.threat} Threat
//     //                     </span>
//     //                 </div>
//     //                 <div class="flex items-center">
//     //                     <span class="text-sm ${opportunityColor} transition-colors duration-200">
//     //                         <i class="fas fa-star mr-1"></i>
//     //                         ${impact.opportunity} Opportunity
//     //                     </span>
//     //                 </div>
//     //             </div>
//     //         `;
//     //     }
//     // },

//     quickView: {
//         render(competitor) {
//             return `
//             <div class="grid grid-cols-2 gap-6">
//                 <div>
//                     <h4 class="text-lg font-medium mb-4 text-gray-900 dark:text-white">Company Overview</h4>
//                     <div class="space-y-4">
//                         <div>
//                             <p class="text-sm text-gray-600 dark:text-gray-400">Industry</p>
//                             <p class="text-base font-medium text-gray-900 dark:text-white">${competitor.industry}</p>
//                         </div>
//                         <div>
//                             <p class="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
//                             <p class="text-base font-medium text-gray-900 dark:text-white">$${(competitor.keyMetrics.revenue / 1e9).toFixed(1)}B</p>
//                         </div>
//                         <div>
//                             <p class="text-sm text-gray-600 dark:text-gray-400">Market Share</p>
//                             <p class="text-base font-medium text-gray-900 dark:text-white">${competitor.keyMetrics.marketShare}%</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <h4 class="text-lg font-medium mb-4 text-gray-900 dark:text-white">Recent Activities</h4>
//                     <div class="space-y-4">
//                         ${competitor.recentActivities.map(activity => `
//                             <div>
//                                 <p class="text-sm font-medium text-gray-900 dark:text-white">${activity.title}</p>
//                                 <p class="text-sm text-gray-600 dark:text-gray-400">${activity.date}</p>
//                             </div>
//                         `).join('')}
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
// }
// };

const components = {
    competitorRow: {
        render(competitor) {
            return `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="ml-4">
                            <div class="text-sm font-medium text-marcomm-dark dark:text-white">${competitor.name}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">${competitor.industry}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        ${this.renderMarketPosition(competitor.marketPosition)}
                    </div>
                </td>
                <td class="px-6 py-4">
                    <div class="space-y-2">
                        ${this.renderRecentActivities(competitor.recentActivities)}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${this.renderQuickMetrics(competitor.keyMetrics)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="app.viewCompetitor(${competitor.id})" 
                        class="inline-flex items-center px-4 py-2 bg-marcomm-orange hover:bg-marcomm-orange-light text-white rounded transition-colors duration-200">
                        <i class="fas fa-eye mr-2"></i>
                        View Data
                    </button>
                </td>
            </tr>
        `;
        },

        renderMarketPosition(position) {
            const colors = {
                'Market Leader': 'bg-marcomm-orange/10 text-marcomm-orange',
                'Challenger': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
                'Follower': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            };
            return `
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[position.type]}">
                    ${position.type}
                </span>
                <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    Rank #${position.rank}
                </span>
            `;
        },

        renderRecentActivities(activities) {
            const icons = {
                patent: 'fa-lightbulb',
                executive: 'fa-user-tie',
                product: 'fa-box',
                acquisition: 'fa-handshake',
                partnership: 'fa-hands-helping',
                expansion: 'fa-chart-line'
            };
            return activities.map(activity => `
                <div class="flex items-center text-sm">
                    <i class="fas ${icons[activity.type] || 'fa-circle'} text-marcomm-orange mr-2"></i>
                    <span class="truncate text-marcomm-dark dark:text-gray-300">${activity.title}</span>
                </div>
            `).join('');
        },

        renderQuickMetrics(metrics) {
            return `
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex items-center">
                        <span class="text-sm text-marcomm-orange">
                            <i class="fas fa-chart-line mr-1"></i>
                            Revenue: ${metrics.revenue}M
                        </span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-sm text-marcomm-orange">
                            <i class="fas fa-users mr-1"></i>
                            Patents: ${metrics.recentPatents}
                        </span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-sm text-marcomm-orange">
                            <i class="fas fa-chart-bar mr-1"></i>
                            Share: ${metrics.marketShare}%
                        </span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-sm text-marcomm-orange">
                            <i class="fas fa-lightbulb mr-1"></i>
                            FDA: ${metrics.filings}
                        </span>
                    </div>
                </div>
            `;
        }
    },

    quickView: {
        render(competitor) {
            return `
            <div class="grid grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-light mb-4 text-marcomm-dark dark:text-white">Company Overview</h4>
                    <div class="space-y-4">
                        <div>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Industry</p>
                            <p class="text-base font-medium text-marcomm-dark dark:text-white">${competitor.industry}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                            <p class="text-base font-medium text-marcomm-dark dark:text-white">$${(competitor.keyMetrics.revenue / 1e9).toFixed(1)}B</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Market Share</p>
                            <p class="text-base font-medium text-marcomm-dark dark:text-white">${competitor.keyMetrics.marketShare}%</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="text-lg font-light mb-4 text-marcomm-dark dark:text-white">Recent Activities</h4>
                    <div class="space-y-4">
                        ${competitor.recentActivities.map(activity => `
                            <div class="border-l-2 border-marcomm-orange pl-4">
                                <p class="text-sm font-medium text-marcomm-dark dark:text-white">${activity.title}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">${activity.date}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}
}

// Application Logic
const app = {
    async init() {
        this.setupEventListeners();
        this.render();
    },

    setupEventListeners() {
        // Filter changes
        document.querySelectorAll('select[id$="-filter"]').forEach(select => {
            select.addEventListener('change', (e) => {
                state.filters[e.target.id.replace('-filter', '')] = e.target.value;
                this.render();
            });
        });

        // // Search
        // document.getElementById('search-input').addEventListener('input', (e) => {
        //     this.handleSearch(e.target.value);
        // });

        // // View toggle
        // document.getElementById('view-toggle').addEventListener('click', () => {
        //     state.view = state.view === 'table' ? 'grid' : 'table';
        //     this.render();
        // });

        // Add competitor button
        // document.getElementById('add-competitor-btn').addEventListener('click', () => {
        //     this.showAddModal();
        // });
    },

    render() {
        const tableBody = document.getElementById('competitor-table-body');
        const filteredCompetitors = this.getFilteredCompetitors();
        
        tableBody.innerHTML = filteredCompetitors.map(competitor => 
            components.competitorRow.render(competitor)
        ).join('');
    },

    getFilteredCompetitors() {
        return state.competitors.filter(competitor => {
            let matches = true;

            // Apply filters
            if (state.filters.industry && competitor.industry !== state.filters.industry) {
                matches = false;
            }

            if (state.filters.revenue) {
                const [min, max] = this.getRevenueRange(state.filters.revenue);
                if (competitor.keyMetrics.revenue < min || (max && competitor.keyMetrics.revenue > max)) {
                    matches = false;
                }
            }

            if (state.filters.growth) {
                const [min, max] = this.getGrowthRange(state.filters.growth);
                if (competitor.keyMetrics.growth < min || (max && competitor.keyMetrics.growth > max)) {
                    matches = false;
                }
            }

            return matches;
        }).sort((a, b) => {
            switch (state.filters.sort) {
                case 'revenue':
                    return b.keyMetrics.revenue - a.keyMetrics.revenue;
                case 'growth':
                    return b.keyMetrics.growth - a.keyMetrics.growth;
                case 'marketShare':
                    return b.keyMetrics.marketShare - a.keyMetrics.marketShare;
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    },

    getRevenueRange(range) {
        const ranges = {
            '0-100M': [0, 100000000],
            '100M-1B': [100000000, 1000000000],
            '1B+': [1000000000, null]
        };
        return ranges[range] || [0, null];
    },

    getGrowthRange(range) {
        const ranges = {
            'high': [20, null],
            'medium': [10, 20],
            'low': [0, 10]
        };
        return ranges[range] || [null, null];
    },

    handleSearch(searchTerm) {
        if (!searchTerm) {
            this.render();
            return;
        }

        const searchRegex = new RegExp(searchTerm, 'i');
        state.competitors = mockCompetitors.competitors.filter(competitor =>
            searchRegex.test(competitor.name) ||
            searchRegex.test(competitor.industry)
        );
        this.render();
    },

    viewCompetitor(id) {
        const competitor = state.competitors.find(c => c.id === id);
        if (competitor) {
            window.location.href = `competitor-analysis.html?id=${id}`;
        }
    },

    editCompetitor(id) {
        console.log('Edit competitor:', id);
        // Implement edit functionality
    },

    deleteCompetitor(id) {
        if (confirm('Are you sure you want to delete this competitor?')) {
            state.competitors = state.competitors.filter(c => c.id !== id);
            this.render();
        }
    },

    showAddModal() {
        document.getElementById('quick-view-modal').classList.remove('hidden');
    },

    hideQuickView() {
        document.getElementById('quick-view-modal').classList.add('hidden');
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => app.init());