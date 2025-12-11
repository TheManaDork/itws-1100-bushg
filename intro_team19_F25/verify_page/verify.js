// Verify page JavaScript - verification and upload logic

// Admin credentials (hardcoded for demonstration)
const ADMIN_CREDENTIALS = [
    { email: 'admin@petnet.com', password: 'admin123' },
    { email: 'moderator@petnet.com', password: 'mod456' }
];

// Storage for user accounts (in production, this would be a database)
const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];

$(document).ready(function() {
    // Tab switching functionality
    $('.tab-btn').on('click', function() {
        const tabId = $(this).data('tab');
        
        // Remove active class from all buttons and contents
        $('.tab-btn').removeClass('active');
        $('.tab-content').removeClass('active');
        
        // Add active class to clicked button and corresponding content
        $(this).addClass('active');
        $('#' + tabId).addClass('active');
    });

    // User login form submission
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        handleUserLogin();
    });

    // Verification form submission
    $('#verification-form').on('submit', function(e) {
        e.preventDefault();
        handleVerification();
    });

    // Admin login form submission
    $('#admin-login-form').on('submit', function(e) {
        e.preventDefault();
        handleAdminLogin();
    });

    // Pet upload form submission
    $('#pet-upload-form').on('submit', function(e) {
        e.preventDefault();
        handlePetUpload();
    });

    // Reset button
    $(document).on('click', '#reset-btn', function() {
        resetForm();
    });
});

// User Login Handler
function handleUserLogin() {
    const email = $('#login-email').val().trim();
    const password = $('#login-password').val();

    // Validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Check if user exists and password matches
    const user = userAccounts.find(u => u.email === email);
    
    if (!user) {
        showAlert('Account not found. Please verify your account first.', 'error');
        return;
    }

    if (user.password !== password) {
        showAlert('Incorrect password. Please try again.', 'error');
        return;
    }

    // Successful login
    showAlert(`Welcome back, ${user.name}!`, 'success');
    
    // Store current user in session
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
    // Hide login tab and show upload section
    setTimeout(() => {
        $('#login-tab').removeClass('active');
        $('#upload-section').removeClass('hidden');
        scrollToElement('#upload-section');
    }, 1500);
}

// Verification Handler
function handleVerification() {
    const verificationType = $('#verification-type').val();
    const organizationName = $('#organization-name').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const confirmPassword = $('#confirm-password').val();
    const documentation = $('#documentation')[0].files[0];
    const description = $('#description').val().trim();

    // Validation
    if (!verificationType || !organizationName || !email || !password || !confirmPassword || !documentation) {
        showAlert('Please fill in all required fields', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match. Please try again.', 'error');
        return;
    }

    // Check if email already exists
    if (userAccounts.some(u => u.email === email)) {
        showAlert('An account with this email already exists.', 'error');
        return;
    }

    // Validate file size (max 5MB)
    if (documentation.size > 5 * 1024 * 1024) {
        showAlert('File size exceeds 5MB limit.', 'error');
        return;
    }

    // Create new user account
    const newUser = {
        id: Date.now(),
        type: verificationType,
        name: organizationName,
        email: email,
        password: password,
        documentationName: documentation.name,
        description: description,
        verifiedDate: new Date().toISOString(),
        status: 'pending'
    };

    // Save to localStorage
    userAccounts.push(newUser);
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts));

    // Store current user in session
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));

    // Show success message
    showAlert('Verification submitted successfully! Your account is pending review.', 'success');

    // Clear form and show upload section
    setTimeout(() => {
        $('#verification-form')[0].reset();
        $('#verify-tab').removeClass('active');
        $('#upload-section').removeClass('hidden');
        scrollToElement('#upload-section');
    }, 1500);
}

// Admin Login Handler
function handleAdminLogin() {
    const email = $('#admin-email').val().trim();
    const password = $('#admin-password').val();

    // Validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Check credentials against hardcoded admin list
    const adminUser = ADMIN_CREDENTIALS.find(admin => 
        admin.email === email && admin.password === password
    );

    if (!adminUser) {
        showAlert('Invalid admin credentials. Access denied.', 'error');
        return;
    }

    // Successful admin login
    showAlert('Admin login successful!', 'success');

    // Store admin user in session
    sessionStorage.setItem('currentUser', JSON.stringify({
        email: adminUser.email,
        isAdmin: true,
        loginTime: new Date().toISOString()
    }));

    // Redirect or show admin panel (you can implement this later)
    setTimeout(() => {
        showAdminPanel();
    }, 1500);
}

// Pet Upload Handler
function handlePetUpload() {
    const petName = $('#pet-name').val().trim();
    const species = $('#pet-species').val();
    const breed = $('#pet-breed').val().trim();
    const age = $('#pet-age').val();
    const notes = $('#pet-notes').val().trim();
    const photo = $('#pet-photo')[0].files[0];

    // Validation
    if (!petName || !species || !breed || !age) {
        showAlert('Please fill in all required pet information', 'error');
        return;
    }

    if (!photo) {
        showAlert('Please upload a pet photo', 'error');
        return;
    }

    if (photo.size > 5 * 1024 * 1024) {
        showAlert('Photo size exceeds 5MB limit.', 'error');
        return;
    }

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        showAlert('You must be logged in to upload a pet.', 'error');
        return;
    }

    // Create pet object
    const newPet = {
        id: Date.now(),
        uploaderId: currentUser.id || currentUser.email,
        uploaderName: currentUser.name || currentUser.email,
        name: petName,
        species: species,
        breed: breed,
        age: parseFloat(age),
        notes: notes,
        photoName: photo.name,
        uploadDate: new Date().toISOString()
    };

    // Store pet in localStorage
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    pets.push(newPet);
    localStorage.setItem('pets', JSON.stringify(pets));

    // Show success message
    showAlert(`${petName} has been uploaded successfully!`, 'success');

    // Clear form
    setTimeout(() => {
        $('#pet-upload-form')[0].reset();
    }, 1500);
}

// Show Admin Panel (placeholder)
function showAdminPanel() {
    // Redirect to admin page
    window.location.href = '../admin_page/index.html';
}

// Show Alert Message
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

// Scroll to element
function scrollToElement(selector) {
    $(selector).scrollIntoView({ behavior: 'smooth' });
}

// Reset form
function resetForm() {
    $('#login-form')[0].reset();
    $('#verification-form')[0].reset();
    $('#admin-login-form')[0].reset();
    $('#pet-upload-form')[0].reset();
    
    // Show login tab
    $('.tab-btn').removeClass('active');
    $('.tab-content').removeClass('active');
    $('.tab-btn').first().addClass('active');
    $('#login-tab').addClass('active');
}
