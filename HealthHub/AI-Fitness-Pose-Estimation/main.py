from flask import Flask
from flask_socketio import SocketIO, emit
import cv2
import base64
import numpy as np
import mediapipe as mp
import math

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)


def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    if angle > 180:
        angle = 360 - angle
    return angle


@socketio.on('connect_biceps')
def test_connect():
    global left_biceps_counter, left_biceps_stage, right_biceps_counter, right_biceps_stage
    left_biceps_counter = 0
    left_biceps_stage = "down"
    right_biceps_counter = 0
    right_biceps_stage = "down"
    print('Client connected')


@socketio.on('disconnect_biceps')
def test_disconnect():
    print('Client disconnected')


# -----------------------Biceps---------------------------------------#
left_biceps_counter = 0
left_biceps_stage = "down"
right_biceps_counter = 0
right_biceps_stage = "down"


@socketio.on('reset_biceps')
def reset_biceps_counter():
    global left_biceps_counter, left_biceps_stage, right_biceps_counter, right_biceps_stage
    left_biceps_counter = 0
    left_biceps_stage = "down"
    right_biceps_counter = 0
    right_biceps_stage = "down"
    print('Counter reset')


@socketio.on('image_biceps')
def handle_biceps_image(data):
    global left_biceps_counter, left_biceps_stage, right_biceps_counter, right_biceps_stage
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

        update_stage_and_counter_biceps(l_angle, 'left')
        update_stage_and_counter_biceps(r_angle, 'right')

        # Draw annotations on image
        draw_annotations_biceps(image, results, l_angle, r_angle)

    _, buffer = cv2.imencode('.jpg', image)
    response_image = base64.b64encode(buffer).decode('utf-8')
    # emit('response', {'image': response_image})

    emit('response', {'image': response_image, 'data': {
        'leftReps': left_biceps_counter,
        'leftStage': left_biceps_stage,
        'rightReps': right_biceps_counter,
        'rightStage': right_biceps_stage
    }})


def update_stage_and_counter_biceps(angle, side):
    global left_biceps_counter, left_biceps_stage, right_biceps_counter, right_biceps_stage
    if side == 'left':
        if angle > 150 and left_biceps_stage != "down":
            left_biceps_stage = "down"
        elif angle < 50 and left_biceps_stage == "down":
            left_biceps_stage = "up"
            left_biceps_counter += 1
    else:
        if angle > 150 and right_biceps_stage != "down":
            right_biceps_stage = "down"
        elif angle < 50 and right_biceps_stage == "down":
            right_biceps_stage = "up"
            right_biceps_counter += 1


