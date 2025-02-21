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
