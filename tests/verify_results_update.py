
import time
from playwright.sync_api import sync_playwright

def verify_results_page_update():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to dashboard
        try:
            page.goto("http://localhost:5173")
            time.sleep(2)

            # Go to Results
            print("Navigating to Results...")
            # Use a more specific selector or the explicit button if available
            if page.locator("text=Nəticələrim").count() > 0:
                 page.click("text=Nəticələrim")
            else:
                 print("Could not find Nəticələrim link")
                 return

            time.sleep(1)

            # Verify Tab Name
            print("Verifying Tab Name 'İMTAHAN SİMULYATOR NƏTİCƏLƏRİ'...")
            simulator_tab = page.locator("button:has-text('İMTAHAN SİMULYATOR NƏTİCƏLƏRİ')")
            if simulator_tab.is_visible():
                print("SUCCESS: Simulator Tab is visible.")
            else:
                print("FAILURE: Simulator Tab NOT found.")

            # Verify List Item Details (Duration and Count)
            print("Verifying List Item details...")
            if page.locator("text=18 dəq").first.is_visible():
                print("SUCCESS: Duration visible.")
            else:
                print("FAILURE: Duration NOT visible.")

            if page.locator("text=18/20").first.is_visible():
                print("SUCCESS: Score count visible.")
            else:
                print("FAILURE: Score count NOT visible.")

            page.screenshot(path="tests/results_list_updated.png")

            # Go to Details
            print("Navigating to Detail View...")
            # Use a specific selector for the result card, avoiding sidebar items that might have .group class
            # Result card has 'Keçdi' or 'Kəsilmə' text usually, or specific structure
            result_card = page.locator(".bg-white.p-5.rounded-2xl.group").first
            if result_card.count() > 0:
                result_card.click()
                print("Clicked result card.")
            else:
                print("Result card not found via specific selector, trying generic...")
                page.locator(".group").nth(10).click() # risky

            time.sleep(1)

            # Verify Detail View Elements
            # 1. Image
            print("Verifying Question Image...")
            img = page.locator("img[alt^='Sual']")
            if img.count() > 0 and img.first.is_visible():
                 print("SUCCESS: Image is visible.")
            else:
                 print("FAILURE: Image NOT visible.")

            # 2. Status Badge (Doğru/Yanlış/Cavablanmamış)
            print("Verifying Status Badge...")
            if page.locator("text=Doğru").count() > 0 or page.locator("text=Yanlış").count() > 0 or page.locator("text=Cavablanmamış").count() > 0:
                 print("SUCCESS: Status Badge visible.")
            else:
                 print("FAILURE: Status Badge NOT visible.")

            # 3. Action Buttons
            print("Verifying Action Buttons...")
            if page.locator("button:has-text('İzaha bax')").is_visible():
                print("SUCCESS: 'İzaha bax' button visible.")
            else:
                print("FAILURE: 'İzaha bax' button NOT visible.")

            if page.locator("button:has-text('Appelyasiya ver')").is_visible():
                print("SUCCESS: 'Appelyasiya ver' button visible.")
            else:
                print("FAILURE: 'Appelyasiya ver' button NOT visible.")

            page.screenshot(path="tests/result_details_updated.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="tests/error_update.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_results_page_update()
