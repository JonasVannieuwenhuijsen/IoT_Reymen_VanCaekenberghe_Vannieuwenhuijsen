var g_id_selected_dot;

var g_player1_sensor_data = '111111';
var g_player2_sensor_data = '111111';

var g_player1_leds = '111111111111111111';
var g_player2_leds = '111111111111111111';

g_player = "None"

$(document).ready(function () {
    var player_number = $('#player_number').val();
    g_player = player_number;
    if (player_number === "1") {
        var innerHTML = 
        '<h1 class="header-player-one" id="header_player_one">PLAYER ONE.</h1>' +
        '<h1 class="header-player-two" id="header_player_two">PLAYER TWO.</h1>' +
        '<p class="p-player-one">SCORE: 0/6</p>' +
        '<p class="p-player-two">SCORE: 0/6</p>' +
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
        var innerHTML = 
        '<h1 class="header-player-one" id="header_player_one">PLAYER ONE.</h1>' +
        '<h1 class="header-player-two" id="header_player_two">PLAYER TWO.</h1>' +
        '<p class="p-player-one">SCORE: 0/6</p>' +
        '<p class="p-player-two">SCORE: 0/6</p>' +
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

    socket.on('mqtt_message', function (data) {
        if (data["topic"] === "sensorValP1") {
            var payload = data["payload"];
            g_player1_sensor_data = payload;
            sensor_values = payload.split("");

            

            if (g_player === '1') {
                sensor_values.forEach((function (sensor_value, i) {
                    var dot = 'player1_dot' + (i + 1);
                    if (sensor_value === "1") {
                        // $(dot).css("background-color", "green");
                        setCorrectCupColor(dot);
                    } else {
                        $('#' + dot).css("background-color", "rgba(255, 255, 255, 0.1)");
                    }
                }));


                var leds_on = calculateLEDsThatCanBeTurnedOnAndTheirValue(payload, '1');
                var data = '{"topic": "ledValP1", "message": "' + leds_on + '", "qos": 1}';
    
                socket.emit('publish', data = data);
            }
        }

        if (data["topic"] === "sensorValP2") {
            var payload = data["payload"];
            g_player2_sensor_data = payload;

            sensor_values = payload.split("");

            

            if (g_player === '2') {
                sensor_values.forEach((function (sensor_value, i) {
                    var dot = 'player2_dot' + (i + 1);
                    if (sensor_value === "1") {
                        // $(dot).css("background-color", "green");
                        setCorrectCupColor(dot);
                    } else {
                        $('#' + dot).css("background-color", "rgba(255, 255, 255, 0.1)");
                    }
                }));
                
                var leds_on = calculateLEDsThatCanBeTurnedOnAndTheirValue(payload, '2');
                var data = '{"topic": "ledValP2", "message": "' + leds_on + '", "qos": 1}';
    
                socket.emit('publish', data = data);
            }
        }

        // test voor leds uit te lezen
        if (g_player === "1") {
            if (data["topic"] === "ledValP2") {
                var payload = data["payload"];

                player = "2"
                setCorrectCupColorsOtherPlayer(payload, player);
            }
        } else {
            if (data["topic"] === "ledValP1") {
                var payload = data["payload"];
    
                player = "1"
                setCorrectCupColorsOtherPlayer(payload, player);
            }
        }
    })

    $('#send_leds_player_2').click(function (event) {
        var topic = 'ledValP2';
        var message = $('#data_leds_player_2').val();
        var qos = 1;
        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        socket.emit('publish', data = data);
    });

    $('#submit_rgb').click(function (event) {
        $('#' + g_id_selected_dot).css('filter', 'brightness(1)');

        var player_number = g_id_selected_dot.charAt(g_id_selected_dot.length - 6);
        var led_number = g_id_selected_dot.charAt(g_id_selected_dot.length - 1);

        var RGB = ''
        if ($('#red_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + 1;
        } else {
            RGB = RGB + 0;
        }
        if ($('#green_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + 1;
        } else {
            RGB = RGB + 0;
        }
        if ($('#blue_dot').css('filter') === 'brightness(1)') {
            RGB = RGB + 1;
        } else {
            RGB = RGB + 0;
        }

        if (RGB === '000') {
            changeCupColor(g_id_selected_dot, true);
            alert('You cannot turn the LED off yourself.');
        } else {
            if (player_number === '1') {
                g_player1_leds = g_player1_leds.substring(0, (led_number - 1) * 3) + RGB + g_player1_leds.substring((led_number - 1) * 3 + 3);
                var leds_on = calculateLEDsThatCanBeTurnedOnAndTheirValue(g_player1_sensor_data, '1');

                var topic = 'ledValP1';
                var message = leds_on;
                var qos = 1;
                var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
                socket.emit('publish', data = data);
            } else {
                g_player2_leds = g_player2_leds.substring(0, (led_number - 1) * 3) + RGB + g_player2_leds.substring((led_number - 1) * 3 + 3);
                var leds_on = calculateLEDsThatCanBeTurnedOnAndTheirValue(g_player2_sensor_data, '2');
    
                var topic = 'ledValP2';
                var message = leds_on;
                var qos = 1;
                var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
                socket.emit('publish', data = data);
            }
    
            if (g_player1_sensor_data[led_number-1] === '1' && player_number === '1' || g_player2_sensor_data[led_number-1] === '1' && player_number === '2' ) {
                switch (RGB) {
                    case '000':
                        $('#' + g_id_selected_dot).css('background-color', 'rgba(255, 255, 255, 0.1)');
                        break;
                    case '001':
                        $('#' + g_id_selected_dot).css('background-color', '#3185FC');
                        break;
                    case '010':
                        $('#' + g_id_selected_dot).css('background-color', '#44CF6C');
                        break;
                    case '011':
                        $('#' + g_id_selected_dot).css('background-color', '#47E5BC');
                        break;
                    case '100':
                        $('#' + g_id_selected_dot).css('background-color', '#E84855');
                        break;
                    case '101':
                        $('#' + g_id_selected_dot).css('background-color', '#662E9B');
                        break;
                    case '110':
                        $('#' + g_id_selected_dot).css('background-color', '#F9DC5C');
                        break;
                    case '111':
                        $('#' + g_id_selected_dot).css('background-color', 'rgba(255, 255, 255, 0.6)');
                        break;
                    default:
                        $('#' + g_id_selected_dot).css('background-color', '#BBB');
                }
            }

            $('#rgb_div').hide();
        }
    });
});

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

function setCorrectCupColor(cup_id) {
    var player_number = cup_id.charAt(cup_id.length - 6);
    var cup_number = cup_id.charAt(cup_id.length - 1);


    if (player_number === '1') {
        var RGB = g_player1_leds.charAt(g_player1_leds.length - 18 + (cup_number - 1) * 3) + '' + g_player1_leds.charAt(g_player1_leds.length - 17 + (cup_number - 1) * 3) + '' + g_player1_leds.charAt(g_player1_leds.length - 16 + (cup_number - 1) * 3);
    } else {
        var RGB = g_player2_leds.charAt(g_player2_leds.length - 18 + (cup_number - 1) * 3) + '' + g_player2_leds.charAt(g_player2_leds.length - 17 + (cup_number - 1) * 3) + '' + g_player2_leds.charAt(g_player2_leds.length - 16 + (cup_number - 1) * 3);
    }

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
}

function setCorrectCupColorsOtherPlayer(payload, player) {
    //var player_number = cup_id.charAt(cup_id.length - 6);
    //var cup_number = cup_id.charAt(cup_id.length - 1);
    var payloadArray = payload.split("");
    var otherPlayer = player;

    var rgb = [];
    var rgbList = [];
    for (let i = 0; i < payload.length/3; i++) {
        for (let j = 0; j < 3; j++) {
            rgb += payload[j + (3*i)];
        }
        rgbList.push(rgb);
        rgb = "";
    }

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

function changeCupColor(id, empty=false) {
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
    
                id_cup_player = id.substring(0, index_player_number) + i + id.substring(index_player_number + 1);
    
                dots.forEach(j => {
                    index_dot_number = 11;
    
                    id_cup_player_and_number = id_cup_player.slice(0, -1) + j;
    
                    $('#' + id_cup_player_and_number).css('filter', 'brightness(1)');
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
    
            dot_number.substr(1, 4);
    
            $('#rgb_div').show();
        }
    }
}

function changeRGBColor(id) {
    if ($('#' + id).css('filter') === 'brightness(1)') {
        $('#' + id).css('filter', 'brightness(0.3)');
    } else {
        $('#' + id).css('filter', 'brightness(1)');
    }
}
