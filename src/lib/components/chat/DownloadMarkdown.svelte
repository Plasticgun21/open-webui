<script>
  import JSZip from "jszip";

  export let chapters = [];

  let isDownloading = false;

  // Funktion für den Download einer einzelnen Markdown-Datei
  const downloadFile = (chapter) => {
      const blob = new Blob([chapter.content], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${chapter.title}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  // Funktion für den Download aller Dateien als ZIP
  const downloadAll = async () => {
      isDownloading = true;
      const zip = new JSZip();
      chapters.forEach((chapter) => {
          zip.file(`${chapter.title}.md`, chapter.content);
      });
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "markdown_chapters.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      isDownloading = false;
  };
</script>

<style>
  .button {
      background-color: #1d4ed8;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 1rem;
      margin: 0.5rem 0;
  }
  .button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
  }
</style>

<div>
  {#each chapters as chapter (chapter.title)}
      <button class="button" on:click={() => downloadFile(chapter)}>
          {`Download ${chapter.title}`}
      </button>
  {/each}

  <button class="button" on:click={downloadAll} disabled={isDownloading}>
      {isDownloading ? "Erstelle ZIP..." : "Alle Dateien herunterladen"}
  </button>
</div>
