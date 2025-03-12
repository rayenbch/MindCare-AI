# %%
from fastapi import FastAPI
import cv2
import numpy as np
import torch
from facenet_pytorch import MTCNN
import uvicorn
import asyncio

app = FastAPI()

# Initialize face detector
mtcnn = MTCNN(keep_all=False)

# Open camera
cap = cv2.VideoCapture(0)

# FPS and frame buffer settings
fps = cap.get(cv2.CAP_PROP_FPS) or 30  # Default to 30 FPS if unknown
frame_buffer = []
frame_count = int(fps * 5)  # Collect 5 seconds of data

@app.get("/")
def read_root():
    return {"message": "Welcome to Heart Rate Detection API"}

@app.get("/bpm")
def get_bpm():
    global frame_buffer

    ret, frame = cap.read()
    if not ret:
        return {"error": "Camera not detected"}

    # Convert to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect face
    boxes, _ = mtcnn.detect(rgb_frame)

    if boxes is not None:
        x1, y1, x2, y2 = map(int, boxes[0])  # Use first detected face

        # Extract forehead ROI
        forehead_y1 = y1
        forehead_y2 = y1 + (y2 - y1) // 4  # Top 25% of the face
        forehead_x1, forehead_x2 = x1, x2

        if forehead_y2 > frame.shape[0] or forehead_x2 > frame.shape[1]:
            return {"error": "Forehead region out of bounds"}

        forehead_roi = frame[forehead_y1:forehead_y2, forehead_x1:forehead_x2]

        # Ensure ROI is valid
        if forehead_roi.size == 0:
            return {"error": "No valid forehead region detected"}

        # Convert to grayscale & extract brightness intensity
        forehead_gray = cv2.cvtColor(forehead_roi, cv2.COLOR_BGR2GRAY)
        frame_buffer.append(np.mean(forehead_gray))

        # Keep only the last N frames
        if len(frame_buffer) > frame_count:
            frame_buffer.pop(0)  # Remove oldest frame

            # Apply Fast Fourier Transform (FFT)
            fft_result = np.fft.fft(frame_buffer)
            freqs = np.fft.fftfreq(len(fft_result), d=1/fps)

            # Filter valid heart rate frequencies (0.5 - 3 Hz)
            valid_indices = np.where((freqs > 0.5) & (freqs < 3.0))
            valid_freqs = freqs[valid_indices]
            valid_fft = np.abs(fft_result[valid_indices])

            # Get the peak frequency
            if len(valid_freqs) > 0:
                peak_freq = valid_freqs[np.argmax(valid_fft)]
                bpm = abs(peak_freq * 60)  # Convert to beats per minute
            else:
                bpm = 0  # No valid frequency detected

            return {"bpm": int(bpm)}

    return {"bpm": 0, "error": "Face not detected"}
# Run the API server properly in Jupyter / Interactive Shell
if __name__ == "__main__":
    if asyncio.get_event_loop().is_running():
        print("⚠️ Running inside an active event loop. Use 'uvicorn' from the terminal.")
    else:
        uvicorn.run(app, host="0.0.0.0", port=8000)




# %%



