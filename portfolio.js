// "Hacker effect" code (heavily) inspired by HYPERPLEXED - https://www.youtube.com/watch?v=W5oawMJaXbU
document.addEventListener('DOMContentLoaded', () => {
    const welcome = document.querySelector("#welcome");
    welcome.innerHTML = welcome.dataset.value;
    hackerEffect(welcome); // Call hackerEffect when the page loads
});

const letters =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";

let isRunning = false;

function hackerEffect(element) {
    if (isRunning) {
        return;
    }
    isRunning = true;
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
            isRunning = false;
        } 
        iterations += 1 / 8;
    }, 40);
}

document.querySelector("#welcome").onmouseover = event => hackerEffect(event.target);