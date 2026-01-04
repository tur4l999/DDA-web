from playwright.sync_api import sync_playwright

def verify_telegram_modal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the dashboard
        page.goto("http://localhost:5173")

        # Wait for dashboard to load
        page.wait_for_selector("text=Salam, Tural!", timeout=10000)

        # Click on "Onlayn Dərslər" quick action
        buttons = page.get_by_role("button", name="Onlayn Dərslər").all()
        if len(buttons) >= 2:
            buttons[1].click()
        else:
            page.get_by_text("Onlayn Dərslər").first.click()

        # Wait for the "Onlayn Dərslər" list page
        page.wait_for_selector("text=Filtrlər", timeout=5000)

        # Click "Təkrar videosu olanlar" filter
        page.get_by_text("Təkrar videosu olanlar").click()

        # Wait for filtered list
        page.wait_for_timeout(500)

        # LessonCard uses "Təkrara bax" for completed lessons with replay.
        replay_button = page.locator("button:has-text('Təkrara bax')").first

        if replay_button.count() > 0:
            replay_button.click()
        else:
            # Fallback
            page.locator(".bg-white.rounded-2xl").first.locator("button").first.click()

        # Wait for Modal text "Video Dərslər Artıq Telegramda!"
        page.wait_for_selector("text=Video Dərslər", timeout=5000)

        # Take screenshot
        page.screenshot(path="verification/telegram_modal.png")

        browser.close()

if __name__ == "__main__":
    verify_telegram_modal()
