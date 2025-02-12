
// }
export class PatentDashboard {
    constructor() {
        this.charts = {
            applicants: null,
            publications: null,
            legalStatus: null,       // Add these new chart references
            jurisdiction: null,
            documentType: null
        };
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.totalPages = 1;
        this.similarityThreshold = 0.6;
        this.allPatents = [];
        this.initializeEventListeners();

        window.patentsTable = this;
        window.toggleGroup = this.toggleGroup.bind(this);
        window.showPatentModal = this.showPatentModal.bind(this)
        window.closePatentModal = this.closePatentModal.bind(this)
    }

    async initializeEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.pagination-button')) {
                const newPage = parseInt(e.target.dataset.page);
                if (newPage !== this.currentPage) {
                    this.currentPage = newPage;
                    this.updateRecentPatentsTable(this.allPatents);
                }
            }
        });

        const patentSearch = document.getElementById('patentSearch');
        if (patentSearch) {
            patentSearch.addEventListener('input', (e) => {
                this.searchPatents(e.target.value);
            });
        }

        // Close modal when clicking outside
        window.onclick = (event) => {
            const modal = document.getElementById('patentModal');
            if (event.target === modal) {
                this.closePatentModal();
            }
        };
    }

    searchPatents(searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        const filteredPatents = this.allPatents.filter(patent => 
            patent['Display Key']?.toLowerCase().includes(searchTermLower) ||
            patent['Title']?.toLowerCase().includes(searchTermLower) ||
            patent['Application Date']?.toLowerCase().includes(searchTermLower) ||
            patent['Legal Status']?.toLowerCase().includes(searchTermLower) ||
            patent['Document Type']?.toLowerCase().includes(searchTermLower)
        );

        this.updatePatentTable(filteredPatents);
    }

    filterRecentPatents(patents) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        return patents.filter(patent => {
            const pubDate = new Date(patent['Publication Date']);
            return pubDate >= oneYearAgo;
        });
    }


    // Group patents by exact title match
