from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 800})

    # 1. Go to Dashboard
    print("Navigating to Dashboard...")
    page.goto("http://localhost:5173/DDA-web/")

    # Wait for Dashboard to load
    try:
        page.get_by_text("Salam, Tural!").wait_for(timeout=5000)
    except:
        page.goto("http://localhost:5173/")
        page.get_by_text("Salam, Tural!").wait_for()

    # 2. Navigate to Results Page
    print("Clicking 'Hamısına bax'...")
    page.get_by_role("button", name="Hamısına bax").click()

    # 3. Verify List View
    print("Verifying List View...")
    heading = page.get_by_role("heading", name="Nəticələrim")
    expect(heading).to_be_visible()

    # Check for Tabs - Scoping to main content to avoid Sidebar conflict
    # The main content usually has a specific structure, but we can just pick the one that looks like a tab
    # or just assert one of them is visible.

    # Let's target the Tab specifically. It has class 'rounded-full'
    tab = page.locator("button.rounded-full", has_text="SINAQ DYP İMTAHANI")
    expect(tab).to_be_visible()

    # Take Screenshot of List
    page.screenshot(path="verification/results_list.png")
    print("List View screenshot saved.")

    # 4. Navigate to Detail View
    print("Clicking first result...")
    # Click the first card. The card also contains "SINAQ DYP İMTAHANI" text.
    # We want to click the RESULT CARD, not the tab.
    # The result card has class 'cursor-pointer' and 'group'.
    # Let's find the card by text inside it.
    result_card = page.locator(".cursor-pointer").filter(has_text="SINAQ DYP İMTAHANI").first
    result_card.click()

    # 5. Verify Detail View
    print("Verifying Detail View...")
    expect(page.get_by_text("Sual #1.")).to_be_visible()

    # Take Screenshot of Detail
    page.screenshot(path="verification/results_detail.png")
    print("Detail View screenshot saved.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
