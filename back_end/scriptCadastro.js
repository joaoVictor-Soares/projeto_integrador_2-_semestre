document.getElementById("formCadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome_completo: document.getElementById("nome_comp").value,
    nome_social: document.getElementById("nome_soc").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value
  };

  const resposta = await fetch("http://localhost:3000/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  const texto = await resposta.text();
  alert(texto);
});
