import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

const counts = [
  { count: "10/1", time: 51 },
  { count: "12/1", time: 55 },
  { count: "16/1", time: 58 },
  { count: "20/1", time: 78 },
  { count: "22/1", time: 85 },
  { count: "24/1", time: 92 },
  { count: "26/1", time: 98 },
  { count: "28/1", time: 99 },
  { count: "30/1", time: 110 },
  { count: "32/1", time: 117 },
  { count: "34/1", time: 125 },
  { count: "36/1", time: 129 },
  { count: "40/1", time: 136 },
  { count: "20/2", time: 45 },
  { count: "30/2", time: 60 },
  { count: "32/2", time: 62 },
  { count: "40/2", time: 76 },
  { count: "200/D", time: 0 },
];

export default function HomeScreen() {
  const [time, setTime] = useState<number>(0);
  const [form, setForm] = useState({
    totalPackages: "",
    totalWeight: "",
    finishedPackages: "",
    time: {
      count: counts[0].count,
      time: counts[0].time,
    },
  });

  const handleCalculate = () => {
    // Check if all fields are filled and its values are numbers
    if (
      form.totalPackages === "" ||
      form.totalWeight === "" ||
      form.finishedPackages === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const singlePackageWeight =
      parseFloat(form.totalWeight) / parseFloat(form.totalPackages);

    const isSingle = form.time.count.split("/")[1] === "1";
    if (isSingle) {
      setTime(
        (parseFloat(form.finishedPackages) *
          singlePackageWeight *
          form.time.time) /
          51.5
      );
    } else {
      setTime(
        (parseFloat(form.finishedPackages) *
          singlePackageWeight *
          form.time.time) /
          48.6
      );
    }
  };

  return (
    <ParallaxScrollView
      time={time}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calculator!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <View style={styles.flexContainer}>
          <View>
            <ThemedText type="subtitle">Total packages</ThemedText>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={form.totalPackages}
              onChangeText={(value) =>
                setForm({ ...form, totalPackages: value })
              }
            />
          </View>
          <View>
            <ThemedText type="subtitle">Total weight</ThemedText>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={form.totalWeight}
              onChangeText={(value) => setForm({ ...form, totalWeight: value })}
            />
          </View>
        </View>
        <View style={styles.flexContainer}>
          <View>
            <ThemedText type="subtitle">Finished packages</ThemedText>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={form.finishedPackages}
              onChangeText={(value) =>
                setForm({ ...form, finishedPackages: value })
              }
            />
          </View>
          <View>
            <SelectDropdown
              data={counts}
              onSelect={(selectedItem) => {
                setForm({
                  ...form,
                  time: selectedItem,
                });
              }}
              renderButton={(selectedItem) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.count) || counts[0].count}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    }}>
                    <Text style={styles.dropdownItemTxtStyle}>
                      {item.count}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleCalculate}>
          <ThemedText type="subtitle" style={styles.button}>
            Calculate
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    fontSize: 20,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    padding: 8,
    borderRadius: 4,
    textAlign: "center",
  },
  dropdownButtonStyle: {
    width: 100,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
