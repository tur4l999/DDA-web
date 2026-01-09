
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

        # 1. Verify Status Buttons
        print("Verifying Status Buttons...")

        # We need to find different statuses. The mock data has 'waiting', 'started', 'completed', 'cancelled'.

        # Helper to click and check alert
        def check_alert(button_selector, expected_msg, description):
            print(f"Testing {description}...")
            # Set up dialog handler
            alert_message = []
            def handle_dialog(dialog):
                alert_message.append(dialog.message)
                dialog.accept()

            page.on("dialog", handle_dialog)

            # Find button
            btn = page.locator(button_selector).first
            if btn.count() > 0:
                btn.click()
                time.sleep(0.5)
                if alert_message and expected_msg in alert_message[0]:
                    print(f"SUCCESS: {description} Alert matched: '{alert_message[0]}'")
                elif not alert_message:
                     print(f"ERROR: {description} did not trigger an alert.")
                else:
                     print(f"ERROR: {description} Alert mismatch. Got: '{alert_message[0]}', Expected: '{expected_msg}'")
            else:
                print(f"WARNING: No button found for {description} (Status might not be present in current view).")

            page.remove_listener("dialog", handle_dialog)

        # Check Waiting ("Gözləyir") -> "Dərsə qoşul"
        # Since 'waiting' and 'started' both have "Dərsə qoşul", we rely on the row context or try both.
        # But 'started' triggers join (maybe alert "Dərsə qoşulunur..."), 'waiting' triggers "Dərs başlamayıb..."
        # We can look for row that contains "Gözləyir"

        waiting_row = page.locator(".group:has-text('Gözləyir')")
        if waiting_row.count() > 0:
            check_alert(".group:has-text('Gözləyir') >> button:has-text('Dərsə qoşul')",
                        "Dərs başlamayıb",
                        "Waiting Status Action")
        else:
            print("No Waiting lessons found.")

        # Check Completed ("Tamamlandı") -> "Təkrarı telegramda izlə"
        completed_row = page.locator(".group:has-text('Tamamlandı')")
        if completed_row.count() > 0:
             check_alert(".group:has-text('Tamamlandı') >> button:has-text('Təkrarı telegramda izlə')",
                        "Dərs bitmişdir",
                        "Completed Status Action")
        else:
            print("No Completed lessons found.")

        # Check Cancelled ("Ləğv edildi") -> "Ləğv edilib"
        cancelled_row = page.locator(".group:has-text('Ləğv edildi')")
        if cancelled_row.count() > 0:
             check_alert(".group:has-text('Ləğv edildi') >> button:has-text('Ləğv edilib')",
                        "Dərs ləğv edilmiş",
                        "Cancelled Status Action")
        else:
            print("No Cancelled lessons found.")

        # 2. Verify Filter Drawer (Subjects removed)
        print("Verifying Filter Drawer...")
        page.click("text=Filtrlər")
        time.sleep(1)

        if page.locator("text=Mövzular").count() == 0:
            print("SUCCESS: 'Mövzular' filter section is absent.")
        else:
            print("ERROR: 'Mövzular' filter section is still present.")

        # Close drawer
        page.mouse.click(0, 0)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
