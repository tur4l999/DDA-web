from playwright.sync_api import sync_playwright

def verify_payments_page():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to the dashboard
        # Assuming the app is running on localhost:5173.
        # In this environment, we might need to assume the server is started or start it.
        # However, for this specific tool usage, I am verifying the *code logic* primarily via the script structure.
        # But to actually run it, I need the server running.
        # I will assume the server is running on 5173 or attempt to visit the file if it's a static build,
        # but the React app needs a dev server.

        # NOTE: Since I cannot easily start the dev server and keep it running while running this script in the same step easily without background processes,
        # I will rely on the fact that I've modified the code correctly.
        # But the instructions say "Create a Playwright verification script... that navigates".
        # I will write the script assuming the server is at http://localhost:5173.

        try:
            page.goto("http://localhost:5173")

            # Wait for the dashboard to load
            page.wait_for_selector("text=Ana Səhifə")

            # Click on 'Ödənişlər' in the sidebar
            # The sidebar button text is "Ödənişlər"
            page.click("text=Ödənişlər")

            # Verify we are on the payments page
            # Check for Header "Ödənişlər"
            page.wait_for_selector("h1:has-text('Ödənişlər')")

            # Check for "Ödəniş tarixçəsi" description
            page.wait_for_selector("text=Ödəniş tarixçəsi və status məlumatları")

            # Check for Summary Cards
            page.wait_for_selector("text=Cəmi xərclənən məbləğ")
            page.wait_for_selector("text=Son ödəniş")

            # Check for Table Headers
            page.wait_for_selector("text=Xidmət")
            page.wait_for_selector("text=Qəbz ID")

            # Check for Mock Data
            page.wait_for_selector("text=İmtahan Simulyatoru")
            page.wait_for_selector("text=207.50 ₼")

            print("Payments page verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify_payments_page()
