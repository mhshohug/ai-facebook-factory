async function generate() {

    const topic = document.getElementById("topic").value.trim();

    if (!topic) {
        alert("অনুগ্রহ করে একটি টপিক লিখুন");
        return;
    }

    const status = document.getElementById("status");
    const result = document.getElementById("result");

    status.innerHTML = "⏳ AI ভিডিও তৈরি হচ্ছে...";
    result.innerText = "";

    try {

        const res = await fetch("/api/automation/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic
            })
        });

        const data = await res.json();

        if (data.success) {
            status.innerHTML = "✅ সফলভাবে সম্পন্ন হয়েছে";
        } else {
            status.innerHTML = "❌ ব্যর্থ হয়েছে";
        }

        result.innerText = JSON.stringify(data, null, 2);

    } catch (err) {

        status.innerHTML = "❌ Server Error";
        result.innerText = err.message;

    }

}

async function checkServer() {

    try {

        const res = await fetch("/health");
        const data = await res.json();

        if (data.success) {
            document.getElementById("status").innerHTML = "🟢 Server Online";
        } else {
            document.getElementById("status").innerHTML = "🔴 Server Offline";
        }

    } catch (err) {

        document.getElementById("status").innerHTML = "🔴 Server Offline";

    }

}

window.generate = generate;

checkServer();
alert("1");

const res = await fetch("/api/automation/run", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ topic })
});

alert("2");

const data = await res.json();

alert("3");

console.log(data);

alert("4");
