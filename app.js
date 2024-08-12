const peopleinputer=document.getElementById('peopleinputer');
const rowsinputer=document.getElementById('rowsinputer');
const startbtn=document.getElementById('startbtn');
const displayer=document.getElementById('displayer');
const jokerinputer=document.getElementById('jokerinputer');
const exceptinputer=document.getElementById('exceptinputer');
const jokerinfo=document.getElementById('jokerinfo');
const exceptinfo=document.getElementById('exceptinfo');
const backselect=Array.from(document.getElementsByClassName('backcolor'));
const ltselect=Array.from(document.getElementsByClassName('ltcolor'));
const btnselect=Array.from(document.getElementsByClassName('btncolor'));
const regex=/^[0-9,]+$/;
let people=0;
let rows=0;
let canusenum=[];
let string='';
let jokercan=[];
let jokers=[];
let seatarr=[];
let exceptlist=[];
let leftjoker=0;
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
};
function starting(){
    seatarr=[];
    people=parseInt(peopleinputer.value);
    rows=parseInt(rowsinputer.value);
    if (peopleinputer.value===''||rowsinputer.value===''||peopleinputer.value<=0||rowsinputer.value<=0){
        alert('끝 번호와 가로줄 수를 올바르게 입력하십시오.');
        return;
    } if (parseInt(peopleinputer.value)>300||parseInt(rowsinputer.value)>30){
        alert('끝 번호는 최대 300, 가로 줄은 최대 30줄만 처리할 수 있습니다.');
        return;
    };
    if (jokerinputer.value!==''){
        if (!regex.test(jokerinputer.value)){
            alert('조커 입력란에는 숫자와 ,외에는 들어갈 수 없습니다.');
            return;
        } if ((jokerinputer.value)[jokerinputer.value.length-1]!==','){
            jokers=(jokerinputer.value).split(',');
            jokers=jokers.map(Number);
        } else {
            alert('조커 입력란의 마지막 글자는 ,일 수 없습니다.');
            return;
        };
    } else {
        jokers=[];
    };
    if (exceptinputer.value!==''){
        if (!regex.test(exceptinputer.value)){
            alert('제외 번호 입력란에는 숫자와 ,외에는 들어갈 수 없습니다.');
            return;
        } if ((exceptinputer.value)[exceptinputer.value.length-1]!==','){
            exceptlist=(exceptinputer.value).split(',');
            exceptlist=exceptlist.map(Number);
        } else {
            alert('제외번호 입력란의 마지막 글자는 ,일 수 없습니다.');
            return;
        };
    } else {
        exceptlist=[];
    };
    displayer.innerText='자리 생성 중';
    canusenum=[];
    jokercan=[];
    for (let i=1; i<=people; i++){
        if (!(exceptlist.includes(i))){
            jokercan.push(i);
            canusenum.push(i);
        };
    };
    for (let i=1; i<people; i++){
        if (!(exceptlist.includes(i))){
            seatarr.push('?');
        };
    };
    leftjoker=jokers.length;
    for (let i=1; i<=people; i++){
        if (!(exceptlist.includes(i))){
            if (jokers.includes(i)){
                n=jokercan[getRandom(1,jokercan.length)-1];
                while (!(jokercan.includes(n))){
                    n=jokercan[getRandom(1,jokercan.length)-1];
                };
                seatarr[n-1]=i;
                jokercan=jokercan.filter((e)=>e!==n);
                jokercan=jokercan.filter((e)=>e>i);
                jokercan=jokercan.filter((e)=>e!==n+1);
                jokercan=jokercan.filter((e)=>e!==n-1);
                jokercan=jokercan.filter((e)=>e!==n+rows);
                jokercan=jokercan.filter((e)=>e!==n-rows);
                jokercan=jokercan.filter((e)=>e!==n+rows+1);
                jokercan=jokercan.filter((e)=>e!==n+rows-1);
                jokercan=jokercan.filter((e)=>e!==n-rows+1);
                jokercan=jokercan.filter((e)=>e!==n-rows-1);
                canusenum=canusenum.filter((e)=>e!==n);
                leftjoker-=1
                if (jokercan.length===0&&leftjoker>0){
                    starting();
                    return;
                };
            };
        };
    };
    for (let i=1; i<=people; i++){
        if (!(exceptlist.includes(i))){
            if (!(jokers.includes(i))){
                n=canusenum[getRandom(1,canusenum.length)-1];
                while (!(canusenum.includes(n))){
                    n=canusenum[getRandom(1,canusenum.length)-1];
                };
                seatarr[n-1]=i;
                canusenum=canusenum.filter((e)=>e!==n);
            };
        };
    };
    string='';
    let k=1;
    for (let i=1; i<=people; i++){
        if (!(exceptlist.includes(i))){
            if (k%rows===0){
                string=string+String(seatarr[i-1]).padStart(2,'0')+'\n';
            } else {
                string=string+String(seatarr[i-1]).padStart(2,'0')+'  ';
            };
            k+=1;
        };
    };
    displayer.innerText=string;
    return;
};
function showjokerinfo(){
    alert('조커 번호란?\n\n조커 번호란 조커 번호로 지정된 번호는 반드시 상하좌우와 대각선으로 1칸 이상 떨어져있습니다.\n같이 붙어있으면 떠드는 번호에 활용해보세요!\n\n⚠️너무 많은 조커 번호를 지정하면 프로그램이 자리를 생성할 수 없어요! 컴퓨터에 과부하가 걸릴수도 있어요!');
};
function showexceptinfo(){
    alert('제외 번호란?\n\n제외 번호란 제외 번호로 지정된 번호는 자리에 나타나지 않습니다.\n전학간 번호나 없는 번호에 활용해보세요!\n\n⚠️조커 번호와 동시에 지정하면 제외 번호가 먼저 적용되어 자리에 나타나지 않아요!');
};
function backgroundcolorchange(evt){
    document.body.style.backgroundColor=evt.target.value;
    backselect.forEach(e=>e.style.borderColor='#FFF');
    evt.target.style.borderColor='#000';
    localStorage.setItem('backcolor',evt.target.value);
};
function lettercolorchange(evt){
    document.body.style.color=evt.target.value;
    ltselect.forEach(e=>e.style.borderColor='#FFF')
    evt.target.style.borderColor='cornflowerblue';
    localStorage.setItem('ltcolor',evt.target.value);
};
function btncolorchange(evt){
    jokerinfo.style.backgroundColor=evt.target.value;
    exceptinfo.style.backgroundColor=evt.target.value;
    startbtn.style.backgroundColor=evt.target.value;
    btnselect.forEach(e=>e.style.borderColor='#FFF');
    evt.target.style.borderColor='#000';
    localStorage.setItem('btncolor',evt.target.value);
};
startbtn.addEventListener('click',starting);
jokerinfo.addEventListener('click',showjokerinfo);
exceptinfo.addEventListener('click',showexceptinfo);
backselect.forEach(e=>e.addEventListener('click',backgroundcolorchange));
ltselect.forEach(e=>e.addEventListener('click',lettercolorchange));
btnselect.forEach(e=>e.addEventListener('click',btncolorchange));
if (localStorage.getItem('backcolor')===null){
    localStorage.setItem('backcolor','#008080');
} else {
    document.body.style.backgroundColor=localStorage.getItem('backcolor');
};
if (localStorage.getItem('ltcolor')===null){
    localStorage.setItem('ltcolor','#FFF');
} else {
    document.body.style.color=localStorage.getItem('ltcolor');
};
if (localStorage.getItem('btncolor')===null){
    localStorage.setItem('btncolor','#6495ED');
} else {
    jokerinfo.style.backgroundColor=localStorage.getItem('btncolor');
    exceptinfo.style.backgroundColor=localStorage.getItem('btncolor');
    startbtn.style.backgroundColor=localStorage.getItem('btncolor');
}