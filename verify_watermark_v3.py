from playwright.sync_api import sync_playwright
import time
import os

def verify_watermark():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        print("Navigating to home...")
        page.goto("http://localhost:5173")

        # Navigate to Topics page
        print("Clicking 'Mövzular'...")
        page.click("text=Mövzular")

        time.sleep(1)

        # Now in TopicsPage. Find "Suallar" tab.
        print("Clicking 'Suallar' tab...")
        page.click("button:has-text('Suallar')")

        time.sleep(1)

        # Now we should be in QuestionsContent view.
        # Verify we have an image.
        print("Waiting for question image...")
        img_locator = page.locator("div.relative > img[alt='Question']").first
        img_locator.wait_for(state="visible", timeout=10000)

        # Give it a moment to render watermark
        time.sleep(2)

        # Take screenshot of the main view
        print("Taking main view screenshot...")
        page.screenshot(path="/home/jules/verification/question_watermark_v3.png")

        # Open the modal
        print("Clicking image to open modal...")
        img_locator.click()

        # Wait for modal image
        print("Waiting for modal image...")
        modal_selector = "div.fixed.z-\\[100\\]"
        modal_img_selector = f"{modal_selector} img[alt='Question']"

        page.wait_for_selector(modal_img_selector, state="visible", timeout=10000)

        # Give it a moment to fully render/transition
        time.sleep(2)

        # Take screenshot of the modal
        print("Taking modal screenshot...")
        page.screenshot(path="/home/jules/verification/modal_watermark_v3.png")

        print("Verification complete.")
        browser.close()

if __name__ == "__main__":
    if not os.path.exists("/home/jules/verification"):
        os.makedirs("/home/jules/verification")
    verify_watermark()
