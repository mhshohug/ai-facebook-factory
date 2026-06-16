console.log("✅ app.js LOADED");

async function generate() {
    console.log("🚀 BUTTON CLICKED!");

    const topic = document.getElementById("topic").value.trim();
    if (!topic) {
        alert("টপিক লিখুন");
        return;
    }

    const status = document.getElementById("status");
    const result = document.getElementById("result");

    status.innerHTML = "⏳ প্রসেস চলছে...";
    result.innerHTML = "";

    try {
        console.log("📤 Fetching /api/automation/run");

        const res = await fetch("/api/automation/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        });

        console.log("📥 Response status:", res.status);

        const data = await res.json();
        console.log("📦 Response data:", data);

        if (data.success) {
            status.innerHTML = "✅ সফল!";
            result.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            status.innerHTML = "❌ Error";
            result.innerText = data.error || "Failed";
        }
    } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        status.innerHTML = "❌ Fetch Error দেখুন Console";
        result.innerText = err.message;
    }
}

window.generate = generate;
console.log("✅ generate() function registered");
