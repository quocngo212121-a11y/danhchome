// Lời chúc dài (mỗi phần sẽ hiển thị dần)
const LOICHUC = [
`Mẹ ơi, con biết cuộc đời không phải lúc nào cũng phẳng lặng — có những lúc con vụng về, có những lúc con làm mẹ lo lắng. Nhưng mẹ luôn là nơi con tìm về, nơi con biết rằng mình được yêu thương vô điều kiện.`,
`Con cảm ơn mẹ vì đã cho con một gia đình, cho con bài học về kiên nhẫn, lòng bao dung và cách yêu thương người khác. Những điều mẹ làm thầm lặng mỗi ngày chính là nền tảng vững chắc cho con bước vào đời.`,
`Hôm nay con muốn nói rằng: con trân trọng từng giây phút bên mẹ. Con biết mình không nói đủ, không làm đủ, nhưng tấm lòng con luôn muốn mẹ được hạnh phúc và an yên.`,
`Mong mẹ luôn mạnh khỏe, giữ nụ cười trên môi, và nhận lấy tất cả niềm vui mà mẹ xứng đáng. Mẹ là tất cả với con — con yêu mẹ rất nhiều.`
];

const msgArea = document.getElementById('msgArea');
const showBtn = document.getElementById('showBtn');
const speakBtn = document.getElementById('speakBtn');
const runPyBtn = document.getElementById('runPyBtn');
const downloadJava = document.getElementById('downloadJava');

// Java file content for download link
const javaSrc = `public class HelloMom {
 public static void main(String[] args){
  System.out.println("Mẹ ơi, con chúc mẹ một ngày thật vui và khỏe mạnh!");
 }
}`;

// set download href
downloadJava.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(javaSrc);

// Hiện lời chúc từng đoạn
showBtn.addEventListener('click', async ()=>{
  msgArea.innerHTML = '';
  for (let i=0;i<LOICHUC.length;i++){
    await showParagraph(LOICHUC[i], i);
  }
});

function showParagraph(text, idx){
  return new Promise(res=>{
    const p = document.createElement('p');
    p.className = 'fade';
    p.style.opacity = 0;
    p.style.transform = 'translateY(6px)';
    p.style.transition = 'opacity .6s ease, transform .6s ease';
    p.innerHTML = text.replace(/\n/g,'<br>');
    msgArea.appendChild(p);
    setTimeout(()=>{p.style.opacity=1;p.style.transform='translateY(0)';},80 + idx*200);
    setTimeout(res,700 + idx*200);
  });
}

// Speech synthesis (đọc giọng máy)
speakBtn.addEventListener('click', ()=>{
  const full = LOICHUC.join(' ');
  if (!('speechSynthesis' in window)){
    alert('Trình duyệt không hỗ trợ SpeechSynthesis.');
    return;
  }
  const u = new SpeechSynthesisUtterance(full);
  u.lang = 'vi-VN';
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
});

// Pyodide: chạy file run.py nằm cùng thư mục
let pyodideLoaded=false;
async function loadPyodideIfNeeded(){
  if(pyodideLoaded) return window.pyodide;
  // load pyodide
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
  document.head.appendChild(s);
  await new Promise(r=>s.onload = r);
  // eslint-disable-next-line no-undef
  window.pyodide = await loadPyodide();
  pyodideLoaded = true;
  return window.pyodide;
}

runPyBtn.addEventListener('click', async ()=>{
  try{
    await showTemporaryNotice('Đang nạp Pyodide, chờ chút nhé…');
    await loadPyodideIfNeeded();
    // load run.py
    const r = await fetch('run.py');
    const code = await r.text();
    // redirect stdout to console and alert the text output
    const out = await window.pyodide.runPythonAsync(`
import sys
from js import console
_output = []
def write(s):
    _output.append(str(s))
sys.stdout.write = write
sys.stderr.write = write
` + '\n' + code + '\n' + `\n'__PY_OUTPUT__'.join(_output)`);
    alert('Kết quả Python:\\n\\n' + out);
  }catch(e){
    alert('Lỗi khi chạy Python: ' + e);
  }
});

function showTemporaryNotice(txt){
  return new Promise(res=>{
    const note = document.createElement('div');
    note.textContent = txt;
    note.style.position = 'fixed';
    note.style.left = '50%';
    note.style.top = '16px';
    note.style.transform = 'translateX(-50%)';
    note.style.background = 'rgba(255,159,177,0.95)';
    note.style.color = '#fff';
    note.style.padding = '10px 14px';
    note.style.borderRadius = '10px';
    note.style.zIndex = 9999;
    document.body.appendChild(note);
    setTimeout(()=>{note.remove();res()},1200);
  });
}
