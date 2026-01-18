import os
import time
from playwright.sync_api import sync_playwright, expect

def verify_visuals():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # 1. Start App
        url = "http://localhost:5174/DDA-web/"
        print(f"Navigating to {url}")
        try:
            page.goto(url)
            page.wait_for_selector("text=Digital", timeout=5000)
        except:
             print("Retrying with root path...")
             page.goto("http://localhost:5174/")
             page.wait_for_selector("text=Digital")

        # 2. Go to Questions to check Feedback and Watermark
        print("Navigating to Questions...")

        # Click "Mövzular" (Topics) in sidebar - use first (Sidebar) or scope it
        # The error says one is in navigation, one is in main.
        # We can use sidebar locator.
        page.locator("aside").get_by_role("button", name="Mövzular").click()

        # Click "Suallar" (Questions) tab
        # Wait for tab navigation to appear
        page.wait_for_selector("text=Suallar")
        page.get_by_role("button", name="Suallar").click()

        # Wait for questions to load
        page.wait_for_timeout(1000)

        # 3. Answer a question
        print("Answering question...")
        # Click the first option
        page.locator(".flex-col.gap-3 > div").first.click()

        # 4. Verify Feedback Block is GONE
        # The feedback block had class "bg-green-100" or "bg-red-100"
        # We expect it NOT to be visible.
        # But wait, the options themselves turn green/red.
        # The block was a separate div below options.
        # The options have classes "bg-green-600" or "bg-red-600" when selected/correct.
        # The feedback block used "bg-green-100" (light green).
        # So we check for light green/red background container which was the feedback box.

        # NOTE: Options might use "bg-green-100" if they are correct?
        # QuestionsContent.jsx says options use "bg-green-600" (dark green) when correct/selected.
        # Pagination buttons use "bg-green-100".
        # So we need to be careful.
        # The feedback block was: <div className={`flex items-center gap-3 p-4 rounded-xl border ...`}>
        # We can check for "CheckCircle" or "XCircle" icons which were inside it.
        # But options also have icons (Check/X).
        # The feedback block icons were "w-6 h-6".
        # Let's inspect the structure. The feedback block was inside "Actions Row" div (flex-col gap-4).
        # We can look for the text if we hadn't removed it earlier. But we did.
        # We can check if there is any div with "bg-green-100" that is NOT a pagination button.
        # Pagination buttons are "w-8 h-8".
        # The feedback block was "p-4".

        # Let's verify by screenshot primarily, but also assert.
        # We expect NO element with class "p-4" and "bg-green-100" or "bg-red-100".
        feedback_box = page.locator("div.p-4.bg-green-100").or_(page.locator("div.p-4.bg-red-100"))
        expect(feedback_box).not_to_be_visible()
        print("Feedback box not visible.")

        # 5. Check Watermark
        # The watermark is on the image.
        # We can't easily assert pixel locations of text via selector.
        # But we can take a screenshot of the image area.
        print("Capturing screenshot for visual inspection...")
        page.screenshot(path="/home/jules/verification/visual_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_visuals()
