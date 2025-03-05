document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname === '/admin/login') {
        const style = document.createElement('style');
        style.textContent = `
      :root {
        --primary-color: #6366f1;
        --hover-color: #818cf8;
        --text-color: #f3f4f6;
        --background-color: #111827;
        --input-bg: #1f2937;
        --border-color: #374151;
      }

      .login__Wrapper {
        background-color: var(--background-color) !important;
      }

	.login__Wrapper>section>form {
        background-color: var(--background-color) !important;
	 color: var(--text-color) !important;
	}

      [data-css="login-box"] {
        background-color: var(--background-color) !important;
        border-color: var(--border-color);
      }

      .adminjs_Input,
      .adminjs_Input:focus {
        background-color: var(--input-bg);
        color: var(--text-color);
        border-color: var(--border-color);
      }

      .adminjs_Label {
        color: var(--text-color) !important;
      }

      .adminjs_Button {
        //background-color: var(--primary-color) !important;
        color: white !important;
        transition: all 0.3s ease;
      }

      .adminjs_Button:hover {
        //background-color: var(--hover-color) !important;
        //transform: translateY(-1px);
      }

      [data-testid="login-wrapper"] svg {
        //filter: invert(95%);
      }

      .adminjs_MessageBox {
        background-color: #1f2937 !important;
        border-color: var(--border-color);
      }
    `;
        document.head.appendChild(style);
        document.documentElement.classList.add('adminjs-dark');
        const transitionStyle = document.createElement('style');
        transitionStyle.textContent = `
      * {
        transition: background-color 0.3s ease, color 0.3s ease;
      }
    `;
        document.head.appendChild(transitionStyle);
    }
});
export {};
