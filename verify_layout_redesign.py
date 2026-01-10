
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

        # 1. Verify Grid Layout
        print("Verifying Grid Layout...")
        # We look for the grid container class we added
        grid_container = page.locator(".grid.grid-cols-1.md\\:grid-cols-2")
        count = grid_container.count()
        print(f"Found {count} day groups with grid layout.")

        if count > 0:
            print("SUCCESS: 2-column grid layout detected.")
        else:
            print("ERROR: Grid layout not found.")

        # 2. Verify Full Width (check if max-w-5xl is gone from main container)
        # We can check if the main content div has 'w-full' and 'px-4' but NOT 'max-w-5xl'
        # It's hard to check exact class absence robustly, but we can check bounding box width

        # Get width of a grid container
        if count > 0:
            box = grid_container.first.bounding_box()
            viewport_width = page.viewport_size['width']
            # If it's full width with padding, it should be close to viewport width
            # 1280 - (32*2 padding approx) = 1216.
            # max-w-5xl is 1024px.

            print(f"Container width: {box['width']}px (Viewport: {viewport_width}px)")

            if box['width'] > 1050:
                print("SUCCESS: Layout appears to be wider than max-w-5xl (1024px).")
            else:
                 print("WARNING: Layout might still be constrained.")

        # Take screenshot
        page.screenshot(path="/home/jules/verification/layout_redesign.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
