const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// click event 
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-val');
        handleInput(value);
    });
});


function handleInput(value) {
    // 1. Clear Screen
    if (value === 'C') {
        display.value = '';
    }
    // 2. Delete Last Character
    else if (value === 'DEL') {
        display.value = display.value.toString().slice(0, -1);
    }
    // 3. Calculate Result
    else if (value === '=') {
        try {
            
            let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
            
            // Check for empty input
            if(expression === "") return;

            display.value = eval(expression);
        } catch (error) {
            display.value = 'Error';
            setTimeout(() => display.value = '', 1500); 
        }
    }
    // 4. Add numbers/operators to screen
    else {
        
        const lastChar = display.value.slice(-1);
        const operators = ['+', '-', '*', '/'];
        
      
        if (display.value === '' && ['*', '/', '+'].includes(value)) return;
        
        display.value += value;
    }
}


document.addEventListener('keydown', (event) => {
    const key = event.key;

   
    if ((key >= 0 && key <= 9) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput(key);
    }
    
    else if (key === 'Enter') {
        handleInput('=');
    }
   
    else if (key === 'Backspace') {
        handleInput('DEL');
    }
    
    else if (key === 'Escape') {
        handleInput('C');
    }
});