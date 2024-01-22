const urlInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(urlInput.value);
        if (!response.ok) {
            throw new Error("Descarga Fallida :(");
        }
        const file = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = getFileName(response);
        link.click();
    } catch (error) {
        alert(error.message);
    }
});

function getFileName(response) {
    const disposition = response.headers.get("content-disposition");
    if (disposition && disposition.indexOf("attachment") !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches !== null && matches[1]) {
            return matches[1].replace(/['"]/g, "");
        }
    }
    return new Date().getTime().toString();
}
