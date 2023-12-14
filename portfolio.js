// "Hacker effect" code (heavily) inspired by HYPERPLEXED - https://www.youtube.com/watch?v=W5oawMJaXbU
const welcome = document.querySelector("#welcome");
document.addEventListener('DOMContentLoaded', () => {
    welcome.innerHTML = welcome.dataset.value;
    hackerEffect(welcome); // Call hackerEffect when the page loads
    showRelevantPage(0);

    // showRelevantPage(1);
});

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


const pages = ['#page1','#page2'];

function showRelevantPage(pageNum) {
    pages.forEach(page => {
        document.querySelector(page).style.display = 'none';
    })
    document.querySelector(pages[pageNum]).style.display = 'block';
}

document.querySelector('#next').onclick = (event) => {
    const element = event.target.parentElement.parentElement;
    element.style.animationPlayState = 'running';
    element.addEventListener('animationend', (event) => {
        if (event.animationName === 'fade-out-page') {
            element.style.animationPlayState = 'paused';
            showRelevantPage(1);
            typingEffect(document.querySelector('#description-page2'));
        }
    })
}

document.querySelector('.goBackButton').onclick = () => {
    isRunningHackerEffect = false;
    hackerEffect(welcome);
    showRelevantPage(0);
}

let isRunningTypingEffect = false;

function typingEffect(element) {
    if (isRunningTypingEffect) {
        return;
    }

    isRunningTypingEffect = true;
    let text = element.textContent;
    let index = 0;
    element.textContent = '';

    let interval = setInterval(() => {
        element.textContent += text[index];
        index++;

        if (index >= text.length) {
            clearInterval(interval);
            isRunningTypingEffect = false;
        }
    }, 60);
}
