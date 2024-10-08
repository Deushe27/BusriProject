import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Index() {
  const [location, setLocation] = useState(null); // Holds the user's location
  const [errorMsg, setErrorMsg] = useState(null); // Error message if permissions are denied

  // Request permission to access location on component mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Request location permission
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({}); // Get current position
      setLocation(currentLocation.coords); // Store coordinates
    })();
  }, []);

  // If there's an error or permission was denied, show the error message
  if (errorMsg) {
    return (
      <View style={styles.centeredView}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // While waiting for the location to load, show a loading indicator
  if (!location) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude, // User's current latitude
          longitude: location.longitude, // User's current longitude
          latitudeDelta: 0.0922, // Zoom level
          longitudeDelta: 0.0421, // Zoom level
        }}
        showsUserLocation={true} // Show the blue dot for the user’s location
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }} // Place a marker at the user's location
          title="You are here"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Fill the entire screen with the map
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
