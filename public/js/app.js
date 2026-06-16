// ==================== DEBUG VERSION ====================
console.log("✅ app.js loaded successfully");

async function generate() {
    console.log("🚀 Generate button clicked!");

    const topic = document.getElementById("topic").value.trim();
    if (!topic) {
        alert("অনুগ্রহ করে একটি টপিক লিখুন");
        return;
    }

    const status = document.getElementById("status");
    const result = document.getElementById("result");
    const button = document.querySelector("button");

    if (button) button.disabled = true;

    status.innerHTML = "⏳ প্রসেস চলছে... (১-২ মিনিট লাগবে)";
    result.innerHTML = "";

    try {
        console.log("📡 Sending request to /api/automation/run with topic:", topic);

        const res = await fetch("/api/automation/run", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ topic })
        });

        console.log("📡 Response status:", res.status);

        const data = await res.json();
        console.log("📦 Full response data:", data);

        if (data.success) {
            status.innerHTML = "✅ সফলভাবে সম্পন্ন হয়েছে!";
            result.innerHTML = `<pre style="background:#222; color:#0f0; padding:15px; text-align:left;">${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            status.innerHTML = "❌ ব্যর্থ হয়েছে";
            result.innerText = data.error || "Unknown error";
        }

    } catch (err) {
        console.error("❌ Fetch Error:", err);
        status.innerHTML = "❌ এরর হয়েছে - Console দেখুন";
        result.innerText = err.message;
    } finally {
        if (button) button.disabled = false;
    }
}

// Global access
window.generate = generate;

console.log("✅ generate function registered");

// Server check
async function checkServer() {
    try {
        const res = await fetch("/health");
        const data = await res.json();
        document.getElementById("status").innerHTML = "🟢 Server Online";
        console.log("✅ Server health check passed");
    } catch (e) {
        document.getElementById("status").innerHTML = "🔴 Server Offline";
        console.error("Server health check failed");
    }
}

window.onload = checkServer;
