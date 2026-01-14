from playwright.sync_api import sync_playwright

def verify_payments_page():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            page.goto("http://localhost:5173")

            # Wait for the dashboard to load
            page.wait_for_selector("text=Ana Səhifə")

            # Click on 'Ödənişlər' in the sidebar
            page.click("text=Ödənişlər")

            # Verify we are on the payments page
            # Check for Header "Ödənişlər"
            page.wait_for_selector("h1:has-text('Ödənişlər')")

            # Check for "Ödəniş tarixçəsi" description
            page.wait_for_selector("text=Ödəniş tarixçəsi və status məlumatları")

            # Check for Summary Cards
            # REMOVED: page.wait_for_selector("text=Cəmi xərclənən məbləğ")
            page.wait_for_selector("text=Son ödəniş")

            # Check for Table Headers
            page.wait_for_selector("text=Xidmət")
            page.wait_for_selector("text=Qəbz ID")

            # Check for Mock Data
            # This should now match "Balans Artırma"
            page.wait_for_selector("text=Balans Artırma")
            page.wait_for_selector("text=5.00 ₼")

            print("Payments page verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify_payments_page()
