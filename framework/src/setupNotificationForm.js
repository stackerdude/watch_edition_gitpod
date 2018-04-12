const find = require("lodash/find");
const first = require("lodash/first");

const setupSelectDropdown = (notifications, formTypeSelect) => {
  notifications.forEach(notification => {
    const { type, label } = notification;
    formTypeSelect.appendChild(new Option(label, type));
  });
};

const setupDefaultMessage = (notifications, formMessage, formTypeSelect) => {
  formMessage.value = first(notifications).defaultValue;
  formTypeSelect.addEventListener("change", event => {
    const type = event.target.value;
    const selectedNotification = find(notifications, { type });
    formMessage.value = selectedNotification.defaultValue;
  });
};

const setupSubmitButton = context => {
  const { formSend, formMessage, formTypeSelect, show } = context;

  formSend.addEventListener("click", () => {
    const type = formTypeSelect.value;
    const message = formMessage.value;
    show(type, { message });
  });
};

module.exports = (notifications, show) => {
  const formSend = document.getElementById("notification-form-send");
  const formMessage = document.getElementById("notification-form-message");
  const formTypeSelect = document.getElementById("notification-form-type-select");

  const context = {
    notifications,
    formSend,
    formMessage,
    formTypeSelect,
    show
  };

  setupSelectDropdown(notifications, formTypeSelect);
  setupDefaultMessage(notifications, formMessage, formTypeSelect);
  setupSubmitButton(context);

  return {
    formSend,
    formMessage,
    formTypeSelect,
  }
};
