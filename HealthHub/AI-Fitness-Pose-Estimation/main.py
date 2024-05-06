from flask import Flask
from flask_socketio import SocketIO, emit
import cv2
import base64
import numpy as np
import mediapipe as mp

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
left_counter = 0
left_stage = "down"
right_counter = 0
right_stage = "down"


def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    if angle > 180:
        angle = 360 - angle
    return angle


@socketio.on('connect')
def test_connect():
    global left_counter, left_stage, right_counter, right_stage
    left_counter = 0
    left_stage = "down"
    right_counter = 0
    right_stage = "down"
    print('Client connected')


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('reset')
def reset_counter():
    global left_counter, left_stage, right_counter, right_stage
    left_counter = 0
    left_stage = "down"
    right_counter = 0
    right_stage = "down"
    print('Counter reset')


@socketio.on('image')
def handle_image(data):
    global left_counter, left_stage, right_counter, right_stage
    img_data = data['image']
    img_data = base64.b64decode(img_data)
    nparr = np.frombuffer(img_data, dtype=np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark

        l_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * image.shape[1],
                      landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * image.shape[0]]
        l_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y * image.shape[0]]
        l_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y * image.shape[0]]
        l_angle = calculate_angle(l_shoulder, l_elbow, l_wrist)

        r_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * image.shape[1],
                      landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * image.shape[0]]
        r_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y * image.shape[0]]
        r_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y * image.shape[0]]
        r_angle = calculate_angle(r_shoulder, r_elbow, r_wrist)

        update_stage_and_counter(l_angle, 'left')
        update_stage_and_counter(r_angle, 'right')

        # Draw annotations on image
        draw_annotations(image, results, l_angle, r_angle)

    _, buffer = cv2.imencode('.jpg', image)
    response_image = base64.b64encode(buffer).decode('utf-8')
    # emit('response', {'image': response_image})

    emit('response', {'image': response_image, 'data': {
        'leftReps': left_counter,
        'leftStage': left_stage,
        'rightReps': right_counter,
        'rightStage': right_stage
    }})


def update_stage_and_counter(angle, side):
    global left_counter, left_stage, right_counter, right_stage
    if side == 'left':
        if angle > 150 and left_stage != "down":
            left_stage = "down"
        elif angle < 50 and left_stage == "down":
            left_stage = "up"
            left_counter += 1
    else:
        if angle > 150 and right_stage != "down":
            right_stage = "down"
        elif angle < 50 and right_stage == "down":
            right_stage = "up"
            right_counter += 1


def draw_annotations(image, results, l_angle, r_angle):
    global left_counter, left_stage, right_counter, right_stage
    cv2.putText(image, f'Left Angle: {int(l_angle)}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left REPS: ' + str(left_counter), (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left STAGE: ' + left_stage, (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)

    cv2.putText(image, f'Right Angle: {int(r_angle)}', (400, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right REPS: ' + str(right_counter), (400, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right STAGE: ' + right_stage, (400, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)
    mp_drawing.draw_landmarks(
        image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
        mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
        mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
    )


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
