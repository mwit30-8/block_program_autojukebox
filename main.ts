// random any between 0,1
function random () {
    return Math.random()
}
input.onButtonPressed(Button.A, function () {
    re_chord()
})
function re_arpeggio () {
    re_arpeggio_rhythm = global_rhythm
    for (let re_arpeggio_b = 0; re_arpeggio_b <= re_arpeggio_rhythm.length - 1; re_arpeggio_b++) {
        re_arpeggio_rhythm[re_arpeggio_b][1] = randint(1, global_pitch[0].length - 1)
    }
    global_rhythm = re_arpeggio_rhythm
}
function factor (semitones: number) {
    factor_i = semitones
    factor_fact = 1
    while (factor_i < 0) {
        factor_fact = factor_fact / global_interval[global_interval.length - 1]
        factor_i += global_interval.length - 1
    }
    while (factor_i < 0) {
        factor_fact = factor_fact * global_interval[global_interval.length - 1]
        factor_i += 1 - global_interval.length
    }
    factor_fact = factor_fact * global_interval[factor_i]
    return factor_fact
}
function re_chord () {
    re_chord_numb = 8
    re_chord_range = randint(0, 3)
    re_chord_sus_prob = [0, 10, 10, 0]
    re_chord_fifth_prob = [0, 10, 0]
    re_chord_major7_prob = [10, 1]
    re_chord_fixscale = 5
    re_chord_pitch = []
    re_chord_base = 0
    re_chord_pre_base = re_chord_base
    re_chord_base = randint(0, global_scale.length - 1)
    re_chord_chord = [global_scale[re_chord_base], 0]
    if (re_chord_range > 0) {
        if (global_scale.indexOf(re_chord_base + 2) != -1) {
            re_chord_sus_prob[0] = re_chord_sus_prob[0] * re_chord_fixscale
        }
        if (global_scale.indexOf(re_chord_base + 3) != -1) {
            re_chord_sus_prob[1] = re_chord_sus_prob[1] * re_chord_fixscale
        }
        if (global_scale.indexOf(re_chord_base + 4) != -1) {
            re_chord_sus_prob[2] = re_chord_sus_prob[2] * re_chord_fixscale
        }
        if (global_scale.indexOf(re_chord_base + 5) != -1) {
            re_chord_sus_prob[3] = re_chord_sus_prob[3] * re_chord_fixscale
        }
        if (randProb(re_chord_sus_prob[2] / (re_chord_sus_prob[1] + re_chord_sus_prob[2]))) {
            re_chord_major3 = true
        } else {
            re_chord_major3 = false
        }
        if (randProb(re_chord_sus_prob[0] / (re_chord_sus_prob[0] + re_chord_sus_prob[1] + (re_chord_sus_prob[2] + re_chord_sus_prob[3])))) {
            re_chord_chord.push(2)
        } else if (randProb(re_chord_sus_prob[1] / (re_chord_sus_prob[1] + (re_chord_sus_prob[2] + re_chord_sus_prob[3])))) {
            re_chord_chord.push(3)
            re_chord_major3 = false
        } else if (randProb(re_chord_sus_prob[2] / (re_chord_sus_prob[2] + re_chord_sus_prob[3]))) {
            re_chord_chord.push(4)
            re_chord_major3 = true
        } else {
            re_chord_chord.push(5)
        }
        if (re_chord_range > 1) {
            if (global_scale.indexOf(re_chord_base + 6) != -1) {
                re_chord_fifth_prob[0] = re_chord_fifth_prob[0] * re_chord_fixscale
            }
            if (global_scale.indexOf(re_chord_base + 7) != -1) {
                re_chord_fifth_prob[1] = re_chord_fifth_prob[1] * re_chord_fixscale
            }
            if (global_scale.indexOf(re_chord_base + 8) != -1) {
                re_chord_fifth_prob[2] = re_chord_fifth_prob[2] * re_chord_fixscale
            }
            if (re_chord_major3) {
                re_chord_fifth_prob[0] = 0
            } else {
                re_chord_fifth_prob[2] = 0
            }
            if (randProb(re_chord_fifth_prob[0] / (re_chord_fifth_prob[0] + (re_chord_fifth_prob[1] + re_chord_fifth_prob[2])))) {
                re_chord_chord.push(6)
            } else if (randProb(re_chord_sus_prob[1] / (re_chord_fifth_prob[1] + re_chord_fifth_prob[2]))) {
                re_chord_chord.push(7)
                re_chord_major3 = false
            } else {
                re_chord_chord.push(8)
            }
            if (re_chord_range > 2) {
                if (re_chord_chord[2] == 6) {
                    if (global_scale.indexOf(re_chord_base + 9) != -1) {
                        re_chord_major7_prob[0] = re_chord_major7_prob[0] * re_chord_fixscale
                    }
                    if (global_scale.indexOf(re_chord_base + 10) != -1) {
                        re_chord_major7_prob[1] = re_chord_major7_prob[1] * re_chord_fixscale
                    }
                } else {
                    if (global_scale.indexOf(re_chord_base + 10) != -1) {
                        re_chord_major7_prob[0] = re_chord_major7_prob[0] * re_chord_fixscale
                    }
                    if (global_scale.indexOf(re_chord_base + 11) != -1) {
                        re_chord_major7_prob[1] = re_chord_major7_prob[1] * re_chord_fixscale
                    }
                }
                if (randProb(re_chord_major7_prob[0] / (re_chord_major7_prob[0] + re_chord_major7_prob[1]))) {
                    re_chord_chord.push(10)
                } else {
                    re_chord_chord.push(11)
                }
                if (re_chord_chord[2] == 6) {
                    re_chord_chord[3] = re_chord_chord[3] - 1
                }
            }
        }
    }
    re_chord_chord.push(12)
    re_chord_pre_base = re_chord_base
    re_chord_pitch.push(re_chord_chord)
    while (randProb(0.01) || (re_chord_base != 0 && randProb(0.5) || re_chord_pitch.length < re_chord_numb && randProb(0.5))) {
        if (randProb(0.9)) {
            re_chord_base = global_movement[re_chord_pre_base][randint(0, global_movement[re_chord_pre_base].length - 1)] - 1
        } else {
            re_chord_base = randint(0, global_scale.length - 1)
        }
        re_chord_base = randint(0, global_scale.length - 1)
        re_chord_chord = [global_scale[re_chord_base], 0]
        if (re_chord_range > 0) {
            if (global_scale.indexOf(re_chord_base + 2) != -1) {
                re_chord_sus_prob[0] = re_chord_sus_prob[0] * re_chord_fixscale
            }
            if (global_scale.indexOf(re_chord_base + 3) != -1) {
                re_chord_sus_prob[1] = re_chord_sus_prob[1] * re_chord_fixscale
            }
            if (global_scale.indexOf(re_chord_base + 4) != -1) {
                re_chord_sus_prob[2] = re_chord_sus_prob[2] * re_chord_fixscale
            }
            if (global_scale.indexOf(re_chord_base + 5) != -1) {
                re_chord_sus_prob[3] = re_chord_sus_prob[3] * re_chord_fixscale
            }
            if (randProb(re_chord_sus_prob[2] / (re_chord_sus_prob[1] + re_chord_sus_prob[2]))) {
                re_chord_major3 = true
            } else {
                re_chord_major3 = false
            }
            if (randProb(re_chord_sus_prob[0] / (re_chord_sus_prob[0] + re_chord_sus_prob[1] + (re_chord_sus_prob[2] + re_chord_sus_prob[3])))) {
                re_chord_chord.push(2)
            } else if (randProb(re_chord_sus_prob[1] / (re_chord_sus_prob[1] + (re_chord_sus_prob[2] + re_chord_sus_prob[3])))) {
                re_chord_chord.push(3)
                re_chord_major3 = false
            } else if (randProb(re_chord_sus_prob[2] / (re_chord_sus_prob[2] + re_chord_sus_prob[3]))) {
                re_chord_chord.push(4)
                re_chord_major3 = true
            } else {
                re_chord_chord.push(5)
            }
            if (re_chord_range > 1) {
                if (global_scale.indexOf(re_chord_base + 6) != -1) {
                    re_chord_fifth_prob[0] = re_chord_fifth_prob[0] * re_chord_fixscale
                }
                if (global_scale.indexOf(re_chord_base + 7) != -1) {
                    re_chord_fifth_prob[1] = re_chord_fifth_prob[1] * re_chord_fixscale
                }
                if (global_scale.indexOf(re_chord_base + 8) != -1) {
                    re_chord_fifth_prob[2] = re_chord_fifth_prob[2] * re_chord_fixscale
                }
                if (re_chord_major3) {
                    re_chord_fifth_prob[0] = 0
                } else {
                    re_chord_fifth_prob[2] = 0
                }
                if (randProb(re_chord_fifth_prob[0] / (re_chord_fifth_prob[0] + (re_chord_fifth_prob[1] + re_chord_fifth_prob[2])))) {
                    re_chord_chord.push(6)
                } else if (randProb(re_chord_sus_prob[1] / (re_chord_fifth_prob[1] + re_chord_fifth_prob[2]))) {
                    re_chord_chord.push(7)
                    re_chord_major3 = false
                } else {
                    re_chord_chord.push(8)
                }
                if (re_chord_range > 2) {
                    if (re_chord_chord[2] == 6) {
                        if (global_scale.indexOf(re_chord_base + 9) != -1) {
                            re_chord_major7_prob[0] = re_chord_major7_prob[0] * re_chord_fixscale
                        }
                        if (global_scale.indexOf(re_chord_base + 10) != -1) {
                            re_chord_major7_prob[1] = re_chord_major7_prob[1] * re_chord_fixscale
                        }
                    } else {
                        if (global_scale.indexOf(re_chord_base + 10) != -1) {
                            re_chord_major7_prob[0] = re_chord_major7_prob[0] * re_chord_fixscale
                        }
                        if (global_scale.indexOf(re_chord_base + 11) != -1) {
                            re_chord_major7_prob[1] = re_chord_major7_prob[1] * re_chord_fixscale
                        }
                    }
                    if (randProb(re_chord_major7_prob[0] / (re_chord_major7_prob[0] + re_chord_major7_prob[1]))) {
                        re_chord_chord.push(10)
                    } else {
                        re_chord_chord.push(11)
                    }
                    if (re_chord_chord[2] == 6) {
                        re_chord_chord[3] = re_chord_chord[3] - 1
                    }
                }
            }
        }
        re_chord_chord.push(12)
        re_chord_pre_base = re_chord_base
        re_chord_pitch.push(re_chord_chord)
    }
    if (global_pitch[0].length > re_chord_pitch[0].length) {
        re_arpeggio()
    }
    global_pitch = re_chord_pitch
}
function re_rhythm () {
    re_rhythm_rhythm = global_rhythm
    for (let re_rhythm_b = 0; re_rhythm_b <= re_rhythm_rhythm.length - 1; re_rhythm_b++) {
        if (Math.randomBoolean()) {
            re_rhythm_rhythm[re_rhythm_b][0] = 0
        } else {
            re_rhythm_rhythm[re_rhythm_b][0] = 1
        }
    }
    re_rhythm_rhythm[0][0] = 1
    global_rhythm = re_rhythm_rhythm
}
input.onButtonPressed(Button.AB, function () {
    re_chord()
    re_arpeggio()
    re_rhythm()
})
input.onButtonPressed(Button.B, function () {
    re_arpeggio()
})
input.onGesture(Gesture.Shake, function () {
    re_rhythm()
})
function randProb (probably: number) {
    return random() <= probably
}
// show number without time interval
function changeDisplay (value: number) {
    basic.showNumber(value,0)
}
let re_rhythm_rhythm: number[][] = []
let re_chord_major3 = false
let re_chord_chord: number[] = []
let re_chord_pre_base = 0
let re_chord_base = 0
let re_chord_pitch: number[][] = []
let re_chord_fixscale = 0
let re_chord_major7_prob: number[] = []
let re_chord_fifth_prob: number[] = []
let re_chord_sus_prob: number[] = []
let re_chord_range = 0
let re_chord_numb = 0
let factor_fact = 0
let factor_i = 0
let re_arpeggio_rhythm: number[][] = []
let global_rhythm: number[][] = []
let global_pitch: number[][] = []
let global_movement: number[][] = []
let global_scale: number[] = []
let global_interval: number[] = []
global_interval = [1 / 1, 16 / 15, 9 / 8, 6 / 5, 5 / 4, 4 / 3, 45 / 32, 3 / 2, 8 / 5, 5 / 3, 16 / 9, 15 / 8, 2 / 1]
global_scale = [0, 2, 4, 5, 7, 9, 11]
global_movement = [[1], [3, 5], [4, 6], [1, 2, 5], [1], [2, 4], [5]]
let global_tune = 110
global_pitch = [[0, 0, 4, 7, 9, 10], [0, 0, 4, 7, 9, 10], [0, 0, 4, 7, 9, 10], [0, 0, 4, 7, 9, 10], [5, 0, 4, 7, 9, 10], [5, 0, 4, 7, 9, 10], [0, 0, 4, 7, 9, 10], [0, 0, 4, 7, 9, 10], [7, 0, 4, 7, 9, 10], [5, 0, 4, 7, 9, 10], [0, 0, 4, 7, 9, 10], [0, 0, 4, 7, 9, 10]]
let loop_pitch = global_pitch
global_rhythm = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 4], [1, 3], [1, 2]]
let loop_rhythm = global_rhythm
let loop_note = global_tune
music.setTempo(30)
changeDisplay(1)
music.playTone(global_tune, music.beat(BeatFraction.Eighth))
music.rest(music.beat(BeatFraction.Eighth))
changeDisplay(2)
music.playTone(global_tune, music.beat(BeatFraction.Eighth))
music.rest(music.beat(BeatFraction.Eighth))
changeDisplay(3)
music.playTone(global_tune, music.beat(BeatFraction.Eighth))
music.rest(music.beat(BeatFraction.Eighth))
changeDisplay(4)
music.playTone(global_tune, music.beat(BeatFraction.Eighth))
music.rest(music.beat(BeatFraction.Eighth))
basic.forever(function () {
    for (let loop_pitch_r of loop_pitch) {
        for (let loop_b = 0; loop_b <= loop_rhythm.length - 1; loop_b++) {
            changeDisplay(Math.floor(loop_b / 2) + 1)
            if (loop_rhythm[loop_b][0] == 0) {
                if (loop_rhythm[(loop_b + 1) % loop_rhythm.length][0] == 0) {
                    basic.pause(music.beat(BeatFraction.Sixteenth))
                } else {
                    music.rest(music.beat(BeatFraction.Sixteenth))
                }
            } else {
                if (loop_rhythm[loop_b][1] == 0) {
                    music.rest(music.beat(BeatFraction.Sixteenth))
                } else {
                    loop_note = global_tune * factor(loop_pitch_r[0]) * factor(loop_pitch_r[loop_rhythm[loop_b][1]])
                    music.ringTone(loop_note)
                    basic.pause(music.beat(BeatFraction.Sixteenth))
                }
            }
            if (loop_rhythm[(loop_b + 1) % loop_rhythm.length][0] == 0) {
                basic.pause(music.beat(BeatFraction.Sixteenth))
            } else {
                music.rest(music.beat(BeatFraction.Sixteenth))
            }
            loop_rhythm = global_rhythm
        }
        loop_pitch = global_pitch
    }
})
