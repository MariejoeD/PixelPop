// Function to simulate file manager opening
function openFileManager() {
    alert("File Manager would open here.");
}
async function startWebcam() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                document.getElementById('webcam').srcObject = stream;
            } catch (err) {
                console.error("Error accessing webcam: ", err);
            }
        }

        startWebcam();