def draw_annotations_biceps(image, results, l_angle, r_angle):
    global left_biceps_counter, left_biceps_stage, right_biceps_counter, right_biceps_stage
    cv2.putText(image, f'Left Angle: {int(l_angle)}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left REPS: ' + str(left_biceps_counter), (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255),
                2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left STAGE: ' + left_biceps_stage, (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)

    cv2.putText(image, f'Right Angle: {int(r_angle)}', (400, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right REPS: ' + str(right_biceps_counter), (400, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8,
                (0, 0, 255), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right STAGE: ' + right_biceps_stage, (400, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)
    mp_drawing.draw_landmarks(
        image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
        mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
        mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
    )


# -----------------------Squat---------------------------------------#
squat_counter = 0
squat_stage = "up"
squat_tips = ""


@socketio.on('reset_squat')
def reset_squat_counter():
    global squat_counter, squat_stage, squat_tips
    squat_counter = 0
    squat_stage = "down"
    squat_tips = ""
    print('Counter reset')


@socketio.on('image_squat')
def handle_squat_image(data):
    global squat_counter, squat_stage, squat_tips
    img_data = data['image']
    img_data = base64.b64decode(img_data)
    nparr = np.frombuffer(img_data, dtype=np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark

        l_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * image.shape[1],
                 landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * image.shape[0]]
        l_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * image.shape[1],
                  landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * image.shape[0]]
        l_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y * image.shape[0]]
        l_angle = calculate_angle(l_hip, l_knee, l_ankle)

        update_stage_and_counter_squat(l_angle, 'left')
        draw_annotations_squat(image, results, l_angle)

    _, buffer = cv2.imencode('.jpg', image)
    response_image = base64.b64encode(buffer).decode('utf-8')
    emit('response', {'image': response_image, 'data': {
        'reps': squat_counter,
        'stage': squat_stage
    }})


def update_stage_and_counter_squat(angle, side):
    global squat_counter, squat_stage, squat_tips
    if angle > 150 and squat_stage != "up":
        squat_stage = "up"
        squat_tips = ""
    elif angle < 90 and squat_stage == "up":
        squat_stage = "down"
        squat_counter += 1
        squat_tips = ""

    if angle < 70:
        squat_tips = "squat too deep"
    elif 100 < angle < 120 and squat_stage != "down":
        squat_tips = "squat too shallow"


def draw_annotations_squat(image, results, l_angle):
    global squat_counter, squat_stage, squat_tips
    cv2.putText(image, f'Angle: {int(l_angle)}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'REPS: ' + str(squat_counter), (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255),
                2,
                cv2.LINE_AA)
    cv2.putText(image, 'STAGE: ' + squat_stage, (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'TIPS: ' + squat_tips, (10, 200), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)

    mp_drawing.draw_landmarks(
        image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
        mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
        mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
    )


# -----------------------Pushup---------------------------------------#
pushup_counter = 0
pushup_stage = "down"
pushup_tips = ""


@socketio.on('reset_pushup')
def reset_pushup_counter():
    global pushup_counter, pushup_stage, pushup_tips
    pushup_counter = 0
    pushup_stage = "down"
    pushup_tips = ""
    print('Counter reset')


@socketio.on('image_pushup')
def handle_pushup_image(data):
    global pushup_counter, pushup_stage, pushup_tips
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

        update_stage_and_counter_pushup(l_angle, 'left')
        draw_annotations_pushup(image, results, l_angle)

    _, buffer = cv2.imencode('.jpg', image)
    response_image = base64.b64encode(buffer).decode('utf-8')
    emit('response', {'image': response_image, 'data': {
        'reps': pushup_counter,
        'stage': pushup_stage,
        'tips': pushup_tips
    }})


def update_stage_and_counter_pushup(angle, side):
    global pushup_counter, pushup_stage, pushup_tips
    if angle < 90 and pushup_stage != "down":
        pushup_stage = "down"
        pushup_tips = ""
    elif angle > 150 and pushup_stage == "down":
        pushup_stage = "up"
        pushup_counter += 1
        pushup_tips = ""

    if angle < 120:
        pushup_tips = "elbows too wide"
    elif 100 < angle < 140 and pushup_stage != "down":
        pushup_tips = "elbows too narrow"


def draw_annotations_pushup(image, results, l_angle):
    global pushup_counter, pushup_stage, pushup_tips
    cv2.putText(image, f'Angle: {int(l_angle)}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'REPS: ' + str(pushup_counter), (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255),
                2,
                cv2.LINE_AA)
    cv2.putText(image, 'STAGE: ' + pushup_stage, (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'TIPS: ' + pushup_tips, (10, 200), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)

    mp_drawing.draw_landmarks(
        image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
        mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
        mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
    )


# -----------------------Shoulder-Press---------------------------------------#

left_shoulder_counter = 0
left_shoulder_stage = "neutral"
right_shoulder_counter = 0
right_shoulder_stage = "neutral"


@socketio.on('reset_shoulder')
def reset_shoulder_counter():
    global left_shoulder_counter, left_shoulder_stage, right_shoulder_counter, right_shoulder_stage
    left_shoulder_counter = 0
    left_shoulder_stage = "neutral"
    right_shoulder_counter = 0
    right_shoulder_stage = "neutral"
    print('Counter reset')


@socketio.on('image_shoulder')
def handle_shoulder_image(data):
    global left_shoulder_counter, left_shoulder_stage, right_shoulder_counter, right_shoulder_stage
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
        l_angle = calculate_angle(l_wrist, l_elbow, l_shoulder)

        r_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * image.shape[1],
                      landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * image.shape[0]]
        r_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y * image.shape[0]]
        r_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y * image.shape[0]]
        r_angle = calculate_angle(r_wrist, r_elbow, r_shoulder)

        update_stage_and_counter_shoulder(l_angle, 'left')
        update_stage_and_counter_shoulder(r_angle, 'right')

        # Draw annotations on image
        draw_annotations_shoulder(image, results, l_angle, r_angle)

    _, buffer = cv2.imencode('.jpg', image)
    response_image = base64.b64encode(buffer).decode('utf-8')
    emit('response', {'image': response_image, 'data': {
        'leftReps': left_shoulder_counter,
        'leftStage': left_shoulder_stage,
        'rightReps': right_shoulder_counter,
        'rightStage': right_shoulder_stage
    }})


