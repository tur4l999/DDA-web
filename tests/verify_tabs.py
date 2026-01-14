
import time
from playwright.sync_api import sync_playwright

def verify_results_page_tabs():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to dashboard
        try:
            page.goto("http://localhost:5173")
            time.sleep(2)

            # Go to Results
            print("Navigating to Results...")
            if page.locator("text=Nəticələrim").count() > 0:
                 page.click("text=Nəticələrim")
            else:
                 # Try the 'See all' button
                 page.locator("button:has-text('Hamısına bax')").click()

            time.sleep(1)

            # Verify Tabs
            tabs = [
                'İMTAHAN SİMULYATOR NƏTİCƏLƏRİ',
                'FİNAL İMTAHANI',
                'MÖVZU İMTAHAN NƏTİCƏLƏRİ',
                'BİLETLƏR ÜZRƏ NƏTİCƏLƏR'
            ]

            for tab_name in tabs:
                print(f"Verifying Tab: '{tab_name}'...")
                tab = page.locator(f"button:has-text('{tab_name}')")
                if tab.is_visible():
                    print(f"SUCCESS: '{tab_name}' is visible.")
                else:
                    print(f"FAILURE: '{tab_name}' NOT found.")

            # Verify Warning on Simulator Tab (Default)
            print("Verifying Warning on Simulator Tab...")
            warning_text = "İmtahan simulyatoru üzrə nəticələr 7 gün ərzində aktiv olur"
            if page.locator(f"text={warning_text}").is_visible():
                print("SUCCESS: Warning visible on Simulator Tab.")
            else:
                print("FAILURE: Warning NOT visible on Simulator Tab.")

            # Switch to Final Tab and Verify Warning is GONE
            print("Switching to Final Exam Tab...")
            page.click("button:has-text('FİNAL İMTAHANI')")
            time.sleep(0.5)

            if not page.locator(f"text={warning_text}").is_visible():
                print("SUCCESS: Warning GONE on Final Exam Tab.")
            else:
                print("FAILURE: Warning STILL VISIBLE on Final Exam Tab.")

            # Take screenshot of Final Tab list
            page.screenshot(path="tests/results_final_exam_tab.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="tests/error_tabs.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_results_page_tabs()
