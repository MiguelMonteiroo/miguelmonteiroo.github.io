# Personal Site

Um site pessoal que serve como vitrine de conteúdo (posts) sobre estudos e projetos do autor.

## Language

**Post**:
Uma peça de conteúdo escrito sobre um estudo ou projeto.
_Avoid_: Artigo, nota, blog post

**Autor**:
Único escritor do site. Coincide com o dono do repositório.
_Avoid_: Usuário, editor, colaborador

**Vitrine**:
O site é apenas de exibição — não há leitores cadastrados, newsletter, comentários, ou interação com leitores.
_Avoid_: Blog, fórum, rede social

**Markdown Source**:
Posts são armazenados como arquivos `.md` no repositório e adicionados via commit.
_Avoid_: CMS, banco de dados, headless CMS

**Slug**:
Identificador único de um post na URL, derivado do nome do arquivo `.md` sem extensão.
_Avoid_: ID numérico, UUID

**Tag**:
Marcador opcional para categorizar posts. Ainda não definidas.
_Avoid_: Categoria, tópico

## Navigation

**Homepage**:
Foto + bio curta + links sociais (GitHub, LinkedIn, Email) + últimos 5 posts.

**/posts**:
Listagem completa de todos os posts com título e data, ordenados por data do commit (mais recente primeiro).

**/posts/:slug**:
Página de um post individual.

**Contato**:
Links para email, LinkedIn e GitHub. Sem formulário.
_Avoid_: Página separada de contato

## Storage

**Post file**:
Arquivo Markdown em `src/content/posts/`.
- Sem data no nome do arquivo — a data é extraída do commit via git.
- Slug é o nome do arquivo sem `.md`.
- Se o post tiver imagens, usa-se diretório: `src/content/posts/:slug/index.md`.

**Imagens**:
Armazenadas junto do post (mesmo diretório) ou em `public/images/`.

## Design

**Tema**:
Claro/escuro (toggle). Neutro (preto/branco/cinza), sem cor de destaque.
_Avoid_: Cores vibrantes, temas coloridos

**Estilo**:
Minimalista, moderno, tipografia limpa. Inspirado em augustogalego.com.
_Avoid_: Gradientes, sombras pesadas, animações complexas
