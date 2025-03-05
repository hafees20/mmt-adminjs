//document.addEventListener('DOMContentLoaded', function () {
//  console.log('Script loaded...');
//
//  // Select all SVGs inside elements with the class 'adminjs_Illustration'
//  const illustrations = document.querySelectorAll('.adminjs_Illustration svg');
//
//  const newSvgs = [
//    // Mosque Icon (Detailed Dome + Minaret Design)
//    `<svg width="82" height="91" viewBox="0 0 152 169" xmlns="http://www.w3.org/2000/svg">
//    <g stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none">
//      <path d="M76 15L15 70v85h122V70L76 15z" stroke-linejoin="round"/>
//      <path d="M30 80v75M122 80v75" stroke-linecap="square"/>
//      <path d="M76 35Q50 55 50 90t26 55t26-55t26-55" stroke-linecap="round"/>
//      <circle cx="76" cy="50" r="4" fill="rgba(255,255,255,0.9)"/>
//      <rect x="65" y="120" width="22" height="35" stroke-linecap="round"/>
//      <path d="M50 80h52" stroke-linecap="round"/>
//    </g>
//  </svg>`,
//
//    // Management Icon (Modern Clipboard + People)
//    `<svg width="82" height="91" viewBox="0 0 152 169" xmlns="http://www.w3.org/2000/svg">
//    <g stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none">
//      <rect x="35" y="30" width="82" height="110" rx="5"/>
//      <rect x="55" y="20" width="42" height="15" rx="3"/>
//      <path d="M50 60h52M50 80h52M50 100h40M110 95l5 5 10-10" stroke-linecap="round"/>
//      <circle cx="76" cy="130" r="12"/>
//      <path d="M60 145q16 10 32 0" stroke-linecap="round"/>
//    </g>
//  </svg>`,
//
//    // Membership Icon (Modern ID Card with User Icon)
//    `<svg width="82" height="91" viewBox="0 0 152 169" xmlns="http://www.w3.org/2000/svg">
//    <g stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none">
//      <rect x="30" y="40" width="92" height="95" rx="5"/>
//      <rect x="45" y="55" width="62" height="20" rx="3"/>
//      <path d="M50 85h52M50 105h32" stroke-linecap="round"/>
//      <circle cx="110" cy="120" r="10"/>
//      <path d="M100 140q10-10 20 0" stroke-linecap="round"/>
//    </g>
//  </svg>`,
//  ];
//  illustrations.forEach((svg, index) => {
//    // Get the parent element of the SVG
//    const parent = svg.parentNode;
//
//    if (parent) {
//      // Remove the existing SVG
//      svg.remove();
//
//      // Create a new div to hold the SVG
//      const newSvgWrapper = document.createElement('div');
//      newSvgWrapper.innerHTML = newSvgs[index % newSvgs.length]; // Cycle through new SVGs
//
//      // Append the new SVG inside the same parent
//      parent.appendChild(newSvgWrapper.firstChild);
//    }
//  });
//
//  console.log('SVGs replaced successfully.');
//});
//
//
//
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

    // Add dark mode class to root element
    document.documentElement.classList.add('adminjs-dark');

    // Optional: Add theme transition
    const transitionStyle = document.createElement('style');
    transitionStyle.textContent = `
      * {
        transition: background-color 0.3s ease, color 0.3s ease;
      }
    `;
    document.head.appendChild(transitionStyle);
  }
});
