// quiz.js (first line)
// class-select.js or quiz.js ke start me likho
if (!localStorage.getItem("loggedInUser")) {
  alert("⚠️ Please login first!");
  window.location.href = "../login.html";
}

// class-select.js
function initClassSelect(){
  const container = $("#classes"); const nextBtn = $("#nextBtn"); let selected=null;
  for(let i=1;i<=12;i++){
    const d=create("div",{class:"option-card"}, "Class "+i);
    d.addEventListener("click",()=>{ $$(".option-card").forEach(x=>x.classList.remove("selected")); d.classList.add("selected"); selected=i; nextBtn.disabled=false; });
    container.appendChild(d);
  }
  on(nextBtn,"click",()=>{ if(!selected) return; save("userClass",String(selected)); location.href = selected>=9 ? "stream-select.html" : "subject-select.html"; });
  document.addEventListener("keydown", e=>{ if(e.key==="Enter" && !nextBtn.disabled) nextBtn.click(); });
}
