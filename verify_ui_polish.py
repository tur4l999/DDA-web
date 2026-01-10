
import re
import time
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
        time.sleep(2)

        # 1. Verify Custom Calendar Popover
        print("Verifying Calendar...")
        # Find the button that likely contains the date or "Tarix seç"
        date_btn = page.locator("button:has(svg.lucide-calendar)")
        if date_btn.count() > 0:
            date_btn.first.click()
            time.sleep(1)
            # Check for calendar elements (e.g., month name, days)
            if page.locator("text=Yanvar").count() > 0 or page.locator("text=Fevral").count() > 0:
                 print("SUCCESS: Custom Calendar popover opened.")
                 page.screenshot(path="/home/jules/verification/calendar_popover.png")
            else:
                 print("ERROR: Calendar popover content not found.")
            # Close calendar
            page.mouse.click(0, 0)
        else:
            print("ERROR: Date picker button not found.")

        # 2. Verify Simplified Filter Modal
        print("Verifying Filter Modal...")
        page.click("text=Filtrlər")
        time.sleep(1)
        # Check that it DOES NOT contain removed filters (Time range input type time)
        if page.locator("input[type='time']").count() == 0:
             print("SUCCESS: Time range filter removed.")
        else:
             print("ERROR: Time range filter still present.")

        # Check presence of Subject/Teacher
        if page.locator("text=Mövzular").count() > 0:
             print("SUCCESS: Filter modal opened and shows Subjects.")
             page.screenshot(path="/home/jules/verification/filter_modal.png")

        # Close modal
        page.mouse.click(0, 0)
        time.sleep(0.5)

        # 3. Verify Beautified Details Modal
        print("Verifying Details Modal...")
        # Click the first lesson title to open modal
        first_lesson = page.locator(".group.flex h3").first
        if first_lesson.count() > 0:
            first_lesson.click()
            time.sleep(1)
            # Check for specific class or style indicating new design (e.g., rounded-[32px] implies heavy rounding)
            modal = page.locator(".rounded-\\[32px\\]")
            if modal.count() > 0:
                 print("SUCCESS: New Beautified Modal detected.")
                 page.screenshot(path="/home/jules/verification/details_modal.png")
            else:
                 print("WARNING: Could not strictly verify new modal class, but taking screenshot.")
                 page.screenshot(path="/home/jules/verification/details_modal_fallback.png")
        else:
             print("ERROR: No lessons found to click.")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="/home/jules/verification/error_ui_check.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
