// async function renderProductPortfolio(companyName) {
//     try {
//         // Fetch FDA data
//         const response = await fetch('https://intelbackend.onrender.com/api/company-fda-filings', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ companyName })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('FDA API Response:', data);  // Debug log

//         // Process the filings data
//         let allFilings = [];
//         if (data.filingsByCompany && Object.keys(data.filingsByCompany).length > 0) {
//             const companyFilings = data.filingsByCompany[data.matchedCompanies[0]] || [];
//             allFilings = companyFilings.map(filing => ({
//                 id: filing.id || 'N/A',
//                 productName: filing.productName || 'N/A',
//                 type: filing.type || 'N/A',
//                 status: filing.status || 'N/A',
//                 date: filing.date || null,
//                 company: filing.company || data.matchedCompanies[0],
//                 allSubmissions: filing.allSubmissions || []
//             }));
//         }

//         // Calculate stats
//         const thirtyDaysAgo = new Date();
//         thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//         const stats = {
//             activeApplications: allFilings.filter(filing => 
//                 // filing.status.toLowerCase().includes('pend') || 
//                 // filing.status.toLowerCase().includes('submit')
//                 filing.status.toLowerCase().includes('ta')
//             ).length,
            
//             approvedProducts: allFilings.filter(filing =>
//                 filing.status.toLowerCase().includes('ap')
//             ).length,
            
//             recentSubmissions: allFilings.filter(filing => {
//                 const submissionDate = filing.date ? new Date(filing.date) : null;
//                 return submissionDate && !isNaN(submissionDate) && submissionDate >= thirtyDaysAgo;
//             }).length
//         };

//         console.log('Calculated Stats:', stats); // Debug log

//         // Update stats display
//         document.getElementById('activeApplications').textContent = stats.activeApplications || '0';
//         document.getElementById('approvedProducts').textContent = stats.approvedProducts || '0';
//         document.getElementById('recentSubmissions').textContent = stats.recentSubmissions || '0';

// // Process submission types for pie chart
// const submissionTypesData = allFilings.reduce((acc, filing) => {
//     const type = filing.type || 'Other';
//     const displayType = type === 'ORIG' ? 'Original' :
//                       type === 'SUPPL' ? 'Supplement' : type;
//     acc[displayType] = (acc[displayType] || 0) + 1;
//     return acc;
// }, {});

// // Create submission types chart
// const submissionTypesCtx = document.getElementById('submissionTypesChart');
// if (submissionTypesCtx) {
//     if (submissionTypesCtx.chart) {
//         submissionTypesCtx.chart.destroy();
//     }

//     const colors = [
//         '#3B82F6', // blue-500
//         '#10B981', // emerald-500
//         '#F59E0B', // amber-500
//         '#EF4444', // red-500
//         '#8B5CF6', // violet-500
//         '#EC4899'  // pink-500
//     ];

