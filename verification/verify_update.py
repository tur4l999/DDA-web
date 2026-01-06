from playwright.sync_api import sync_playwright

def verify_code_and_search():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()
        page.goto("http://localhost:5173")
        page.wait_for_timeout(2000)
        page.click("button:has-text('Onlayn Dərslər')")
        page.wait_for_timeout(1000)

        # 1. Check Search Input Existence
        search_input = page.is_visible("input[placeholder='Dərs axtar (ad və ya kod)...']")
        print(f"Search input visible: {search_input}")

        # 2. Check Code Badge Existence
        # Look for the Hash icon or the code pattern
        # Since codes are random, we look for visual structure or class
        # But we added Hash icon.
        # Actually, let's just look for any element containing '#' text if we rendered it?
        # Code: <Hash /> <span>{lesson.code}</span>
        # It's rendered as text content.
        # Let's take a screenshot to verify "Neatness".
        page.screenshot(path="verification/code_search_check.png")
        print("Screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_code_and_search()
