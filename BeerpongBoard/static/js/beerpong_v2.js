var g_id_selected_dot;

var g_player1_sensor_data = '000000';
var g_player2_sensor_data = '000000';

var g_player1_leds = '111111111111111111';
var g_player2_leds = '111111111111111111';

var g_player1_dots = '111111111111111111';
var g_player2_dots = '111111111111111111';

// var g_player1_score = '0';
// var g_player2_score = '0';

g_player = "None"

$(document).ready(function () {
    var player_number = $('#player_number').val();
    g_player = player_number;
    if (player_number === "1") {
        $('.switch-button').show();

        var innerHTML =
            '<div class="container-sleep" id="sleep_div"></div>' +
            '<h1 class="header-player-one" id="header_player_one">PLAYER ONE.</h1>' +
            '<h1 class="header-player-two" id="header_player_two">PLAYER TWO.</h1>' +
            '<p class="p-player-one" id="score_player_one">SCORE: 0/6</p>' +
            '<p class="p-player-two" id="score_player_two">SCORE: 0/6</p>' +
            '<div class="box">' +
            '<div>' +
            '<div class="circle circle-left" id="player1_dot1" onclick="changeCupColor(\'player1_dot1\')"></div>' +
            '<div class="circle circle-left" id="player1_dot2" onclick="changeCupColor(\'player1_dot2\')"></div>' +
            '<div class="circle circle-left" id="player1_dot3" onclick="changeCupColor(\'player1_dot3\')"></div>' +
            '<div class="circle circle-left" id="player1_dot4" onclick="changeCupColor(\'player1_dot4\')"></div>' +
            '<div class="circle circle-left" id="player1_dot5" onclick="changeCupColor(\'player1_dot5\')"></div>' +
            '<div class="circle circle-left" id="player1_dot6" onclick="changeCupColor(\'player1_dot6\')"></div>' +
            '</div>' +
            '</div>' +

            '<div class="box box-right">' +
            '<div>' +
            '<div class="circle" id="player2_dot1" onclick="changeCupColor(\'player2_dot1\')"></div>' +
            '<div class="circle" id="player2_dot2" onclick="changeCupColor(\'player2_dot2\')"></div>' +
            '<div class="circle" id="player2_dot3" onclick="changeCupColor(\'player2_dot3\')"></div>' +
            '<div class="circle" id="player2_dot4" onclick="changeCupColor(\'player2_dot4\')"></div>' +
            '<div class="circle" id="player2_dot5" onclick="changeCupColor(\'player2_dot5\')"></div>' +
            '<div class="circle" id="player2_dot6" onclick="changeCupColor(\'player2_dot6\')"></div>' +
            '</div>' +
            '</div>'

        $('#playboard_div').html(innerHTML);

        $('#header_player_one').html($('#header_player_one').html() + ' (YOU)');
    } else if (player_number === "2") {
        $('.switch-button').show();

        var innerHTML =
            '<div class="container-sleep" id="sleep_div"></div>' +
            '<h1 class="header-player-one" id="header_player_one">PLAYER ONE.</h1>' +
            '<h1 class="header-player-two" id="header_player_two">PLAYER TWO.</h1>' +
            '<p class="p-player-one" id="score_player_one">SCORE: 0/6</p>' +
            '<p class="p-player-two" id="score_player_two">SCORE: 0/6</p>' +
            '<div class="box">' +
            '<div>' +
            '<div class="circle" id="player1_dot1" onclick="changeCupColor(\'player1_dot1\')"></div>' +
            '<div class="circle" id="player1_dot2" onclick="changeCupColor(\'player1_dot2\')"></div>' +
            '<div class="circle" id="player1_dot3" onclick="changeCupColor(\'player1_dot3\')"></div>' +
            '<div class="circle" id="player1_dot4" onclick="changeCupColor(\'player1_dot4\')"></div>' +
            '<div class="circle" id="player1_dot5" onclick="changeCupColor(\'player1_dot5\')"></div>' +
            '<div class="circle" id="player1_dot6" onclick="changeCupColor(\'player1_dot6\')"></div>' +
            '</div>' +
            '</div>' +

            '<div class="box box-right">' +
            '<div>' +
            '<div class="circle circle-right" id="player2_dot1" onclick="changeCupColor(\'player2_dot1\')"></div>' +
            '<div class="circle circle-right" id="player2_dot2" onclick="changeCupColor(\'player2_dot2\')"></div>' +
            '<div class="circle circle-right" id="player2_dot3" onclick="changeCupColor(\'player2_dot3\')"></div>' +
            '<div class="circle circle-right" id="player2_dot4" onclick="changeCupColor(\'player2_dot4\')"></div>' +
            '<div class="circle circle-right" id="player2_dot5" onclick="changeCupColor(\'player2_dot5\')"></div>' +
            '<div class="circle circle-right" id="player2_dot6" onclick="changeCupColor(\'player2_dot6\')"></div>' +
            '</div>' +
            '</div>'

        $('#playboard_div').html(innerHTML);

        $('#header_player_two').html($('#header_player_two').html() + ' (YOU)');
    } else {
        $('.switch-button').hide();

        var innerHTML =
            '<h1 class="header-player-one">SELECT A PLAYER.</h1>' +
            '<a href="/beerpong?player=1"><button class="btn-player btn-player-box" id="choose_player_1">Choose player 1</button></a>' +
            '<a href="/beerpong?player=2"><button class="btn-player btn-player-box" id="choose_player_2">Choose player 2</button></a>'

        $('#playboard_div').html(innerHTML);
    }



    //var socket = io.connect('http://' + document.domain + ':' + location.port, {secure: true});
    var socket = io.connect('/');

    var subscribe_data_player_1 = '{"topic": "sensorValP1", "qos": 1}';
    socket.emit('subscribe', data = subscribe_data_player_1);

    var subscribe_data_player_2 = '{"topic": "sensorValP2", "qos": 1}';
    socket.emit('subscribe', data = subscribe_data_player_2);

    // subscribe to player 1 ledstatus
    var subscribe_leds_player_1 = '{"topic": "ledValP1", "qos": 1}';
    socket.emit('subscribe', data = subscribe_leds_player_1);

    // subscribe to player 2 ledstatus
    var subscribe_leds_player_2 = '{"topic": "ledValP2", "qos": 1}';
    socket.emit('subscribe', data = subscribe_leds_player_2);


    // subscribe to player 1 dotstatus
    var subscribe_dots_player_1 = '{"topic": "dotValP1", "qos": 1}';
    socket.emit('subscribe', data = subscribe_dots_player_1);

    // subscribe to player 2 dotstatus
    var subscribe_dots_player_2 = '{"topic": "dotValP2", "qos": 1}';
    socket.emit('subscribe', data = subscribe_dots_player_2);

    // subscribe to player 2 dotstatus
    var subscribe_score_player_1 = '{"topic": "scoreP1", "qos": 1}';
    socket.emit('subscribe', data = subscribe_score_player_1);

    // subscribe to player 2 dotstatus
    var subscribe_score_player_2 = '{"topic": "scoreP2", "qos": 1}';
    socket.emit('subscribe', data = subscribe_score_player_2);




    socket.on('mqtt_message', function (data) {
        if (data["topic"] === "sensorValP1") {
            var payload = data["payload"];
            g_player1_sensor_data = payload;

            var player_one_score = 0;

            if (g_player === '1') {
                var sensor_values = payload.split("");

                sensor_values.forEach((function (sensor_value, i) {
                    var dot_id = 'player1_dot' + (i + 1);
                    if (sensor_value === "1") {
                        var RGB = g_player1_leds.charAt(g_player1_leds.length - 18 + i * 3) + '' + g_player1_leds.charAt(g_player1_leds.length - 17 + i * 3) + '' + g_player1_leds.charAt(g_player1_leds.length - 16 + i * 3);
                        setCupOnToRGBCase(RGB, dot_id);
                    } else {
                        var RGB = g_player1_leds.charAt(g_player1_leds.length - 18 + i * 3) + '' + g_player1_leds.charAt(g_player1_leds.length - 17 + i * 3) + '' + g_player1_leds.charAt(g_player1_leds.length - 16 + i * 3);
                        setCupOffToRGBCase(RGB, dot_id);

                        player_one_score = player_one_score + 1;
                    }
                }));

                var leds_on = calculateLEDsThatCanBeTurnedOnAndTheirValue(payload, '1');
                publish(socket, 'ledValP1', leds_on, 1);

                $('#score_player_one').html('SCORE: ' + player_one_score + '/6');
                publish(socket, 'scoreP1', player_one_score, 1);
            }
        }

        if (data["topic"] === "sensorValP2") {
            var payload = data["payload"];
            g_player2_sensor_data = payload;

            var player_two_score = 0;

            if (g_player === '2') {
                var sensor_values = payload.split("");

                sensor_values.forEach((function (sensor_value, i) {
                    var dot_id = 'player2_dot' + (i + 1);
                    if (sensor_value === "1") {
                        var RGB = g_player2_leds.charAt(g_player2_leds.length - 18 + i * 3) + '' + g_player2_leds.charAt(g_player2_leds.length - 17 + i * 3) + '' + g_player2_leds.charAt(g_player2_leds.length - 16 + i * 3);
                        setCupOnToRGBCase(RGB, dot_id);
                    } else {
                        var RGB = g_player2_leds.charAt(g_player2_leds.length - 18 + i * 3) + '' + g_player2_leds.charAt(g_player2_leds.length - 17 + i * 3) + '' + g_player2_leds.charAt(g_player2_leds.length - 16 + i * 3);
                        setCupOffToRGBCase(RGB, dot_id);

                        player_two_score = player_two_score + 1;
                    }
                }));

                var leds_on = calculateLEDsThatCanBeTurnedOnAndTheirValue(payload, '2');
                publish(socket, 'ledValP2', leds_on, 1);

                $('#score_player_two').html('SCORE: ' + player_two_score + '/6');
                publish(socket, 'scoreP2', player_two_score, 1);
            }
        }

        if (g_player === "1") {
            if (data["topic"] === "ledValP2" || data["topic"] === "dotValP2") {
                if (data["topic"] === "dotValP2") {
                    g_player2_dots = data["payload"];
                }

                var RGB_values = g_player2_dots.split(/(.{3})/).filter(O => O);
                var sensor_values = g_player2_sensor_data.split("");

                sensor_values.forEach(function (sensor_value, i) {
                    var RGB_value = RGB_values[i];

                    if (sensor_value === '1') {
                        setCupOnToRGBCase(RGB_value, "player2_dot" + (i + 1));
                    } else {
                        setCupOffToRGBCase(RGB_value, "player2_dot" + (i + 1));
                    }
                });
            }

            if (data["topic"] === "scoreP2") {
                var player2_score = data["payload"];
                console.log(player2_score);
                $('#score_player_two').html('SCORE: ' + player2_score + '/6');
            }
        } else {
            if (data["topic"] === "ledValP1" || data["topic"] === "dotValP1") {
                if (data["topic"] === "dotValP1") {
                    g_player1_dots = data["payload"];
                }

                var RGB_values = g_player1_dots.split(/(.{3})/).filter(O => O);
                var sensor_values = g_player1_sensor_data.split("");

                sensor_values.forEach(function (sensor_value, i) {
                    var RGB_value = RGB_values[i];

                    if (sensor_value === '1') {
                        setCupOnToRGBCase(RGB_value, "player1_dot" + (i + 1));
                    } else {
                        setCupOffToRGBCase(RGB_value, "player1_dot" + (i + 1));
                    }
                });
            }

            if (data["topic"] === "scoreP1") {
                var player1_score = data["payload"];
                $('#score_player_one').html('SCORE: ' + player1_score + '/6');
            }
        }
    })



    $('#submit_rgb').click(function (event) {
        $('#' + g_id_selected_dot).css('filter', 'brightness(1)');

        var player_number = g_id_selected_dot.charAt(g_id_selected_dot.length - 6);
        var led_number = g_id_selected_dot.charAt(g_id_selected_dot.length - 1);

        var RGB = ''
        if ($('#red_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + '1';
        } else {
            RGB = RGB + '0';
        }
        if ($('#green_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + '1';
        } else {
            RGB = RGB + '0';
        }
        if ($('#blue_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + '1';
        } else {
            RGB = RGB + '0';
        }

        if (RGB === '000') {
            changeCupColor(g_id_selected_dot, true);
            alert('You cannot turn the LED off yourself.');
        } else {
            if (player_number === '1') {
                g_player1_leds = g_player1_leds.substring(0, (led_number - 1) * 3) + RGB + g_player1_leds.substring((led_number - 1) * 3 + 3);
                publish(socket, 'dotValP1', g_player1_leds, 1);

                var leds_on = calculateLEDsThatCanBeTurnedOnAndTheirValue(g_player1_sensor_data, '1');
                publish(socket, 'ledValP1', leds_on, 1);
            } else {
                g_player2_leds = g_player2_leds.substring(0, (led_number - 1) * 3) + RGB + g_player2_leds.substring((led_number - 1) * 3 + 3);
                publish(socket, 'dotValP2', g_player2_leds, 1);

                var leds_on = calculateLEDsThatCanBeTurnedOnAndTheirValue(g_player2_sensor_data, '2');
                publish(socket, 'ledValP2', leds_on, 1);
            }

            if (g_player1_sensor_data[led_number - 1] === '1' && player_number === '1' || g_player2_sensor_data[led_number - 1] === '1' && player_number === '2') {
                setCupOnToRGBCase(RGB, g_id_selected_dot);
            } else {
                setCupOffToRGBCase(RGB, g_id_selected_dot);
            }

            $('#rgb_div').hide();
        }
    });

    $('#change_power_mode').click(function (event) {
        console.log($('#change_power_mode').is(":checked"), $('#sleep_div').is(":visible"));
        if ($('#change_power_mode').is(":checked")) {
            $('#sleep_div').show();
        } else {
            $('#sleep_div').hide();
        }
    });
});

function setCorrectCupColorsOtherPlayer(payload, player) {
    var otherPlayer = player;

    var rgb = [];
    var rgbList = [];
    for (let i = 0; i < payload.length / 3; i++) {
        for (let j = 0; j < 3; j++) {
            rgb += payload[j + (3 * i)];
        }
        rgbList.push(rgb);
        rgb = "";
    }
    console.log(rgbList)

    cup_number = 1;
    for (let index = 6; index > 0; index--) {
        cup_id = 'player' + otherPlayer + '_dot' + (index);  //playerX_dotY;
        RGB = rgbList[index - 1];

        switch (RGB) {
            case '000':
                $('#' + cup_id).css('background-color', 'rgba(255, 255, 255, 0.1)');
                break;
            case '001':
                $('#' + cup_id).css('background-color', '#3185FC');
                break;
            case '010':
                $('#' + cup_id).css('background-color', '#44CF6C');
                break;
            case '011':
                $('#' + cup_id).css('background-color', '#47E5BC');
                break;
            case '100':
                $('#' + cup_id).css('background-color', '#E84855');
                break;
            case '101':
                $('#' + cup_id).css('background-color', '#662E9B');
                break;
            case '110':
                $('#' + cup_id).css('background-color', '#F9DC5C');
                break;
            case '111':
                $('#' + cup_id).css('background-color', 'rgba(255, 255, 255, 0.6)');
                break;
            default:
                $('#' + cup_id).css('background-color', '#BBB');
        }

        cup_number++;
    }
}

function publish(socket, topic, message, qos) {
    var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
    socket.emit('publish', data = data);
}

function calculateLEDsThatCanBeTurnedOnAndTheirValue(sensor_data, player) {
    var leds_on = '';
    if (player === '1') {
        sensor_data.split('').forEach((element, index) => {
            var RGB = g_player1_leds.charAt(g_player1_leds.length - 18 + index * 3) + '' + g_player1_leds.charAt(g_player1_leds.length - 17 + index * 3) + '' + g_player1_leds.charAt(g_player1_leds.length - 16 + index * 3);
            if (element === '1') {
                leds_on = leds_on + RGB;
            } else {
                leds_on = leds_on + '000';
            }
        });
    } else {
        sensor_data.split('').forEach((element, index) => {
            var RGB = g_player2_leds.charAt(g_player2_leds.length - 18 + index * 3) + '' + g_player2_leds.charAt(g_player2_leds.length - 17 + index * 3) + '' + g_player2_leds.charAt(g_player2_leds.length - 16 + index * 3);
            if (element === '1') {
                leds_on = leds_on + RGB;
            } else {
                leds_on = leds_on + '000';
            }
        });
    }

    return leds_on;
}

function changeCupColor(id, empty = false) {
    var player_number = id.charAt(id.length - 6);
    if (player_number === g_player) {
        if ($('#' + id).css('filter') === 'brightness(0.5)' && empty == false) {
            $('#rgb_div').hide();
            $('#' + id).css('filter', 'brightness(1)');
        } else {
            var players = ['1', '2'];
            var dots = ['1', '2', '3', '4', '5', '6'];
            players.forEach(i => {
                index_player_number = 6;

                id_dot_player = id.substring(0, index_player_number) + i + id.substring(index_player_number + 1);

                dots.forEach(j => {
                    index_dot_number = 11;

                    id_dot_player_and_number = id_dot_player.slice(0, -1) + j;

                    $('#' + id_dot_player_and_number).css('filter', 'brightness(1)');
                });
            });

            g_id_selected_dot = id;
            $('#' + id).css('filter', 'brightness(0.5)');

            var dot_number = id.charAt(id.length - 1);

            if (player_number === '1') {
                var R = g_player1_leds.charAt(g_player1_leds.length - 18 + (dot_number - 1) * 3);
                if (R === '1') {
                    $('#red_dot').css('filter', 'brightness(1)');
                } else {
                    $('#red_dot').css('filter', 'brightness(0.5)');
                }
                var G = g_player1_leds.charAt(g_player1_leds.length - 17 + (dot_number - 1) * 3);
                if (G === '1') {
                    $('#green_dot').css('filter', 'brightness(1)');
                } else {
                    $('#green_dot').css('filter', 'brightness(0.5)');
                }
                var B = g_player1_leds.charAt(g_player1_leds.length - 16 + (dot_number - 1) * 3);
                if (B === '1') {
                    $('#blue_dot').css('filter', 'brightness(1)');
                } else {
                    $('#blue_dot').css('filter', 'brightness(0.5)');
                }
            } else {
                var R = g_player2_leds.charAt(g_player2_leds.length - 18 + (dot_number - 1) * 3);
                if (R === '1') {
                    $('#red_dot').css('filter', 'brightness(1)');
                } else {
                    $('#red_dot').css('filter', 'brightness(0.5)');
                }
                var G = g_player2_leds.charAt(g_player2_leds.length - 17 + (dot_number - 1) * 3);
                if (G === '1') {
                    $('#green_dot').css('filter', 'brightness(1)');
                } else {
                    $('#green_dot').css('filter', 'brightness(0.5)');
                }
                var B = g_player2_leds.charAt(g_player2_leds.length - 16 + (dot_number - 1) * 3);
                if (B === '1') {
                    $('#blue_dot').css('filter', 'brightness(1)');
                } else {
                    $('#blue_dot').css('filter', 'brightness(0.5)');
                }
            }

            $('#rgb_div').show();
        }
    }
}

function setCupOnToRGBCase(RGB, dot_id) {
    switch (RGB) {
        case '000':
            $('#' + dot_id).css('background-color', 'rgba(255, 255, 255, 0.2)');
            break;
        case '001':
            $('#' + dot_id).css('background-color', 'rgba(49, 133, 253, 1)');
            break;
        case '010':
            $('#' + dot_id).css('background-color', 'rgba(68, 207, 108, 1)');
            break;
        case '011':
            $('#' + dot_id).css('background-color', 'rgba(71, 229, 188, 1)');
            break;
        case '100':
            $('#' + dot_id).css('background-color', 'rgba(232, 72, 85, 1)');
            break;
        case '101':
            $('#' + dot_id).css('background-color', 'rgba(102, 46, 155, 1)');
            break;
        case '110':
            $('#' + dot_id).css('background-color', 'rgba(249, 220, 92, 1)');
            break;
        case '111':
            $('#' + dot_id).css('background-color', 'rgba(255, 255, 255, 0.6)');
            break;
        default:
            $('#' + dot_id).css('background-color', '#BBB');
            $('#' + dot_id).css('filter', 'brightness(1)');
    }
}

function setCupOffToRGBCase(RGB, dot_id) {
    switch (RGB) {
        case '000':
            $('#' + dot_id).css('background-color', 'rgba(255, 255, 255, 0.2)');
            break;
        case '001':
            $('#' + dot_id).css('background-color', 'rgba(49, 133, 253, 0.2)');
            break;
        case '010':
            $('#' + dot_id).css('background-color', 'rgba(68, 207, 108, 0.2)');
            break;
        case '011':
            $('#' + dot_id).css('background-color', 'rgba(71, 229, 188, 0.2)');
            break;
        case '100':
            $('#' + dot_id).css('background-color', 'rgba(232, 72, 85, 0.2)');
            break;
        case '101':
            $('#' + dot_id).css('background-color', 'rgba(102, 46, 155, 0.2)');
            break;
        case '110':
            $('#' + dot_id).css('background-color', 'rgba(249, 220, 92, 0.2)');
            break;
        case '111':
            $('#' + dot_id).css('background-color', 'rgba(255, 255, 255, 0.2)');
            break;
        default:
            $('#' + dot_id).css('background-color', '#BBB');
    }
}

function changeRGBColor(id) {
    if ($('#' + id).css('filter') === 'brightness(1)') {
        $('#' + id).css('filter', 'brightness(0.3)');
    } else {
        $('#' + id).css('filter', 'brightness(1)');
    }
}
