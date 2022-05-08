export const INITIAL = 'initial';
export const ABOUT = 'about';
export const APPS = 'apps';
export const BLOG = 'blog';
export const CONTACTS = 'contacts';
export const welcome = ['Welcome to', 'Wånderer Studio'].join('\n');

export const apps = {
  mindArchive: {
    title: 'Mind Archive',
    description:
      'Mind Archive is an application that allows you to create your own mind palace and store information in real space in an easy and intuitive manner.',
    isReleased: false,
    link: '',
  },
  menuScanr: {
    title: 'Menu Scanr',
    description:
      "Menu Scanr allows you to use your phone's camera to search for a dish's information and view it in 3D",
    isReleased: false,
    link: '',
  },
};

// Index of the tunnel scene's materials
// indexes that shouldn't be displayed (performance issues)
// have been commented out
export const shouldRenderMaterial = [
  0, // 13
  1, // 04
  2, // 01
  3, // 28
  4, // 22
  5, // 21
  6, // 16
  7, // 18
  8, // 23
  // 9, // 00
  // 10, // 09
  // 11, // 17
  12, // 02
  13, // 15
  14, // 05
  // 15, // 08
  16, // 19
  17, // 06
  // 18, // 30
  19, // 10
  // 20, // 07
  21, // 24
  22, // 12
  // 23, // 29
  // 24, // 14
  // 25, // 12
  26, // 25
  27, // 03
  28, // 26
  // 29, // 11
  // 30, // 20
  31, // 27
];
export const menuCoordinates = {
  initial: {
    position: {
      x: 0,
      y: 0,
      z: -1.5,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  about: {
    position: {
      x: 1.0,
      y: -0.1,
      z: -3.37,
    },
    rotation: {
      x: 0,
      y: -Math.PI / 2,
      z: 0,
    },
  },
  apps: {
    position: {
      x: -1.0,
      y: 0,
      z: -5.5,
    },
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    },
  },
  blog: {
    position: {
      x: -1.0,
      y: 0,
      z: -16.5,
    },
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    },
  },
  contacts: {
    position: {
      x: 1.0,
      y: 0,
      z: -12,
    },
    rotation: {
      x: 0,
      y: -Math.PI / 2,
      z: 0,
    },
  },
};

export const menuCoordinatesMobile = {
  initial: {
    position: {
      x: 0,
      y: 0,
      z: -1.5,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  about: {
    position: {
      x: 0.5,
      y: 0,
      z: -3.37,
    },
    rotation: {
      x: 0,
      y: -Math.PI / 2,
      z: 0,
    },
  },
  apps: {
    position: {
      x: -1.0,
      y: 0,
      z: -5.5,
    },
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    },
  },
  blog: {
    position: {
      x: -1.0,
      y: 0,
      z: -16.5,
    },
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    },
  },
  contacts: {
    position: {
      x: 0.5,
      y: 0,
      z: -12,
    },
    rotation: {
      x: 0,
      y: -Math.PI / 2,
      z: 0,
    },
  },
};