groupPatentsByTitle(patents) {
        // First, filter for recent patents
        const recentPatents = this.filterRecentPatents(patents);
        
        const groups = {};
        
        recentPatents.forEach(patent => {
            if (!groups[patent.Title]) {
                groups[patent.Title] = [];
            }
            groups[patent.Title].push(patent);
        });

        const groupedPatents = [];
        const singlePatents = [];

        Object.entries(groups).forEach(([title, patents]) => {
            if (patents.length > 1) {
                groupedPatents.push({
                    title: title,
                    patents: patents.sort((a, b) => new Date(b['Publication Date']) - new Date(a['Publication Date']))
                });
            } else {
                singlePatents.push(patents[0]);
            }
        });

        // Sort grouped patents by most recent publication date within each group
        groupedPatents.sort((a, b) => {
            const aDate = new Date(a.patents[0]['Publication Date']);
            const bDate = new Date(b.patents[0]['Publication Date']);
            return bDate - aDate;
        });

        // Sort single patents by publication date
        singlePatents.sort((a, b) => new Date(b['Publication Date']) - new Date(a['Publication Date']));

        return { groupedPatents, singlePatents };
    }

    renderPagination(totalItems) {
        this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        if (this.totalPages <= 1) return '';

        let pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(`
                <button 
                    class="pagination-button ${this.currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300'} 
                           px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 hover:text-white 
                           transition-colors duration-200 mx-1"
                    data-page="${i}">
                    ${i}
                </button>
            `);
        }

        const prevButton = `
            <button 
                class="pagination-button ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} 
                       bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 
                       px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 hover:text-white 
                       transition-colors duration-200"
                data-page="${this.currentPage - 1}"
                ${this.currentPage === 1 ? 'disabled' : ''}>
                Previous
            </button>
        `;

        const nextButton = `
            <button 
                class="pagination-button ${this.currentPage === this.totalPages ? 'opacity-50 cursor-not-allowed' : ''} 
                       bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 
                       px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 hover:text-white 
                       transition-colors duration-200"
                data-page="${this.currentPage + 1}"
                ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                Next
            </button>
        `;

        return `
            <div class="flex justify-center items-center space-x-2 mt-4 mb-4">
                ${this.currentPage > 1 ? prevButton : ''}
                ${pages.join('')}
                ${this.currentPage < this.totalPages ? nextButton : ''}
            </div>
        `;
    }

    renderSinglePatentRow(patent) {
        return `
        <tr class="hover:bg-marcomm-orange/5 dark:hover:bg-marcomm-orange/10 cursor-pointer transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
                <a href="${patent.URL}"
                   target="_blank"
                   class="text-marcomm-orange hover:text-marcomm-orange-light dark:text-marcomm-orange dark:hover:text-marcomm-orange-light transition-colors">
                    ${patent['Display Key']}
                </a>
            </td>
            <td class="px-6 py-4 font-light text-marcomm-dark dark:text-white" onclick="showPatentModal(${JSON.stringify(patent).replace(/"/g, '&quot;')})">
                ${patent.Title}
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-light text-marcomm-dark dark:text-white">
                ${patent['Application Date']}
            </td>
            <td class="px-6 py-4">
                <span class="px-2 inline-flex text-xs leading-5 font-light rounded-full 
                ${patent['Legal Status'] === 'Active' ? 'bg-marcomm-orange/10 text-marcomm-orange dark:bg-marcomm-orange/20 dark:text-marcomm-orange-light' : 
                  patent['Legal Status'] === 'Pending' ? 'bg-marcomm-orange/10 text-marcomm-orange dark:bg-marcomm-orange/20 dark:text-marcomm-orange-light' : 
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}">
                    ${patent['Legal Status']}
                </span>
            </td>
            <td class="px-6 py-4 font-light text-marcomm-dark dark:text-white">
                ${patent['Cites Patent Count'] + patent['Cited by Patent Count']}
            </td>
        </tr>
    `;
}

    renderPatentGroup(group, groupIndex) {
        const mainPatent = group.patents[0];
        return `
        <tr class="group-header hover:bg-marcomm-orange/5 dark:hover:bg-marcomm-orange/10">
            <td colspan="5" class="px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button onclick="toggleGroup('group-${groupIndex}')" 
                                class="text-marcomm-orange dark:text-marcomm-orange-light hover:text-marcomm-orange-dark transition-colors">
                            <svg class="w-5 h-5 transform transition-transform duration-200" 
                                 fill="none" 
                                 stroke="currentColor" 
                                 viewBox="0 0 24 24">
                                <path stroke-linecap="round" 
                                      stroke-linejoin="round" 
                                      stroke-width="2" 
                                      d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div>
                            <div class="font-light text-marcomm-dark dark:text-white">${mainPatent.Title}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                ${group.patents.length} variations
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        <tr class="hidden" id="group-${groupIndex}">
            <td colspan="5" class="px-6 py-2 bg-gray-50 dark:bg-gray-800">
                <div class="space-y-2">
                    ${group.patents.map(patent => `
                        <div class="border-l-4 border-marcomm-orange pl-4 py-2">
                            <div class="flex justify-between items-start">
                                <div>
                                    <a href="${patent.URL}" 
                                       target="_blank"
                                       class="text-marcomm-orange hover:text-marcomm-orange-light dark:text-marcomm-orange dark:hover:text-marcomm-orange-light transition-colors">
                                        ${patent['Display Key']}
                                    </a>
                                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Filed: ${patent['Application Date']} | Status: ${patent['Legal Status']}
                                    </p>
                                </div>
                                <button onclick='showPatentModal(${JSON.stringify(patent).replace(/"/g, '&quot;')})'
                                        class="px-3 py-1 text-sm text-marcomm-orange hover:text-marcomm-orange-light dark:text-marcomm-orange dark:hover:text-marcomm-orange-light transition-colors">
                                    View Details
                                </button>
                            </div>
                            <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Citations: ${patent['Cites Patent Count'] + patent['Cited by Patent Count']}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </td>
        </tr>
    `;
}


    toggleGroup(groupId) {
        const content = document.getElementById(groupId);
        const button = content.previousElementSibling.querySelector('svg');
        
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            button.style.transform = 'rotate(180deg)';
        } else {
            content.classList.add('hidden');
            button.style.transform = '';
        }
    }

    formatNumber(number) {
        return new Intl.NumberFormat().format(number);
    }

    showPatentModal(patent) {
        console.log(patent)
        const modal = document.getElementById('patentModal');
        const content = document.getElementById('patentModalContent');
        
        content.innerHTML = `
        <div class="space-y-4">
            <h4 class="text-xl font-light text-marcomm-dark dark:text-white">${patent.Title}</h4>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="font-light text-marcomm-dark dark:text-gray-300">Patent Number:</p>
                    <p class="text-marcomm-dark dark:text-white">${patent['Display Key']}</p>
                </div>
                <div>
                    <p class="font-light text-marcomm-dark dark:text-gray-300">Status:</p>
                    <p class="text-marcomm-dark dark:text-white">${patent['Legal Status']}</p>
                </div>
                <div>
                    <p class="font-light text-marcomm-dark dark:text-gray-300">Application Date:</p>
                    <p class="text-marcomm-dark dark:text-white">${patent['Application Date']}</p>
                </div>
                <div>
                    <p class="font-light text-marcomm-dark dark:text-gray-300">Publication Date:</p>
                    <p class="text-marcomm-dark dark:text-white">${patent['Publication Date']}</p>
                </div>
                <div>
                    <p class="font-light text-marcomm-dark dark:text-gray-300">Applicants:</p>
                    <p class="text-marcomm-dark dark:text-white">${patent['Applicants']}</p>
                </div>
                <div>
                    <p class="font-light text-marcomm-dark dark:text-gray-300">Inventors:</p>
                    <p class="text-marcomm-dark dark:text-white">${patent['Inventors']}</p>
                </div>
            </div>
            <div>
                <p class="font-light text-marcomm-dark dark:text-gray-300">Abstract:</p>
                <p class="mt-1 text-marcomm-dark dark:text-white">${patent['Abstract'] || 'Not available'}</p>
            </div>
            <div>
                <p class="font-light text-marcomm-dark dark:text-gray-300">Citations:</p>
                <p class="text-marcomm-dark dark:text-white">Patent citations: ${patent['Cites Patent Count'] || 0}</p>
                <p class="text-marcomm-dark dark:text-white">Cited by patents: ${patent['Cited by Patent Count'] || 0}</p>
            </div>
            <div class="mt-4">
                <a href="${patent['URL']}" target="_blank" 
                   class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-light rounded-md shadow-sm text-white bg-marcomm-orange hover:bg-marcomm-orange-light transition-colors">
                    View Patent Details
                </a>
            </div>
        </div>
    `;


        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    closePatentModal() {
        const modal = document.getElementById('patentModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    async processPatentData(csvData) {
        // Sort by publication date descending
        const sortedPatents = _.orderBy(csvData, ['Publication Date'], ['desc']);
        
        // Get patents from the last year
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const recentPatents = sortedPatents.filter(patent => 
            new Date(patent['Publication Date']) >= oneYearAgo
        );

        console.log(sortedPatents.length)
        console.log(recentPatents.length)
        document.getElementById('totalPatents').innerHTML = `${sortedPatents.length}`
        document.getElementById("recentApplications").innerHTML = `${recentPatents.length}`

        

        return {
            allPatents: sortedPatents,
            recentPatents: recentPatents
        };
    }


    initializeCharts(num) {
        const data = {
            Sonova: {
                applicants: {
                    labels: ['Phonak Ag', 'Sonova Ag', 'Sennheiser', 'Others'],
                    data: [753, 716, 28, 151]
                },
                publications: {
                    years: Array.from({ length: 28 }, (_, i) => 1997 + i),
                    data: [1, 1, 1, 6, 29, 44, 56, 45, 70, 68, 53, 51, 90, 74, 52, 83, 69, 88, 84, 83, 60, 76, 104, 134, 111, 65, 49]
                },
                legalStatus: {
                    labels: ['Active', 'Expired', 'Inactive', 'Discontinued', 'Pending'],
                    data: [1025, 249, 197, 106, 71]
                },
                jurisdictions: {
                    labels: ['US', 'Germany', 'Australia'],
                    data: [1315, 35, 8]
                },
                documentType: {
                    labels: ['Patent Application', 'Granted Patents', 'Search Report', 'Design Report'],
                    data: [838, 751, 24, 31]
                }
            },
            Starkey: {
                applicants: {
                    labels: ['Starkey Labs Inc', 'Higgins Sidney A', 'Solum Jeffrey Paul', 'Zhang Tao', 'Giri Ritwik', 'Mustiere Fred', 'Tourtelotte Davi', 'Kroenke Randall A'],
                    data: [1594, 7, 5, 5, 4, 4, 4, 3]
                },
                
                publications: {
                    years: [1980, 1992, 1994, 1996, 1998, 2000, 2002, 2004, 2007, 2011, 2012, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
                    data: [1, 1, 4, 4, 9, 1, 1, 1, 1, 5, 3, 54, 135, 166, 191, 221, 183, 226, 210, 175],
                    thisYear: [5]
                },
                legalStatus: {
                    labels: ['Active', 'Pending', 'Discontinued', 'Inactive', 'Expired'],
                    data: [1078, 417, 65, 19, 15]
                },
                jurisdictions: {
                    labels: ['US', 'Canada', 'Germany', 'China', 'Australia'],
                    data: [950, 4, 1, 13, 11]
                },
                documentType: {
                    labels: ['Patent Application', 'Granted Patent', 'Design Right', 'Amended Patent', 'Search Report'],
                    data: [850, 692, 7, 9, 23]
                }
            },
            Ws: {
                applicants: {
                    labels: ['Widex As', 'Sivantos Pte Ltd', 'Kidmose Preben', 'Rank Mike Lind', 'Kilsgaard Soren', 'Ungstrup Michael', 'Widex as Vaerloese', 'Klinkby Kristian Tjalfe'],
                    data: [2489, 2292, 46, 39, 22, 22, 17, 16]
                },
                publications: {
                    years: [1991, 1992, 1994, 1995, 1996, 1998, 1999, 2000, 2001, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
                    data: [1, 1, 2, 1, 2, 4, 1, 6, 10, 41, 64, 57, 94, 130, 165, 105, 243, 182, 206, 177, 138, 150, 322, 309, 406, 419, 328, 353, 318, 263, 341],
                    thisYear: [8]
                },
                legalStatus: {
                    labels: ['Active', 'Pending', 'Discontinued', 'Expired', 'Inactive', 'Patented'],
                    data: [2657, 824, 527, 424, 338, 20]
                },
                jurisdictions: {
                    labels: ['US', 'Canada', 'Germany', 'China', 'Australia', 'Japan'],
                    data: [1210, 255, 487, 476, 319, 40]
                },
                documentType: {
                    labels: ['Patent Application', 'Granted Patent', 'Limited Patent', 'Design Right', 'Amended Patent', 'Search Report', 'Unknown'],
                    data: [2641, 1923, 41, 50, 14, 52, 63]
                }
            },
            Gn:  {
                applicants: {
                    labels: ['Gn Resound As', 'Gn Hearing As', 'Nielsen Henrik', 'Gn Resound as Taastrup', 'Pedersen Brian Dam', 'Resound Corp', 'Gn Resound North America Corp', 'Bisgaard Nikolai'],
                    data:  [1269, 31, 22, 20, 16, 16, 14, 12]
                },
                publications: {
                    years: [1988, 1991, 1993, 1995, 1996,1997,1998,1999, 2000, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
                    data: [1, 2, 2, 5, 2, 4, 9, 8, 16, 17, 33, 45, 45, 34, 48, 46, 41, 50, 72, 76, 60, 125, 164, 218, 164, 142, 25, 16, 8, 11, 4, 9, 10]
                },
                legalStatus: {
                    labels: ['Active', 'Expired', 'Inactive', 'Discontinued', 'Pending', 'Patented'],
                    data: [773, 322, 168, 143, 96, 8]
                },
                jurisdictions: {
                    labels: ['US', 'Germany', 'China', 'Japan', 'Australia'],
                    data: [529, 58, 176, 111, 5]
                },
                documentType: {
                    labels: ['Patent Application', 'Granted Patents', 'Search Report', 'Design Report', 'Amended Patent'],
                    data: [817, 566, 48, 32, 6]
                }
            }
        };
    
        // const selectedData = data.num
        const selectedData = num === "Sonova" ? data.Sonova : num === "Starkey" ? data.Starkey : num === "Ws" ? data.Ws : data.Gn;
    
        const applicantCtx = document.getElementById('applicantsChart');
        const publicationsCtx = document.getElementById('publicationsChart');
        const legalStatusCtx = document.getElementById('legalStatusChart');
        const jurisdictionCtx = document.getElementById('jurisdictionChart');
        const documentTypeCtx = document.getElementById('documentTypeChart');
    const textColor = 'white'
        // Destroy existing charts if they exist
        Object.keys(this.charts).forEach(chartKey => {
            if (this.charts[chartKey]) this.charts[chartKey].destroy();
        });
    
        // Create charts with selected data
        this.charts.legalStatus = new Chart(legalStatusCtx, {
            type: 'pie',
            data: {
                labels: selectedData.legalStatus.labels,
                datasets: [{
                    data: selectedData.legalStatus.data,
                    backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#6B7280', '#FF6B35','#E07' ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    
        this.charts.jurisdiction = new Chart(jurisdictionCtx, {
            type: 'bar',
            data: {
                labels: selectedData.jurisdictions.labels,
                datasets: [{
                    label: 'Patents by Jurisdiction',
                    color: '#ffffff',
                    data: selectedData.jurisdictions.data,
                    backgroundColor: '#FF6B35'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    labels: { color: '#fff' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    
        this.charts.documentType = new Chart(documentTypeCtx, {
            type: 'doughnut',
            data: {
                labels: selectedData.documentType.labels,
                datasets: [{
                    data: selectedData.documentType.data,
                    backgroundColor: ['#FF6B35', '#10B981', '#F59E0B', '#8B5CF6']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    
        this.charts.applicants = new Chart(applicantCtx, {
            type: 'bar',
            data: {
                labels: selectedData.applicants.labels,
                datasets: [{
                    label: 'Number of Patents',
                    data: selectedData.applicants.data,
                    backgroundColor: ['#FF6B35', '#10B981', '#F59E0B', '#6B7280']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    
        this.charts.publications = new Chart(publicationsCtx, {
            type: 'line',
            data: {
                labels: selectedData.publications.years,
                datasets: [{
                    label: 'Publications',
                    data: selectedData.publications.data,
                    borderColor: '#FF6B35',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    updatePatentTable(patents) {
        const tableBody = document.getElementById('allPatentsTable');
        if (!tableBody) return;
    
        const searchTerm = document.getElementById('patentSearch')?.value || '';
        
        if (!searchTerm) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-300 font-light">
                        Enter a search term to find patents
                    </td>
                </tr>
            `;
            return;
        }
        
        if (searchTerm.length < 3) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-300 font-light">
                        Please enter at least 3 characters to search
                    </td>
                </tr>
            `;
            return;
        }
    
        if (patents.length > 0) {
            tableBody.innerHTML = patents.map(patent => `
                <tr class="hover:bg-marcomm-orange/5 dark:hover:bg-marcomm-orange/10 cursor-pointer transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <a href="${patent.URL}"
                           target="_blank"
                           class="text-marcomm-orange hover:text-marcomm-orange-light dark:text-marcomm-orange dark:hover:text-marcomm-orange-light transition-colors">
                            ${patent['Display Key']}
                        </a>
                    </td>
                    <td class="px-6 py-4 font-light text-marcomm-dark dark:text-white" onclick="showPatentModal(${JSON.stringify(patent).replace(/"/g, '&quot;')})">
                        ${patent.Title}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap font-light text-marcomm-dark dark:text-white">
                        ${patent['Application Date']}
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-2 inline-flex text-xs leading-5 font-light rounded-full 
                        ${patent['Legal Status'] === 'Active' ? 'bg-marcomm-orange/10 text-marcomm-orange dark:bg-marcomm-orange/20 dark:text-marcomm-orange-light' : 
                          patent['Legal Status'] === 'Pending' ? 'bg-marcomm-orange/10 text-marcomm-orange dark:bg-marcomm-orange/20 dark:text-marcomm-orange-light' : 
                          'bg-gray-100 text-marcomm-dark dark:bg-gray-700 dark:text-gray-300'}">
                            ${patent['Legal Status']}
                        </span>
                    </td>
                    <td class="px-6 py-4 font-light text-marcomm-dark dark:text-white">
                        ${patent['Document Type']}
                    </td>
                </tr>
            `).join('');
        } else {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-300 font-light">
                        No patents found matching your search
                    </td>
                </tr>
            `;
        }
    }
    
    showError() {
        const errorMessage = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center text-marcomm-orange dark:text-marcomm-orange-light font-light">
                    Error loading patent data. Please try again later.
                </td>
            </tr>
        `;
        document.getElementById('recentPatentsTable').innerHTML = errorMessage;
        document.getElementById('allPatentsTable').innerHTML = errorMessage;
    }


    updateRecentPatentsTable(patents) {
        const tableBody = document.getElementById('recentPatentsTable');
        if (!tableBody) return;

        // Get grouped and filtered patents
        const { groupedPatents, singlePatents } = this.groupPatentsByTitle(patents);
        
        if (groupedPatents.length === 0 && singlePatents.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No patents found in the last year
                    </td>
                </tr>
            `;
            return;
        }

        // Calculate total items for pagination
        const totalItems = groupedPatents.length + singlePatents.length;
        
        // Recalculate current page if it exceeds the new total pages
        const maxPages = Math.ceil(totalItems / this.itemsPerPage);
        if (this.currentPage > maxPages) {
            this.currentPage = maxPages;
        }
        
        // Calculate start and end indices for current page
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, totalItems);
        
        // Combine and slice items for current page
        const allItems = [
            ...groupedPatents.map(group => ({ type: 'group', data: group })),
            ...singlePatents.map(patent => ({ type: 'single', data: patent }))
        ];
        
        const currentPageItems = allItems.slice(startIndex, endIndex);
        
        // Render items with pagination
        tableBody.innerHTML = `
            ${currentPageItems.map((item, index) => 
                item.type === 'group' 
                    ? this.renderPatentGroup(item.data, startIndex + index)
                    : this.renderSinglePatentRow(item.data)
            ).join('')}
            ${this.renderPagination(totalItems)}
        `;
    }
    // updateRecentPatentsTable(patents) {
    //     const tableBody = document.getElementById('recentPatentsTable');
    //     if (tableBody) {
    //         if (patents.length > 0) {
    //             tableBody.innerHTML = patents.map(patent => `
    //                 <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
    //                     <td class="px-6 py-4 whitespace-nowrap">
    //                         <a href="${patent.URL}"
    //                            target="_blank"
    //                            class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
    //                             ${patent['Display Key']}
    //                         </a>
    //                     </td>
    //                     <td class="px-6 py-4" onclick="patentDashboard.showPatentModal(${JSON.stringify(patent).replace(/"/g, '&quot;')})">
    //                         ${patent.Title}
    //                     </td>
    //                     <td class="px-6 py-4 whitespace-nowrap">
    //                         ${patent['Application Date']}
    //                     </td>
    //                     <td class="px-6 py-4">
    //                         <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
    //                         ${patent['Legal Status'] === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
    //                           patent['Legal Status'] === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
    //                           'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}">
    //                             ${patent['Legal Status']}
    //                         </span>
    //                     </td>
    //                     <td class="px-6 py-4">
    //                         ${patent['Cites Patent Count'] + patent['Cited by Patent Count']}
    //                     </td>
    //                 </tr>
    //             `).join('');
    //         } else {
    //             tableBody.innerHTML = `
    //                 <tr>
    //                     <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
    //                         No recent patents found
    //                     </td>
    //                 </tr>
    //             `;
    //         }
    //     }
    // }

    async renderPatentAnalysis(csvFilename) {
        try {
            // Show loading state
            document.getElementById('recentPatentsTable').innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center">
                        <div class="animate-pulse dark:text-gray-400">Loading patent data...</div>
                    </td>
                </tr>
            `;
            
            // Read and parse CSV file
            // const csvData = await window.fs.readFile(csvFilename, { encoding: 'utf8' });
                // Read the CSV file
    const response = await fetch(`./data/${csvFilename}/patents.csv`);
    const csvData = await response.text();
    
            Papa.parse(csvData, {
                header: true,
                complete: async (results) => {
                    const processedData = await this.processPatentData(results.data);
                    this.allPatents = processedData.allPatents;
                    
                    // Initialize charts
                    this.initializeCharts(csvFilename);
                    
                    // Update tables
                    this.updatePatentTable(processedData.allPatents);
                    this.updateRecentPatentsTable(processedData.recentPatents);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                    this.showError();
                }
            });
        } catch (error) {
            console.error('Error rendering patent analysis:', error);
            this.showError();
        }
    }

    showError() {
        const errorMessage = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center text-red-500 dark:text-red-400">
                    Error loading patent data. Please try again later.
                </td>
            </tr>
        `;
        document.getElementById('recentPatentsTable').innerHTML = errorMessage;
        document.getElementById('allPatentsTable').innerHTML = errorMessage;
    }
}

// Create and export singleton instance
export const patentDashboard = new PatentDashboard();

// Export render function
export const renderPatentAnalysis = (csvFilename) => patentDashboard.renderPatentAnalysis(csvFilename);