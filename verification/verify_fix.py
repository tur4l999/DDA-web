
from playwright.sync_api import sync_playwright
import time

def verify(page):
    page.goto("http://localhost:5173/DDA-web/") # Vite dev server usually runs on 5173, and base is ./ so root is fine, but let's check log.
    # Actually if base is ./, in dev mode Vite serves at root /.
    # But wait, vite.config.js usually doesn't affect dev server URL unless mapped.
    # Let's try http://localhost:5173/ first.

    # Wait for the dashboard to load (look for "Ana Səhifə" or "Salam, Tural")
    page.wait_for_selector("text=Salam, Tural")

    # Take screenshot
    page.screenshot(path="verification/dashboard_loaded.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
             # Check dev server port first
             page.goto("http://localhost:5173")
             verify(page)
        except Exception as e:
             print(f"Error: {e}")
        finally:
             browser.close()
