/**
 * Handles responsive advertisement placement
 * Moves sidebar ad to pagination area on mobile screens
 */
(function() {
  // Configuration
  const MOBILE_BREAKPOINT = 768;
  
  // DOM Elements
  let sidebarAdSection = null;
  let paginationNav = null;
  let currentPlacement = 'sidebar'; // Track current ad placement
  
  /**
   * Moves the ad section based on screen width
   */
  function handleAdPlacement() {
    if (!sidebarAdSection || !paginationNav) return;
    
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    
    // Only move if placement needs to change
    if (isMobile && currentPlacement === 'sidebar') {
      // Move to pagination
      paginationNav.insertBefore(sidebarAdSection, paginationNav.firstChild);
      currentPlacement = 'pagination';
    } else if (!isMobile && currentPlacement === 'pagination') {
      // Move back to sidebar
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.appendChild(sidebarAdSection);
        currentPlacement = 'sidebar';
      }
    }
  }
  
  /**
   * Initialize the responsive ad functionality
   */
  function init() {
    sidebarAdSection = document.querySelector('.sidebar-ad-section');
    paginationNav = document.querySelector('.pagination');
    
    if (!sidebarAdSection || !paginationNav) return;
    
    // Handle initial placement
    handleAdPlacement();
    
    // Listen for window resize
    window.addEventListener('resize', debounce(handleAdPlacement, 250));
  }
  
  /**
   * Debounce function to limit the rate at which handleAdPlacement runs
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 