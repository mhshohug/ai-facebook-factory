async function generate(){

const topic=document.getElementById("topic").value;

const res=await fetch("/api/automation/run",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

topic

})

});

const data=await res.json();

document.getElementById("result").innerText=

JSON.stringify(data,null,2);

}

fetch("/health")

.then(r=>r.json())

.then(d=>{

document.getElementById("status").innerHTML=

"🟢 Server Online";

});
