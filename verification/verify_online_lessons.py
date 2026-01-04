from playwright.sync_api import sync_playwright

def verify_online_lessons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the dashboard
        page.goto("http://localhost:5173")

        # Wait for dashboard to load
        page.wait_for_selector("text=Salam, Tural!", timeout=10000)

        # Click on "Onlayn Dərslər" quick action
        # The quick action is in the main content area, likely one of the cards in the grid.
        # We can try to be more specific or use the text with `exact=True` if possible,
        # but the error says there are multiple elements.
        # One is in Sidebar (likely), one is Quick Action, one is Card title.

        # Let's target the Quick Action specifically. It is a button with text "Onlayn Dərslər".
        # The error log shows: <span class="font-semibold text-gray-900 text-sm tracking-tight">Onlayn Dərslər</span> aka get_by_role("button", name="Onlayn Dərslər", exact=True)
        # We can try to click the second one, or use a more specific selector.

        # Let's try finding the button that contains this text in the 'Bölmələr' section.
        # Or simpler: use `page.get_by_role("button", name="Onlayn Dərslər").first.click()` might click sidebar.
        # We want the one in the dashboard grid.

        # Dashboard grid buttons have class "group flex flex-col items-center..."
        # But Playwright locators are better.

        buttons = page.get_by_role("button", name="Onlayn Dərslər").all()
        # Click the second one (likely the main dashboard one) or iterate.
        # Actually, clicking any of them should lead to the page if the navigation logic is consistent.
        # Let's try the second one (index 1) which seemed to be the Quick Action card in the logs.
        if len(buttons) >= 2:
            buttons[1].click()
        else:
            # Fallback
            page.get_by_text("Onlayn Dərslər").first.click()

        # Wait for the new content to appear
        # Headline: "Video Dərslər Artıq Telegramda!"
        page.wait_for_selector("text=Video Dərslər", timeout=5000)

        # Take screenshot
        page.screenshot(path="verification/online_lessons.png")

        browser.close()

if __name__ == "__main__":
    verify_online_lessons()
