const HomePage = {
  id: "main",
  title: "Главная страница",
  render: (className = "container", ...rest) => {
    return `
      <a href="#main">    
      <canvas id="home-page-canvas"></canvas></a>
      <section class="${className}">                
      </section>
    `;
  }
};

const About = {
  id: "about",
  title: "Об игре",
  render: (className = "container", ...rest) => {
    return `          
      <section class="${className}">              
      </section>
    `;
  }
};

const Category = {
  id: "category",
  title: "Игра",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
      <div id="the-game-xonix-score"></div>
        <div id="the-game-xonix"></div>
      </section>
    `;
  }
};

const Testimonials = {
  id: "testimonials",
  title: "Отзывы",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">        
      </section>
    `;
  }
};

const Contacts = {
  id: "contacts",
  title: "Повторный старт игры",
  render: (className = "container", ...rest) => {
    return `      
      <section class="${className}">        
      </section>
    `;
  }
};

