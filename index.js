var slider = document.getElementById("myRange");
var slider_footer1 = document.getElementById("pixelsize");
var slider_footer2 = document.getElementById('gridorder');

//all pixel elements are squares
let pixel_size_arr=[12,16,20,24,32,48];

slider.oninput = ()=>{sketchpad(slider.value)};

function sketchpad(sv) {
    let pixel_size = pixel_size_arr[sv];
    slider_footer1.innerText = 'Cell size: ' + pixel_size + ' pixels';
    let NumofRows = 480/pixel_size; let NumofCols = 960/pixel_size;
    slider_footer2.innerText = 'Grid layout: ' + NumofRows +' x ' + NumofCols;
    document.getElementById('sketchpad').innerHTML = '';
    for(let r = 0; r < NumofRows; r++) {
        let row = document.createElement('div');
        document.getElementById('sketchpad').appendChild(row);
        //Setting properties of row flex element
        row.id = 'r' + r;
        row.style.display = 'inline-flex';
        row.style.height = pixel_size + 'px';
        row.style.verticalAlign = 'top';
        for(let c=0; c < NumofCols; c++) {
            let pixel = document.createElement('div');
            row.appendChild(pixel);
            //Setting properties of pixel element
            pixel.className = 'cell pen';
            pixel.style.display = 'block';
            pixel.style.userSelect = 'none';
            pixel.style.width = pixel_size + 'px';
        };
    };
};

let eraser = false;
document.getElementById('eraserbtn').addEventListener('click',(e)=>{
    eraser = !eraser;
    console.log('eraser toggled : '+eraser);
    let cell_arr = document.getElementsByClassName('cell');
    if(eraser) {
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
        for(let element of cell_arr) {
            element.classList.remove('pen');
            element.classList.add('eraser');
        };
    } else {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = 'black';
        for(let element of cell_arr) {
            element.classList.remove('eraser');
            element.classList.add('pen');
        };
    };
    console.log(cell_arr);
});

let tooldown = false;
document.getElementById('sketchpad').addEventListener('mousedown',(ev)=>{
    tooldown = true;
    if(ev.target.className) {
        if(eraser == false) {
            ev.target.style.backgroundColor = 'black';
        } else {
            ev.target.style.backgroundColor = 'white';
        }
    };
});
document.getElementById('sketchpad').addEventListener('mouseup',()=>tooldown=false);

document.getElementById('sketchpad').addEventListener('mouseover',(e)=>{
    if(e.target.className) {
        if(tooldown)  {
            if(eraser == false){
                e.target.style.backgroundColor = 'black';
            } else {
                e.target.style.backgroundColor = 'white';
            };
        }
    };
});

function clear_SketchPad() {
    let cell_arr = document.getElementsByClassName('cell');
    for(let elem of cell_arr) {
        elem.style.backgroundColor = 'white';
    };
};

window.onload = ()=>sketchpad(1);