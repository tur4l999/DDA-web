
import re
import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 800})

    try:
        # Navigate
        page.goto("http://localhost:5173")
        page.wait_for_selector("text=Onlayn dərslər", timeout=10000)
        page.click("text=Onlayn dərslər")
        time.sleep(2)

        # Open Calendar and Select a Date
        # Find a date in the current month to click (e.g., '15')
        # We need to pick a date that actually has lessons. The mock data has lessons almost every day.
        # Let's try to find a day button in the calendar.

        print("Opening Calendar...")
        date_btn = page.locator("button:has(svg.lucide-calendar)")
        date_btn.first.click()
        time.sleep(1)

        # Click on day '15' (assuming current month view has a 15)
        day_btn = page.locator("button:text-is('15')").first
        if day_btn.count() > 0:
            print("Selecting date 15...")
            day_btn.click()
            time.sleep(1)

            # Verify results are filtered
            # The header should show the selected date or at least filtered results
            # The 'groupedLessons' headers should match the selected date.

            # Since we don't know the exact Month/Year easily without parsing, let's just check if ANY result appears.
            # If logic was broken (date < start), we would get NO results for a single day selection if time wasn't handled.

            results_count = page.locator(".group.flex.flex-col.sm\\:flex-row").count()
            print(f"Found {results_count} lessons after filtering.")

            if results_count > 0:
                print("SUCCESS: Filtering by date returned results.")
            else:
                print("WARNING: No results found for date 15. Either no data or filter logic broken.")
        else:
             print("ERROR: Day 15 not found in calendar.")

        page.screenshot(path="/home/jules/verification/date_filter_logic.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
