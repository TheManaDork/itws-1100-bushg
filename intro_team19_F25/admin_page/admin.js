// Admin page JavaScript - admin dashboard functionality

$(document).ready(function() {
    // Check if user is admin
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
        // Redirect to verify page if not admin
        window.location.href = '../verify_page/index.html';
        return;
    }

    // Display admin email
    $('#admin-email').text('Logged in as: ' + currentUser.email);

    // Add warning for navigation away from admin page
    addNavigationWarning();

    // Tab switching functionality
    $('.admin-tab-btn').on('click', function() {
        const tabId = $(this).data('tab');
        
        // Remove active class from all buttons and contents
        $('.admin-tab-btn').removeClass('active');
        $('.admin-tab-content').removeClass('active');
        
        // Add active class to clicked button and corresponding content
        $(this).addClass('active');
        $('#' + tabId).addClass('active');
        
        // Load accounts for the selected tab
        loadAccounts(tabId.replace('-tab', ''));
    });

    // Logout button
    $('#logout-btn').on('click', function() {
        handleLogout();
    });

    // Close modal button
    $('.close-btn').on('click', function() {
        closeModal();
    });

    // Close modal when clicking outside
    $(window).on('click', function(event) {
        if (event.target.id === 'detail-modal') {
            closeModal();
        }
    });

    // Load initial pending verifications
    loadAccounts('pending');
});

// Load accounts by status
function loadAccounts(status) {
    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
    const listId = status + '-list';
    const $list = $('#' + listId);
    
    // Filter accounts by status
    let filteredAccounts = [];
    if (status === 'pending') {
        filteredAccounts = userAccounts.filter(u => u.status === 'pending');
    } else if (status === 'verified') {
        filteredAccounts = userAccounts.filter(u => u.status === 'verified');
    } else if (status === 'rejected') {
        filteredAccounts = userAccounts.filter(u => u.status === 'rejected');
    }

    // Clear the list
    $list.empty();

    // Display empty state if no accounts
    if (filteredAccounts.length === 0) {
        $list.html('<div class="empty-state"><p>No ' + status + ' accounts</p></div>');
        return;
    }

    // Display accounts
    filteredAccounts.forEach(account => {
        const accountCard = createAccountCard(account);
        $list.append(accountCard);
    });
}

// Create account card HTML
function createAccountCard(account) {
    const formattedDate = new Date(account.verifiedDate).toLocaleDateString();
    const accountType = account.type === 'shelter' ? 'Pet Shelter' : 'Individual Owner';
    
    let actionsHtml = '';
    if (account.status === 'pending') {
        actionsHtml = `
            <div class="account-actions">
                <button class="btn-small btn-view" onclick="viewAccount('${account.id}')">View Details</button>
                <button class="btn-small btn-approve" onclick="approveAccount('${account.id}')">Approve</button>
                <button class="btn-small btn-reject" onclick="rejectAccount('${account.id}')">Reject</button>
            </div>
        `;
    } else {
        actionsHtml = `
            <div class="account-actions">
                <button class="btn-small btn-view" onclick="viewAccount('${account.id}')">View Details</button>
            </div>
        `;
    }

    return `
        <div class="account-card">
            <div class="account-info">
                <p class="account-name">${account.name}</p>
                <p class="account-email">${account.email}</p>
                <span class="account-type">${accountType}</span>
                <p class="account-date">Submitted: ${formattedDate}</p>
            </div>
            ${actionsHtml}
        </div>
    `;
}

