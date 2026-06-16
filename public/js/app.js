console.log("✅ app.js loaded");

document.getElementById("status").innerHTML = "🟢 Server Online";

// Simple Generate Function
async function generate() {
    console.log("🚀 Generate button clicked");

    const topic = document.getElementById("topic").value.trim();
    if (!topic) {
        alert("টপিক লিখুন");
        return;
    }

    const status = document.getElementById("status");
    const result = document.getElementById("result");

    status.innerHTML = "⏳ প্রসেস চলছে... (১-২ মিনিট লাগবে)";
    result.innerHTML = "";

    try {
        const res = await fetch("/api/automation/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic: topic })
        });

        const data = await res.json();

        if (data.success) {
            status.innerHTML = "✅ সফল হয়েছে!";
            result.innerHTML = `<pre style="background:#222;padding:10px;">${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            status.innerHTML = "❌ ব্যর্থ হয়েছে";
            result.innerText = data.error || "Error";
        }
    } catch (err) {
        console.error(err);
        status.innerHTML = "❌ Error: " + err.message;
    }
}

window.generate = generate;

console.log("✅ Everything ready");
