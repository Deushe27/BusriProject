import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

export default function MapComponent() {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL="https://demotiles.maplibre.org/style.json" // MapLibre OSM tiles
        onDidFailLoadingMap={(error) => console.log("Failed to load map:", error)}
      >
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={[-122.4194, 37.7749]} // San Francisco coordinates
        />
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
