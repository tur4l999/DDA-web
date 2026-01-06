from playwright.sync_api import sync_playwright

def verify_debug():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        try:
            page.goto("http://localhost:5173", timeout=60000)
            page.wait_for_timeout(5000)

            # Debug: Screenshot the landing page
            page.screenshot(path="verification/debug_home.png")
            print("Home screenshot saved.")

            # Try to find the button
            if page.is_visible("button:has-text('Onlayn Dərslər')"):
                print("Button found. Clicking...")
                page.click("button:has-text('Onlayn Dərslər')")
                page.wait_for_timeout(2000)
                page.screenshot(path="verification/code_search_check.png")
                print("Result screenshot saved.")
            else:
                print("Button NOT found. Check debug_home.png")
                # Maybe it is just "Onlayn" or icon?
                # In previous steps it worked.
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_debug()
