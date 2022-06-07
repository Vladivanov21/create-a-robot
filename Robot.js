const form = document.querySelector(".form");
const form_slide = document.querySelector(".change_robot_form")
const name = form.querySelector("input[type='text']");
const type = form.querySelector("select[name='type']");
const color =form.querySelector("input[type='color']");
const phrase = form.querySelector("#phrase");
const robot = document.querySelector(".robot");
const robot_section = document.querySelector(".factory-section");
const can_jump = form.querySelector("#can_jump");
const can_talk = form.querySelector("#can_talk");
const can_blink = form.querySelector("#can_blink");
const change_robot = document.querySelector(".change_robot");
const next_robot = document.querySelector("#btn_next");
const prev_robot = document.querySelector("#btn_previous");
let all_robots = [];
let slideIndex = 0;


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("robot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

form.addEventListener("submit", addRobot);

function addRobot(event) {

    let robot = {
        name: name.value,
        type: type.value,
        color: color.value,
        phrase: phrase.value,
        can_talk: can_talk.checked,
        can_blink: can_blink.checked,
        can_jump: can_jump.checked
    };

    all_robots.push(robot);
    if (all_robots.length === 1) {
        changeNameAndColor(robot);
        plusSlides(1);
    } else {
        addSlide(robot);
    }
    robot_movements(robot);
    robot_section.style.display = "block";
    if (all_robots.length < 2) {
        next_robot.disabled = true;
        prev_robot.disabled = true;
    } else {
        next_robot.disabled = false;
        prev_robot.disabled = false;
    }
    change_robot.style.display = "flex";
}


function addSlide(robots) {
    let clone = robot.cloneNode(true);
    let last_robot = Array.from(
        document.querySelectorAll(".robot")
    ).pop();
    last_robot.after(clone);
    changeNameAndColor(robots);
    plusSlides(1);
}


function changeNameAndColor(robots) {
    let robot_body = document.querySelectorAll(".body");
    let robot_name_label = document.querySelectorAll(".rbtName_lbl");

    robot_name_label[robot_name_label.length - 1].innerHTML = robots.name;
    robot_body[robot_body.length - 1].style.background = robots.color;
}

function robot_movements(robot) {

    let robot_skirt = document.querySelectorAll(".skirt");
    let bubble_speech = document.querySelectorAll(".bubble");
    let robot_mouth = document.querySelectorAll(".mouth");
    let robot_right_eye = document.querySelectorAll(".eye_right");
    let robot_leg = document.querySelectorAll(".leg");

    if (robot.type === "female_robot") {
        robot_skirt[robot_skirt.length - 1].style.display = "block";
    } else {
        robot_skirt[robot_skirt.length - 1].style.display = "none";
    }

    if (robot.can_blink === true) {
        robot_right_eye[robot_right_eye.length - 1].style.animationName = "blink";
    } else {
        robot_right_eye[robot_right_eye.length - 1].style.animationName = "none";
    }

    if (robot.can_jump === true) {
        let leg_index = slideIndex * 2 - 2;
        for (let i = 0; i < 2; i++) {
            robot_leg[leg_index + i].style.animationName = "jump";
        }
    } else {
        let leg_index = slideIndex * 2 - 2;
        for (let i = 0; i < 2; i++) {
            robot_leg[leg_index + i].style.animationName = "none";
        }
    }

    if (robot.can_talk === true) {
        bubble_speech[bubble_speech.length - 1].style.display = "block";
        robot_mouth[robot_mouth.length - 1].style.animationName = "talk";
        let current_slide = slideIndex;
        let talking = setTimeout(() => {
            bubble_speech[bubble_speech.length - 1].style.display = "none";
        }, 10000);
        talking;
        clearTimeout(talking);
        bubble_speech[bubble_speech.length - 1].style.display = "none";
        form_slide.addEventListener("submit", () => {
            bubble_speech[bubble_speech.length - 1].style.display = "block";
            let talking = setTimeout(() => {
                bubble_speech[bubble_speech.length - 1].style.display = "none";
            }, 10000);
            talking;
        });
        bubble_speech[bubble_speech.length - 1].textContent = robot.phrase;
    } else {
        bubble_speech[bubble_speech.length - 1].style.display = "none";
        robot_mouth[robot_mouth.length - 1].style.animationName = "none";
    }

    
}


