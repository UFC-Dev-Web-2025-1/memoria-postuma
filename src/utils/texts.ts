export const API_URL = 'http://localhost:1337'

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