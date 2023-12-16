// "Hacker effect" code (heavily) inspired by HYPERPLEXED - https://www.youtube.com/watch?v=W5oawMJaXbU
const welcome = document.querySelector("#welcome");
document.addEventListener('DOMContentLoaded', () => {
    welcome.innerHTML = welcome.dataset.value;
    hackerEffect(welcome); // Call hackerEffect when the page loads
    showRelevantPage(0);

    // document.querySelector("#next").click()

    // showRelevantPage(1);
});

function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}


const colors = ["#0e6b0e", "#149414", "#2b5329", "#fff"]

setInterval(() => {
        const dot = document.createElement("span")
        dot.className = 'trail'
        dot.style.left = `${Math.floor(Math.random()*window.innerWidth)}px`;
        dot.style.top = `${Math.floor(Math.random()*window.innerHeight)}px`;
        dot.style.color = selectRandom(colors);
        dot.style.filter = `blur(${Math.floor(Math.random()*4)+ 1}px)`
        // const interval = setInterval(() => {
        // }, 10)
        dot.innerHTML = letters[Math.floor(Math.random() * 36)];
        // dot.innerHTML = 'X'
        document.body.appendChild(dot);
        setTimeout(() => document.body.removeChild(dot), 5000);
}, 100);


const dot = document.createElement("span")
dot.className = 'trail-glow';
document.body.appendChild(dot);
dot.style.backgroundColor = 'rgb(20, 148, 20)';

let mousePos = { x: 0, y: 0 };

document.addEventListener('mousemove', (event) => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
    updateGlow();
});

document.addEventListener('scroll', () => {
    updateGlow();
});

function updateGlow() {
    dot.style.left = `${mousePos.x}px`;
    dot.style.top = `${mousePos.y + window.scrollY}px`;
}

const letters =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";

let isRunningHackerEffect = false;

function hackerEffect(element) {
    if (isRunningHackerEffect) {
        return;
    }
    isRunningHackerEffect = true;
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = element.innerText.split("")
            .map((letter, index) => {
                if(index < iterations) {
                    return element.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 36)];
            })
            .join("");
        if(iterations >= element.dataset.value.length){
            clearInterval(interval);
            isRunningHackerEffect = false;
        } 
        iterations += 1 / 12;
    }, 30);
}

document.querySelector("#welcome").onmouseover = event => hackerEffect(event.target);
document.querySelector("#welcome").onclick = event => hackerEffect(event.target);


const pages = ['#page1','#page2'];

function showRelevantPage(pageNum) {
    pages.forEach(page => {
        document.querySelector(page).style.display = 'none';
    })
    document.querySelector(pages[pageNum]).style.display = 'block';

    if (pageNum === 0) {
        document.querySelector("body").style.overflowY = "hidden";

    } else if (pageNum === 1) {
        typingEffect(document.querySelector('#description-page2'));
        document.querySelector("body").style.overflowY = "scroll";
    }
}

document.querySelector('#next').onclick = () => {
    const element = document.querySelector('#page1');
    element.style.animationPlayState = 'running';
    element.addEventListener('animationend', (event) => {
        if (event.animationName === 'fade-out-page') {
            element.style.animationPlayState = 'paused';
            document.querySelector('.goBackButton').style.display = 'block';

            showRelevantPage(1);
        }
    })
}

document.querySelector('.goBackButton').onclick = () => {
    isRunningHackerEffect = false;
    document.querySelector('.goBackButton').style.display = 'none';
    hackerEffect(welcome);
    showRelevantPage(0);
}

let isRunningTypingEffect = false;

function typingEffect(element) {
    if (isRunningTypingEffect) {
        return;
    }
    const scroll = document.querySelector('#scroll')
    scroll.style.animationPlayState = 'paused';
    isRunningTypingEffect = true;

    let text = element.textContent;
    let index = 0;
    element.textContent = '';

    let interval = setInterval(() => {
        element.textContent += text[index];
        index++;

        if (index >= text.length) {
            clearInterval(interval);
            scroll.style.animationPlayState = 'running';
            isRunningTypingEffect = false;
        }
    }, 60);
}