//     submissionTypesCtx.chart = new Chart(submissionTypesCtx, {
//         type: 'pie',
//         data: {
//             labels: Object.keys(submissionTypesData),
//             datasets: [{
//                 data: Object.values(submissionTypesData),
//                 backgroundColor: colors.slice(0, Object.keys(submissionTypesData).length),
//                 borderWidth: 2,
//                 borderColor: '#ffffff'
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'right',
//                     labels: {
//                         padding: 20,
//                         font: {
//                             size: 12
//                         }
//                     }
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function(context) {
//                             const label = context.label || '';
//                             const value = context.raw || 0;
//                             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                             const percentage = ((value / total) * 100).toFixed(1);
//                             return `${label}: ${value} (${percentage}%)`;
//                         }
//                     }
//                 }
//             }
//         }
//     });
// }

// // Process timeline data for line chart
// const timelineData = processTimelineData(allFilings);

// // Create approval timeline chart
// const approvalTimelineCtx = document.getElementById('approvalTimelineChart');
// if (approvalTimelineCtx) {
//     if (approvalTimelineCtx.chart) {
//         approvalTimelineCtx.chart.destroy();
//     }

//     approvalTimelineCtx.chart = new Chart(approvalTimelineCtx, {
//         type: 'line',
//         data: {
//             labels: timelineData.labels.map(date => {
//                 const [year, month] = date.split('-');
//                 return new Date(year, month - 1).toLocaleDateString('en-US', {
//                     month: 'short',
//                     year: 'numeric'
//                 });
//             }),
//             datasets: [
//                 {
//                     label: 'Submissions',
//                     data: timelineData.submissions,
//                     borderColor: '#3B82F6',
//                     backgroundColor: '#93C5FD',
//                     tension: 0.4,
//                     fill: true
//                 },
//                 {
//                     label: 'Approvals',
//                     data: timelineData.approvals,
//                     borderColor: '#10B981',
//                     backgroundColor: '#6EE7B7',
//                     tension: 0.4,
//                     fill: true
//                 }
//             ]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     ticks: {
//                         stepSize: 1
//                     }
//                 },
//                 x: {
//                     grid: {
//                         display: false
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     position: 'top',
//                 },
//                 tooltip: {
//                     mode: 'index',
//                     intersect: false
//                 }
//             },
//             interaction: {
//                 intersect: false,
//                 mode: 'nearest'
//             }
//         }
//     });
// }


//         // Update FDA filings table
//         const fdaTableBody = document.getElementById('fdaTableBody');
//         if (fdaTableBody && allFilings.length > 0) {
//             fdaTableBody.innerHTML = allFilings.map(filing => {
//                 // Format the application type and number
//                 const appType = filing.id.slice(0, 3); // BLA, NDA, etc.
//                 const appNumber = filing.id.slice(3);
                
//                 // Parse and format the date
//                 let formattedDate = 'N/A';
//                 try {
//                     if (filing.date) {
//                         const date = new Date(filing.date);
//                         if (!isNaN(date)) {
//                             formattedDate = date.toLocaleDateString('en-US', {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric'
//                             });
//                         }
//                     }
//                 } catch (e) {
//                     console.error('Date parsing error:', e);
//                 }

//                 // Determine submission type display
//                 const submissionType = filing.type || 'N/A';
//                 const displayType = submissionType === 'ORIG' ? 'Original' :
//                                   submissionType === 'SUPPL' ? 'Supplement' :
//                                   submissionType;

//                 return `
//                     <tr class="hover:bg-gray-50">
//                         <td class="px-6 py-4">
//                             <span class="font-medium">${appType}</span>
//                             <span class="text-gray-600">${appNumber}</span>
//                         </td>
//                         <td class="px-6 py-4">
//                             <div class="font-medium">${filing.productName}</div>
//                             ${filing.company ? `<div class="text-sm text-gray-500">${filing.company}</div>` : ''}
//                         </td>
//                         <td class="px-6 py-4">
//                             <span class="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
//                                 ${displayType}
//                             </span>
//                         </td>
//                         <td class="px-6 py-4">
//                             <span class="${getStatusClass(filing.status)}">
//                                 ${filing.status || 'N/A'}
//                             </span>
//                         </td>
//                         <td class="px-6 py-4 text-sm">
//                             ${formattedDate}
//                             ${filing.allSubmissions?.length > 1 ? 
//                                 `<div class="text-xs text-gray-500">${filing.allSubmissions.length} submissions</div>` 
//                                 : ''}
//                         </td>
//                     </tr>
//                 `;
//             }).join('');
//         } else if (fdaTableBody) {
//             fdaTableBody.innerHTML = `
//                 <tr>
//                     <td colspan="5" class="px-6 py-4 text-center text-gray-500">
//                         No filings found for ${companyName}
//                     </td>
//                 </tr>
//             `;
//         }

//         // Set up status filter
//         const statusFilter = document.getElementById('fdaStatusFilter');
//         if (statusFilter) {
//             statusFilter.addEventListener('change', (e) => {
//                 const selectedStatus = e.target.value.toLowerCase();
//                 const rows = fdaTableBody.getElementsByTagName('tr');
                
//                 Array.from(rows).forEach(row => {
//                     const statusCell = row.getElementsByTagName('td')[3];
//                     if (statusCell) {
//                         const status = statusCell.textContent.trim().toLowerCase();
//                         row.style.display = (selectedStatus === 'all' || status.includes(selectedStatus)) ? '' : 'none';
//                     }
//                 });
//             });
//         }

//     } catch (error) {
//         console.error('Error rendering portfolio:', error);
//         // Show error state in UI
//         document.getElementById('activeApplications').textContent = '0';
//         document.getElementById('approvedProducts').textContent = '0';
//         document.getElementById('recentSubmissions').textContent = '0';
        
//         const fdaTableBody = document.getElementById('fdaTableBody');
//         if (fdaTableBody) {
//             fdaTableBody.innerHTML = `
//                 <tr>
//                     <td colspan="5" class="px-6 py-4 text-center text-red-500">
//                         Error loading FDA filings: ${error.message}
//                     </td>
//                 </tr>
//             `;
//         }
//     }
// }

// function processTimelineData(filings) {
//     const monthlyData = {};
//     const today = new Date();
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(today.getMonth() - 6);

//     // Initialize last 6 months
//     for (let d = new Date(sixMonthsAgo); d <= today; d.setMonth(d.getMonth() + 1)) {
//         const monthKey = d.toISOString().slice(0, 7);
//         monthlyData[monthKey] = { submissions: 0, approvals: 0 };
//     }

//     // Process filings
//     filings.forEach(filing => {
//         if (!filing.date) return;
//         const monthKey = filing.date.slice(0, 7);
//         if (monthlyData[monthKey]) {
//             monthlyData[monthKey].submissions++;
//             if ((filing.status || '').toLowerCase().includes('ap')) {
//                 monthlyData[monthKey].approvals++;
//             }
//         }
//     });

//     return {
//         labels: Object.keys(monthlyData),
//         submissions: Object.values(monthlyData).map(d => d.submissions),
//         approvals: Object.values(monthlyData).map(d => d.approvals)
//     };
// }

// function getStatusClass(status) {
//     if (!status) return 'px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800';
    
//     status = status.toLowerCase();
//     if (status.includes('ap')) {
//         return 'px-2 py-1 text-sm rounded-full bg-green-100 text-green-800';
//     } else if (status.includes('pend') || status.includes('submit')) {
//         return 'px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800';
//     } else if (status.includes('withdr') || status.includes('refuse')) {
//         return 'px-2 py-1 text-sm rounded-full bg-red-100 text-red-800';
//     } else {
//         return 'px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800';
//     }
// }

// // Export the main function
// export default renderProductPortfolio;


async function renderFDADashboard(companyName) {
    try {
        // Fetch FDA data
                // Show loading states
                document.getElementById('stats-skeleton')?.classList.remove('hidden');
                document.getElementById('table-skeleton')?.classList.remove('hidden');
                document.getElementById('loading-spinner')?.classList.remove('hidden');
        
        const response = await fetch('https://intelbackend.onrender.com/api/fda', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyName })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('FDA API Response:', data);

        globalFDAData = data;
    
                // Hide loading states
                document.getElementById('stats-skeleton')?.classList.add('hidden');
                document.getElementById('table-skeleton')?.classList.add('hidden');
                document.getElementById('loading-spinner')?.classList.add('hidden');

    // Setup modal close functionality
    setupModal();

        // Update overview statistics
        updateOverviewStats(data);
        
        // Initialize charts
        initializeCharts(data);
        
        // Set up tab navigation
        setupTabNavigation();
        
        
        // Populate tables
        populateDrugApplications(data.drug);
        populateRecalls(data.recalls);
        populateUDIDevices(data.udi);
        populate510k(data.d501k);
        
        // Initialize modal functionality
        setupModal();

    } catch (error) {
        console.error('Error rendering FDA dashboard:', error);
        showErrorState(error);
        // Hide loading states
        document.getElementById('stats-skeleton')?.classList.add('hidden');
        document.getElementById('table-skeleton')?.classList.add('hidden');
        document.getElementById('loading-spinner')?.classList.add('hidden');
    }
}

