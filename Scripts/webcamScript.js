async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('webcam').srcObject = stream;
    } catch (err) {
        console.error("Error accessing webcam: ", err);
    }
}

// Capture a snapshot
function takeSnapshot(index) {
    const video = document.getElementById('webcam');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to image and display
    const imgURL = canvas.toDataURL('image/png');
    const imgElement = document.createElement('img');
    imgElement.src = imgURL;
    imgElement.alt = `Snapshot ${index + 1}`;
    imgElement.style.width = "100px"; // Adjust size

    document.getElementById('snapshots').appendChild(imgElement);
}

// Start taking 10 snapshots with a 5-second interval
function startTimedSnapshots() {
    let count = 5;
    let interval = 5; // 5 seconds
    let snapshotIndex = 0;

    const timerDisplay = document.getElementById('timer');
    timerDisplay.style.display = "block"; // Show timer

    const countdown = setInterval(() => {
        if (count > 0) {
            timerDisplay.textContent = `${count}`;
            count--;
        } else {
            takeSnapshot(snapshotIndex);
            snapshotIndex++;
            count = interval;

            if (snapshotIndex >= 4) {
                clearInterval(countdown);
                timerDisplay.textContent = "Snapshots completed!";
                setTimeout(() => {
                    window.location.href = "four-templates.html"; 
                }, 2000);
                
            }
        }
    }, 1000);
}

// Attach event listener
document.getElementById('snap').addEventListener('click', startTimedSnapshots);

startWebcam();