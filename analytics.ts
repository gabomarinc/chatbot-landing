/**
 * Helper to send events to Google Analytics 4
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventParams);
        console.log(`[GA4 Event]: ${eventName}`, eventParams);
    }
};
