const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
    }
    
    if (e.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;
        }
    }
    
    if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        }
    }
    
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}


function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");
    
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
        
    targetTab.setAttribute("aria-selected", true);
    
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
    
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
     parent.querySelector(content).removeAttribute('hidden');
}

const tabButtons = document.querySelectorAll('[role="tab"]');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabContainer = button.parentElement;
    const mainContainer = tabContainer.parentElement;

    const tabPanels = mainContainer.querySelectorAll('[role="tabpanel"]');
    const imageId = button.getAttribute('data-image');
    const imageElements = mainContainer.querySelectorAll('picture');

    // Deselect all tabs
    tabContainer
      .querySelectorAll('[role="tab"]')
      .forEach(tab => {
        tab.setAttribute('aria-selected', false);
        tab.setAttribute('tabindex', '-1');
      });

    // Hide all tab panels
    tabPanels.forEach(panel => panel.hidden = true);

    // Hide all images
    imageElements.forEach(img => img.hidden = true);

    // Activate clicked tab
    button.setAttribute('aria-selected', true);
    button.setAttribute('tabindex', '0');

    // Show related content
    const tabPanelId = button.getAttribute('aria-controls');
    const tabPanel = mainContainer.querySelector(`#${tabPanelId}`);
    tabPanel.hidden = false;

    const image = mainContainer.querySelector(`#${imageId}`);
    if (image) {
      image.hidden = false;
    }
  });
});
