from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:5173")
            page.goto("http://localhost:5173")
            page.wait_for_selector("text=Ana Səhifə", timeout=10000)

            # Click on 'Ödənişlər' (Payments)
            print("Clicking on 'Ödənişlər'")
            page.click("text=Ödənişlər")
            # Wait for something that appears on the payments page.
            # I assume PaymentsPage has some unique text.
            # Let's take a screenshot to confirm.
            page.wait_for_timeout(1000) # Wait for render
            page.screenshot(path="verification/payments_page.png")
            print("Screenshot saved to verification/payments_page.png")

            # Go back or refresh to reset
            page.goto("http://localhost:5173")

            # Click on 'Appelyasiya' (Appeals) - trying to click the one that works
            print("Clicking on 'Appelyasiya'")
            # There might be multiple. Let's try to click the first one that is a button/clickable.
            # In Sidebar, they are all buttons.
            # The duplicates are annoying.

            # Use nth=0 if verify that the first one is the correct one.
            # In the list:
            # 11. Appelyasiya (page='appeals')
            # 13. Appelyasiya (page=null)

            # Playwright locators are strict by default.
            appeals_buttons = page.get_by_text("Appelyasiya").all()
            print(f"Found {len(appeals_buttons)} 'Appelyasiya' buttons")

            if len(appeals_buttons) > 0:
                appeals_buttons[0].click()
                page.wait_for_timeout(1000)
                page.screenshot(path="verification/appeals_page.png")
                print("Screenshot saved to verification/appeals_page.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_nav.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
