async function generate() {
    const topicInput = document.getElementById("topic");
    const status = document.getElementById("status");
    const result = document.getElementById("result");

    const topic = topicInput.value.trim();

    if (!topic) {
        alert("অনুগ্রহ করে একটি টপিক লিখুন");
        return;
    }

    // Disable button during processing
    const button = document.querySelector("button");
    if (button) button.disabled = true;

    status.innerHTML = "⏳ প্রসেস শুরু হচ্ছে... (১-২ মিনিট লাগতে পারে)";
    result.innerHTML = "";

    try {
        console.log("🚀 Request sending for:", topic);

        const res = await fetch("/api/automation/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ topic })
        });

        console.log("📡 Response status:", res.status);

        const data = await res.json();
        console.log("📦 Full response:", data);

        if (data.success) {
            status.innerHTML = "✅ সফলভাবে সম্পন্ন হয়েছে!";
            result.innerHTML = `<pre style="background:#222; padding:15px; text-align:left; max-height:400px; overflow:auto;">${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            status.innerHTML = "❌ ব্যর্থ হয়েছে";
            result.innerText = data.error || "Unknown error occurred";
        }

    } catch (err) {
        console.error("❌ Fetch Error:", err);
        status.innerHTML = "❌ কানেকশন এরর";
        result.innerText = err.message;
    } finally {
        if (button) button.disabled = false;
    }
}

// Make function globally available
window.generate = generate;

// Check server on load
async function checkServer() {
    try {
        const res = await fetch("/health");
        const data = await res.json();
        document.getElementById("status").innerHTML = "🟢 Server Online";
    } catch (err) {
        document.getElementById("status").innerHTML = "🔴 Server Offline";
    }
}

window.onload = checkServer;
