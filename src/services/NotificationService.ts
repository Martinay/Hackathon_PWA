class NotificationService {
    public showNotification(message: string) {
        if (Notification.permission == 'granted') {
            navigator.serviceWorker.getRegistration().then(registration => {
              if(registration === undefined)
                return;
            
              registration.showNotification(message);
            });
          }
    }
}

const notificationService = new NotificationService();
export default notificationService;