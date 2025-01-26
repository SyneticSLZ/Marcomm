// Mock data - replace with your actual data source
let companies = [
    { id: 1, name: '3M', industry: 'Manufacturing' },
    { id: 2, name: 'Apple', industry: 'Technology' },
    { id: 3, name: 'Boeing', industry: 'Aerospace' }
];

// State management
let editingId = null;

// DOM Elements
const searchInput = document.getElementById('search-input');
const industryFilter = document.getElementById('industry-filter');
const addCompanyBtn = document.getElementById('add-company-btn');
const companyModal = document.getElementById('company-modal');
const viewModal = document.getElementById('view-modal');
const companyForm = document.getElementById('company-form');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelBtn = document.getElementById('cancel-btn');
const closeViewModalBtn = document.getElementById('close-view-modal-btn');
const closeViewBtn = document.getElementById('close-view-btn');

// Initialize the application
function init() {
    updateIndustryFilter();
    renderCompanies();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', renderCompanies);
    industryFilter.addEventListener('change', renderCompanies);
    addCompanyBtn.addEventListener('click', () => showModal());
    companyForm.addEventListener('submit', handleFormSubmit);
    closeModalBtn.addEventListener('click', hideModal);
    cancelBtn.addEventListener('click', hideModal);
    closeViewModalBtn.addEventListener('click', hideViewModal);
    closeViewBtn.addEventListener('click', hideViewModal);
}

// Update industry filter options
function updateIndustryFilter() {
    const industries = [...new Set(companies.map(company => company.industry))];
    industryFilter.innerHTML = '<option value="">All Industries</option>' +
        industries.map(industry => `<option value="${industry}">${industry}</option>`).join('');
}

// Render companies table
function renderCompanies() {
    const searchTerm = searchInput.value.toLowerCase();
    const industryValue = industryFilter.value;
    
    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm) ||
                            company.industry.toLowerCase().includes(searchTerm);
        const matchesIndustry = !industryValue || company.industry === industryValue;
        return matchesSearch && matchesIndustry;
    });

    const tbody = document.getElementById('companies-table-body');
    tbody.innerHTML = filteredCompanies.map(company => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${company.name}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${company.industry}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button 
                    onclick="viewCompany(${company.id})"
                    class="text-blue-600 hover:text-blue-900"
                >
                    View
                </button>
                <button 
                    onclick="editCompany(${company.id})"
                    class="text-indigo-600 hover:text-indigo-900"
                >
                    Edit
                </button>
                <button 
                    onclick="deleteCompany(${company.id})"
                    class="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Show modal for add/edit
function showModal(company = null) {
    const modalTitle = document.getElementById('modal-title');
    const nameInput = document.getElementById('company-name');
    const industryInput = document.getElementById('company-industry');

    modalTitle.textContent = company ? 'Edit Company' : 'Add Company';
    nameInput.value = company ? company.name : '';
    industryInput.value = company ? company.industry : '';
    editingId = company ? company.id : null;

    companyModal.classList.remove('hidden');
}

// Hide modal
function hideModal() {
    companyModal.classList.add('hidden');
    companyForm.reset();
    editingId = null;
}

// Handle form submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('company-name');
    const industryInput = document.getElementById('company-industry');
    
    const companyData = {
        name: nameInput.value.trim(),
        industry: industryInput.value.trim()
    };

    if (editingId) {
        // Update existing company
        companies = companies.map(company => 
            company.id === editingId ? { ...company, ...companyData } : company
        );
    } else {
        // Add new company
        companies.push({
            id: companies.length + 1,
            ...companyData
        });
    }

    hideModal();
    updateIndustryFilter();
    renderCompanies();
}

// View company details
function viewCompany(id) {
    const company = companies.find(c => c.id === id);
    if (!company) return;

    document.getElementById('view-modal-title').textContent = company.name;
    document.getElementById('company-details').innerHTML = `
        <div class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-500">Company Name</p>
                    <p class="text-lg font-medium">${company.name}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Industry</p>
                    <p class="text-lg font-medium">${company.industry}</p>
                </div>
            </div>
        </div>
    `;

    viewModal.classList.remove('hidden');
}

// Hide view modal
function hideViewModal() {
    viewModal.classList.add('hidden');
}

// Edit company
function editCompany(id) {
    const company = companies.find(c => c.id === id);
    if (company) {
        showModal(company);
    }
}

// Delete company
function deleteCompany(id) {
    if (confirm('Are you sure you want to delete this company?')) {
        companies = companies.filter(company => company.id !== id);
        updateIndustryFilter();
        renderCompanies();
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);