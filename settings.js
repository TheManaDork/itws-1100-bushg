// Settings and Theme Management

$(document).ready(function() {
    // Initialize theme from localStorage
    initializeTheme();
    
    // Add settings button to header
    addSettingsButton();
    
    // Handle settings modal
    setupSettingsModal();
});

// Initialize theme based on saved preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark-mode');
    }
}

// Add settings button to the header navigation
function addSettingsButton() {
    // Find the main navigation list
    const navList = $('.main-nav ul');
    
    // Create settings button element
    const settingsBtn = `
        <li class="settings-btn-container">
            <button class="theme-toggle-btn" id="settings-btn" title="Settings">
                ⚙️
            </button>
        </li>
    `;
    
    // Append settings button to nav list
    navList.append(settingsBtn);
    
    // Add click handler
    $(document).on('click', '#settings-btn', function(e) {
        e.preventDefault();
        openSettingsModal();
    });
}

// Setup settings modal functionality
function setupSettingsModal() {
    // Create settings modal HTML
    const settingsModal = `
        <div id="settings-modal" class="settings-modal">
            <div class="settings-content">
                <span class="settings-close">&times;</span>
                <h2>Settings</h2>
                
                <div class="settings-option">
                    <label class="settings-label">
                        <span>Dark Mode</span>
                        <button class="toggle-switch" id="dark-mode-toggle"></button>
                    </label>
                </div>
            </div>
        </div>
    `;
    
    // Append modal to body
    $('body').append(settingsModal);
    
    // Update toggle switch state
    updateToggleSwitchState();
    
    // Dark mode toggle handler
    $(document).on('click', '#dark-mode-toggle', function() {
        toggleDarkMode();
    });
    
    // Close modal when clicking X
    $(document).on('click', '.settings-close', function() {
        closeSettingsModal();
    });
    
    // Close modal when clicking outside
    $(document).on('click', '#settings-modal', function(e) {
        if (e.target.id === 'settings-modal') {
            closeSettingsModal();
        }
    });
}

// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Also toggle on documentElement for consistency
    document.documentElement.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Update toggle switch state
    updateToggleSwitchState();
}

// Update toggle switch visual state
function updateToggleSwitchState() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const toggle = $('#dark-mode-toggle');
    
    if (isDarkMode) {
        toggle.addClass('active');
    } else {
        toggle.removeClass('active');
    }
}

// Open settings modal
function openSettingsModal() {
    $('#settings-modal').addClass('active');
}

// Close settings modal
function closeSettingsModal() {
    $('#settings-modal').removeClass('active');
}
