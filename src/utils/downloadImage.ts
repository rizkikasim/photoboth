import html2canvas from 'html2canvas'

export async function downloadElementAsPNG(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, {
    scale: 3,
    backgroundColor: null,
    useCORS: true,
    logging: false,
  })
  const dataUrl = canvas.toDataURL('image/png', 1.0)
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
