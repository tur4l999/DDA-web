from playwright.sync_api import sync_playwright

def verify_exam_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to dashboard (assuming running on localhost:5173 or similar, but since we are in sandbox we use relative if possible or mock)
        # In sandbox, we need to run the dev server or just check the code structure if we can't run.
        # But instructions say "Runs the given bash command...".
        # I should try to run the dev server in background? No, usually I just assume environment is set up or I can't access localhost.
        # But wait, `frontend_verification_instructions` tool suggests writing a script.

        # The prompt says: "UI verification is performed using Python scripts with the `playwright` library to capture screenshots of the running application."
        # It implies I can run against the app.

        print("Starting verification...")

        # Assuming the app is running on port 5173 (Vite default)
        try:
            page.goto("http://localhost:5173")
        except Exception as e:
            print(f"Could not connect to localhost:5173. Ensure server is running. Error: {e}")
            return

        # Wait for dashboard
        page.wait_for_selector("text=Ana Səhifə")
        print("Dashboard loaded.")

        # Click "İmtahan"
        page.click("text=İmtahan")
        print("Clicked 'İmtahan'.")

        # Verify Exam Page Header
        page.wait_for_selector("text=İmtahan Mərkəzi")
        print("Exam Page loaded.")

        # Verify Tabs exist
        assert page.is_visible("text=Biletlər")
        assert page.is_visible("text=Mövzular")

        # Check Tickets Tab (Default)
        # Should see "Bilet 1", "Bilet 50"
        page.wait_for_selector("text=Bilet 1")
        page.wait_for_selector("text=Bilet 50")
        print("Tickets tab verified.")

        # Click Topics Tab
        page.click("text=Mövzular")
        # Should see topics like "M1"
        page.wait_for_selector("text=M1")
        page.wait_for_selector("text=Ümumi müddəalar")
        print("Topics tab verified.")

        # Click Final Exam Tab
        # Note: Selector might be tricky if "İmtahan" is both tab name and page title.
        # Tab has icon Crown.
        # Or use specific text inside the tab button.
        buttons = page.locator("button", has_text="İmtahan")
        # There might be multiple. The tab one is inside the header.
        # Let's use the 3rd one in the tab list or by parent class.
        # The tab container has 'bg-gray-100/80'.

        # Better: Click by index or unique context.
        # The tabs are: Biletlər, Mövzular, İmtahan.
        # The "İmtahan" tab is the last one.

        # Let's try matching exactly the tab button.
        page.click("header button:has-text('İmtahan')")

        # Verify Final Exam Content
        page.wait_for_selector("text=İmtahan Simulyatoru")
        page.wait_for_selector("text=Yekun İmtahan")
        print("Final Exam tab verified.")

        print("Verification successful!")
        browser.close()

if __name__ == "__main__":
    verify_exam_ui()
