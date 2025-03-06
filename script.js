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
// Monitor connection status
var connectionStatusRef = firebase.database().ref().child('online');
connectionStatusRef.on('value', snap => {
    document.getElementById("connectionStatus").innerHTML = snap.val();
});

// Monitor battery voltage
var batteryVoltageRef = firebase.database().ref().child('Khoi_pin');
batteryVoltageRef.on('value', snap => {
    document.getElementById("batteryVoltage").innerHTML = `${snap.val() || 13.2} <span class="unit">V</span>`;
});

// Monitor solar voltage
var solarVoltageRef = firebase.database().ref().child('solar');
solarVoltageRef.on('value', snap => {
    document.getElementById("solarVoltage").innerHTML = `${snap.val() || 34} <span class="unit">V</span>`;
});



var dulieu2=firebase.database();
//var firebaseRef = firebase.database().ref().child('/hourof');
var x=0;

wakeButton.onclick =function(){
x++;
   console.log(x);
if(x>1){
    x=0;
}
if(x==0){
   
    dulieu2.ref().update({
        ESP32_status:0,   
      });
}
if(x==1){
   
    dulieu2.ref().update({
        ESP32_status:1,       
      });
}

}

// Wake button functionality (unchanged, but updated ID for consistency)
document.getElementById('wakeButton').addEventListener('click', () => {
    const espRef = firebase.database().ref().child('ESP32_status');
    espRef.set(x)
        .then(() => {
            //document.querySelector('.esp-status').textContent = 'Trạng thái: Đang đánh thức ESP32...';  
        })
        .catch(error => console.error("Error waking ESP32:", error));
});

///////////////////////////////////////////////////////
// Reference to Firebase Realtime Database (assuming this is already initialized in your code)
const database = firebase.database();

// Monitor ESP32 status from Firebase
const status2Ref = database.ref('ESP32_status');
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
//////////////////////////////////////////
//const database = firebase.database();

// Monitor ESP32 status from Firebase
const sleep = database.ref('ESP32_sleep');
sleep.on('value', (snap) => {
    const value = snap.val(); // Get the value from the snapshot

    if (value === 1) {
        document.querySelector('.esp-status').textContent = 'Trạng thái: ESP32 đã thức';
       
    } else if (value === 0) {
        document.querySelector('.esp-status').textContent = 'Trạng thái: ESP32 đang ngủ ZZZ';
      
    } else {
        console.warn("Unexpected value for ESP32_status:", value);
        document.querySelector('.esp-status').textContent = 'Thông tin: Trạng thái không xác định';
        document.querySelector('.esp-status').style.color = '#ffffff'; // Default color (white) for unknown status
    }
}, (error) => {
    console.error("Error fetching ESP32 status:", error);
    document.querySelector('.esp-status').textContent = 'Thông tin: Lỗi kết nối';
    document.querySelector('.esp-status').style.color = '#e74c3c'; // Red for error state
});

///////////////////////////////
/////////////////hiển thị trạng thái lên text/////////////////////////

const relay_1 = database.ref('relay');
relay_1.on('value', (snap) => {
    const value2 = snap.val(); // Get the value from the snapshot

    if (value2 === 1) {
        document.querySelector('.restart').textContent = 'Đang restart raspi...';
        document.querySelector('.restart').style.color = '#f8f6f6'; // White for "Đã restart raspi"

        // Set a timeout to reset the 'relay' value to 0 after 20 seconds
        setTimeout(() => {
            relay_1.set(0)
                .then(() => {
                    document.querySelector('.restart').textContent = 'Đã restart thành công';
                    console.log("Relay automatically reset to 0 after 10 seconds");
                })
                .catch(error => {
                    console.error("Error resetting relay to 0:", error);
                    alert("Có lỗi xảy ra khi reset relay. Vui lòng kiểm tra console để biết chi tiết.");
                });
        }, 10000); // 20 seconds in milliseconds
    } else if (value2 === 0) {
        document.querySelector('.restart').textContent = 'Trạng thái: Đang hoạt động';
        document.querySelector('.restart').style.color = '#e74c3c'; // Red for "Đang hoạt động"
    } else {
        console.warn("Unexpected value for relay:", value2); // Fixed the variable name from 'value' to 'value2'
        document.querySelector('.restart').textContent = 'Trạng thái: Trạng thái không xác định';
        document.querySelector('.restart').style.color = '#ffffff'; // Default color (white) for unknown status
    }
}, (error) => {
    console.error("Error fetching relay status:", error);
    document.querySelector('.restart').textContent = 'Thông tin: Lỗi kết nối';
    document.querySelector('.restart').style.color = '#e74c3c'; // Red for error state
});
///////////////////////////////
var dulieu3=firebase.database();
var x3=0;
relay_button.onclick =function(){
x3++;
console.log(x3);
if(x3>1){
    x3=0;
}
if(x3==0){ 
    dulieu3.ref().update({
       relay:0,   
      });
}
if(x3==1){
   
    dulieu3.ref().update({
        relay:1,       
      });
}

}

// Wake button functionality (unchanged, but updated ID for consistency)
document.getElementById('relay').addEventListener('click', () => {
    const espRef = firebase.database().ref().child('relay');
    espRef.set(x3)
        .then(() => {
            //document.querySelector('.esp-status').textContent = 'Trạng thái: Đang đánh thức ESP32...';  
        })
        .catch(error => console.error("Error waking ESP32:", error));
});

///////////////////////////////////////////////////////




