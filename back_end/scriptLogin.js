document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    email:document.getElementById("login").value,
    senha:document.getElementById("senha").value
  };

  const resposta = await fetch("http://localhost:3000/login", {
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  const texto = await resposta.text()
  document.getElementById("controleLogin").innerHTML = texto
})