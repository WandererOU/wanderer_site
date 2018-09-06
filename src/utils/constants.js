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

export const aboutShader = {
    uniforms: {
        texture: {
            type: 't',
            value: '',
        }
    },
    fragmentShader: [
        "varying vec2 vUv;",
        "uniform sampler2D texture;",
        "vec4 color = vec4(1.0,1.0,1.0,1.0);",
        "void main() {",
            "gl_FragColor = texture2D(texture, vUv) * color;", 
        "}",
    ].join("\n"),
    vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}'
    ].join('\n')
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
            y: -1.5708,
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
            y: 1.5708,
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
            y: 1.5708,
            z: 0
        }
    },
    contacts: {
        position: {
            x: 0,
            y: 0,
            z: -3.5
        },
        rotation: {
            x: 0,
            y: 3.14159,
            z: 0
        }
    }
}