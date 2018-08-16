import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AmbientLight,
  PointLight,
  asset,
} from 'react-360';
import Entity from 'Entity'

export default class wanderer_site extends React.Component {
  render() {
    return (
      <View>
        <AmbientLight intensity={2} />
          <Entity
          source={{ obj: asset('room.obj'),
          }}
          style={{
            transform: [
              {translate: [0, 0, 0]},
              {scale: 10}
            ]
          }}
          />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('wanderer_site', () => wanderer_site);
