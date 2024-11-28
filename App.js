import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions  } from "react-native";

const TimerApp = ({ initialTime = 300 }) => {
  const [time, setTime] = useState(initialTime); // variabel yang menyimpan waktu awal / default
  const [isRunning, setIsRunning] = useState(false); // variabel yang menyimpan apakah timer sedang berjalan atau tidak

  const { width } = Dimensions.get("window"); // Dapatkan dimensi atau lebar layar
  const Desktop = width > 1024;
  const Tablet = width <= 1024 && width > 768;
  const Mobile = width <= 768;

  // setiap kali isRunning == true, timer akan menghitung mundur setiap 1 detik
  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    // return digunakan untuk mengulang / reset timer
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]); // keberjalanan useEffect bergantung ke perubahan nilai pada variabel isRunning
  
  // fungsi untuk membentuk timer, terdiri dari MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const menitLayar = minutes < 10 ? "0" + minutes : minutes;
    const detikLayar = secs < 10 ? "0" + secs : secs;
    return menitLayar + ":" + detikLayar;
  };

  // fungsi untuk memodifikasi timer, bisa tambah bisa kurang, namun tidak dapat kurang dari 0
  const modifyTime = (seconds) => {
    setTime((prev) => Math.max(prev + seconds, 0));
  };

  // Layout setiap komponen dari timer
  return (
    <View style={styles(Desktop, Tablet, Mobile).background}>
      <View style={styles(Desktop, Tablet, Mobile).container}>
        <View style={styles(Desktop, Tablet, Mobile).buttonsRow}>
          <TouchableOpacity
            style={[styles(Desktop, Tablet, Mobile).button, isRunning ? styles().unavailButton : null]}
            onPress={() => !isRunning && modifyTime(30)}
          >
            <Text style={[styles().buttonText, isRunning ? styles().unavailButtonText : styles().defaultText]}>+ 00:30</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(Desktop, Tablet, Mobile).button, isRunning ? styles().unavailButton : null]}
            onPress={() => !isRunning && modifyTime(60)}
          >
            <Text style={[styles().buttonText, isRunning ? styles().unavailButtonText : styles().defaultText]}>+ 01:00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(Desktop, Tablet, Mobile).button, isRunning ? styles().unavailButton : null]}
            onPress={() => !isRunning && modifyTime(300)}
          >
            <Text style={[styles().buttonText, isRunning ? styles().unavailButtonText : styles().defaultText]}>+ 05:00</Text>
          </TouchableOpacity>
        </View>
        <View style={styles(Desktop, Tablet, Mobile).displayRow}>
          <TouchableOpacity
            style={[styles(Desktop, Tablet, Mobile).smallButton, isRunning ? styles().unavailButton : null]}
            onPress={() => !isRunning && modifyTime(-1)}
          >
            <Text style={[styles().smallButtonText, isRunning ? styles().unavailButtonText : styles().defaultText]}>-</Text>
          </TouchableOpacity>
          <Text style={[styles(Desktop, Tablet, Mobile).timeDisplay, styles().displayText]}>{formatTime(time)}</Text>
          <TouchableOpacity
            style={[styles(Desktop, Tablet, Mobile).smallButton, isRunning ? styles().unavailButton : null]}
            onPress={() => !isRunning && modifyTime(1)}
          >
            <Text style={[styles().smallButtonText, isRunning ? styles().unavailButtonText : styles().defaultText]}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles(Desktop, Tablet, Mobile).controlsRow}>
          <TouchableOpacity
            style={[styles(Desktop, Tablet, Mobile).controlButton, styles().resetButton]}
            onPress={() => {
              setTime(initialTime);
              setIsRunning(false);
            }}
          >
            <Text style={styles().actionText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(Desktop, Tablet, Mobile).controlButton, isRunning ? styles().pauseButton : styles().startButton]}
            onPress={() => setIsRunning(!isRunning)}
          >
            <Text style={styles().actionText}>{isRunning ? "Pause" : "Start"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Daftar atribut desain setiap komponen dari timer
const styles = (Desktop, Tablet, Mobile) =>
  StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#F0CBDC",
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: Mobile ? 0 : Tablet ? 160 : 80,
    padding: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    marginBottom: Mobile ? 5 : Tablet ? 10 : 20,
  },
  button: {
    backgroundColor: "white",
    borderColor: "#C79CCC",
    borderWidth: 3,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: Mobile ? 20 : Tablet ? 40 : 60,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  displayRow: {
    flexDirection: "row",
    marginVertical: Mobile ? 280 : Tablet ? 180 : 60,
  },
  smallButton: {
    backgroundColor: "white",
    borderColor: "#E1AFD1",
    borderWidth: 3,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginVertical: "auto",
    marginHorizontal: Mobile ? 42 : Tablet ? 100 : 140,
    alignItems: "center",
  },
  smallButtonText: {
    fontSize: 24,
  },
  timeDisplay: {
    fontSize: Mobile ? 64 : 72,
    fontWeight: "bold",
  },
  controlsRow: {
    flexDirection: "row",
    marginTop: Mobile ? 5 : Tablet ? 10 : 20,
  },
  controlButton: {
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 40,
    paddingVertical: 10,
    width: Mobile ? 160 : Tablet ? 200 : 270,
    marginHorizontal: 5,
    alignItems: "center",
  },
  controlButtonText: {
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#7469B6',
  },
  pauseButton: {
    backgroundColor: '#AD88C6',
  },
  resetButton: {
    backgroundColor: '#E1AFD1',
  },
  unavailButton: {
    backgroundColor: '#E9EDF1',
    borderColor: '#ddd',
  },
  unavailButtonText: {
    color: '#C7CCCF',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  displayText: {
    color: '#7469B6',
  },
  defaultText: {
    color: '#474E50',
    fontWeight: 600,
  },
});

export default TimerApp;
