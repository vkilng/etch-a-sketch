var slider = document.getElementById("myRange");
var slider_footer1 = document.getElementById("pixelsize");
var slider_footer2 = document.getElementById('gridorder');

//all pixel elements are squares
let pixel_size_arr=[12,16,20,24,32,48];

slider.oninput = ()=>{sketchpad(slider.value)};

function sketchpad(ps) {
    let pixel_size = pixel_size_arr[ps];
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
            pixel.className = 'cell';
            pixel.style.display = 'block';
            pixel.style.userSelect = 'none';
            pixel.style.width = pixel_size + 'px';
        };
    };
    let cell_arr = document.getElementsByClassName('cell');
    for(let elem of cell_arr) {
        elem.addEventListener('mousedown',(e)=>{e.target.style.backgroundColor = 'black'})
    };
};

let pendown = false;
document.getElementById('sketchpad').addEventListener('mousedown',()=>pendown=true);
document.getElementById('sketchpad').addEventListener('mouseup',()=>pendown=false);

document.getElementById('sketchpad').addEventListener('mouseover',(e)=>{
    if(pendown && e.target.className == 'cell') {
        e.target.style.backgroundColor = 'black';
    };
});

function clear_SketchPad() {
    let cell_arr = document.getElementsByClassName('cell');
    for(let elem of cell_arr) {
        elem.style.backgroundColor = 'white';
    };
}

window.onload = ()=>sketchpad(1);