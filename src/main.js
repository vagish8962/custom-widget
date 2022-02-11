/** @format */

function Widget({ postion = 'bottom-right' } = {}) {
  this.position = this.getPosition(postion);
  this.open = false;
  this.init();
}

Widget.prototype.getPosition = function (position) {
  const [vertical, horizontal] = position.split('-');
  return {
    [vertical]: '20px',
    [horizontal]: '20px',
  };
};

Widget.prototype.init = function () {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  Object.keys(this.position).forEach((p) => {
    container.style[p] = this.position[p];
  });
  document.body.appendChild(container);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const chatIcon = document.createElement('img');
  chatIcon.src = '../assets/chat.svg';
  chatIcon.classList.add('icon');
  this.chatIcon = chatIcon;

  const closeIcon = document.createElement('img');
  closeIcon.src = '../assets/back.svg';
  closeIcon.classList.add('icon', 'hidden');
  this.closeIcon = closeIcon;

  buttonContainer.appendChild(chatIcon);
  buttonContainer.appendChild(closeIcon);

  buttonContainer.addEventListener('click', this.toogleIconButton.bind(this));
  // buttonContainer.addEventListener('click', this.toogleIconButton);

  container.appendChild(buttonContainer);

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('hidden', 'message-container');
  this.messageContainer = messageContainer;

  const title = document.createElement('h2');
  title.textContent = `We're not here, drop us an email...`;

  const form = document.createElement('form');
  form.classList.add('message-container');

  const inputText = document.createElement('input');
  inputText.type = 'email';
  inputText.required = 'true';

  const inputArea = document.createElement('input');
  inputArea.type = 'text';
  inputArea.required = 'true';

  const submitButton = document.createElement('btton');
  submitButton.textContent = 'Submit';

  form.appendChild(inputText);
  form.appendChild(inputArea);
  form.appendChild(submitButton);

  messageContainer.appendChild(title);
  messageContainer.appendChild(form);

  container.appendChild(messageContainer);

  this.styleJs();
};

Widget.prototype.toogleIconButton = function () {
  console.log(this, 'madeee');

  this.open = !this.open;
  if (this.open) {
    this.closeIcon.classList.remove('hidden');
    this.chatIcon.classList.add('hidden');
    this.messageContainer.classList.remove('hidden');
  } else {
    this.closeIcon.classList.add('hidden');
    this.chatIcon.classList.remove('hidden');
    this.messageContainer.classList.add('hidden');
  }
};

Widget.prototype.styleJs = function () {
  console.log(this, 'uzz');
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
            .icon {
                cursor: pointer;
                width: 70%;
                position: absolute;
                top: 9px;
                left: 9px;
                transition: transform .3s ease;
            }
            .hidden {
                transform: scale(0);
            }
            .button-container {
                background-color: #04b73f;
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .message-container {
                box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
                width: 400px;
                right: -25px;
                bottom: 75px;
                max-height: 400px;
                position: absolute;
                transition: max-height .2s ease;
                font-family: Helvetica, Arial ,sans-serif;
            }
            .message-container.hidden {
                max-height: 0px;
            }
            .message-container h2 {
                margin: 0;
                padding: 20px 20px;
                color: #fff;
                background-color: #04b73f;
            }
            .message-container .content {
                margin: 20px 10px ;
                border: 1px solid #dbdbdb;
                padding: 10px;
                display: flex;
                background-color: #fff;
                flex-direction: column;
            }
            .message-container form * {
                margin: 5px 0;
            }
            .message-container form input {
                padding: 10px;
            }
            .message-container form textarea {
                height: 100px;
                padding: 10px;
            }
            .message-container form textarea::placeholder {
                font-family: Helvetica, Arial ,sans-serif;
            }
            .message-container form button {
                cursor: pointer;
                background-color: #04b73f;
                color: #fff;
                border: 0;
                border-radius: 4px;
                padding: 10px;
            }
            .message-container form button:hover {
                background-color: #16632f;
            }
        `.replace(/^\s+|\n/gm, '');
  document.head.appendChild(styleTag);
};

const widget = new Widget();
