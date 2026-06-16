console.log("✅ app.js loaded");
async function generate() {

    alert("Generate Clicked");

    console.log("Generate Clicked");

    const topic = document.getElementById("topic").value.trim();

    if (!topic) {
        alert("Please enter a topic!");
        return;
    }

    const btn = document.getElementById("generateBtn");
    const status = document.getElementById("status");

    btn.disabled = true;
    btn.innerHTML = "⏳ Generating...";

    status.innerHTML = "⏳ Creating AI Video...";

    document.getElementById("topicBox").innerHTML = "";
    document.getElementById("scriptBox").innerHTML = "";
    document.getElementById("sceneBox").innerHTML = "";
    document.getElementById("imageBox").innerHTML = "";
    document.getElementById("result").innerHTML = "";

    document.getElementById("voicePlayer").style.display = "none";
    document.getElementById("videoPlayer").style.display = "none";
    document.getElementById("downloadVideo").style.display = "none";

    try {

        const response = await fetch("/api/automation/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic
            })
        });

        const data = await response.json();

        console.log(data);

        if (!data.success) {

            status.innerHTML = "❌ Failed";

            document.getElementById("result").textContent =
                data.error || "Unknown Error";

            return;
        }

        status.innerHTML = "✅ Video Created Successfully";

        // Topic
        document.getElementById("topicBox").innerHTML =
            data.topic || "";

        // Script
        document.getElementById("scriptBox").textContent =
            data.script || "";

        // Scenes
        const sceneBox = document.getElementById("sceneBox");

        if (Array.isArray(data.scenes)) {

            data.scenes.forEach((scene, index) => {

                const div = document.createElement("div");

                div.style.marginBottom = "10px";

                div.innerHTML =
                    `<b>Scene ${index + 1}</b><br>${scene}`;

                sceneBox.appendChild(div);

            });

        }

        // Images
        const imageBox = document.getElementById("imageBox");

        if (Array.isArray(data.images)) {

            data.images.forEach((img) => {

                const image = document.createElement("img");

                image.src = img;

                image.style.width = "180px";
                image.style.margin = "10px";
                image.style.borderRadius = "10px";

                imageBox.appendChild(image);

            });

        }

        // Voice
        if (data.voice) {

            const player = document.getElementById("voicePlayer");

            player.src = data.voice;

            player.style.display = "block";

        }

        // Video
        if (data.video) {

            const video = document.getElementById("videoPlayer");

            video.src = data.video;

            video.style.display = "block";

            const download = document.getElementById("downloadVideo");

            download.href = data.video;

            download.style.display = "inline-block";

        }

        document.getElementById("result").textContent =
            JSON.stringify(data, null, 2);

    }

    catch (err) {

        console.error(err);

        status.innerHTML = "❌ " + err.message;

    }

    finally {

        btn.disabled = false;

        btn.innerHTML = "🚀 Generate AI Video";

    }

}

window.generate = generate;
document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("generateBtn")
        .addEventListener("click", generate);
});
