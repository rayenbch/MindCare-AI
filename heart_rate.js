import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs';
import { fft, abs, fftFreq } from 'mathjs';

// Setup video capture
const video = document.createElement('video');
document.body.appendChild(video);

async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
}

// Load FaceAPI models
async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
}

// Variables for heart rate estimation
const fps = 30;
const captureTime = 5;
const frameCount = fps * captureTime;
let frameBuffer = [];

async function detectFaceAndBPM() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    setInterval(async () => {
        // Capture frame
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Detect face
        const detection = await faceapi.detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions());
        if (detection) {
            const { x, y, width, height } = detection.box;

            // Extract forehead ROI
            const foreheadY1 = y;
            const foreheadY2 = y + height / 4;
            const foreheadX1 = x;
            const foreheadX2 = x + width;

            const imageData = ctx.getImageData(foreheadX1, foreheadY1, foreheadX2 - foreheadX1, foreheadY2 - foreheadY1);
            const grayscaleData = imageData.data.filter((_, index) => index % 4 === 0); // Extract grayscale values

            const meanIntensity = grayscaleData.reduce((a, b) => a + b, 0) / grayscaleData.length;
            frameBuffer.push(meanIntensity);

            if (frameBuffer.length > frameCount) {
                frameBuffer.shift(); // Keep buffer size constant

                // Apply FFT for heart rate estimation
                const fftResult = fft(frameBuffer);
                const freqs = fftFreq(fftResult.length, fps);
                const validIndices = freqs.map((f, i) => (f > 0.5 && f < 3.0 ? i : -1)).filter(i => i !== -1);
                const validFreqs = validIndices.map(i => freqs[i]);
                const validFFT = validIndices.map(i => abs(fftResult[i]));

                if (validFreqs.length > 0) {
                    const peakFreq = validFreqs[validFFT.indexOf(Math.max(...validFFT))];
                    const bpm = Math.abs(peakFreq * 60);
                    console.log(`✅ BPM Detected: ${bpm.toFixed(2)}`);
                } else {
                    console.log("❌ No valid BPM detected.");
                }
            }
        }
    }, 1000 / fps);
}

// Start the app
async function main() {
    await loadModels();
    await startCamera();
    detectFaceAndBPM();
}

main();
