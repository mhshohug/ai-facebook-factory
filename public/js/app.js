async function generate() {
    const topic = document.getElementById("topic").value.trim();
    if (!topic) {
        alert("অনুগ্রহ করে একটি টপিক লিখুন");
        return;
    }

    const status = document.getElementById("status");
    const result = document.getElementById("result");
    const button = document.querySelector("button");

    if (button) button.disabled = true;
    status.innerHTML = "⏳ প্রসেস চলছে... (১-২ মিনিট লাগবে, ধৈর্য ধরুন)";
    result.innerHTML = "";

    try {
        const res = await fetch("/api/automation/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        });

        const data = await res.json();

        if (data.success) {
            status.innerHTML = "✅ সফলভাবে সম্পন্ন হয়েছে!";
            result.innerHTML = `<pre style="background:#222; color:#0f0; padding:10px; text-align:left; max-height:500px; overflow:auto;">${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            status.innerHTML = "❌ ব্যর্থ হয়েছে";
            result.innerText = data.error || "Unknown error";
        }

    } catch (err) {
        console.error(err);
        status.innerHTML = "❌ এরর হয়েছে";
        result.innerText = err.message;
    } finally {
        if (button) button.disabled = false;
    }
}

// Global expose
window.generate = generate;

// Server check
async function checkServer() {
    try {
        const res = await fetch("/health");
        const data = await res.json();
        document.getElementById("status").innerHTML = "🟢 Server Online";
    } catch (e) {
        document.getElementById("status").innerHTML = "🔴 Server Offline";
    }
}

window.onload = checkServer;
