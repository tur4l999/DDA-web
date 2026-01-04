
from playwright.sync_api import sync_playwright

def verify_questions_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Adjust viewport to a large desktop size to see the split view well
        page.set_viewport_size({"width": 1440, "height": 900})

        print("Navigating to app...")
        page.goto("http://localhost:5174/")

        # Wait for "Suallar" tab and click it
        print("Clicking 'Suallar' tab...")
        try:
            page.get_by_text("Suallar").click()
        except:
            # Fallback if text search fails (maybe icon or other means)
            print("Could not find 'Suallar' by text, looking for button...")
            page.locator("button", has_text="Suallar").click()

        # Wait for content to load
        # Look for the question number "1" or the timer icon
        print("Waiting for questions content...")
        page.wait_for_selector("text=1") # Question number in pagination or header

        # Wait a bit for images/styles
        page.wait_for_timeout(1000)

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification_questions.png", full_page=True)

        browser.close()
        print("Done.")

if __name__ == "__main__":
    verify_questions_ui()
