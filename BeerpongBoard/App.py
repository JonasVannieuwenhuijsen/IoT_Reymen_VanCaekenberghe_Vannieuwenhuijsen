import json
import ssl

import eventlet
from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_cors import CORS
from flask_mqtt import Mqtt
from flask_socketio import SocketIO

eventlet.monkey_patch()

app = Flask(__name__)
app.config['SECRET'] = 'my secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = False
app.config['MQTT_BROKER_URL'] = '8e7cb7e79ef04fd996c2fc920e3472bd.s1.eu.hivemq.cloud'
# app.config['MQTT_BROKER_URL'] = '192.168.1.5'
# app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = 'BeerPong'
app.config['MQTT_PASSWORD'] = 'BeerPong123'
app.config['MQTT_KEEPALIVE'] = 5

# Parameters for SSL enabled
app.config['MQTT_BROKER_PORT'] = 8883
app.config['MQTT_TLS_ENABLED'] = True
app.config['MQTT_TLS_INSECURE'] = False
app.config['MQTT_TLS_CA_CERTS'] = 'cacert.pem'
app.config['CLIENT_ID'] = 'clientId-jOhjWA7Pbj'

app.config['MQTT_TLS_VERSION'] = ssl.PROTOCOL_TLSv1_2

cors = CORS(app, resources={r"*": {"origins": "*"}})
mqtt = Mqtt(app)
# socketio = SocketIO(app)
bootstrap = Bootstrap(app)
socketio = SocketIO(app, cors_allowed_origins='*')


# socketio.init_app(app, cors_allowed_origins="*")


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/beerpong')
def beerpong():
    return render_template('beerpong.html')


@socketio.on('publish')
def handle_publish(json_str):
    data = json.loads(json_str)
    mqtt.publish(data['topic'], data['message'])


@socketio.on('subscribe')
def handle_subscribe(json_str):
    data = json.loads(json_str)
    mqtt.subscribe(data['topic'])


@socketio.on('unsubscribe_all')
def handle_unsubscribe_all():
    mqtt.unsubscribe_all()


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )
    socketio.emit('mqtt_message', data=data)


@mqtt.on_log()
def handle_logging(client, userdata, level, buf):
    print(level, buf)


if __name__ == '__main__':
    # mqtt.subscribe('subscribe_data_player_1')
    # mqtt.subscribe('subscribe_data_player_2')
    socketio.run(app, host='0.0.0.0', port=80, use_reloader=False, debug=True)
