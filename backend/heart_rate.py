import cv2
import numpy as np
import torch
from facenet_pytorch import MTCNN

# Initialize MTCNN
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
mtcnn = MTCNN(keep_all=False, device=device)

# Open camera
cap = cv2.VideoCapture(0)

# Set FPS (default to 30 if not detected)
fps = cap.get(cv2.CAP_PROP_FPS)
if fps == 0 or fps is None:
    fps = 30

capture_time = 5  # Seconds of data for BPM estimation
frame_count = int(fps * capture_time)

# Buffer to store brightness data
frame_buffer = []

def get_bpm():
    """Detects face, extracts forehead, and estimates BPM."""
    global frame_buffer

    ret, frame = cap.read()
    if not ret:
        return {"error": "Camera not detected"}

    # Convert to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect face
    boxes, _ = mtcnn.detect(rgb_frame)

    if boxes is None:
        return {"bpm": 0, "error": "Face not detected"}

    x1, y1, x2, y2 = map(int, boxes[0])

    # Extract forehead region (upper part of face)
    forehead_y1 = y1
    forehead_y2 = y1 + (y2 - y1) // 4  # Top 25% of the face
    forehead_x1, forehead_x2 = x1, x2

    # Ensure forehead region is within bounds
    if forehead_y2 > frame.shape[0] or forehead_x2 > frame.shape[1]:
        return {"error": "Forehead region out of bounds"}

    forehead_roi = frame[forehead_y1:forehead_y2, forehead_x1:forehead_x2]

    if forehead_roi.size == 0:
        return {"error": "No valid forehead region detected"}

    # Convert to grayscale and extract brightness intensity
    forehead_gray = cv2.cvtColor(forehead_roi, cv2.COLOR_BGR2GRAY)
    intensity = np.mean(forehead_gray)
    frame_buffer.append(intensity)

    # ✅ New Fix: Ensure enough frames are collected before processing
    if len(frame_buffer) < frame_count:
        return {"bpm": 0, "error": f"Collecting data... {len(frame_buffer)}/{frame_count} frames collected"}

    # Keep only last N frames
    if len(frame_buffer) > frame_count:
        frame_buffer.pop(0)

    # Apply FFT for BPM estimation
    fft_result = np.fft.fft(frame_buffer)
    freqs = np.fft.fftfreq(len(fft_result), d=1/fps)

    # Filter valid frequencies (0.5 - 3.0 Hz)
    valid_indices = np.where((freqs > 0.5) & (freqs < 3.0))
    valid_freqs = freqs[valid_indices]
    valid_fft = np.abs(fft_result[valid_indices])

    if len(valid_freqs) > 0:
        peak_freq = valid_freqs[np.argmax(valid_fft)]
        bpm = abs(peak_freq * 60)
        return {"bpm": int(bpm)}
    else:
        return {"bpm": 0, "error": "No valid BPM detected"}

