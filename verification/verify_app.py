from playwright.sync_api import sync_playwright

def verify_app_loads():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to localhost:5173...")
            page.goto("http://localhost:5173", timeout=30000)

            # Wait for main content to appear.
            # Sidebar should be present.
            page.wait_for_selector("aside", timeout=10000)

            print("Page loaded successfully.")
            page.screenshot(path="verification/app_loaded.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app_loads()
