alert("app.js loaded");
async function generate() {
alert("Button clicked");
    const topic = document.getElementById("topic").value.trim();

    if (!topic) {
        alert("অনুগ্রহ করে একটি টপিক লিখুন");
        return;
    }

    const result = document.getElementById("result");
    const status = document.getElementById("status");

    status.innerHTML = "⏳ AI ভিডিও তৈরি হচ্ছে...";
    result.innerText = "";

    try {

    console.log("Before fetch");

    const res = await fetch("/api/automation/run", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            topic
        })
    });

    console.log("After fetch");
    console.log("Status:", res.status);

    const data = await res.json();

    console.log(data);

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

// Server Status Check
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

checkServer();
