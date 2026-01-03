import sys
from playwright.sync_api import sync_playwright

def verify_navigation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        page.goto("http://localhost:5173/")
        page.wait_for_load_state("networkidle")

        # Scroll to chart
        page.locator("main").evaluate("el => el.scrollTo(0, 500)")
        page.wait_for_timeout(1000)

        # Click a dot
        dots = page.locator(".recharts-area-dots circle")
        if dots.count() > 0:
            dots.last.click(force=True)

        page.wait_for_timeout(2000)
        page.screenshot(path="/home/jules/verification/results_detail_final.png")
        print("Screenshot saved.")
        browser.close()

if __name__ == "__main__":
    verify_navigation()