function updateOverviewStats(data) {
    document.getElementById('totalDrugApps').textContent = data.drug?.length || '0';
    document.getElementById('activeRecalls').textContent = data.recalls?.length || '0';
    document.getElementById('totalUDI').textContent = data.udi?.length || '0';
    document.getElementById('total510k').textContent = data.d501k?.length || '0';
}

function initializeCharts(data) {
    // Submission Distribution Chart
    // const submissionCtx = document.getElementById('submissionDistributionChart');
    // new Chart(submissionCtx, {
    //     type: 'pie',
    //     data: {
    //         labels: ['Drug Applications', 'Recalls', 'UDI Devices', '510(k) Submissions'],
    //         datasets: [{
    //             data: [
    //                 data.drug?.length || 0,
    //                 data.recalls?.length || 0,
    //                 data.udi?.length || 0,
    //                 data.d501k?.length || 0
    //             ],
    //             backgroundColor: [
    //                 '#3B82F6',
    //                 '#EF4444',
    //                 '#10B981',
    //                 '#8B5CF6'
    //             ]
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         plugins: {
    //             legend: {
    //                 position: 'right'
    //             }
    //         }
    //     }
    // });

    // Timeline Chart implementation here...
}

function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    
    // Keep track of the active tab
    let activeTab = null;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // If there's an active tab, store it
            if (activeTab) {
                activeTab.classList.remove('border-blue-500', 'text-blue-600');
            }
            
            // Hide all content first
            contents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show the selected tab's content
            const tabId = tab.id;
            const contentId = `tab-content-${tabId.split('-')[1]}`;
            const content = document.getElementById(contentId);
            
            if (content) {
                content.classList.remove('hidden');
                // Add active styling to the tab
                tab.classList.add('border-blue-500', 'text-blue-600');
                activeTab = tab;
            }
        });
    });
    // Activate first tab by default if there are any tabs
    if (tabs.length > 0) {
        // Explicitly show the first tab's content
        const firstTabId = tabs[0].id;
        const firstContentId = `tab-content-${firstTabId.split('-')[1]}`;
        const firstContent = document.getElementById(firstContentId);
        
        if (firstContent) {
            tabs[0].classList.add('border-blue-500', 'text-blue-600');
            firstContent.classList.remove('hidden');
            activeTab = tabs[0];
        }
    }
}

