export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: 'LIRI-Bot',
    description: 'A command line node app that provides details about songs, concerts, and more.',
    image: 'img/bot.png',
    link: 'https://github.com/mundy-kelvin/liri-bot',
    category: 'photos'
  },
  {
    title: 'SouthPark Click',
    description: 'A React memory game based on SouthPark characters that tests your memory.',
    image: 'img/southpark.png',
    link: 'https://southparkclick.herokuapp.com',
    category: 'photos'
  },
  {
    title: 'Bingo Game',
    description: 'A Visual Basic bingo game application with full game logic and UI.',
    image: 'img/bingo.png',
    link: 'https://github.com/mundy-kelvin',
    category: 'photos'
  },
  {
    title: 'My Hours',
    description: 'A time tracking application that helps manage and log work hours efficiently.',
    image: 'img/mi_horas.png',
    link: 'https://github.com/mundy-kelvin',
    category: 'photos'
  },
  {
    title: 'Pet Perfect',
    description: 'A pet adoption resource finder that connects users with local shelters and pets.',
    image: 'img/adopt_pet.png',
    link: 'https://github.com/mundy-kelvin',
    category: 'photos'
  }
];
