// @ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ideaForm");
  const libelleInput = document.getElementById("libelle");
  const messageInput = document.getElementById("message");
  const categorySelect = document.getElementById("category");

  const libelleError = document.getElementById("libelleError");
  const messageError = document.getElementById("messageError");
  const categoryError = document.getElementById("categoryError");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const errorMessage = document.getElementById("errorMessage");
  const ideasList = document.getElementById("ideasList");

  const tableCategory = ["Politique", "Économie", "Social", "Culture"];

  let ideas = [];

  libelleInput.addEventListener("blur", validateLibelle);
  messageInput.addEventListener("blur", validateMessage);
  categorySelect.addEventListener("blur", validateCategory);

  function validateLibelle() {
    let libelle = libelleInput.value.trim();
    let monRegex =
      /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s]+$/;
    if (libelle.length < 3 || libelle.length > 50) {
      libelleError.textContent =
        "Le libellé doit comporter entre 3 et 50 caractères.";
      libelleError.style.display = "block";
      return false;
    } else if (!monRegex.test(libelle)) {
      libelleError.textContent =
        "Le libellé ne doit comporter que des lettres a à z.";
      libelleError.style.display = "block";
      return false;
    } else {
      libelleError.textContent = "";
      libelleError.style.display = "none";
      return true;
    }
  }

  function validateMessage() {
    let message = messageInput.value.trim();
    let monRegex =
      /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s]+$/;
    if (message.length < 10 || message.length > 500) {
      messageError.textContent =
        "Le message doit comporter entre 10 et 500 caractères.";
      messageError.style.display = "block";
      return false;
    } else if (!monRegex.test(message)) {
      messageError.textContent =
        "Le message ne doit comporter que des lettres a à z.";
      messageError.style.display = "block";
      return false;
    } else {
      messageError.textContent = "";
      messageError.style.display = "none";
      return true;
    }
  }

  function validateCategory() {
    if (categorySelect.value === "") {
      categoryError.textContent = "La catégorie est requise.";
      categoryError.style.display = "block";
      return false;
    } else if (categorySelect.value !== tableCategory) {
      categoryError.textContent = "La catégorie n'existe pas.";
      categoryError.style.display = "block";
      return false;
    } else {
      categoryError.textContent = "";
      categoryError.style.display = "none";
      return true;
    }
  }

  function displayIdeas() {
    ideasList.innerHTML = "";
    ideas.forEach((idea, index) => {
      const ideaDiv = document.createElement("div");
      ideaDiv.className = "idea";

      const ideaContentDiv = document.createElement("div");
      ideaContentDiv.className = "idea-content";

      const ideaContent = `
              <p><strong>Libellé:</strong> ${idea.libelle}</p>
              <p><strong>Message:</strong> ${idea.message}</p>
              <p><strong>Catégorie:</strong> ${idea.category}</p>
          `;

      ideaContentDiv.innerHTML = ideaContent;

      const ideaStatus = document.createElement("span");
      ideaStatus.className = `idea-status ${
        idea.status === "Approuvée"
          ? "approved"
          : idea.status === "Désapprouvée"
          ? "disapproved"
          : ""
      }`;
      ideaStatus.textContent = idea.status;

      const ideaActionsDiv = document.createElement("div");
      ideaActionsDiv.className = "idea-actions";

      const approveButton = document.createElement("button");
      approveButton.textContent = "Approuver";
      approveButton.onclick = () => approveIdea(index);

      const disapproveButton = document.createElement("button");
      disapproveButton.textContent = "Désapprouver";
      disapproveButton.onclick = () => disapproveIdea(index);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.onclick = () => deleteIdea(index);

      ideaActionsDiv.appendChild(approveButton);
      ideaActionsDiv.appendChild(disapproveButton);
      ideaActionsDiv.appendChild(deleteButton);

      ideaDiv.appendChild(ideaContentDiv);
      ideaDiv.appendChild(ideaStatus);
      ideaDiv.appendChild(ideaActionsDiv);

      ideasList.appendChild(ideaDiv);
    });
  }

  function approveIdea(index) {
    ideas[index].status = "Approuvée";
    displayIdeas();
  }

  function disapproveIdea(index) {
    ideas[index].status = "Désapprouvée";
    displayIdeas();
  }

  function deleteIdea(index) {
    ideas.splice(index, 1);
    displayIdeas();
  }

  window.approveIdea = approveIdea;
  window.disapproveIdea = disapproveIdea;
  window.deleteIdea = deleteIdea;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    document
      .querySelectorAll(".error-message")
      .forEach((span) => (span.textContent = ""));

    let isValid = validateLibelle() && validateMessage() && validateCategory();

    if (isValid) {
      ideas.push({
        libelle: libelleInput.value.trim(),
        message: messageInput.value.trim(),
        category: categorySelect.value,
        status: "En attente",
      });
      displayIdeas();
      form.reset();
      confirmationMessage.style.display = "block";
      errorMessage.style.display = "none";
      setTimeout(() => {
        confirmationMessage.style.display = "none";
      }, 2000);
    } else {
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 2000);
    }
  });
});
