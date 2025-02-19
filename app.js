///AIzaSyCIhl9_gkhwITkJ2iTDyHLKYZ1WedNvfvs
async function generateTitle() {
    const apiKey = "AIzaSyCIhl9_gkhwITkJ2iTDyHLKYZ1WedNvfvs";  // Replace with your actual Gemini API key
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    // Get user input
    const userTopic = document.getElementById("topic").value.trim();
    const titleElement = document.getElementById("title");

    // Validate input
    if (!userTopic) {
        titleElement.innerText = "Please enter a topic!";
        return;
    }

    // Create and show loader animation
    const loader = document.createElement("div");
    loader.className = "loader";
    titleElement.innerHTML = ""; // Clear previous title
    titleElement.appendChild(loader);

    // AI prompt
    const prompt = {
        contents: [{ role: "user", parts: [{ text: `Generate a unique capstone project title related to: ${userTopic}` }] }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prompt)
        });

        // Parse response
        const data = await response.json();
        const generatedTitle = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No title generated";

        // Remove loader and show title
        titleElement.innerHTML = `${generatedTitle}`;
    } catch (error) {
        console.error("Error:", error);
        titleElement.innerText = "Error generating title.";
    }
}
