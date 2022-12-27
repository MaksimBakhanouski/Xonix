const Header = {
  render: (customClass = "") => {
    return `
      <header class="header ${customClass}" id="header">
        <canvas id="header-canvas-logo" class="header__logo"></canvas>
        <h2 id="header-user-name"></h2>
      </header>
    `;
  }
};

const NavBar = {
  render: (customClass = "") => {
    return `
      <nav class="mainmenu ${customClass}" id="mainmenu">
        <ul class="mainmenu__list">
          <li id="canvas-mainmenu-list-main"><a class="mainmenu__link" href="#main"><canvas id="canvas-button-main"></canvas></a></li>
          <li id="canvas-mainmenu-list-start-game"><a class="mainmenu__link" href="#category"><canvas id="canvas-button-start-game"><</a></li>
          <li id="canvas-mainmenu-list-about"><a class="mainmenu__link" href="#about"><canvas id="canvas-button-about"></a></li>          
          <li id="canvas-mainmenu-list-table-records"><a class="mainmenu__link" href="#testimonials"><canvas id="canvas-button-table-records"></a></li>
          <li id="canvas-mainmenu-list-start-over"><a class="mainmenu__link" href="#contacts"><canvas id="canvas-button-start-over"></a></li>
        </ul>
      </nav>
    `;
  }
};

const Content = {
  render: (customClass = "") => {
    return `<div class="content ${customClass}" id="content"></div>`;
  }
};

const Footer = {
  render: (customClass = "") => {
    return `<footer class="footer ${customClass}">
      <p>&copy; 2022</p>
    </footer>`;
  }
};