def update_stage_and_counter_shoulder(angle, side):
    global left_shoulder_counter, left_shoulder_stage, right_shoulder_counter, right_shoulder_stage
    threshold_up = 150
    threshold_down = 50
    threshold_reset = 90

    if side == 'left':
        if angle > threshold_up and left_shoulder_stage == "neutral":
            left_shoulder_stage = "up"
        elif angle < threshold_down and left_shoulder_stage == "up":
            left_shoulder_stage = "down"
            left_shoulder_counter += 1
        elif threshold_down < angle < threshold_reset:
            left_shoulder_stage = "neutral"

    else:
        if angle > threshold_up and right_shoulder_stage == "neutral":
            right_shoulder_stage = "up"
        elif angle < threshold_down and right_shoulder_stage == "up":
            right_shoulder_stage = "down"
            right_shoulder_counter += 1
        elif threshold_down < angle < threshold_reset:
            right_shoulder_stage = "neutral"


def draw_annotations_shoulder(image, results, l_angle, r_angle):
    global left_shoulder_counter, left_shoulder_stage, right_shoulder_counter, right_shoulder_stage
    cv2.putText(image, f'Left Angle: {int(l_angle)}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left REPS: ' + str(left_shoulder_counter), (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8,
                (0, 0, 255),
                2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left STAGE: ' + left_shoulder_stage, (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                cv2.LINE_AA)

    cv2.putText(image, f'Right Angle: {int(r_angle)}', (400, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right REPS: ' + str(right_shoulder_counter), (400, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8,
                (0, 0, 255), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right STAGE: ' + right_shoulder_stage, (400, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0),
                2,
                cv2.LINE_AA)
    mp_drawing.draw_landmarks(
        image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
        mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
        mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
    )


# -----------------------Lateral-Raises---------------------------------------#

left_lateral_counter = 0
left_lateral_stage = "neutral"
left_lateral_tips = ""

right_lateral_counter = 0
right_lateral_stage = "neutral"
right_lateral_tips = ""


@socketio.on('reset_lateral')
def reset_lateral_counter():
    global left_lateral_counter, left_lateral_stage, right_lateral_counter, right_lateral_stage, left_lateral_tips, right_lateral_tips
    left_lateral_counter = 0
    left_lateral_stage = "neutral"
    left_lateral_tips = ""
    right_lateral_counter = 0
    right_lateral_stage = "neutral"
    right_lateral_tips = ""
    print('Counter reset')


# def calculate_angle_lateral_raises(a, b, c):
#     ba = ((a[0] - b[0]), (a[1] - b[1]))
#     bc = ((c[0] - b[0]), (c[1] - b[1]))
#
#     dot_product = (ba[0] * bc[0]) + (ba[1] * bc[1])
#
#     magnitude_ba = math.sqrt((ba[0] ** 2) + (ba[1] ** 2))
#     magnitude_bc = math.sqrt((bc[0] ** 2) + (bc[1] ** 2))
#
#     cos_angle = dot_product / (magnitude_ba * magnitude_bc)
#     angle = math.acos(cos_angle)
#
#     angle_degrees = math.degrees(angle)
#     return angle_degrees

def calculate_angle_lateral_raises(shoulder, wrist, hip):
    vec1 = [wrist[0] - shoulder[0], wrist[1] - shoulder[1]]
    vec2 = [hip[0] - shoulder[0], hip[1] - shoulder[1]]

    dot_product = vec1[0] * vec2[0] + vec1[1] * vec2[1]

    magnitude_vec1 = math.sqrt(vec1[0] ** 2 + vec1[1] ** 2)
    magnitude_vec2 = math.sqrt(vec2[0] ** 2 + vec2[1] ** 2)

    cos_angle = dot_product / (magnitude_vec1 * magnitude_vec2)
    angle = math.acos(cos_angle)

    angle_degrees = math.degrees(angle)
    return angle_degrees


@socketio.on('image_lateral')
def handle_lateral_raises_image(data):
    global left_lateral_counter, left_lateral_stage, right_lateral_counter, right_lateral_stage
    img_data = data['image']
    img_data = base64.b64decode(img_data)
    nparr = np.frombuffer(img_data, dtype=np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark

        l_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * image.shape[1],
                      landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * image.shape[0]]
        # l_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x * image.shape[1],
        #            landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y * image.shape[0]]
        l_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y * image.shape[0]]
        l_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * image.shape[1],
                 landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * image.shape[0]]
        l_angle = calculate_angle_lateral_raises(l_shoulder, l_wrist, l_hip)

        r_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * image.shape[1],
                      landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * image.shape[0]]
        # r_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x * image.shape[1],
        #            landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y * image.shape[0]]
        r_hip = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x * image.shape[1],
                 landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y * image.shape[0]]
        r_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x * image.shape[1],
                   landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y * image.shape[0]]
        r_angle = calculate_angle_lateral_raises(r_shoulder, r_wrist, r_hip)

        update_stage_and_counter_lateral(l_angle, 'left')
        update_stage_and_counter_lateral(r_angle, 'right')

        # Draw annotations on image
        draw_annotations_lateral(image, results, l_angle, r_angle)

    _, buffer = cv2.imencode('.jpg', image)
    response_image = base64.b64encode(buffer).decode('utf-8')
    emit('response', {'image': response_image, 'data': {
        'leftReps': left_lateral_counter,
        'leftStage': left_lateral_stage,
        'rightReps': right_lateral_counter,
        'rightStage': right_lateral_stage
    }})


