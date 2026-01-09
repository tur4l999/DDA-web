
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
                print(f"Button found for {description}, clicking...")
                btn.click()
                time.sleep(0.5)
                if alert_message and expected_msg in alert_message[0]:
                    print(f"SUCCESS: {description} Alert matched: '{alert_message[0]}'")
                elif not alert_message:
                     print(f"ERROR: {description} did not trigger an alert.")
                else:
                     print(f"ERROR: {description} Alert mismatch. Got: '{alert_message[0]}', Expected: '{expected_msg}'")
            else:
                print(f"WARNING: No button found for {description}.")

            page.remove_listener("dialog", handle_dialog)

        # Check Waiting ("Gözləyir") -> "Dərsə Başla"
        check_alert(".group:has-text('Gözləyir') >> button:has-text('Dərsə Başla')",
                    "Dərs başlamayıb",
                    "Waiting Status Action")

        # Check Completed ("Tamamlandı") -> "Tamamlandı"
        check_alert(".group:has-text('Tamamlandı') >> button:has-text('Tamamlandı')",
                    "Dərs bitmişdir",
                    "Completed Status Action")

        # Check Cancelled ("Ləğv edildi") -> "Ləğv edilib"
        check_alert(".group:has-text('Ləğv edildi') >> button:has-text('Ləğv edilib')",
                    "Dərs ləğv edilmiş",
                    "Cancelled Status Action")

        # Verify no "Təkrarı telegramda izlə" button exists
        if page.locator("button:has-text('Təkrarı telegramda izlə')").count() == 0:
             print("SUCCESS: 'Təkrarı telegramda izlə' button is absent.")
        else:
             print("ERROR: 'Təkrarı telegramda izlə' button was found.")

        # Take screenshot
        page.screenshot(path="/home/jules/verification/status_buttons_v3.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
