import { store } from 'react-notifications-component';

export function success(message, title) {
    return showMessage(title, message, "success");
}

export function warning(message, title) {
    return showMessage(title, message, "warning");
}

export function error(message, title) {
    return showMessage(title, message, "danger");
}

export function info(message, title) {
    return showMessage(title, message, "info");
}

function showMessage(title, message, notificationType) {
    store.addNotification({
        message: message,
        type: notificationType,
        showIcon : true,
        insert: "top",
        container: "top-full",
        animationIn: ["animate__animated", "animate__slideInRight"],
        animationOut: ["animate__animated", "animate__slideOutRight"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}

