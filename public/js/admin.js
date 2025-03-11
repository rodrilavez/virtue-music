const API_BASE_URL = "https://virtue-api.onrender.com"; // Cambia esto con tu URL real

document.addEventListener("DOMContentLoaded", () => {
    setupHandlers("reviews");
    setupHandlers("blogs");
    setupHandlers("playlists");
    setupPreviewHandlers();
    updateAllPreviews(); // ⚡ Mostrar vista previa desde el inicio
});

// 📌 Mostrar la sección seleccionada
function showSection(sectionId) {
    document.querySelectorAll(".admin-section").forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
}

// 📌 Configurar eventos para la Vista Previa en tiempo real
function setupPreviewHandlers() {
    document.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", updateAllPreviews);
    });
}

// 📌 Actualizar TODAS las vistas previas al escribir
function updateAllPreviews() {
    updatePreview("review");
    updatePreview("blog");
    updatePreview("playlist");
}

// 📌 Actualizar la Vista Previa
function updatePreview(type) {
    const previewDiv = document.getElementById(`${type}Preview`);
    if (!previewDiv) return;

    let title = "", content = "", image = "", author = "", description = "", songs = "";

    if (type === "review") {
        title = document.getElementById("reviewTitle")?.value.trim() || "Título de la Review";
        content = document.getElementById("reviewContent")?.value.trim() || "Escribe aquí el contenido...";
        image = document.getElementById("reviewImage")?.value.trim() || "https://via.placeholder.com/100";
    } else if (type === "blog") {
        title = document.getElementById("blogTitle")?.value.trim() || "Título del Blog";
        content = document.getElementById("blogContent")?.value.trim() || "Escribe aquí el contenido...";
        author = document.getElementById("blogAuthor")?.value.trim() || "Autor Desconocido";
        image = document.getElementById("blogImage")?.value.trim() || "https://via.placeholder.com/100";
    } else if (type === "playlist") {
        title = document.getElementById("playlistName")?.value.trim() || "Nombre de la Playlist";
        description = document.getElementById("playlistDescription")?.value.trim() || "Descripción de la playlist...";
        image = document.getElementById("playlistImage")?.value.trim() || "https://via.placeholder.com/100";
        songs = document.getElementById("playlistSongs")?.value.trim()
            ? document.getElementById("playlistSongs").value.split(",").map(song => song.trim()).join(", ")
            : "Sin canciones agregadas";
    }

    previewDiv.innerHTML = `
      <div class="preview-item">
        <img src="${image}" alt="${title}" class="preview-image">
        <div class="preview-text">
          <h3>${title}</h3>
          <p>${content}</p>
          ${author ? `<p><strong>Autor:</strong> ${author}</p>` : ""}
          ${description ? `<p>${description}</p>` : ""}
          ${songs ? `<p><strong>Canciones:</strong> ${songs}</p>` : ""}
        </div>
      </div>
    `;
}

// 📌 Función para manejar CRUD en cada sección
function setupHandlers(type) {
    const form = document.getElementById(`${type}Form`);
    const list = document.getElementById(`${type}List`);

    async function fetchItems() {
        try {
            const response = await fetch(`${API_BASE_URL}/${type}`);
            const data = await response.json();
            list.innerHTML = data.length
                ? data.map(item => `
                    <div class="admin-item">
                        <h3>${item.title || item.name}</h3>
                        <p>${item.content || item.description || ""}</p>
                        <img src="${item.image}" width="100">
                        <button onclick="editItem('${item._id}', '${type}')">✏ Editar</button>
                        <button onclick="deleteItem('${item._id}', '${type}')">🗑 Eliminar</button>
                    </div>
                `).join("")
                : "<p>No hay contenido disponible</p>";
        } catch (error) {
            console.error(`Error al obtener ${type}:`, error);
            list.innerHTML = "<p>Error cargando datos</p>";
        }
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            title: document.getElementById(`${type}Title`)?.value || document.getElementById(`${type}Name`)?.value,
            content: document.getElementById(`${type}Content`)?.value,
            description: document.getElementById(`${type}Description`)?.value,
            image: document.getElementById(`${type}Image`)?.value,
            author: document.getElementById(`${type}Author`)?.value,
            songs: document.getElementById(`${type}Songs`)?.value?.split(",").map(song => song.trim()) || []
        };

        try {
            await fetch(`${API_BASE_URL}/${type}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            fetchItems();
            form.reset();
            updatePreview(type); // ⚡ Actualizar vista previa después de agregar
        } catch (error) {
            console.error(`Error al agregar ${type}:`, error);
        }
    });

    fetchItems();
}

// 📌 Eliminar un elemento
async function deleteItem(id, type) {
    if (confirm(`¿Estás seguro de que quieres eliminar este ${type}?`)) {
        try {
            await fetch(`${API_BASE_URL}/${type}/${id}`, { method: "DELETE" });
            window.location.reload();
        } catch (error) {
            console.error(`Error al eliminar ${type}:`, error);
        }
    }
}

// 📌 Editar un elemento
function editItem(id, type) {
    window.location.href = `edit-${type}.html?id=${id}`;
}