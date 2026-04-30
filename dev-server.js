const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const rewrites = {
  "/": "index.html",
  "/sobre": "sobre.html",
  "/servicos": "servicos.html",
  "/blog": "blog.html",
  "/contato": "contato.html",
  "/higienizacao-de-sofas-campo-grande": "higienizacao-de-sofas-campo-grande.html",
  "/impermeabilizacao-de-estofados": "impermeabilizacao-de-estofados.html",
  "/limpeza-de-colchao": "limpeza-de-colchao.html",
  "/limpeza-de-sofa-barato-campo-grande": "limpeza-de-sofa-barato-campo-grande.html",
  "/higienizacao-profissional-de-sofa": "higienizacao-profissional-de-sofa.html",
  "/limpeza-de-sofa-de-alto-padrao": "limpeza-de-sofa-de-alto-padrao.html",
  "/blog/higienizacao-de-sofa-de-luxo-vale-a-pena": "blog-higienizacao-de-sofa-de-luxo-vale-a-pena.html",
  "/blog/como-preservar-sofas-de-alto-padrao": "blog-como-preservar-sofas-de-alto-padrao.html",
  "/blog/impermeabilizacao-premium-realmente-funciona": "blog-impermeabilizacao-premium-realmente-funciona.html",
  "/blog/melhor-custo-beneficio-limpeza-de-sofa": "blog-melhor-custo-beneficio-limpeza-de-sofa.html",
  "/blog/como-limpar-sofa-gastando-pouco": "blog-como-limpar-sofa-gastando-pouco.html",
};

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

http.createServer((req, res) => {
  const requestPath = decodeURI(new URL(req.url, "http://localhost").pathname);
  const cleanPath = requestPath.replace(/\/$/, "") || "/";
  const relPath = rewrites[cleanPath] || cleanPath.slice(1);
  const filePath = path.normalize(path.join(root, relPath));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
    });
    res.end(data);
  });
}).listen(4173, () => {
  console.log("Confidere preview: http://localhost:4173");
});
