export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function limitarPalavras(text: string, wordLimit: number): string {
  const words = text.split(' ')
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(' ') + '...'
}

export function formatacaoData(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function formatacaoDataPorExtensa(dateString: string | undefined): string {
  if (dateString != undefined) {
    const date = new Date(dateString)
  
    const day = date.getDate()
    const month = date.toLocaleString('pt-BR', { month: 'long' })
    const year = date.getFullYear()
  
    return `${day} de ${capitalize(month)} de ${year}`
  }
  return ''
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const getImagemMemorial = (diretorioImagem: any) => {
  return `${API_URL}${diretorioImagem?.formats?.thumbnail?.url}`
}

export function tempoDesde(dataISO: string | undefined): string {
  if (dataISO != undefined) {
    const data = new Date(dataISO);
    const agora = new Date();
    const diffMs = agora.getTime() - data.getTime();
  
    const segundos = Math.floor(diffMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);
    const anos = Math.floor(dias / 365);
  
    if (segundos < 60) return `há ${segundos} segundo${segundos !== 1 ? 's' : ''}`;
    if (minutos < 60) return `há ${minutos} minuto${minutos !== 1 ? 's' : ''}`;
    if (horas < 24) return `há ${horas} hora${horas !== 1 ? 's' : ''}`;
    if (dias < 30) return `há ${dias} dia${dias !== 1 ? 's' : ''}`;
    if (meses < 12) return `há ${meses} mês${meses !== 1 ? 'es' : ''}`;
    return `${anos} ano${anos !== 1 ? 's' : ''}`;
  }
  return ''
}