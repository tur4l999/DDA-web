
from playwright.sync_api import sync_playwright

def verify_penalties(page):
    page.goto('http://localhost:5174')

    # Wait for dashboard and navigation
    page.wait_for_selector('text=Mövzular', timeout=10000)

    # Click on Topics (Mövzular)
    page.click('text=Mövzular')

    # Wait for Topics content
    page.wait_for_timeout(1000)

    # Click on Penalties tab if exists or navigate to it
    # Assuming the Penalties component is one of the tabs or a sub-section
    # Based on file name 'PenaltiesContent', it might be rendered under a tab.
    # I'll look for 'Cərimələr' text which is likely the tab name or header.

    # Try to find 'Cərimələr' button or tab
    page.click('text=Mövzu üzrə Cərimələr') # Memory says: In the Topics section, the Penalties tab is explicitly labeled 'Mövzu üzrə Cərimələr'

    page.wait_for_timeout(1000)

    # Take screenshot
    page.screenshot(path='verification/penalties_fix.png', full_page=True)
    print('Screenshot taken')

if __name__ == '__main__':
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_penalties(page)
        browser.close()
