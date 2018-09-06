export const INITIAL = 'initial'
export const ABOUT = 'about'
export const APPS = 'apps'
export const BLOG = 'blog'
export const CONTACTS = 'contacts'

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
            x: 1.5,
            y: 0,
            z: -3
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