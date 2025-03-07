// Firebase configuration (unchanged from your original)
const firebaseConfig = {
    apiKey: "AIzaSyDFYfD6yXOI2AXciNgeBtit815IaANvFmc",
    authDomain: "servo-17c83.firebaseapp.com",
    databaseURL: "https://servo-17c83-default-rtdb.firebaseio.com",
    projectId: "servo-17c83",
    storageBucket: "servo-17c83.firebasestorage.app",
    messagingSenderId: "995716808401",
    appId: "1:995716808401:web:3f9babce9b93da0e95cff0",
    measurementId: "G-VKR8YR62BT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Định nghĩa đường dẫn cơ sở với UID
const BASE_PATH = "/users/h3c149qpGtaU8QjUE363jm1pU1A3/";

// Monitor connection status
var connectionStatusRef = firebase.database().ref(BASE_PATH + "online");
connectionStatusRef.on('value', snap => {
    document.getElementById("connectionStatus").innerHTML = snap.val();
});

// Monitor battery voltage
var batteryVoltageRef = firebase.database().ref(BASE_PATH + "Khoi_pin");
batteryVoltageRef.on('value', snap => {
    document.getElementById("batteryVoltage").innerHTML = `${snap.val()} <span class="unit">V</span>`;
});

// Monitor solar voltage
var solarVoltageRef = firebase.database().ref(BASE_PATH + "solar");
solarVoltageRef.on('value', snap => {
    document.getElementById("solarVoltage").innerHTML = `${snap.val()} <span class="unit">V</span>`;
});

// Wake button functionality
var x = 0;
document.getElementById('wakeButton').onclick = function () {
    x++;
    console.log(x);
    if (x > 1) {
        x = 0;
    }

    const espRef = firebase.database().ref(BASE_PATH + "ESP32_status");
    espRef.set(x)
        .then(() => {
            console.log("ESP32_status updated successfully to: " + x);
        })
        .catch(error => console.error("Error updating ESP32_status:", error));
};

// Monitor ESP32 status from Firebase
const status2Ref = firebase.database().ref(BASE_PATH + "ESP32_status");
status2Ref.on('value', (snap) => {
    const value = snap.val(); // Get the value from the snapshot

    if (value === 1) {
        document.querySelector('.esp-info').textContent = 'Thông tin: Đã bật đánh thức';
        document.querySelector('.esp-info').style.color = '#14d4ff'; // White color for "bật đánh thức"
    } else if (value === 0) {
        document.querySelector('.esp-info').textContent = 'Thông tin: Đã tắt đánh thức';
        document.querySelector('.esp-info').style.color = '#e74c3c'; // Red color for "tắt đánh thức"
    } else {
        console.warn("Unexpected value for ESP32_status:", value);
        document.querySelector('.esp-info').textContent = 'Thông tin: Trạng thái không xác định';
        document.querySelector('.esp-info').style.color = '#ffffff'; // Default color (white) for unknown status
    }
}, (error) => {
    console.error("Error fetching ESP32 status:", error);
    document.querySelector('.esp-info').textContent = 'Thông tin: Lỗi kết nối';
    document.querySelector('.esp-info').style.color = '#e74c3c'; // Red for error state
});

// Monitor ESP32 sleep status from Firebase
const sleepRef = firebase.database().ref(BASE_PATH + "ESP32_sleep");
sleepRef.on('value', (snap) => {
    const value = snap.val(); // Get the value from the snapshot

    if (value === 1) {
        document.querySelector('.esp-status').textContent = 'Trạng thái: ESP32 đã thức';
    } else if (value === 0) {
        document.querySelector('.esp-status').textContent = 'Trạng thái: ESP32 đang ngủ ZZZ';
    } else {
        console.warn("Unexpected value for ESP32_sleep:", value);
        document.querySelector('.esp-status').textContent = 'Thông tin: Trạng thái không xác định';
        document.querySelector('.esp-status').style.color = '#ffffff'; // Default color (white) for unknown status
    }
}, (error) => {
    console.error("Error fetching ESP32 sleep status:", error);
    document.querySelector('.esp-status').textContent = 'Thông tin: Lỗi kết nối';
    document.querySelector('.esp-status').style.color = '#e74c3c'; // Red for error state
});


// Relay button functionality
var x3 = 0;
document.getElementById('relay_button').onclick = function () {
    x3++;
    console.log(x3);
    if (x3 > 1) {
        x3 = 0;
    }

    const relayRef = firebase.database().ref(BASE_PATH + "relay");
    relayRef.set(x3)
        .then(() => {
            console.log("Relay updated successfully to: " + x3);
        })
        .catch(error => console.error("Error updating relay:", error));
};
// Monitor relay status from Firebase
const relayRef = firebase.database().ref(BASE_PATH + "relay");
relayRef.on('value', (snap) => {
    const value2 = snap.val(); // Get the value from the snapshot

    if (value2 === 1) {
        document.querySelector('.restart').textContent = 'Đang restart raspi...';
        document.querySelector('.restart').style.color = '#f8f6f6'; // White for "Đã restart raspi"

        // // Set a timeout to reset the 'relay' value to 0 after 10 seconds
        // setTimeout(() => {
        //     relayRef.set(0)
        //         .then(() => {
        //             document.querySelector('.restart').textContent = 'Đã restart thành công';
        //             console.log("Relay automatically reset to 0 after 10 seconds");
        //         })
        //         .catch(error => {
        //             console.error("Error resetting relay to 0:", error);
        //             alert("Có lỗi xảy ra khi reset relay. Vui lòng kiểm tra console để biết chi tiết.");
        //         });
        // }, 10000); // 10 seconds in milliseconds
    } else if (value2 === 0) {
        document.querySelector('.restart').textContent = 'Trạng thái: Đã restart thành công';
        document.querySelector('.restart').style.color = '#e74c3c'; // Red for "Đang hoạt động"
    } else {
        console.warn("Unexpected value for relay:", value2);
        document.querySelector('.restart').textContent = 'Trạng thái: Trạng thái không xác định';
        document.querySelector('.restart').style.color = '#ffffff'; // Default color (white) for unknown status
    }
}, (error) => {
    console.error("Error fetching relay status:", error);
    document.querySelector('.restart').textContent = 'Thông tin: Lỗi kết nối';
    document.querySelector('.restart').style.color = '#e74c3c'; // Red for error state
});

