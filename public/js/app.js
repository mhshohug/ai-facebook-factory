console.log("✅ app.js fully loaded");

document.getElementById("status").innerHTML = "🟢 Server Online";

// Main Generate Function
async function generate() {
    console.log("🚀 === BUTTON CLICKED ===");

    const topicField = document.getElementById("topic");
    const topic = topicField ? topicField.value.trim() : "";

    if (!topic) {
        alert("অনুগ্রহ করে টপিক লিখুন!");
        return;
    }

    const status = document.getElementById("status");
    const result = document.getElementById("result");
    const button = document.querySelector("button");

    if (button) button.disabled = true;
    if (button) button.innerHTML = "⏳ প্রসেস চলছে...";

    status.innerHTML = `⏳ "${topic}" এর জন্য ভিডিও তৈরি হচ্ছে... <br>(১-২ মিনিট লাগবে)`;
    result.innerHTML = "";

    try {
        console.log("📤 Sending POST request...");

        const response = await fetch("/api/automation/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ topic: topic })
        });

        console.log("📥 Response Status:", response.status);

        const data = await response.json();
        console.log("📦 Full Response:", data);

        if (data.success) {
            status.innerHTML = "✅ সফলভাবে সম্পন্ন হয়েছে!";
            result.innerHTML = `<pre style="background:#222; color:#0f0; padding:15px; text-align:left; max-height:400px; overflow:auto;">${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            status.innerHTML = "❌ ব্যর্থ হয়েছে";
            result.innerHTML = `<pre style="color:red;">${data.error || "Unknown error"}</pre>`;
        }

    } catch (err) {
        console.error("❌ CATCH ERROR:", err);
        status.innerHTML = "❌ এরর হয়েছে (Console দেখুন)";
        result.innerText = err.message;
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = "Generate AI Video";
        }
    }
}

// Make it global
window.generate = generate;

console.log("✅ generate() function is ready");