def update_stage_and_counter_lateral(angle, side):
    global left_lateral_counter, left_lateral_stage, right_lateral_counter, right_lateral_stage, left_lateral_tips, right_lateral_tips
    threshold_up = 95
    threshold_down = 90
    threshold_max_up = 110

    if side == 'left':
        if angle > threshold_max_up:
            left_lateral_tips = "Raise too high"
        else:
            left_lateral_tips = ""
        if threshold_max_up > angle > threshold_up and left_lateral_stage != "up":
            left_lateral_stage = "up"
            left_lateral_counter += 1
        elif angle < threshold_down and left_lateral_stage == "up":
            left_lateral_stage = "down"

    else:
        if angle > threshold_max_up:
            right_lateral_tips = "Raise too high"
        else:
            right_lateral_tips = ""
        if threshold_max_up > angle > threshold_up and right_lateral_stage != "up":
            right_lateral_stage = "up"
            right_lateral_counter += 1
        elif angle < threshold_down and right_lateral_stage == "up":
            right_lateral_stage = "down"


def draw_annotations_lateral(image, results, l_angle, r_angle):
    global left_lateral_counter, left_lateral_stage, right_lateral_counter, right_lateral_stage, left_lateral_tips, right_lateral_tips
    cv2.putText(image, f'Left Angle: {int(l_angle)}', (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left REPS: ' + str(left_lateral_counter), (5, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                (0, 0, 255),
                2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left STAGE: ' + left_lateral_stage, (5, 95), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Left TIPS: ' + left_lateral_tips, (5, 125), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 51, 51), 2,
                cv2.LINE_AA)

    cv2.putText(image, f'Right Angle: {int(r_angle)}', (345, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right REPS: ' + str(right_lateral_counter), (345, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                (0, 0, 255), 2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right STAGE: ' + right_lateral_stage, (345, 95), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0),
                2,
                cv2.LINE_AA)
    cv2.putText(image, 'Right TIPS: ' + right_lateral_tips, (345, 125), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 51, 51), 2,
                cv2.LINE_AA)
    mp_drawing.draw_landmarks(
        image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
        mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
        mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
    )


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
