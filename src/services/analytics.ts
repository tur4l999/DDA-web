/**
 * Analytics Service - Event tracking stub / Hadisə izləmə stub
 */

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

class AnalyticsService {
  private enabled = true;

  /**
   * Track screen view / Ekran görüntüsünü izlə
   */
  trackScreen(screenName: string, properties?: EventProperties): void {
    if (!this.enabled) return;
    
    console.log('[Analytics] Screen:', screenName, properties);
    
    // TODO: Integrate with Segment/Expo Analytics
    // Segment/Expo Analytics inteqrasiyası
  }

  /**
   * Track event / Hadisəni izlə
   */
  trackEvent(eventName: string, properties?: EventProperties): void {
    if (!this.enabled) return;
    
    console.log('[Analytics] Event:', eventName, properties);
    
    // TODO: Send to analytics backend
    // Analitika backend-ə göndər
  }

  /**
   * Identify user / İstifadəçini müəyyən et
   */
  identify(userId: string, traits?: EventProperties): void {
    if (!this.enabled) return;
    
    console.log('[Analytics] Identify:', userId, traits);
  }

  /**
   * Track purchase / Alışı izlə
   */
  trackPurchase(packageId: string, price: number, currency: string): void {
    this.trackEvent('purchase_completed', {
      package_id: packageId,
      price,
      currency,
    });
  }

  /**
   * Track lesson completion / Dərs tamamlanmasını izlə
   */
  trackLessonComplete(lessonId: string, duration: number): void {
    this.trackEvent('lesson_completed', {
      lesson_id: lessonId,
      duration,
    });
  }

  /**
   * Track exam completion / İmtahan tamamlanmasını izlə
   */
  trackExamComplete(mode: string, score: number, timeSpent: number): void {
    this.trackEvent('exam_completed', {
      mode,
      score,
      time_spent: timeSpent,
    });
  }
}

export const analytics = new AnalyticsService();