// Update the table HTML to replace dropdowns with search bars
function updateTableHeaders() {
    // Update Drug Applications table filter
    const drugFilter = document.getElementById('drugStatusFilter');
    if (drugFilter) {
        const searchBar = document.createElement('input');
        searchBar.type = 'text';
        searchBar.id = 'drugSearchBar';
        searchBar.placeholder = 'Search drugs...';
        searchBar.className = 'text-sm border rounded-md p-2 w-64';
        drugFilter.parentNode.replaceChild(searchBar, drugFilter);
    }

    // Update Recalls table filter
    const recallFilter = document.getElementById('recallStatusFilter');
    if (recallFilter) {
        const searchBar = document.createElement('input');
        searchBar.type = 'text';
        searchBar.id = 'recallSearchBar';
        searchBar.placeholder = 'Search recalls...';
        searchBar.className = 'text-sm border rounded-md p-2 w-64';
        recallFilter.parentNode.replaceChild(searchBar, recallFilter);
    }

    // Update 510k table filter
    const k510Filter = document.getElementById('510kStatusFilter');
    if (k510Filter) {
        const searchBar = document.createElement('input');
        searchBar.type = 'text';
        searchBar.id = '510kSearchBar';
        searchBar.placeholder = 'Search 510(k) submissions...';
        searchBar.className = 'text-sm border rounded-md p-2 w-64';
        k510Filter.parentNode.replaceChild(searchBar, k510Filter);
    }
}

// Function to search table rows
function searchTable(tableId, searchTerm) {
    const tableBody = document.getElementById(tableId);
    if (!tableBody) return;

    const rows = tableBody.getElementsByTagName('tr');
    const searchTermLower = searchTerm.toLowerCase();

    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTermLower) ? '' : 'none';
    });
}

// Setup search functionality for all tables
function setupSearchFunctionality() {
    // Drug Applications search
    const drugSearch = document.getElementById('drugSearchBar');
    if (drugSearch) {
        drugSearch.addEventListener('input', (e) => {
            searchTable('drugApplicationsTable', e.target.value);
        });
    }

    // Recalls search
    const recallSearch = document.getElementById('recallSearchBar');
    if (recallSearch) {
        recallSearch.addEventListener('input', (e) => {
            searchTable('recallsTable', e.target.value);
        });
    }

    // UDI search
    const udiSearch = document.getElementById('udiSearch');
    if (udiSearch) {
        udiSearch.addEventListener('input', (e) => {
            searchTable('udiTable', e.target.value);
        });
    }

    // 510k search
    const k510Search = document.getElementById('510kSearchBar');
    if (k510Search) {
        k510Search.addEventListener('input', (e) => {
            searchTable('510kTable', e.target.value);
        });
    }
}

