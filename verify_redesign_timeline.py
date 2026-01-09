
import re
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Increase viewport to test desktop layout
    page.set_viewport_size({"width": 1280, "height": 800})

    try:
        # Navigate to dashboard
        page.goto("http://localhost:5173")
        page.wait_for_selector("text=Onlayn dərslər", timeout=10000)

        # Click sidebar
        page.click("text=Onlayn dərslər")
        page.wait_for_timeout(2000) # Wait for animation/load

        # Verify Headers (Grouped Dates)
        # Look for the sticky date headers
        date_headers = page.locator("h2.font-black.capitalize")
        if date_headers.count() > 0:
            print(f"Found {date_headers.count()} date groups.")
            print(f"First group: {date_headers.first.inner_text()}")
        else:
            print("ERROR: No date headers found (Timeline view might be broken)")

        # Verify Lesson Rows
        # Look for the row container
        lesson_rows = page.locator(".group.flex.flex-col.sm\\:flex-row") # Targeting the specific class structure of LessonCard
        count = lesson_rows.count()
        print(f"Found {count} lesson rows.")

        if count > 0:
            first_row = lesson_rows.first

            # Check Time
            time_text = first_row.locator(".text-xl.font-black").inner_text()
            print(f"Time found: {time_text}")

            # Check Code Badge (e.g., #1234)
            code_badge = first_row.locator("span.font-mono")
            print(f"Code badge found: {code_badge.inner_text()}")

            # Check Language Badge
            # Looking for AZ/RU text inside a badge
            lang_badge = first_row.locator("text=AZ").or_(first_row.locator("text=RU"))
            if lang_badge.count() > 0:
                 print(f"Language badge found: {lang_badge.first.inner_text()}")
            else:
                 print("WARNING: Language badge not explicitly found in first row (might be dynamic)")

            # Check for Completed Lesson with Disabled Button
            # We need to find a row that has the text "Təkrarı telegramda izlə"
            completed_btn = page.locator("button:has-text('Təkrarı telegramda izlə')").first
            if completed_btn.count() > 0:
                is_disabled = completed_btn.is_disabled()
                print(f"Found Telegram button. Disabled: {is_disabled}")
                if not is_disabled:
                    print("ERROR: Telegram button should be disabled but is not.")
            else:
                print("WARNING: No completed lessons found in viewport to verify Telegram button.")

        # Take screenshot
        page.screenshot(path="/home/jules/verification/timeline_redesign.png")
        print("Screenshot saved to timeline_redesign.png")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="/home/jules/verification/error_redesign.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