// View account details
function viewAccount(accountId) {
    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
    const account = userAccounts.find(u => u.id == accountId);
    
    if (!account) {
        alert('Account not found');
        return;
    }

    const accountType = account.type === 'shelter' ? 'Pet Shelter' : 'Individual Owner';
    const formattedDate = new Date(account.verifiedDate).toLocaleDateString();
    const statusBadge = `<span class="account-type">${account.status.toUpperCase()}</span>`;

    const detailHtml = `
        <div class="detail-row">
            <div class="detail-label">Name/Organization</div>
            <div class="detail-value">${account.name}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Email</div>
            <div class="detail-value">${account.email}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Type</div>
            <div class="detail-value">${accountType}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Documentation</div>
            <div class="detail-value">${account.documentationName}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Additional Information</div>
            <div class="detail-value">${account.description || 'None provided'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Submission Date</div>
            <div class="detail-value">${formattedDate}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Status</div>
            <div class="detail-value">${statusBadge}</div>
        </div>
    `;

    $('#account-detail-container').html(detailHtml);

    // Set up action buttons
    let actionButtonsHtml = '';
    if (account.status === 'pending') {
        actionButtonsHtml = `
            <button class="btn btn-primary" onclick="approveAccount('${account.id}')">Approve</button>
            <button class="btn btn-secondary" onclick="rejectAccount('${account.id}')">Reject</button>
        `;
    }
    actionButtonsHtml += `<button class="btn btn-secondary" onclick="closeModal()">Close</button>`;
    
    $('#action-buttons').html(actionButtonsHtml);

    // Show modal
    openModal();
}

// Approve account
function approveAccount(accountId) {
    if (!confirm('Are you sure you want to approve this account?')) {
        return;
    }

    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
    const accountIndex = userAccounts.findIndex(u => u.id == accountId);
    
    if (accountIndex === -1) {
        alert('Account not found');
        return;
    }

    userAccounts[accountIndex].status = 'verified';
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts));

    showAlert('Account approved successfully!', 'success');
    closeModal();
    
    // Reload pending accounts
    setTimeout(() => {
        loadAccounts('pending');
    }, 500);
}

// Reject account
function rejectAccount(accountId) {
    const reason = prompt('Please provide a reason for rejection:');
    
    if (reason === null) {
        return; // User cancelled
    }

    if (!reason.trim()) {
        alert('Please provide a reason for rejection');
        return;
    }

    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
    const accountIndex = userAccounts.findIndex(u => u.id == accountId);
    
    if (accountIndex === -1) {
        alert('Account not found');
        return;
    }

    userAccounts[accountIndex].status = 'rejected';
    userAccounts[accountIndex].rejectionReason = reason;
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts));

    showAlert('Account rejected successfully!', 'success');
    closeModal();
    
    // Reload pending accounts
    setTimeout(() => {
        loadAccounts('pending');
    }, 500);
}

// Open modal
function openModal() {
    $('#detail-modal').addClass('active');
}

// Close modal
function closeModal() {
    $('#detail-modal').removeClass('active');
}

// Show alert message
function showAlert(message, type) {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    const alertHtml = `<div class="alert ${alertClass}">${message}</div>`;
    
    // Remove existing alerts
    $('.alert').remove();
    
    // Prepend alert to main content
    $('.main-content').prepend(alertHtml);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        $('.alert').fadeOut(function() {
            $(this).remove();
        });
    }, 5000);
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = '../verify_page/index.html';
    }
}

// Add warning for navigation away from admin page
function addNavigationWarning() {
    // Add click event to all navigation links
    $('.main-nav a').on('click', function(e) {
        // Don't prevent the logout button action
        if ($(this).attr('href') === '../verify_page/index.html' && 
            $(this).parent().parent().parent().find('#logout-btn').length === 0) {
            e.preventDefault();
            
            const message = 'Warning: You are logged in as an Admin. If you leave this page, you will need to re-login as an admin or moderator to access the Admin Panel again.\n\nDo you want to continue?';
            
            if (confirm(message)) {
                // Logout and remove admin session
                sessionStorage.removeItem('currentUser');
                window.location.href = $(this).attr('href');
            }
        }
    });

    // Handle back button navigation
    window.addEventListener('beforeunload', function(e) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        // Only show warning if still on admin page and logged in as admin
        if (currentUser && currentUser.isAdmin) {
            // This is for page refresh or browser back button
            const message = 'Warning: You are logged in as an Admin. If you leave this page, you will need to re-login as an admin or moderator to access the Admin Panel again.';
            e.preventDefault();
            e.returnValue = message;
            return message;
        }
    });
}
