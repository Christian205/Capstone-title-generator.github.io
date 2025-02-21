async function generateTitle() {
    const apiKey = "AIzaSyCIhl9_gkhwITkJ2iTDyHLKYZ1WedNvfvs";  // Replace with your actual Gemini API key
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    // Get user input
    const userTopic = document.getElementById("topic").value.trim();
    const titleElement = document.getElementById("generated-titles");

    // Validate input
    if (!userTopic) {
        Swal.fire({
            title: "Error!",
            text: "Please enter your topic!!",
            icon: "error"
        });
        return;
    }

    // Check if the input contains only letters and spaces
    const isValidInput = /^[a-zA-Z\s]+$/.test(userTopic);
    if (!isValidInput) {
        Swal.fire({
            title: "Error!",
            text: "Please enter a valid topic (letters and spaces only)!!",
            icon: "error"
        });
        return;
    }

    // Create and show loader animation
    const loader = document.createElement("div");
    loader.className = "loader";
    titleElement.innerHTML = ""; // Clear previous title
    titleElement.appendChild(loader); 

    // AI prompt
    const prompt = {
        contents: [{ role: "user", parts: [{ text: `Generate 5 unique capstone project titles related to: ${userTopic}` }] }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prompt)
        });

        // Parse response
        const data = await response.json();
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No title generated!!!";

        // **New Fix: Ensure Proper Formatting**
        let titlesArray = generatedText.split("\n").filter(title => title.trim() !== "");
        
        let titleListHTML = "<ol>"; // Create an ordered list
        titlesArray.forEach(title => {
            titleListHTML += `<li>${title}</li>`; // Format each title properly
        });
        titleListHTML += "</ol>";

        // Remove loader and show formatted titles
        titleElement.innerHTML = `<div class="result-title"></div><div class="result-content">${titleListHTML}</div>`;

    } catch (error) {
        console.error("Error:", error);
        titleElement.innerText = "Error generating title.";
        Swal.fire({
            title: "Error generating title!",
            text: "Please try again",
            icon: "error"
        });
    }
}

// **Updated Copy Function: Copies Only the Titles Correctly**
function copyToClipboard() {
    let titleList = document.querySelectorAll("#generated-titles li");
    
    if (titleList.length === 0) {
        Swal.fire({
            title: "No titles to copy!",
            icon: "warning"
        });
        return;
    }

    let textToCopy = "";
    titleList.forEach((item, index) => {
        textToCopy += `${index + 1}. ${item.innerText}\n`; // Adds numbering to copied text
    });

    navigator.clipboard.writeText(textToCopy).then(() => {
        Swal.fire({
            title: "Copied to clipboard!",
            text: textToCopy,
            icon: "success"
        });
    }).catch(err => {
        console.error("Failed to copy:", err);
        Swal.fire({
            title: "Copy failed!",
            text: "Please try manually.",
            icon: "error"
        });
    });
}