// Update table population functions to initialize search
function populateDrugApplications(drugData) {
    showLoadingState();
    const tableBody = document.getElementById('drugApplicationsTable');
    if (!tableBody || !drugData) return;

    // Ensure the content tab is visible
    const tabContent = document.getElementById('tab-content-drugs');
    if (tabContent) {
        tabContent.classList.remove('hidden');
    }

    tableBody.innerHTML = drugData.map(drug => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">${drug.application_number}</td>
            <td class="px-6 py-4">
                ${drug.products?.[0]?.brand_name || 'N/A'}
                <div class="text-sm text-gray-500">${drug.sponsor_name}</div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                    ${drug.submissions?.[0]?.submission_type || 'N/A'}
                </span>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-sm rounded-full ${getSubmissionStatusClass(drug.submissions?.[0]?.submission_status)}">
                    ${drug.submissions?.[0]?.submission_status || 'N/A'}
                </span>
            </td>
            <td class="px-6 py-4">
                <button onclick="showDrugDetails('${drug.application_number}')"
                        class="text-blue-600 hover:text-blue-800">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');
    hideLoadingState();
    updateTableHeaders();
    setupSearchFunctionality();
}

// Function to populate the recalls table
function populateRecalls(recallData) {
    const tableBody = document.getElementById('recallsTable');
    if (!tableBody || !recallData) return;

    // Ensure the content tab is visible
    const tabContent = document.getElementById('tab-content-recalls');
    if (tabContent) {
        tabContent.classList.remove('hidden');
    }

    tableBody.innerHTML = recallData.map(recall => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">${recall.recall_number}</td>
            <td class="px-6 py-4">
                <div class="font-medium">${truncateText(recall.product_description, 100)}</div>
                <div class="text-sm text-gray-500">${recall.recalling_firm}</div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-sm rounded-full ${getRecallClassBadgeColor(recall.classification)}">
                    ${recall.classification}
                </span>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-sm rounded-full ${getStatusBadgeColor(recall.status)}">
                    ${recall.status}
                </span>
            </td>
            <td class="px-6 py-4">
                <button onclick="showRecallDetails('${recall.recall_number}')"
                        class="text-blue-600 hover:text-blue-800">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');

    // Setup recall status filter
    // setupRecallFilter();
    updateTableHeaders();
    setupSearchFunctionality();
}

// Function to populate the recalls table


// Function to populate the UDI devices table
function populateUDIDevices(udiData) {
    const tableBody = document.getElementById('udiTable');
    if (!tableBody || !udiData) return;

    // Ensure the content tab is visible
    const tabContent = document.getElementById('tab-content-udi');
    if (tabContent) {
        tabContent.classList.remove('hidden');
    }

    tableBody.innerHTML = udiData.map(device => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                            <a href="https://accessgudid.nlm.nih.gov/devices/${device.identifiers?.[0]?.id}"
                               target="_blank"
                               class="text-blue-600 hover:text-blue-800 hover:underline">
                               <div class="font-medium">${device.brand_name}</div>
                <div class="text-sm text-gray-500">${device.company_name}</div>
            
                            </a>
        </td>
                
            <td class="px-6 py-4">${device.version_or_model_number}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-sm rounded-full ${getDeviceClassBadgeColor(device)}">
                    ${getDeviceClassification(device)}
                </span>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-sm rounded-full ${getCommercialStatusBadgeColor(device.commercial_distribution_status)}">
                    ${device.commercial_distribution_status}
                </span>
            </td>
            <td class="px-6 py-4">
                <button onclick="showUDIDetails('${device.public_device_record_key}')"
                        class="text-blue-600 hover:text-blue-800">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');

    // Setup UDI search functionality
    // setupUDISearch();
    updateTableHeaders();
    setupSearchFunctionality();
}

// Function to populate the 510k submissions table
function populate510k(k501Data) {
    const tableBody = document.getElementById('510kTable');
    if (!tableBody || !k501Data) return;

    // Ensure the content tab is visible
    const tabContent = document.getElementById('tab-content-510k');
    if (tabContent) {
        tabContent.classList.remove('hidden');
    }
            // <td class="px-6 py-4">${submission.k_number}</td>
    tableBody.innerHTML = k501Data.map(submission => `
        <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
                            <a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${submission.k_number}"
                               target="_blank"
                               class="text-blue-600 hover:text-blue-800 hover:underline">
                               ${submission.k_number}
                            </a>
        </td>
            <td class="px-6 py-4">
                <div class="font-medium">${truncateText(submission.device_name, 100)}</div>
                <div class="text-sm text-gray-500">${submission.applicant}</div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-sm rounded-full ${getDecisionBadgeColor(submission.decision_code)}">
                    ${submission.decision_description}
                </span>
            </td>
            <td class="px-6 py-4">${formatDate(submission.decision_date)}</td>
            <td class="px-6 py-4">
                <button onclick="show510kDetails('${submission.k_number}')"
                        class="text-blue-600 hover:text-blue-800">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');

    // Setup 510k status filter
    setup510kFilter();
}

// Helper Functions
function setupRecallFilter() {
    const filter = document.getElementById('recallStatusFilter');
    if (!filter) return;

    filter.addEventListener('change', (e) => {
        const selectedClass = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#recallsTable tr');

        rows.forEach(row => {
            const classificationCell = row.children[2];
            if (classificationCell) {
                const classification = classificationCell.textContent.trim().toLowerCase();
                row.style.display = (selectedClass === 'all' || classification.includes(selectedClass)) ? '' : 'none';
            }
        });
    });
}

function setupUDISearch() {
    const searchInput = document.getElementById('udiSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#udiTable tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}


function setup510kFilter() {
    const filter = document.getElementById('510kStatusFilter');
    if (!filter) return;

    filter.addEventListener('change', (e) => {
        const selectedStatus = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#510kTable tr');

        rows.forEach(row => {
            const statusCell = row.children[2];
            if (statusCell) {
                const status = statusCell.textContent.trim().toLowerCase();
                row.style.display = (selectedStatus === 'all' || status.includes(selectedStatus)) ? '' : 'none';
            }
        });
    });
}

// Utility functions for styling and formatting
function getRecallClassBadgeColor(classification) {
    switch (classification.toLowerCase()) {
        case 'class i': return 'bg-red-100 text-red-800';
        case 'class ii': return 'bg-yellow-100 text-yellow-800';
        case 'class iii': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getStatusBadgeColor(status) {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('ongoing')) return 'bg-yellow-100 text-yellow-800';
    if (statusLower.includes('completed')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('terminated')) return 'bg-gray-100 text-gray-800';
    return 'bg-blue-100 text-blue-800';
}

function getDeviceClassBadgeColor(device) {
    return 'bg-purple-100 text-purple-800';
}

function getCommercialStatusBadgeColor(status) {
    if (status.includes('Commercial Distribution')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
}

function getDecisionBadgeColor(decision) {
    if (decision === 'SESE') return 'bg-green-100 text-green-800';
    if (decision === 'NSEQ') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    try {
        // Handle YYYYMMDD format (e.g., "20210315")
        if (dateString.length === 8 && !isNaN(dateString)) {
            const year = dateString.substring(0, 4);
            const month = dateString.substring(4, 6);
            const day = dateString.substring(6, 8);
            const date = new Date(year, month - 1, day);
            
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
        }

        // Handle standard date format
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        // If both parsing attempts fail, return the original string
        return dateString;
    } catch (error) {
        console.warn(`Date parsing error for ${dateString}:`, error);
        return dateString;
    }
}

function truncateText(text, maxLength) {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function getDeviceClassification(device) {
    return device.device_class || 'N/A';
}

function setupModal() {
    const modal = document.getElementById('detail-modal');
    const closeButton = document.getElementById('modal-close');

    closeButton.onclick = () => {
        modal.classList.add('hidden');
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    };
}

// Store the FDA data globally for modal access
let globalFDAData = null;

// Enhanced showDrugDetails function with toggleable sections
function showDrugDetails(applicationNumber) {
    const drug = globalFDAData.drug.find(d => d.application_number === applicationNumber);
    if (!drug) return;

    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalTitle.textContent = `Drug Application: ${applicationNumber}`;
    
    modalContent.innerHTML = `
        <div class="space-y-6">
            <!-- Overview Section -->
            <div class="bg-blue-50 p-4 rounded-lg">
                <div class="flex justify-between items-center">
                    <h4 class="font-semibold text-blue-900">Application Overview</h4>
                    <span class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                        ${drug.submissions?.[0]?.submission_status || 'Status Unknown'}
                    </span>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-600">Application Number</p>
                        <p class="font-medium">${drug.application_number}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Sponsor</p>
                        <p class="font-medium">${drug.sponsor_name}</p>
                    </div>
                </div>
            </div>

            <!-- Products Section -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('products-${applicationNumber}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Products (${drug.products?.length || 0})</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="products-${applicationNumber}" class="hidden p-4 bg-gray-50">
                    ${drug.products?.map(product => `
                        <div class="mb-4 bg-white p-4 rounded-lg shadow-sm">
                            <div class="flex justify-between items-start">
                                <h5 class="font-medium text-lg">${product.brand_name || 'Unnamed Product'}</h5>
                                <span class="px-2 py-1 text-sm rounded-full ${getMarketingStatusClass(product.marketing_status)}">
                                    ${product.marketing_status}
                                </span>
                            </div>
                            <div class="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm text-gray-600">Dosage Form</p>
                                    <p class="font-medium">${product.dosage_form || 'N/A'}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Route</p>
                                    <p class="font-medium">${product.route || 'N/A'}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Product Number</p>
                                    <p class="font-medium">${product.product_number || 'N/A'}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Reference Status</p>
                                    <p class="font-medium">
                                        ${product.reference_drug === 'Yes' ? 'Reference Drug' : 
                                          product.reference_standard === 'Yes' ? 'Reference Standard' : 'Non-Reference'}
                                    </p>
                                </div>
                            </div>
                            ${product.active_ingredients ? `
                                <div class="mt-4">
                                    <h6 class="font-medium mb-2">Active Ingredients</h6>
                                    <div class="space-y-2">
                                        ${product.active_ingredients.map(ingredient => `
                                            <div class="bg-gray-50 p-2 rounded">
                                                <p class="font-medium">${ingredient.name || 'Unnamed Ingredient'}</p>
                                                ${ingredient.strength ? `
                                                    <p class="text-sm text-gray-600">Strength: ${ingredient.strength}</p>
                                                ` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    `).join('') || '<p class="text-gray-500">No product information available</p>'}
                </div>
            </div>

            <!-- Submissions Section -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('submissions-${applicationNumber}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Submission History (${drug.submissions?.length || 0})</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="submissions-${applicationNumber}" class="hidden p-4 bg-gray-50">
                    <div class="space-y-3">
                        ${drug.submissions?.map(submission => `
                            <div class="bg-white p-4 rounded-lg shadow-sm">
                                <div class="flex justify-between items-center">
                                    <span class="font-medium">Submission ${submission.submission_number}</span>
                                    <span class="px-2 py-1 text-sm rounded-full ${getSubmissionStatusClass(submission.submission_status)}">
                                        ${submission.submission_status}
                                    </span>
                                </div>
                                <div class="mt-3 grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="text-sm text-gray-600">Type</p>
                                        <p class="font-medium">${submission.submission_type} - ${submission.submission_class_code_description || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">Status Date</p>
                                        <p class="font-medium">${formatDate(submission.submission_status_date)}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">Review Priority</p>
                                        <p class="font-medium">${submission.review_priority || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('') || '<p class="text-gray-500">No submission history available</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Toggle section visibility
window.toggleSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    const button = section.previousElementSibling;
    const arrow = button.querySelector('svg');
    
    section.classList.toggle('hidden');
    arrow.style.transform = section.classList.contains('hidden') ? '' : 'rotate(180deg)';
};

// Helper function for marketing status styling
function getMarketingStatusClass(status) {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes('discontinued')) return 'bg-red-100 text-red-800';
    if (statusLower.includes('active')) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
}

// Enhanced Recall Details Modal
function showRecallDetails(recallNumber) {
    const recall = globalFDAData.recalls.find(r => r.recall_number === recallNumber);
    if (!recall) return;

    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalTitle.textContent = `Recall Details: ${recallNumber}`;
    
    modalContent.innerHTML = `
        <div class="space-y-6">
            <!-- Status Banner -->
            <div class="bg-${getRecallStatusColor(recall.status)} p-4 rounded-lg">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm font-medium">Current Status</p>
                        <p class="text-lg font-semibold">${recall.status}</p>
                    </div>
                    <span class="px-3 py-1 text-sm rounded-full bg-white bg-opacity-20">
                        ${recall.classification}
                    </span>
                </div>
            </div>

            <!-- Product Information -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('recall-product-${recallNumber}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Product Information</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="recall-product-${recallNumber}" class="hidden p-4 bg-gray-50">
                    <div class="bg-white p-4 rounded-lg">
                        <p class="font-medium mb-2">Description</p>
                        <p class="text-gray-700">${recall.product_description}</p>
                        <div class="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Product Quantity</p>
                                <p class="font-medium">${recall.product_quantity}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Product Type</p>
                                <p class="font-medium">${recall.product_type}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Code Info</p>
                                <p class="font-medium">${recall.code_info || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recall Details -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('recall-details-${recallNumber}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Recall Details</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="recall-details-${recallNumber}" class="hidden p-4 bg-gray-50">
                    <div class="bg-white p-4 rounded-lg">
                        <div class="mb-4">
                            <p class="font-medium mb-2">Reason for Recall</p>
                            <p class="text-gray-700">${recall.reason_for_recall}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Recall Initiation Date</p>
                                <p class="font-medium">${formatDate(recall.recall_initiation_date)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Report Date</p>
                                <p class="font-medium">${formatDate(recall.report_date)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Center Classification Date</p>
                                <p class="font-medium">${formatDate(recall.center_classification_date)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Termination Date</p>
                                <p class="font-medium">${formatDate(recall.termination_date)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Distribution Information -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('recall-distribution-${recallNumber}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Distribution Information</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="recall-distribution-${recallNumber}" class="hidden p-4 bg-gray-50">
                    <div class="bg-white p-4 rounded-lg">
                        <p class="font-medium mb-2">Distribution Pattern</p>
                        <p class="text-gray-700">${recall.distribution_pattern}</p>
                        <div class="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Initial Firm Notification</p>
                                <p class="font-medium">${recall.initial_firm_notification}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Recalling Firm</p>
                                <p class="font-medium">${recall.recalling_firm}</p>
                            </div>
                            <div class="col-span-2">
                                <p class="text-sm text-gray-600">Address</p>
                                <p class="font-medium">
                                    ${recall.address_1}
                                    ${recall.address_2 ? `, ${recall.address_2}` : ''}
                                    <br/>
                                    ${recall.city}, ${recall.state} ${recall.postal_code}
                                    <br/>
                                    ${recall.country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Helper function for recall status colors
function getRecallStatusColor(status) {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('ongoing')) return 'yellow-100';
    if (statusLower.includes('terminated')) return 'gray-100';
    if (statusLower.includes('completed')) return 'green-100';
    return 'blue-100';
}


// Continue UDI Details Modal
function showUDIDetails(recordKey) {
    const device = globalFDAData.udi.find(d => d.public_device_record_key === recordKey);
    if (!device) return;

    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalTitle.textContent = `UDI Device: ${device.brand_name}`;
    
    modalContent.innerHTML = `
        <div class="space-y-6">
            <!-- Previous sections remain the same -->

            <!-- Device Usage -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('udi-usage-${recordKey}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Device Usage Information</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="udi-usage-${recordKey}" class="hidden p-4 bg-gray-50">
                    <div class="bg-white p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Single Use</p>
                                <p class="font-medium">${device.is_single_use === 'true' ? 'Yes' : 'No'}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Prescription Use</p>
                                <p class="font-medium">${device.is_rx === 'true' ? 'Rx Only' : 'OTC'}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Combination Product</p>
                                <p class="font-medium">${device.is_combination_product === 'true' ? 'Yes' : 'No'}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Direct Marking Exempt</p>
                                <p class="font-medium">${device.is_direct_marking_exempt === 'true' ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Device Numbers -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('udi-numbers-${recordKey}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Device Identifiers</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="udi-numbers-${recordKey}" class="hidden p-4 bg-gray-50">
                    <div class="bg-white p-4 rounded-lg">
                        ${device.identifiers?.map(identifier => `
                            <div class="mb-4 p-3 border rounded">
                                <p class="text-sm text-gray-600">ID Type: ${identifier.issuing_agency}</p>
                                <p class="font-medium break-all">${identifier.id}</p>
                            </div>
                        `).join('') || 'No identifier information available'}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// 510(k) Details Modal
function show510kDetails(kNumber) {
    const submission = globalFDAData.d501k.find(s => s.k_number === kNumber);
    if (!submission) return;

    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalTitle.textContent = `510(k) Submission: ${kNumber}`;
    
    modalContent.innerHTML = `
        <div class="space-y-6">
            <!-- Status Banner -->
            <div class="bg-${get510kStatusColor(submission.decision_code)} p-4 rounded-lg">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm font-medium">Decision</p>
                        <p class="text-lg font-semibold">${submission.decision_description}</p>
                    </div>
                    <span class="px-3 py-1 text-sm rounded-full bg-white bg-opacity-20">
                        ${submission.clearance_type}
                    </span>
                </div>
            </div>

            <!-- Device Information -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('510k-device-${kNumber}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Device Information</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="510k-device-${kNumber}" class="hidden p-4 bg-gray-50">
                    <div class="bg-white p-4 rounded-lg">
                        <p class="font-medium mb-2">Device Name</p>
                        <p class="text-gray-700 mb-4">${submission.device_name}</p>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Product Code</p>
                                <p class="font-medium">${submission.product_code}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Medical Specialty</p>
                                <p class="font-medium">${submission.advisory_committee_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submission Details -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('510k-submission-${kNumber}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Submission Details</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="510k-submission-${kNumber}" class="hidden p-4 bg-gray-50">
                    <div class="bg-white p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Date Received</p>
                                <p class="font-medium">${formatDate(submission.date_received)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Decision Date</p>
                                <p class="font-medium">${formatDate(submission.decision_date)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Statement Type</p>
                                <p class="font-medium">${submission.statement_or_summary}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Third Party Review</p>
                                <p class="font-medium">${submission.third_party_flag === 'Y' ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div class="border rounded-lg overflow-hidden">
                <button onclick="toggleSection('510k-contact-${kNumber}')" 
                        class="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors">
                    <h4 class="font-semibold">Contact Information</h4>
                    <svg class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="510k-contact-${kNumber}" class="hidden p-4 bg-gray-50">
                    <div class="bg-white p-4 rounded-lg">
                        <div class="mb-4">
                            <p class="text-sm text-gray-600">Applicant</p>
                            <p class="font-medium">${submission.applicant}</p>
                        </div>
                        <div class="mb-4">
                            <p class="text-sm text-gray-600">Contact Person</p>
                            <p class="font-medium">${submission.contact || 'Not Available'}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Address</p>
                            <p class="font-medium">
                                ${submission.address_1}
                                ${submission.address_2 ? `<br>${submission.address_2}` : ''}
                                <br>${submission.city}, ${submission.state} ${submission.postal_code}
                                <br>${submission.country_code}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}
// Add helper function for submission status styling
function getSubmissionStatusClass(status) {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes('ap')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('pend')) return 'bg-yellow-100 text-yellow-800';
    if (statusLower.includes('withdr')) return 'bg-red-100 text-red-800';
    return 'bg-blue-100 text-blue-800';
}

// Helper functions for status colors
function getUDIStatusColor(status) {
    if (status.includes('Commercial Distribution')) return 'green-100';
    return 'gray-100';
}

function get510kStatusColor(decision) {
    switch (decision) {
        case 'SESE': return 'green-100';
        case 'NSEQ': return 'red-100';
        default: return 'yellow-100';
    }
}


// Initialize loading states
function showLoadingState() {
    const tables = document.querySelectorAll('tbody');
    tables.forEach(table => {
        table.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4">
                    <div class="animate-pulse space-y-4">
                        ${Array(5).fill().map(() => `
                            <div class="h-12 bg-gray-200 rounded"></div>
                        `).join('')}
                    </div>
                </td>
            </tr>
        `;
    });
}

// Hide loading state
function hideLoadingState() {
    const skeletons = document.querySelectorAll('[id$="-skeleton"]');
    skeletons.forEach(skeleton => skeleton.classList.add('hidden'));
}

function showErrorState(error) {
    const elements = ['totalDrugApps', 'activeRecalls', 'totalUDI', 'total510k'];
    elements.forEach(id => {
        document.getElementById(id).textContent = '0';
    });

    // Show error message in tables
    const tables = document.querySelectorAll('tbody');
    tables.forEach(table => {
        table.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center text-red-500">
                    Error loading FDA data: ${error.message}
                </td>
            </tr>
        `;
    });
}

export {
    renderFDADashboard as default,
    showDrugDetails,
    showRecallDetails,
    showUDIDetails,
    show510kDetails
};

// Make functions globally available
Object.assign(window, {
    showDrugDetails,
    showRecallDetails,
    showUDIDetails,
    show510kDetails,
    formatDate,
    getUDIStatusColor,
    get510kStatusColor
});