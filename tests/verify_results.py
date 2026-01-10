
import time
from playwright.sync_api import sync_playwright

def verify_results_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to dashboard
        try:
            page.goto("http://localhost:5173")
            time.sleep(2) # Allow initial load

            print("Dashboard loaded")

            # Click on "Hamısına bax" or "Nəticələrim" to go to results
            # The button we added has text "Hamısına bax" and is in the "Son nəticələr" section
            # But let's use the explicit "Hamısına bax" button we just modified

            # Locate the button
            view_all_btn = page.locator("button:has-text('Hamısına bax')")
            if view_all_btn.count() > 0:
                view_all_btn.click()
                print("Clicked 'Hamısına bax'")
            else:
                # Fallback to menu if button not found or rendered differently
                print("Button not found, trying menu")
                page.click("text=Nəticələrim")

            time.sleep(1)

            # Check if we are on Results page
            # We look for the 3 tabs we added

            print("Checking for tabs...")

            # Tab 1: Final
            final_tab = page.locator("button:has-text('FİNAL İMTAHAN NƏTİCƏLƏRİ')")
            if final_tab.is_visible():
                print("Final Tab visible")
            else:
                print("Final Tab NOT visible")

            # Take screenshot of Final Tab view
            page.screenshot(path="tests/results_final_tab.png")

            # Switch to Topic Tab
            topic_tab = page.locator("button:has-text('MÖVZU İMTAHAN NƏTİCƏLƏRİ')")
            topic_tab.click()
            time.sleep(0.5)
            page.screenshot(path="tests/results_topic_tab.png")
            print("Switched to Topic Tab")

            # Switch to Ticket Tab
            ticket_tab = page.locator("button:has-text('BİLETLƏR ÜZRƏ NƏTİCƏLƏR')")
            ticket_tab.click()
            time.sleep(0.5)
            page.screenshot(path="tests/results_ticket_tab.png")
            print("Switched to Ticket Tab")

            # Click a result to see details
            # Clicking the first result in the list
            first_result = page.locator(".group").first
            first_result.click()
            time.sleep(1)
            page.screenshot(path="tests/result_details.png")
            print("Clicked result for details")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="tests/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_results_page()
