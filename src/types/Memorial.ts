type Thumbnail = {
  url: string
}

type Formats = {
  thumbnail: Thumbnail
}

type Foto = {
  id: number,
  documentId: string,
  formats: Formats,
}

type Memorial = {
  id: number,
  nome: string,
  historia: string,
  cidade: string,
  data_nascimento: string,
  data_falecimento: string,
  foto_capa: string,
  foto_perfil: Foto,
  fotos_memorial: string[],
  autor: string,
  contato_autor: string
}