
const flashMessage = (resp, type, message, icon, dismissable) => {
    let alert;
    switch(type){
        case "success":
            alert = resp.flashMessenger.success(message);
            break;
        case "error":
            alert = resp.flashMessenger.error(message);
            break;
        case "info":
            alert = resp.flashMessenger.info(message);
            break;
        case "danger":
            alert = resp.flashMessenger.danger(message);
            break;
        default:
            alert = resp.flashMessenger.info(message);
    }
    alert.titleIcon = icon;
    alert.canBeDismissed = dismissable;
};
module.exports = flashMessage;
