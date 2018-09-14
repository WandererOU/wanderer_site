export const INITIAL = 'initial'
export const ABOUT = 'about'
export const APPS = 'apps'
export const BLOG = 'blog'
export const CONTACTS = 'contacts'
export const aboutContents = [
    'We are a company launched with the',
    'objective of exploring the latest',
    'advancements in AR technology.\n',
    'And ensuring that there are useful',
    'applicabilities for every-day life where AR',
    'can truly allow humankind to thrive.\n',
    'Our mission is to expand the boundaries',
    'of human capacity beyond the physical realm.'
].join('\n')

export const apps = {
    mindArchive: {
        title: 'Mind Archive',
        description: 'Mind Archive is an application that allows you to create your own mind palace and store information in real space in an easy and intuitive manner.',
        isReleased: false,
        link: '',
    }
}

export const menuCoordinates = {
    initial: {
        position: {
            x: 0,
            y: 0,
            z: -1
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    about: {
        position: {
            x: 1.2,
            y: -0.1,
            z: -7.37
        },
        rotation: {
            x: 0,
            y: -Math.PI / 2,
            z: 0
        }
    },
    apps: {
        position: {
            x: -1.5,
            y: 0,
            z: -5.5
        },
        rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0
        }
    },
    blog: {
        position: {
            x: -1.5,
            y: 0,
            z: -16.5
        },
        rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0
        }
    },
    contacts: {
        position: {
            x: 1.2,
            y: 0,
            z: -12
        },
        rotation: {
            x: 0,
            y: -Math.PI / 2,
            z: 0
        }
    }
}